"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { menuSections } from "../../data/menu";
import { buildSmartPrompt } from "./drinkPrompts";

type Props = {
  preselectedDrinkId?: string | null;
  onPreselectedConsumed?: () => void;
  acceptedImages?: Record<string, string>;
  onImageAccepted?: (drinkId: string, imageDataUrl: string) => void;
};

const PIN = "3340";

const STYLE_PRESETS = [
  { id: "product", label: "Product Shot" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "flatlay", label: "Flat Lay" },
  { id: "moody", label: "Moody & Dark" },
];

type ReferenceSlot = {
  id: string; label: string; emoji: string;
  description: string; image: string | null; enabled: boolean;
};

export default function ImageGenerator({ preselectedDrinkId, onPreselectedConsumed, acceptedImages = {}, onImageAccepted }: Props) {
  const [selectedDrink, setSelectedDrink] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [stylePreset, setStylePreset] = useState("product");
  const [generating, setGenerating] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewBase64, setPreviewBase64] = useState<string | null>(null);
  const [generationLog, setGenerationLog] = useState<string[]>([]);
  const [references, setReferences] = useState<ReferenceSlot[]>([
    { id: "background", label: "Background", emoji: "🏞️", description: "", image: null, enabled: true },
    { id: "cup", label: "Cup / Glass", emoji: "🥤", description: "", image: null, enabled: true },
    { id: "logo", label: "Logo", emoji: "✨", description: "", image: null, enabled: true },
  ]);

  useEffect(() => {
    if (preselectedDrinkId) {
      setSelectedDrink(preselectedDrinkId);
      setCustomPrompt("");
      onPreselectedConsumed?.();
    }
  }, [preselectedDrinkId, onPreselectedConsumed]);

  const allDrinks = menuSections.flatMap(s => s.items.map(item => ({ ...item, section: s.title })));

  const buildPrompt = () => {
    const drink = allDrinks.find(d => d.id === selectedDrink);
    if (!drink) return customPrompt;
    return customPrompt || buildSmartPrompt(drink.name, stylePreset);
  };

  const handleGenerate = async () => {
    const prompt = buildPrompt();
    if (!prompt) return;
    setGenerating(true);
    setGenerationLog(["🔄 Starting generation..."]);
    setPreviewImage(null); setPreviewBase64(null);
    try {
      const drink = allDrinks.find(d => d.id === selectedDrink);
      setGenerationLog(prev => [...prev, `📝 Drink: ${drink?.name || "Custom"}`, `🎨 Style: ${STYLE_PRESETS.find(p => p.id === stylePreset)?.label}`]);
      const refImages = references.filter(r => r.image && r.enabled).map(r => r.image as string);
      setGenerationLog(prev => [...prev, `📷 References: ${refImages.length}`, "🤖 Calling Gemini..."]);
      const response = await fetch("/api/studio/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, referenceImages: refImages, pin: PIN }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `API error ${response.status}`);
      setPreviewBase64(data.image);
      setPreviewImage(`data:image/png;base64,${data.image}`);
      try {
        const hist = JSON.parse(localStorage.getItem("stroopist_generation_history") || "[]");
        hist.unshift({ id: `gen_${Date.now()}`, drinkName: drink?.name || "Custom", prompt: prompt.substring(0, 200), timestamp: new Date().toISOString(), accepted: false, preset: stylePreset });
        if (hist.length > 30) hist.pop();
        localStorage.setItem("stroopist_generation_history", JSON.stringify(hist));
      } catch { /* */ }
      setGenerationLog(prev => [...prev, "✅ Image received!", "✅ Accept to commit, or Regenerate"]);
    } catch (err) {
      setGenerationLog(prev => [...prev, `❌ ${err instanceof Error ? err.message : "Failed"}`]);
    }
    setGenerating(false);
  };

  const handleAccept = async () => {
    if (!previewBase64) return;
    const drink = allDrinks.find(d => d.id === selectedDrink);
    if (!drink) return;
    setAccepting(true);
    const fileName = drink.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    const imagePath = `website/public/drinks/${fileName}.png`;
    setGenerationLog(prev => [...prev, `📤 Committing: ${imagePath}...`]);
    try {
      const response = await fetch("/api/studio/replace", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePath, imageBase64: previewBase64, pin: PIN, commitMessage: `🎨 Update ${drink.name} via Admin Studio` }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Error ${response.status}`);

      // Update shared image map so Menu tab shows the new image immediately
      onImageAccepted?.(selectedDrink, `data:image/png;base64,${previewBase64}`);

      // Mark as accepted in history
      try {
        const hist = JSON.parse(localStorage.getItem("stroopist_generation_history") || "[]");
        if (hist.length > 0) hist[0].accepted = true;
        localStorage.setItem("stroopist_generation_history", JSON.stringify(hist));
      } catch { /* */ }

      setGenerationLog(prev => [...prev, `✅ Committed! SHA: ${data.sha?.substring(0, 8)}`, "🚀 Image replaced — live after next deploy", "✅ Current image updated in admin"]);
    } catch (err) {
      setGenerationLog(prev => [...prev, `❌ ${err instanceof Error ? err.message : "Failed"}`]);
    }
    setAccepting(false);
  };

  const handleReferenceUpload = (slotId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setReferences(prev => prev.map(ref => ref.id === slotId ? { ...ref, image: e.target?.result as string } : ref));
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Two-column studio layout — matches KYŌ */}
      <div className="studio-layout">
        {/* Left Column: Controls */}
        <div>
          {/* Drink Selector */}
          <div className="studio-section">
            <h3>🍵 Select Drink</h3>
            <select
              value={selectedDrink}
              onChange={(e) => { setSelectedDrink(e.target.value); setCustomPrompt(""); }}
              className="drink-selector"
            >
              <option value="">Choose a drink…</option>
              {menuSections.map(section => (
                <optgroup key={section.id} label={`${section.emoji || ""} ${section.title}`}>
                  {section.items.map(item => (
                    <option key={item.id} value={item.id}>{item.name} — {item.price}</option>
                  ))}
                </optgroup>
              ))}
            </select>

            {/* Style Presets */}
            <div className="preset-row">
              {STYLE_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => { setStylePreset(preset.id); setCustomPrompt(""); }}
                  className={`preset-btn ${stylePreset === preset.id ? "active" : ""}`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Reference Toggles — matches KYŌ */}
            <div className="ref-toggles">
              {references.map(ref => (
                <label key={ref.id} className="ref-toggle">
                  <input
                    type="checkbox"
                    checked={ref.enabled && !!ref.image}
                    disabled={!ref.image}
                    onChange={() => setReferences(prev => prev.map(r => r.id === ref.id ? { ...r, enabled: !r.enabled } : r))}
                  />
                  {ref.emoji} {ref.label} ref
                </label>
              ))}
            </div>
          </div>

          {/* Prompt Editor */}
          <div className="studio-section">
            <h3>📝 Prompt</h3>
            <p style={{ color: "var(--admin-text-light)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
              Auto-generated from drink data + preset. Edit freely.
            </p>
            <textarea
              value={customPrompt || buildPrompt()}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="prompt-area"
              rows={8}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={generating || (!selectedDrink && !customPrompt)}
            className="generate-btn"
          >
            {generating ? "⏳ Generating…" : "✨ Generate Image"}
          </button>

          {/* Generation Log */}
          {generationLog.length > 0 && (
            <div className="studio-section" style={{ marginTop: "1.5rem" }}>
              <h3>📋 Generation Log</h3>
              <div className="gen-log">
                {generationLog.map((entry, i) => (
                  <div key={i} className={`log-entry ${entry.startsWith("✅") ? "success" : entry.startsWith("❌") ? "error" : ""}`}>
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Preview — matches KYŌ side-by-side */}
        <div>
          <div className="studio-section">
            <h3>👀 Image Preview</h3>
            <div className="preview-grid">
              {/* Current Image */}
              <div className="preview-panel">
                <div className="preview-label">📌 Current Image</div>
                <div className="preview-img-container">
                  {selectedDrink ? (
                    acceptedImages[selectedDrink] ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={acceptedImages[selectedDrink]}
                        alt="Current (updated)"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <Image
                        src={allDrinks.find(d => d.id === selectedDrink)?.image || "/drinks/espresso.png"}
                        alt="Current"
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="300px"
                      />
                    )
                  ) : (
                    <div className="preview-placeholder">
                      <span className="placeholder-icon">🍵</span>
                      Select a drink
                    </div>
                  )}
                </div>
              </div>

              {/* Generated Image */}
              <div className={`preview-panel ${previewImage ? "generated" : ""}`}>
                <div className="preview-label">✨ AI Generated</div>
                <div className="preview-img-container">
                  {generating ? (
                    <div className="preview-placeholder">
                      <span className="placeholder-icon" style={{ animation: "spin 1.5s linear infinite" }}>🤖</span>
                      Generating with Gemini…
                    </div>
                  ) : previewImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={previewImage} alt="Generated" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div className="preview-placeholder">
                      <span className="placeholder-icon">🤖</span>
                      Generate to preview
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons — matches KYŌ */}
            {previewImage && !generating && (
              <div className="action-row" style={{ marginTop: "1rem" }}>
                <button onClick={handleAccept} disabled={accepting} className="action-btn replace">
                  {accepting ? "⏳ Committing…" : "✅ Replace Current Image"}
                </button>
              </div>
            )}
            {previewImage && !generating && (
              <div className="action-row">
                <button onClick={handleGenerate} className="action-btn">🔄 Regenerate</button>
                <button
                  onClick={() => {
                    if (!previewBase64) return;
                    const drink = allDrinks.find(d => d.id === selectedDrink);
                    const a = document.createElement("a");
                    a.href = `data:image/png;base64,${previewBase64}`;
                    a.download = `${(drink?.name || "drink").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
                    a.click();
                  }}
                  className="action-btn"
                >💾 Download</button>
                <button onClick={() => { setPreviewImage(null); setPreviewBase64(null); }} className="action-btn">✕ Clear</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

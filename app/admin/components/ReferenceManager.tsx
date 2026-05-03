"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type ReferenceSlot = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  image: string | null;
};

const DEFAULT_SLOTS: ReferenceSlot[] = [
  { id: "background", label: "Background Reference", emoji: "🏞️", description: "", image: null },
  { id: "cup", label: "Cup / Glass Reference", emoji: "🥤", description: "", image: null },
  { id: "logo", label: "Logo Reference", emoji: "✨", description: "", image: null },
  { id: "ambiance", label: "Ambiance / Lighting", emoji: "💡", description: "", image: null },
];

export default function ReferenceManager() {
  const [slots, setSlots] = useState<ReferenceSlot[]>(DEFAULT_SLOTS);
  const [toast, setToast] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("stroopist_references");
      if (stored) {
        const parsed = JSON.parse(stored);
        setSlots(prev => prev.map(slot => {
          const saved = parsed.find((s: ReferenceSlot) => s.id === slot.id);
          return saved ? { ...slot, description: saved.description || "", image: saved.image } : slot;
        }));
      }
    } catch { /* */ }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("stroopist_references", JSON.stringify(slots));
    } catch { /* */ }
  }, [slots]);

  const handleUpload = (slotId: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      // Compress to max 800px
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const max = 800;
          let w = img.width, h = img.height;
          if (w > max || h > max) {
            if (w > h) { h = (h / w) * max; w = max; }
            else { w = (w / h) * max; h = max; }
          }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d")?.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          setSlots(prev => prev.map(s => s.id === slotId ? { ...s, image: dataUrl } : s));
        };
        img.src = ev.target?.result as string;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleClear = (slotId: string) => {
    setSlots(prev => prev.map(s => s.id === slotId ? { ...s, image: null, description: "" } : s));
  };

  const handleSaveToBlob = async () => {
    setToast("Saving to Vercel Blob...");
    try {
      for (const slot of slots.filter(s => s.image)) {
        await fetch("/api/studio/references", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pin: "3340",
            action: "upload",
            refId: slot.id,
            imageData: slot.image,
            description: slot.description,
          }),
        });
      }
      setToast("✅ References saved to cloud!");
      setTimeout(() => setToast(null), 3000);
    } catch {
      setToast("❌ Save failed");
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div>
      <div className="studio-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3>📷 Reference Images</h3>
            <p style={{ color: "var(--admin-text-light)", fontSize: "0.85rem" }}>
              Upload reference images for consistent visual style across all generated drink photos.
              Descriptions are woven into the generation prompt.
            </p>
          </div>
          <button onClick={handleSaveToBlob} className="btn btn-primary">
            ☁️ Save to Cloud
          </button>
        </div>
      </div>

      <div className="ref-grid">
        {slots.map(slot => (
          <div key={slot.id} className="ref-card">
            <h4>{slot.emoji} {slot.label}</h4>

            {/* Image preview / upload area */}
            <div className="ref-img-preview" onClick={() => handleUpload(slot.id)}>
              {slot.image ? (
                <Image src={slot.image} alt={slot.label} fill style={{ objectFit: "cover" }} sizes="400px" />
              ) : (
                <div style={{ textAlign: "center", color: "var(--admin-text-light)", padding: "2rem" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem", opacity: 0.4 }}>📤</span>
                  <span style={{ fontSize: "0.85rem" }}>Click to upload</span>
                </div>
              )}
            </div>

            {/* Description */}
            <textarea
              value={slot.description}
              onChange={(e) => setSlots(prev => prev.map(s => s.id === slot.id ? { ...s, description: e.target.value } : s))}
              placeholder={`Describe this ${slot.label.toLowerCase()}… (e.g. "Warm marble countertop with café ambiance")`}
              className="ref-description"
            />

            {/* Actions */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.8rem" }}>
              <button onClick={() => handleUpload(slot.id)} className="action-btn" style={{ flex: 1, fontSize: "0.78rem", padding: "0.55rem 1rem" }}>
                📤 Upload
              </button>
              {slot.image && (
                <button onClick={() => handleClear(slot.id)} className="action-btn" style={{ fontSize: "0.78rem", padding: "0.55rem 1rem", color: "#c0392b" }}>
                  🗑️ Clear
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div className="studio-toast show" style={{ background: toast.startsWith("✅") ? "#27ae60" : toast.startsWith("❌") ? "#c0392b" : "var(--admin-text)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { menuSections as initialSections, type MenuSection, type MenuItem } from "../../data/menu";

type Props = {
  onGenerateForDrink?: (drinkId: string) => void;
  onDirtyChange?: (dirty: boolean) => void;
  acceptedImages?: Record<string, string>;
};

export default function MenuEditor({ onGenerateForDrink, onDirtyChange, acceptedImages = {} }: Props) {
  const [sections, setSections] = useState<MenuSection[]>(() =>
    JSON.parse(JSON.stringify(initialSections))
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);

  const showToast = (msg: string, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const markDirty = () => { setHasChanges(true); onDirtyChange?.(true); };

  useEffect(() => { onDirtyChange?.(hasChanges); }, [hasChanges, onDirtyChange]);

  const updateItem = useCallback((sectionId: string, itemId: string, field: keyof MenuItem, value: string | boolean | number) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId ? { ...s, items: s.items.map(item => item.id === itemId ? { ...item, [field]: value } : item) } : s
    ));
    markDirty();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteItem = useCallback((sectionId: string, itemId: string) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId ? { ...s, items: s.items.filter(item => item.id !== itemId) } : s
    ));
    markDirty();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addItem = useCallback((sectionId: string) => {
    const newItem: MenuItem = { id: `new_${Date.now()}`, name: "New Item", price: "€0.00", image: "/drinks/espresso.png", active: true, order: 999 };
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s));
    markDirty();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/studio/save-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuJson: sections, pin: "3340" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      setHasChanges(false);
      onDirtyChange?.(false);
      showToast("✅ Menu saved to GitHub!");
    } catch (err) {
      showToast(`❌ ${err instanceof Error ? err.message : "Save failed"}`, "error");
    }
    setSaving(false);
  };

  const handleImageUpload = (sectionId: string, itemId: string) => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => { updateItem(sectionId, itemId, "image", ev.target?.result as string); };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const activeItems = sections.reduce((acc, s) => acc + s.items.filter(i => i.active).length, 0);

  return (
    <div className="tab-content" style={{ display: "block", padding: 0 }}>
      {/* Section Header — matches KYŌ */}
      <div className="studio-section" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3>🍵 Menu Items</h3>
            <p style={{ color: "var(--admin-text-light)", fontSize: "0.9rem" }}>
              Edit names, prices, or toggle active status. Remember to save changes!
            </p>
            <p style={{ color: "var(--admin-text-light)", fontSize: "0.8rem", marginTop: "0.3rem" }}>
              {sections.length} categories • {activeItems}/{totalItems} active items
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
            {hasChanges && (
              <span style={{ fontSize: "0.8rem", color: "#e67e22", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e67e22", display: "inline-block", animation: "pulse 1.5s infinite" }} />
                Unsaved
              </span>
            )}
            <button onClick={handleSave} disabled={!hasChanges || saving} className="btn btn-primary" style={{ opacity: hasChanges ? 1 : 0.4 }}>
              {saving ? "⏳ Saving…" : "💾 Save Menu to Server"}
            </button>
          </div>
        </div>
      </div>

      {/* Per-section card grids — matches KYŌ */}
      {sections.map((section) => (
        <div key={section.id} style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {section.emoji} {section.title}
              <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--admin-text-light)" }}>
                ({section.items.filter(i => i.active).length}/{section.items.length})
              </span>
            </h3>
            <button
              onClick={() => addItem(section.id)}
              className="btn btn-outline"
              style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }}
            >
              + Add Item
            </button>
          </div>

          <div className="menu-grid">
            {section.items.map((item) => (
              <div key={item.id} className={`menu-card ${!item.active ? "inactive" : ""}`}>
                {/* Image */}
                <div style={{ position: "relative" }}>
                  <div style={{ width: "100%", aspectRatio: "3/4", position: "relative", background: "var(--admin-bg-dark)" }}>
                    {acceptedImages[item.id] ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={acceptedImages[item.id]}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--admin-radius) var(--admin-radius) 0 0" }}
                      />
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="menu-card-img"
                        sizes="200px"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  {item.badge && (
                    <span className="menu-card-badge cold">{item.badge}</span>
                  )}
                </div>

                {/* Info */}
                <div className="menu-card-info">
                  <input
                    className="name-input"
                    value={item.name}
                    onChange={(e) => updateItem(section.id, item.id, "name", e.target.value)}
                  />
                  <input
                    className="price-input"
                    value={item.price}
                    onChange={(e) => updateItem(section.id, item.id, "price", e.target.value)}
                  />
                  <input
                    className="desc-input"
                    value={item.description || ""}
                    onChange={(e) => updateItem(section.id, item.id, "description", e.target.value)}
                    placeholder="Add description…"
                  />
                </div>

                {/* Actions — matches KYŌ */}
                <div className="menu-card-actions">
                  <label className="active-toggle" title={item.active ? "Active" : "Inactive"}>
                    <input
                      type="checkbox"
                      checked={item.active}
                      onChange={() => updateItem(section.id, item.id, "active", !item.active)}
                    />
                    <span style={{ fontSize: "0.7rem", color: "var(--admin-text-light)" }}>
                      {item.active ? "Active" : "Off"}
                    </span>
                  </label>
                  <div style={{ display: "flex", gap: "0.15rem" }}>
                    {onGenerateForDrink && (
                      <button onClick={() => onGenerateForDrink(item.id)} title="Generate with AI">🤖</button>
                    )}
                    <button onClick={() => handleImageUpload(section.id, item.id)} title="Upload image">📤</button>
                    <button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = item.image;
                        link.download = `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
                        link.click();
                      }}
                      title="Download image"
                    >💾</button>
                    <button
                      onClick={() => { if (confirm(`Delete "${item.name}"?`)) deleteItem(section.id, item.id); }}
                      title="Delete"
                      style={{ color: "#c0392b" }}
                    >🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Toast */}
      {toast && (
        <div className={`studio-toast show ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

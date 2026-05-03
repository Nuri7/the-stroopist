"use client";

import { useState, useEffect } from "react";

type HistoryItem = {
  id: string;
  drinkName: string;
  prompt: string;
  timestamp: string;
  accepted: boolean;
  preset: string;
};

export default function GenerationHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [filter, setFilter] = useState<"all" | "accepted" | "rejected">("all");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("stroopist_generation_history");
      if (stored) setHistory(JSON.parse(stored));
    } catch { /* */ }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("stroopist_generation_history");
    setHistory([]);
  };

  const filteredHistory = history.filter(item => {
    if (filter === "accepted") return item.accepted;
    if (filter === "rejected") return !item.accepted;
    return true;
  });

  return (
    <div>
      <div className="studio-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3>🕑 Generation History</h3>
            <p style={{ color: "var(--admin-text-light)", fontSize: "0.85rem" }}>
              {history.length} generation{history.length !== 1 ? "s" : ""} recorded
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div className="preset-row" style={{ margin: 0 }}>
              {(["all", "accepted", "rejected"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`preset-btn ${filter === f ? "active" : ""}`} style={{ textTransform: "capitalize" }}>
                  {f}
                </button>
              ))}
            </div>
            {history.length > 0 && (
              <button onClick={clearHistory} className="action-btn" style={{ color: "#c0392b", fontSize: "0.8rem" }}>
                🗑️ Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="studio-section" style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem", opacity: 0.3 }}>🕑</span>
          <h3 style={{ marginBottom: "0.5rem" }}>No generations yet</h3>
          <p style={{ color: "var(--admin-text-light)", fontSize: "0.9rem" }}>
            Generated images will appear here. Go to the &ldquo;Image Studio&rdquo; tab to create your first AI-generated drink photo.
          </p>
        </div>
      ) : (
        <div className="history-grid">
          {filteredHistory.map(item => (
            <div key={item.id} className="history-card" onClick={() => setSelectedItem(item)}>
              {/* Visual indicator */}
              <div style={{
                aspectRatio: "1", background: "linear-gradient(135deg, rgba(200,135,77,0.15), rgba(200,135,77,0.05))",
                display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
              }}>
                <span style={{ fontSize: "3rem" }}>☕</span>
                {item.accepted && (
                  <span style={{
                    position: "absolute", top: 8, right: 8, background: "#27ae60", color: "white",
                    fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.4rem", borderRadius: 6
                  }}>✓</span>
                )}
              </div>
              <div style={{ padding: "0.6rem 0.8rem" }}>
                <p style={{ fontWeight: 700, fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.drinkName}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.2rem" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--admin-text-light)" }}>
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--admin-text-light)", textTransform: "capitalize" }}>
                    {item.preset}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)"
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{
            background: "white", borderRadius: 16, maxWidth: 420, width: "100%", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
          }}>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.5rem" }}>{selectedItem.drinkName}</h3>
              <p style={{ color: "var(--admin-text-light)", fontSize: "0.8rem", marginBottom: "0.8rem" }}>
                {new Date(selectedItem.timestamp).toLocaleString()} • {selectedItem.preset}
              </p>
              <p style={{ color: "var(--admin-text-light)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "1rem" }}>
                {selectedItem.prompt}
              </p>
              <span style={{
                display: "inline-block", padding: "0.25rem 0.6rem", borderRadius: 6, fontSize: "0.75rem", fontWeight: 600,
                background: selectedItem.accepted ? "rgba(39,174,96,0.1)" : "rgba(200,135,77,0.1)",
                color: selectedItem.accepted ? "#27ae60" : "#C8874D"
              }}>
                {selectedItem.accepted ? "✅ Committed" : "⏳ Not committed"}
              </span>
            </div>
            <div style={{ padding: "0 1.5rem 1.5rem" }}>
              <button onClick={() => setSelectedItem(null)} className="btn btn-outline" style={{ width: "100%" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

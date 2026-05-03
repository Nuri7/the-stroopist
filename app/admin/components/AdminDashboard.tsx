"use client";

import { useState, useEffect } from "react";
import MenuEditor from "./MenuEditor";
import ImageGenerator from "./ImageGenerator";
import ReferenceManager from "./ReferenceManager";
import GenerationHistory from "./GenerationHistory";
import "../admin.css";

type Tab = "menu" | "studio" | "references" | "history";

const tabs: { id: Tab; label: string; emoji: string }[] = [
  { id: "menu", label: "Menu", emoji: "🍵" },
  { id: "studio", label: "Image Studio", emoji: "🎨" },
  { id: "references", label: "References", emoji: "📷" },
  { id: "history", label: "History", emoji: "🕑" },
];

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("menu");
  const [preselectedDrinkId, setPreselectedDrinkId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [acceptedImages, setAcceptedImages] = useState<Record<string, string>>({});

  const handleImageAccepted = (drinkId: string, imageDataUrl: string) => {
    setAcceptedImages(prev => ({ ...prev, [drinkId]: imageDataUrl }));
  };

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) { e.preventDefault(); e.returnValue = ""; }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges]);

  const handleGenerateForDrink = (drinkId: string) => {
    setPreselectedDrinkId(drinkId);
    setActiveTab("studio");
  };

  return (
    <div className="admin-container">
      {/* Header — matches KYŌ exactly */}
      <div className="admin-header">
        <span className="title">🧇 The Stroopist Admin</span>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
          <a
            href="/"
            target="_blank"
            className="btn btn-outline"
            style={{ fontSize: "0.85rem", textDecoration: "none" }}
          >
            ← View Site
          </a>
          <button onClick={onLogout} className="btn btn-outline" style={{ color: "#c0392b", borderColor: "rgba(192,57,43,0.2)" }}>
            Logout
          </button>
        </div>
      </div>

      {/* Tab bar — matches KYŌ exactly */}
      <div className="admin-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`admin-tab ${activeTab === tab.id ? "active" : ""}`}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="tab-content" style={{ display: "block" }}>
        {activeTab === "menu" && (
          <MenuEditor
            onGenerateForDrink={handleGenerateForDrink}
            onDirtyChange={setHasUnsavedChanges}
            acceptedImages={acceptedImages}
          />
        )}
        {activeTab === "studio" && (
          <ImageGenerator
            preselectedDrinkId={preselectedDrinkId}
            onPreselectedConsumed={() => setPreselectedDrinkId(null)}
            acceptedImages={acceptedImages}
            onImageAccepted={handleImageAccepted}
          />
        )}
        {activeTab === "references" && <ReferenceManager />}
        {activeTab === "history" && <GenerationHistory />}
      </div>
    </div>
  );
}

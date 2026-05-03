"use client";

import { useState, useRef, KeyboardEvent } from "react";

const CORRECT_PIN = "3340";

export default function PinLogin({ onSuccess }: { onSuccess: () => void }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleDigit = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    setError(false);

    const next = [...digits];
    next[index] = value;
    setDigits(next);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (value && index === 3) {
      const pin = next.join("");
      if (pin === CORRECT_PIN) {
        onSuccess();
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setDigits(["", "", "", ""]);
          inputRefs[0].current?.focus();
        }, 600);
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--admin-bg, #FBF7F2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    }}>
      <div style={{ width: "100%", maxWidth: 400, textAlign: "center" }}>
        {/* Back link */}
        <a href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          marginBottom: "2rem", color: "var(--admin-text-light, #8A7B6B)",
          fontSize: "0.85rem", textDecoration: "none",
        }}>
          ← Back to The Stroopist
        </a>

        {/* Card */}
        <div style={{
          background: "white",
          borderRadius: 24,
          border: "1px solid rgba(0,0,0,0.08)",
          padding: "3rem",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
        }}>
          {/* Icon */}
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 64, height: 64, borderRadius: 16,
            background: "rgba(200,135,77,0.1)", border: "1px solid rgba(200,135,77,0.2)",
            marginBottom: "1.5rem", fontSize: "1.5rem"
          }}>
            🔒
          </div>

          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "var(--admin-text-light)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Authorized personnel only
          </p>

          {/* PIN Label */}
          <p style={{
            fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em",
            color: "var(--admin-text-light)", marginBottom: "1rem"
          }}>
            Enter 4-digit PIN
          </p>

          {/* PIN Input */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "0.75rem",
            animation: shake ? "shake 0.5s ease" : undefined,
          }}>
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={inputRefs[i]}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigit(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                autoFocus={i === 0}
                style={{
                  width: 56, height: 64, textAlign: "center",
                  fontSize: "1.5rem", fontWeight: 700,
                  borderRadius: 12,
                  border: `2px solid ${error ? "rgba(192,57,43,0.5)" : digit ? "var(--admin-accent, #C8874D)" : "rgba(0,0,0,0.1)"}`,
                  background: error ? "rgba(192,57,43,0.03)" : "var(--admin-bg, #FBF7F2)",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxShadow: digit ? "0 0 0 3px rgba(200,135,77,0.1)" : "none",
                }}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <p style={{ color: "#c0392b", fontSize: "0.85rem", marginTop: "1rem" }}>
              Incorrect PIN — try again
            </p>
          )}

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
            {digits.map((d, i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: d ? "var(--admin-accent, #C8874D)" : "rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                transform: d ? "scale(1.2)" : "scale(1)",
              }} />
            ))}
          </div>
        </div>

        <p style={{ color: "rgba(0,0,0,0.15)", fontSize: "0.75rem", marginTop: "1.5rem" }}>
          The Stroopist — Amsterdam
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-12px); }
          40% { transform: translateX(12px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}

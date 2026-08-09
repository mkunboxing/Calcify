"use client";
import { useState, useCallback } from "react";
import { countWords } from "@/lib/calculations";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = countWords(text);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const statItems = [
    { label: "Words", val: stats.words.toLocaleString(), color: "var(--accent-light)" },
    { label: "Characters", val: stats.characters.toLocaleString(), color: "#34d399" },
    { label: "No Spaces", val: stats.charactersNoSpaces.toLocaleString(), color: "#a78bfa" },
    { label: "Sentences", val: stats.sentences.toLocaleString(), color: "#f59e0b" },
    { label: "Paragraphs", val: stats.paragraphs.toLocaleString(), color: "#60a5fa" },
    { label: "Read Time", val: `${stats.readingTimeMin} min`, color: "#f472b6" },
  ];

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
          Type or paste your text below
        </label>
        <textarea
          id="word-counter-input"
          className="input resize-none"
          rows={8}
          value={text}
          onChange={handleChange}
          placeholder="Start typing or paste your text here…"
          style={{ fontFamily: "inherit" }}
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {statItems.map((s) => (
          <div key={s.label} className="card p-3 text-center">
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.val}</p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {text && (
        <div className="mt-4 flex justify-end">
          <button onClick={() => setText("")} className="btn-secondary text-sm px-4 py-1.5">
            Clear
          </button>
        </div>
      )}

      <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
        🔒 All text stays in your browser. Nothing is sent to any server.
      </p>
    </div>
  );
}

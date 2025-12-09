"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [textUrl, setTextUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setLoading(true);
    setTextUrl("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: trimmed }),
      });

      if (!response.ok) {
        console.error("Request failed");
        return;
      }

      const text = await response.text();
      setTextUrl(text);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Article Quiz Generator
        </h1>

        <div className="space-y-4">
          <label className="text-gray-500">Article Title</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="Enter a title for your article..."
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="w-full px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? "Generating..." : "Generate summary"}
          </button>
        </div>

        {textUrl && (
          <div className="mt-8 border rounded-lg p-4">
            <p>{textUrl}</p>
          </div>
        )}
      </div>
    </div>
  );
}

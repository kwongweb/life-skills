import React, { useState } from "react";
import { getTodaySkill } from "./getTodaySkill";

export default function App() {
  const [overrideDay, setOverrideDay] = useState(null);
  const today = getTodaySkill(overrideDay);

  const handlePrevious = () => {
    if (today.hasPrevious) {
      setOverrideDay((prev) => (prev === null ? today.day - 2 : prev - 1));
    }
  };

  const handleNext = () => {
    if (today.hasNext) {
      setOverrideDay((prev) => (prev === null ? today.day : prev + 1));
    }
  };

  const handleBackToToday = () => {
    setOverrideDay(null);
  };

  return (
    <div className="app-container">
      {today.status === "active" && (
        <div>
          <h1>Day {today.day}: {today.skill.title}</h1>
          <p>{today.skill.description}</p>
          <h3>Key Tips:</h3>
          <ul>
            {today.skill.keyTips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>

          <div style={{ marginTop: "1rem" }}>
            {today.hasPrevious && (
              <button onClick={handlePrevious} style={{ marginRight: "0.5rem" }}>← See Previous Day</button>
            )}
            {today.hasNext && (
              <button onClick={handleNext} style={{ marginRight: "0.5rem" }}>See Next Day →</button>
            )}
            {!today.isToday && (
              <button onClick={handleBackToToday}>Back to Today</button>
            )}
          </div>

          <h2>📚 See All Skills So Far</h2>
          <ul>
            {today.archive.map((entry, index) => (
              <li key={index}><strong>Day {index + 1}:</strong> {entry.title}</li>
            ))}
          </ul>
        </div>
      )}

      {today.status !== "active" && (
        <div>
          <h1>{today.message}</h1>
        </div>
      )}
    </div>
  );
}

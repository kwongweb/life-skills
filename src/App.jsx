
import React, { useState, useEffect } from "react";
import { getTodaySkill } from "./getTodaySkill";

export default function App() {
  const [overrideDay, setOverrideDay] = useState(null);
  const [language, setLanguage] = useState("en");
  const [today, setToday] = useState(getTodaySkill());

  useEffect(() => {
    setToday(getTodaySkill(overrideDay));
  }, [overrideDay]);

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

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  const title = language === "en" ? today.skill?.title : today.skill?.titleEs;
  const description = language === "en" ? today.skill?.description : today.skill?.descriptionEs;
  const keyTips = language === "en" ? today.skill?.keyTips : today.skill?.keyTipsEs;

  return (
    <div className="app-container">
      {today.status === "active" && today.skill && (
        <div>
          <button onClick={toggleLanguage} style={{ marginBottom: "1rem" }}>
            Switch to {language === "en" ? "Español" : "English"}
          </button>

          <h1>Day {today.day}: {title}</h1>
          <p><strong>Date:</strong> {today.date}</p>
          <p>{description}</p>
          <h3>Key Tips:</h3>
          <ul>
            {keyTips.map((tip, index) => (
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
              <li key={index}><strong>Day {index + 1}:</strong> {language === "en" ? entry.title : entry.titleEs}</li>
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

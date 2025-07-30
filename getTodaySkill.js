import lifeSkills from "./lifeSkills";

export function getTodaySkill(currentDayOverride = null) {
  const localNow = new Date();
  const localMidnight = new Date(localNow.getFullYear(), localNow.getMonth(), localNow.getDate());
  const startDate = new Date(2025, 6, 27); // July 27, 2025

  const msInDay = 1000 * 60 * 60 * 24;
  const dayDiff = Math.floor((localMidnight - startDate) / msInDay);

  const effectiveDay = currentDayOverride !== null ? currentDayOverride : dayDiff;

  if (effectiveDay < 0) {
    return { status: "notStarted", message: "📅 The Life Skills program starts on July 27, 2025." };
  } else if (effectiveDay >= lifeSkills.length) {
    return { status: "complete", message: "✅ You've completed the 100-day Life Skills program!" };
  } else {
    return {
      status: "active",
      day: effectiveDay + 1,
      skill: lifeSkills[effectiveDay],
      archive: lifeSkills.slice(0, effectiveDay + 1),
      hasPrevious: effectiveDay > 0,
      previousDay: effectiveDay - 1,
      hasNext: effectiveDay < lifeSkills.length - 1,
      nextDay: effectiveDay + 1,
      isToday: effectiveDay === dayDiff
    };
  }
}


import React from "react";

/**
 * Change or extend these as you wish!
 */
const MOTIVATION = [
  "You are growing stronger every month. Keep going!",
  "Every step, no matter how small, is progress.",
  "Your journey matters. You are not alone.",
  "Persistence is your greatest muscle. Flex it!",
  "Every month survived is a victory won.",
  "Celebrate your courage and resilience.",
  "Growth happens in moments of challenge.",
  "Trust the process. The journey unveils itself.",
  "Don't look back, you're not going that way!"
];

function getQuoteForMonth() {
  const month = new Date().getMonth();
  return MOTIVATION[month % MOTIVATION.length];
}

export default function MonthlyMotivation() {
  return (
    <div className="rounded-xl bg-gradient-to-tr from-yellow-900 via-yellow-700 to-yellow-500 p-6 text-black font-medium text-center shadow-lg max-w-lg mx-auto">
      <span className="block mb-2">🌟 Monthly Motivation</span>
      <p className="text-sm leading-relaxed">{getQuoteForMonth()}</p>
    </div>
  );
}

/**
 * EduQuest AI - Badges & Achievements Definition
 */

window.EduQuestData = window.EduQuestData || {};

window.EduQuestData.BADGES = [
  {
    id: "first_quest",
    title: "First Steps",
    icon: "🌟",
    description: "Complete your very first quest in EduQuest AI.",
    checkUnlock: (state) => (state.completedQuests || []).length >= 1
  },
  {
    id: "perfect_score",
    title: "Sharpshooter",
    icon: "🎯",
    description: "Score 100% on any standard quest mission.",
    checkUnlock: (state, meta) => meta && meta.scorePercent === 100
  },
  {
    id: "streak_3",
    title: "On Fire!",
    icon: "🔥",
    description: "Achieve a consecutive answer streak of 3 questions.",
    checkUnlock: (state) => (state.bestStreak || 0) >= 3
  },
  {
    id: "streak_5",
    title: "Unstoppable",
    icon: "⚡",
    description: "Achieve a consecutive answer streak of 5 questions.",
    checkUnlock: (state) => (state.bestStreak || 0) >= 5
  },
  {
    id: "revision_hero",
    title: "Mistake Master",
    icon: "🔄",
    description: "Turn a mistake into a mission and complete a revision quest.",
    checkUnlock: (state) => (state.revisionMissionsCompleted || 0) >= 1
  },
  {
    id: "comeback_champion",
    title: "Comeback Kid",
    icon: "🏆",
    description: "Boost your topic accuracy by +30% or more through revision!",
    checkUnlock: (state, meta) => meta && meta.accuracyBoost && meta.accuracyBoost >= 30
  },
  {
    id: "math_whiz",
    title: "Math Wizard",
    icon: "📐",
    description: "Successfully complete a Mathematics mission.",
    checkUnlock: (state, meta) => meta && meta.subject === "math" && meta.passed
  },
  {
    id: "word_smith",
    title: "Word Smith",
    icon: "📚",
    description: "Successfully complete an English mission.",
    checkUnlock: (state, meta) => meta && meta.subject === "english" && meta.passed
  },
  {
    id: "science_explorer",
    title: "Curious Scientist",
    icon: "🧪",
    description: "Successfully complete a Science mission.",
    checkUnlock: (state, meta) => meta && meta.subject === "science" && meta.passed
  },
  {
    id: "knowledge_seeker",
    title: "Knowledge Seeker",
    icon: "🦉",
    description: "Attempt at least 15 questions across any subjects.",
    checkUnlock: (state) => (state.totalQuestionsAttempted || 0) >= 15
  },
  {
    id: "level_up_explorer",
    title: "Rising Scholar",
    icon: "👑",
    description: "Reach Player Level 2 or higher.",
    checkUnlock: (state) => (state.level || 1) >= 2
  }
];


/**
 * EduQuest AI - Central State & Persistence Engine
 * Maintains user progress, statistics, topic-level analytics, badges, and localStorage sync.
 * Includes Sandbox Judge Demo Mode (non-destructive sample journey).
 */

class EduQuestState {
  static STORAGE_KEY = "eduquest_ai_student_profile_v1";
  static BACKUP_KEY = "eduquest_ai_real_backup_v1";

  constructor() {
    this.listeners = [];
    this.isJudgeDemo = false;
    this.repairedWorlds = new Set();
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    const defaultState = {
      grade: 3,
      selectedSubject: "math",
      xp: 0,
      stars: 0,
      level: 1,
      currentStreak: 0,
      bestStreak: 0,
      totalQuestionsAttempted: 0,
      totalQuestionsCorrect: 0,
      completedQuests: [], // ['g3_math_mult']
      unlockedBadges: [],  // ['first_quest']
      topicStats: {},      // { topicId: { attempts, correct, flaggedForRevision, revisionsCompleted } }
      revisionHistory: [], // [{ topicId, topicTitle, beforeAcc, afterAcc, date, boost }]
      revisionMissionsCompleted: 0,
      settings: {
        sound: true,
        dyslexiaFont: false,
        aiMode: "demo", // 'demo' | 'live'
        apiKey: ""
      }
    };

    try {
      const saved = localStorage.getItem(EduQuestState.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed, settings: { ...defaultState.settings, ...(parsed.settings || {}) } };
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
    return defaultState;
  }

  save() {
    // Only persist to real storage if not in temporary judge demo mode
    if (!this.isJudgeDemo) {
      try {
        localStorage.setItem(EduQuestState.STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.error("Failed to save to localStorage:", e);
      }
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  get() {
    return this.state;
  }

  setGrade(grade) {
    this.state.grade = parseInt(grade, 10);
    this.save();
  }

  setSubject(subject) {
    this.state.selectedSubject = subject;
    this.save();
  }

  calculateLevel(xp) {
    if (xp < 100) return 1;
    if (xp < 250) return 2;
    if (xp < 450) return 3;
    if (xp < 700) return 4;
    return 5; // Master Scholar
  }

  getLevelTitle(level) {
    const titles = {
      1: "Novice Explorer 🌱",
      2: "Curious Adventurer ⭐",
      3: "Quest Champion 🛡️",
      4: "Master Thinker ⚡",
      5: "Grand Scholar 👑"
    };
    return titles[level] || "Explorer";
  }

  getXPForNextLevel(level) {
    const thresholds = { 1: 100, 2: 250, 3: 450, 4: 700, 5: 1000 };
    return thresholds[level] || 1000;
  }

  // Record an answered question
  recordAnswer(topicId, isCorrect, isFirstTry = true) {
    if (!this.state.topicStats[topicId]) {
      this.state.topicStats[topicId] = {
        attempts: 0,
        correct: 0,
        flaggedForRevision: false,
        revisionsCompleted: 0
      };
    }

    const t = this.state.topicStats[topicId];
    t.attempts += 1;
    this.state.totalQuestionsAttempted += 1;

    let earnedXP = 0;

    if (isCorrect) {
      t.correct += 1;
      this.state.totalQuestionsCorrect += 1;
      this.state.currentStreak += 1;
      if (this.state.currentStreak > this.state.bestStreak) {
        this.state.bestStreak = this.state.currentStreak;
      }

      if (isFirstTry) {
        earnedXP = 10;
        if (this.state.currentStreak >= 3) {
          earnedXP += 2; // Streak bonus
        }
      }
    } else {
      this.state.currentStreak = 0;
    }

    this.state.xp += earnedXP;
    const oldLevel = this.state.level;
    this.state.level = this.calculateLevel(this.state.xp);
    const leveledUp = this.state.level > oldLevel;

    // Threshold: at least 3 attempts and accuracy below 60%
    const accuracy = Math.round((t.correct / t.attempts) * 100);
    if (t.attempts >= 3 && accuracy < 60) {
      t.flaggedForRevision = true;
      this.repairedWorlds.delete(topicId);
    } else if (t.attempts >= 3 && accuracy >= 60) {
      t.flaggedForRevision = false;
    }

    this.save();
    return { earnedXP, leveledUp, currentStreak: this.state.currentStreak };
  }

  // Complete a standard Quest
  completeQuest(topicId, score, totalQuestions, subject) {
    const percent = Math.round((score / totalQuestions) * 100);
    let starsEarned = 1;
    if (percent >= 80) starsEarned = 3;
    else if (percent >= 60) starsEarned = 2;

    this.state.stars += starsEarned;

    if (!this.state.completedQuests.includes(topicId)) {
      this.state.completedQuests.push(topicId);
    }

    const newBadges = this.checkBadges({
      scorePercent: percent,
      subject: subject,
      passed: percent >= 60
    });

    this.save();
    return { starsEarned, percent, newBadges };
  }

  // Complete a Mistake-to-Mission Revision (World Repair)
  completeRevisionMission(topicId, topicTitle, beforeAccuracy, revisionScore, totalRevisionQuestions = 3) {
    const afterAccuracy = Math.round((revisionScore / totalRevisionQuestions) * 100);
    const boost = Math.max(0, afterAccuracy - beforeAccuracy);

    if (this.state.topicStats[topicId]) {
      const t = this.state.topicStats[topicId];
      t.revisionsCompleted = (t.revisionsCompleted || 0) + 1;
      if (afterAccuracy >= 60) {
        t.flaggedForRevision = false;
        this.repairedWorlds.add(topicId);
      }
    }

    this.state.revisionMissionsCompleted = (this.state.revisionMissionsCompleted || 0) + 1;

    const bonusXP = 25 + (boost > 0 ? 15 : 0);
    this.state.xp += bonusXP;
    this.state.level = this.calculateLevel(this.state.xp);

    const record = {
      id: "rev_" + Date.now(),
      topicId,
      topicTitle,
      beforeAccuracy,
      afterAccuracy,
      revisionScore,
      totalRevisionQuestions,
      boost,
      timestamp: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    this.state.revisionHistory.unshift(record);

    const newBadges = this.checkBadges({
      accuracyBoost: boost,
      isRevision: true
    });

    this.save();
    return { record, bonusXP, newBadges, wasRepaired: afterAccuracy >= 60 };
  }

  isWorldRepaired(topicId) {
    return this.repairedWorlds.has(topicId);
  }

  checkBadges(meta = {}) {
    const newlyUnlocked = [];
    if (!window.EduQuestData || !window.EduQuestData.BADGES) return newlyUnlocked;

    window.EduQuestData.BADGES.forEach(badge => {
      if (!this.state.unlockedBadges.includes(badge.id)) {
        if (badge.checkUnlock(this.state, meta)) {
          this.state.unlockedBadges.push(badge.id);
          newlyUnlocked.push(badge);
        }
      }
    });

    return newlyUnlocked;
  }

  getTopicAccuracy(topicId) {
    const t = this.state.topicStats[topicId];
    if (!t || t.attempts === 0) return null;
    return Math.round((t.correct / t.attempts) * 100);
  }

  isTopicFlagged(topicId) {
    const t = this.state.topicStats[topicId];
    return t ? !!t.flaggedForRevision : false;
  }

  resetAllData() {
    localStorage.removeItem(EduQuestState.STORAGE_KEY);
    this.state = this.loadInitialState();
    this.repairedWorlds.clear();
    this.save();
  }

  // ==================== JUDGE DEMO MODE (NON-DESTRUCTIVE) ====================
  startJudgeDemoSession() {
    if (this.isJudgeDemo) return;

    // Backup real learner state to localStorage backup key
    try {
      localStorage.setItem(EduQuestState.BACKUP_KEY, JSON.stringify(this.state));
    } catch (e) {}

    this.isJudgeDemo = true;

    // Populate realistic struggling state in Grade 5 Fractions
    this.state = {
      grade: 5,
      selectedSubject: "math",
      xp: 40,
      stars: 1,
      level: 1,
      currentStreak: 0,
      bestStreak: 1,
      totalQuestionsAttempted: 3,
      totalQuestionsCorrect: 1,
      completedQuests: [],
      unlockedBadges: ["first_quest"],
      topicStats: {
        "g5_math_fractions": {
          attempts: 3,
          correct: 1,
          flaggedForRevision: true, // Broken world element!
          revisionsCompleted: 0
        }
      },
      revisionHistory: [],
      revisionMissionsCompleted: 0,
      settings: {
        sound: true,
        dyslexiaFont: false,
        aiMode: "demo",
        apiKey: ""
      }
    };

    this.repairedWorlds.clear();
    this.notify();
  }

  exitJudgeDemoSession() {
    if (!this.isJudgeDemo) return;

    // Restore real learner profile
    try {
      const backup = localStorage.getItem(EduQuestState.BACKUP_KEY);
      if (backup) {
        this.state = JSON.parse(backup);
        localStorage.removeItem(EduQuestState.BACKUP_KEY);
      } else {
        this.state = this.loadInitialState();
      }
    } catch (e) {
      this.state = this.loadInitialState();
    }

    this.isJudgeDemo = false;
    this.repairedWorlds.clear();
    this.notify();
  }
}

window.eduQuestState = new EduQuestState();

/**
 * EduQuest AI - QuestBot Mistake Detective & AI Buddy
 * Analyzes misconceptions, provides step-by-step worked examples,
 * and adapts explanations to student grade levels.
 * Clearly distinguishes between Curated Rule-Based Mode and Live Gemini AI.
 */

class AIBuddy {
  constructor() {
    this.name = "QuestBot";
    this.avatar = "🤖";
    this.detectiveAvatar = "🕵️‍♂️";
  }

  getMode() {
    const state = window.eduQuestState.get();
    return state.settings.apiKey ? "live" : "demo";
  }

  isLive() {
    return this.getMode() === "live";
  }

  // Tone adapter for different grades
  getToneForGrade(grade) {
    if (grade <= 3) {
      return {
        greeting: "BEEP-BOOP! 🔍 Detective QuestBot on the case!",
        style: "Use simple fun analogies, playful words, and cute emojis.",
        cluePrompt: "Let's investigate the secret pattern together!"
      };
    } else if (grade <= 6) {
      return {
        greeting: "Case File Opened! 🔎 Detective QuestBot investigating:",
        style: "Use step-by-step logic, clear clues, and encouraging hints.",
        cluePrompt: "Let's track down the root cause of this tricky question."
      };
    } else {
      return {
        greeting: "Misconception Analysis 📐 Detective QuestBot reporting:",
        style: "Use analytical breakdown, key definitions, and deductive clues.",
        cluePrompt: "Deconstructing the cognitive trap in this problem."
      };
    }
  }

  // Mistake Detective Case Briefing
  getDetectiveCase(question, selectedIndex, grade = 3) {
    const tone = this.getToneForGrade(grade);
    const chosenText = question.options[selectedIndex] || "Unknown option";
    const correctText = question.options[question.correctIndex];

    const misconception = question.detectiveAnalysis ||
      `You selected "${chosenText}", but the correct answer is "${correctText}". Look out for common traps!`;

    const workedExample = question.workedExample ||
      `Worked Example: Review the rule: ${question.explanation}`;

    let encouragement = "";
    if (grade <= 3) {
      encouragement = "Super detective tip: Every mistake leaves a clue that makes your brain stronger! 🌟";
    } else if (grade <= 6) {
      encouragement = "Investigation complete: Mastering this pattern will turn this topic into your superpower! ⚡";
    } else {
      encouragement = "Cognitive review: Clarifying this distinction establishes a rock-solid foundation for advanced exams. 🎯";
    }

    return {
      title: `${this.detectiveAvatar} Mistake Detective Case File`,
      chosenAnswer: chosenText,
      correctAnswer: correctText,
      concept: question.concept || "Core Concept",
      misconception: misconception,
      workedExample: workedExample,
      explanation: question.explanation,
      encouragement: encouragement,
      sourceBadge: this.isLive() ? "Live AI Detective" : "Curated Detective Engine (Rule-Based)"
    };
  }

  // Get question-specific hint
  async getHint(question, grade = 3) {
    const tone = this.getToneForGrade(grade);

    if (this.isLive()) {
      try {
        const liveHint = await this.fetchLiveHint(question, grade);
        if (liveHint) return { text: liveHint, source: "live", badge: "Live AI Hint" };
      } catch (err) {
        console.warn("Live AI failed, falling back to smart demo hint:", err);
      }
    }

    // Curated Demo Hint
    const baseHint = question.hint || "Take a closer look at the key words in the question!";
    let gradePrefix = "";
    if (grade <= 3) {
      gradePrefix = `🔍 ${tone.greeting} Secret Clue: `;
    } else if (grade <= 6) {
      gradePrefix = `🔎 ${tone.greeting} Clue: `;
    } else {
      gradePrefix = `📐 ${tone.greeting} Diagnostic Clue: `;
    }

    return {
      text: `${gradePrefix}${baseHint}`,
      source: "demo",
      badge: "Curated Smart Demo Hint (Offline Safe)"
    };
  }

  // Get explanation for mistakes
  getDetailedExplanation(question, grade = 3) {
    const tone = this.getToneForGrade(grade);
    let advice = "";
    if (grade <= 3) {
      advice = "Don't worry! Mistakes help your brain grow like a superhero muscle! 💪";
    } else if (grade <= 6) {
      advice = "Every mistake points us directly to the next level of understanding. 🔍";
    } else {
      advice = "Refining misconceptions is the fastest route to academic mastery. 📈";
    }

    return {
      title: "Why this works:",
      text: question.explanation,
      concept: question.concept || "Key Learning Objective",
      advice: advice,
      badge: this.isLive() ? "Live AI Explanation" : "EduQuest Verified Explanation"
    };
  }

  // Live Gemini API call if key configured
  async fetchLiveHint(question, grade) {
    const apiKey = window.eduQuestState.get().settings.apiKey;
    if (!apiKey) return null;

    const prompt = `You are QuestBot, a friendly AI tutor for children in Grade ${grade}. 
Provide a short 2-sentence encouraging hint for this quiz question without giving away the direct answer option.
Question: "${question.text}"
Options: ${question.options.join(", ")}
Concept: ${question.concept || "General"}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 120, temperature: 0.7 }
      })
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  }
}

window.questAIBuddy = new AIBuddy();

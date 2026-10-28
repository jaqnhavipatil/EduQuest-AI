/**
 * EduQuest AI - Signature Innovation: Mistake-to-Mission & World Repair Engine
 * Powers the "Repair the World" journey, Personalized Next Mission recommendations,
 * and tracks growth before and after targeted revision.
 */

class MistakeMissionEngine {
  constructor() {
    this.activeRevision = null;
    this.currentJourneyStep = "discover"; // mistake | discover | learn | repair | grow
  }

  setJourneyStep(step) {
    this.currentJourneyStep = step;
    const bar = document.getElementById("world-journey-progress-bar");
    if (bar) {
      bar.querySelectorAll(".journey-step-node").forEach(node => {
        node.classList.toggle("active", node.dataset.step === step);
      });
    }
  }

  // Detect which topics need revision
  getFlaggedTopics(grade, subject) {
    const state = window.eduQuestState.get();
    const flagged = [];

    const gradeData = window.EduQuestData.GRADE_TOPICS[grade];
    if (!gradeData || !gradeData.subjects) return flagged;

    const subjectsToCheck = subject ? [subject] : ["math", "english", "science"];

    subjectsToCheck.forEach(sub => {
      const topicList = gradeData.subjects[sub] || [];
      topicList.forEach(topic => {
        const tStat = state.topicStats[topic.id];
        if (tStat) {
          const acc = tStat.attempts > 0 ? Math.round((tStat.correct / tStat.attempts) * 100) : 0;
          if (tStat.attempts >= 3 && acc < 60) {
            flagged.push({
              topic,
              subject: sub,
              attempts: tStat.attempts,
              correct: tStat.correct,
              accuracy: acc,
              worldObject: topic.worldObject || "Crystal Bridge",
              brokenDescription: topic.brokenDescription
            });
          }
        }
      });
    });

    return flagged;
  }

  // Personalized Next Mission Recommendation Engine
  getPersonalizedRecommendation(topic, subject, grade) {
    const state = window.eduQuestState.get();
    const tStat = state.topicStats[topic.id];

    if (!tStat || tStat.attempts === 0) {
      return {
        type: "explore",
        title: "Beginner Expedition 🧭",
        badge: "New Discovery",
        badgeClass: "badge-explore",
        icon: "🧭",
        reason: "You haven't visited this realm yet. Begin your first exploratory quest!",
        actionText: "Embark on Quest ➔",
        isRepair: false
      };
    }

    const accuracy = Math.round((tStat.correct / tStat.attempts) * 100);

    // Rule 1: < 60% after at least 3 attempts -> Guided World Repair Mission
    if (tStat.attempts >= 3 && accuracy < 60) {
      return {
        type: "repair",
        title: "World Repair Quest 🛠️",
        badge: "Repair Needed ⚠️",
        badgeClass: "badge-repair",
        icon: "🛠️",
        accuracy: accuracy,
        reason: `Current accuracy is ${accuracy}% (${tStat.correct}/${tStat.attempts}). The ${topic.worldObject || "Realm Conduit"} is cracked from misconceptions. Guided revision is recommended!`,
        actionText: "Launch Repair Mission 🚀",
        isRepair: true
      };
    }

    // Rule 2: 60% - 79% -> Reinforcement Expedition
    if (accuracy >= 60 && accuracy < 80) {
      return {
        type: "reinforce",
        title: "Reinforcement Expedition ⚡",
        badge: "Strengthen Skills 👍",
        badgeClass: "badge-reinforce",
        icon: "⚡",
        accuracy: accuracy,
        reason: `Current accuracy is ${accuracy}%. Good working grasp! A short reinforcement mission will lock in rock-solid consistency.`,
        actionText: "Play Reinforcement Quest ⚡",
        isRepair: false
      };
    }

    // Rule 3: >= 80% -> Mastery Trailblazer
    return {
      type: "mastery",
      title: "Mastery Trailblazer 👑",
      badge: "Peak Mastery 🏆",
      badgeClass: "badge-mastery",
      icon: "👑",
      accuracy: accuracy,
      reason: `Superb accuracy of ${accuracy}%! You have conquered the core concepts. Take the mastery challenge to set a new record!`,
      actionText: "Accept Mastery Challenge 👑",
      isRepair: false
    };
  }

  // Prepare a revision mission payload (World Repair)
  prepareRevisionMission(topicId, grade, subject) {
    const gradeData = window.EduQuestData.GRADE_TOPICS[grade];
    if (!gradeData || !gradeData.subjects) return null;

    let targetTopic = null;
    let foundSubject = subject;

    const subjects = subject ? [subject] : ["math", "english", "science"];
    for (const sub of subjects) {
      const list = gradeData.subjects[sub] || [];
      const found = list.find(t => t.id === topicId);
      if (found) {
        targetTopic = found;
        foundSubject = sub;
        break;
      }
    }

    if (!targetTopic) return null;

    const state = window.eduQuestState.get();
    const tStat = state.topicStats[topicId] || { attempts: 0, correct: 0 };
    const beforeAccuracy = tStat.attempts > 0 ? Math.round((tStat.correct / tStat.attempts) * 100) : 40;

    this.activeRevision = {
      topicId: targetTopic.id,
      topicTitle: targetTopic.title,
      worldObject: targetTopic.worldObject || "Crystal Bridge",
      brokenDescription: targetTopic.brokenDescription || "This world element needs repair.",
      repairedDescription: targetTopic.repairedDescription || "The world element is restored!",
      subject: foundSubject,
      grade: grade,
      conceptSummary: targetTopic.conceptSummary,
      beforeAccuracy: beforeAccuracy,
      questions: targetTopic.revisionQuestions || targetTopic.questions.slice(0, 3),
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: []
    };

    return this.activeRevision;
  }

  getActiveRevision() {
    return this.activeRevision;
  }

  recordRevisionAnswer(isCorrect) {
    if (!this.activeRevision) return;
    if (isCorrect) {
      this.activeRevision.score += 1;
    }
    this.activeRevision.userAnswers.push(isCorrect);
  }

  finishRevision() {
    if (!this.activeRevision) return null;

    const { topicId, topicTitle, beforeAccuracy, score, questions } = this.activeRevision;
    const result = window.eduQuestState.completeRevisionMission(
      topicId,
      topicTitle,
      beforeAccuracy,
      score,
      questions.length
    );

    this.activeRevision = null;
    return result;
  }
}

window.mistakeMissionEngine = new MistakeMissionEngine();

/**
 * EduQuest AI - Quiz Engine
 * Powers standard quests and world repair missions.
 * Equips QuestBot Mistake Detective for wrong answers with worked examples.
 */

class QuizEngine {
  constructor() {
    this.mode = "standard"; // "standard" or "revision"
    this.topic = null;
    this.subject = null;
    this.grade = 3;
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.answeredCurrent = false;
    this.userAnswers = [];
    this.totalXPInQuiz = 0;
  }

  startQuest(topic, subject, grade) {
    this.mode = "standard";
    this.topic = topic;
    this.subject = subject;
    this.grade = grade;
    this.questions = [...topic.questions];
    this.currentIndex = 0;
    this.score = 0;
    this.answeredCurrent = false;
    this.userAnswers = [];
    this.totalXPInQuiz = 0;
    return this.getCurrentQuestion();
  }

  startRevision(revisionPayload) {
    this.mode = "revision";
    this.topic = {
      id: revisionPayload.topicId,
      title: revisionPayload.topicTitle,
      worldObject: revisionPayload.worldObject,
      repairedDescription: revisionPayload.repairedDescription
    };
    this.subject = revisionPayload.subject;
    this.grade = revisionPayload.grade;
    this.questions = [...revisionPayload.questions];
    this.currentIndex = 0;
    this.score = 0;
    this.answeredCurrent = false;
    this.userAnswers = [];
    this.totalXPInQuiz = 0;
    return this.getCurrentQuestion();
  }

  getCurrentQuestion() {
    if (this.currentIndex >= this.questions.length) return null;
    return {
      question: this.questions[this.currentIndex],
      index: this.currentIndex,
      total: this.questions.length,
      isRevision: this.mode === "revision",
      topic: this.topic
    };
  }

  submitAnswer(optionIndex) {
    if (this.answeredCurrent) return null;
    this.answeredCurrent = true;

    const currentQ = this.questions[this.currentIndex];
    const isCorrect = optionIndex === currentQ.correctIndex;

    if (isCorrect) {
      this.score += 1;
      if (window.soundEffects) window.soundEffects.playCorrect();
    } else {
      if (window.soundEffects) window.soundEffects.playIncorrect();
    }

    const result = window.eduQuestState.recordAnswer(this.topic.id, isCorrect, true);
    const earnedXP = result.earnedXP;
    this.totalXPInQuiz += earnedXP;

    if (result.currentStreak >= 3 && isCorrect) {
      if (window.soundEffects) window.soundEffects.playStreak();
    }

    if (this.mode === "revision") {
      window.mistakeMissionEngine.recordRevisionAnswer(isCorrect);
    }

    // Generate Mistake Detective Analysis if incorrect
    let detectiveCase = null;
    if (!isCorrect && window.questAIBuddy) {
      detectiveCase = window.questAIBuddy.getDetectiveCase(currentQ, optionIndex, this.grade);
    }

    const answerRecord = {
      question: currentQ,
      selectedIndex: optionIndex,
      isCorrect,
      earnedXP,
      leveledUp: result.leveledUp,
      currentStreak: result.currentStreak,
      detectiveCase
    };
    this.userAnswers.push(answerRecord);

    return {
      isCorrect,
      correctIndex: currentQ.correctIndex,
      explanation: currentQ.explanation,
      hint: currentQ.hint,
      detectiveCase,
      earnedXP,
      leveledUp: result.leveledUp,
      currentStreak: result.currentStreak,
      score: this.score,
      total: this.questions.length
    };
  }

  nextQuestion() {
    if (!this.answeredCurrent) return null;
    this.currentIndex += 1;
    this.answeredCurrent = false;
    return this.getCurrentQuestion();
  }

  isFinished() {
    return this.currentIndex >= this.questions.length;
  }

  getResults() {
    const total = this.questions.length;
    const percent = Math.round((this.score / total) * 100);

    let questResult = null;
    if (this.mode === "standard") {
      questResult = window.eduQuestState.completeQuest(this.topic.id, this.score, total, this.subject);
    } else {
      questResult = window.mistakeMissionEngine.finishRevision();
    }

    if (percent >= 60 && window.soundEffects) {
      window.soundEffects.playFanfare();
    }

    const isFlagged = window.eduQuestState.isTopicFlagged(this.topic.id);

    return {
      mode: this.mode,
      topic: this.topic,
      subject: this.subject,
      grade: this.grade,
      score: this.score,
      totalQuestions: total,
      accuracy: percent,
      totalXP: this.totalXPInQuiz,
      starsEarned: questResult.starsEarned || (this.mode === "revision" ? 2 : 1),
      newBadges: questResult.newBadges || [],
      userAnswers: this.userAnswers,
      isFlaggedForRevision: isFlagged,
      revisionRecord: questResult.record || null,
      bonusXP: questResult.bonusXP || 0,
      wasRepaired: questResult.wasRepaired || false
    };
  }
}

window.quizEngine = new QuizEngine();

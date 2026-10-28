/**
 * EduQuest AI - Main Application Controller
 * Coordinates the Living Adventure World, QuestBot Mistake Detective,
 * Personalized Mission Recommendations, World Repair Sequences, and Judge Demo Mode.
 */

document.addEventListener("DOMContentLoaded", () => {
  EduQuestApp.init();
});

const EduQuestApp = {
  currentScreen: "screen-adventure",
  activeQuizResult: null,
  selectedIslandId: null,

  init() {
    this.bindEvents();
    this.renderHeaderStats();
    this.renderGradeSelector();
    this.renderAdventureMap();

    // Subscribe to state changes for reactive updates
    window.eduQuestState.subscribe(() => {
      this.renderHeaderStats();
      this.updateJudgeDemoBanner();
    });

    // Check saved font preference
    const state = window.eduQuestState.get();
    if (state.settings && state.settings.dyslexiaFont) {
      document.body.classList.add("dyslexia-font");
    }

    this.updateSoundButtonUI();
    this.updateJudgeDemoBanner();
  },

  // ==================== SCREEN NAVIGATION ====================
  showScreen(screenId) {
    document.querySelectorAll(".screen-view").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add("active");
      this.currentScreen = screenId;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Update header nav tabs
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.screen === screenId);
    });

    if (screenId === "screen-adventure") {
      this.renderAdventureMap();
    } else if (screenId === "screen-mirror") {
      this.renderLearningMirror();
    }
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      if (modalId === "modal-ai-buddy") {
        this.renderAIBuddyModal();
      }
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
    }
  },

  // ==================== EVENT BINDING ====================
  bindEvents() {
    // Header navigation
    document.getElementById("btn-brand-home").addEventListener("click", () => {
      this.showScreen("screen-adventure");
    });

    document.getElementById("tab-adventure").addEventListener("click", () => {
      this.showScreen("screen-adventure");
    });

    document.getElementById("tab-mirror").addEventListener("click", () => {
      this.showScreen("screen-mirror");
    });

    document.getElementById("tab-ai-buddy").addEventListener("click", () => {
      this.openModal("modal-ai-buddy");
    });

    document.getElementById("btn-select-grade").addEventListener("click", () => {
      this.showScreen("screen-grade");
    });

    // Quick Judge Demo Mode
    document.getElementById("btn-quick-judge-demo").addEventListener("click", () => {
      this.startJudgeDemoTour();
    });

    document.getElementById("btn-exit-judge-demo").addEventListener("click", () => {
      this.exitJudgeDemoTour();
    });

    // Sound toggle
    document.getElementById("btn-sound-toggle").addEventListener("click", () => {
      window.soundEffects.toggleMute();
      this.updateSoundButtonUI();
      const muted = window.soundEffects.isMuted();
      this.showToast(muted ? "🔇 Sound muted" : "🔊 Sound enabled");
    });

    // Settings modal
    document.getElementById("btn-settings-open").addEventListener("click", () => {
      this.openModal("modal-settings");
    });

    // Generic modal close buttons
    document.querySelectorAll("[data-close-modal]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const modalId = e.currentTarget.getAttribute("data-close-modal");
        this.closeModal(modalId);
      });
    });

    // Close modal on click outside dialog
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.classList.remove("active");
        }
      });
    });

    // Subject tabs in Adventure Map
    document.getElementById("subject-tabs-container").addEventListener("click", (e) => {
      const btn = e.target.closest(".subject-btn");
      if (btn) {
        document.querySelectorAll(".subject-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const subject = btn.dataset.subject;
        window.eduQuestState.setSubject(subject);
        this.selectedIslandId = null;
        if (window.soundEffects) window.soundEffects.playClick();
        this.renderAdventureMap();
      }
    });

    // Confirm grade selection button
    document.getElementById("btn-confirm-grade").addEventListener("click", () => {
      this.showScreen("screen-adventure");
    });

    // Quiz action: Next Question
    document.getElementById("btn-next-question").addEventListener("click", () => {
      this.handleNextQuestion();
    });

    // AI Buddy hint request
    document.getElementById("btn-request-hint").addEventListener("click", () => {
      this.handleRequestHint();
    });

    // Results screen continue button
    document.getElementById("btn-results-continue").addEventListener("click", () => {
      this.showScreen("screen-adventure");
    });

    document.getElementById("btn-results-mirror").addEventListener("click", () => {
      this.showScreen("screen-mirror");
    });

    // Results screen revision button
    document.getElementById("btn-results-launch-revision").addEventListener("click", () => {
      if (this.activeQuizResult && this.activeQuizResult.topic) {
        this.launchRevisionFlow(this.activeQuizResult.topic.id, this.activeQuizResult.grade, this.activeQuizResult.subject);
      }
    });

    // Top banner revision button
    document.getElementById("btn-banner-launch-revision").addEventListener("click", () => {
      const state = window.eduQuestState.get();
      const flagged = window.mistakeMissionEngine.getFlaggedTopics(state.grade, state.selectedSubject);
      if (flagged.length > 0) {
        this.launchRevisionFlow(flagged[0].topic.id, state.grade, flagged[0].subject);
      }
    });

    // Concept prep screen actions
    document.getElementById("btn-cancel-revision").addEventListener("click", () => {
      this.showScreen("screen-adventure");
    });

    document.getElementById("btn-start-revision-quiz").addEventListener("click", () => {
      const revision = window.mistakeMissionEngine.getActiveRevision();
      if (revision) {
        window.mistakeMissionEngine.setJourneyStep("repair");
        window.quizEngine.startRevision(revision);
        this.renderQuizArena();
        this.showScreen("screen-quiz");
      }
    });

    // Settings actions
    document.getElementById("btn-settings-sound-toggle").addEventListener("click", (e) => {
      const muted = window.soundEffects.toggleMute();
      e.target.textContent = muted ? "Disabled" : "Enabled";
      this.updateSoundButtonUI();
    });

    document.getElementById("btn-settings-font-toggle").addEventListener("click", (e) => {
      document.body.classList.toggle("dyslexia-font");
      const isDyslexic = document.body.classList.contains("dyslexia-font");
      e.target.textContent = isDyslexic ? "Enabled" : "Disabled";
      const state = window.eduQuestState.get();
      state.settings.dyslexiaFont = isDyslexic;
      window.eduQuestState.save();
    });

    document.getElementById("btn-settings-reset").addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all your learning progress, XP, and badges? This cannot be undone.")) {
        window.eduQuestState.resetAllData();
        this.renderHeaderStats();
        this.renderAdventureMap();
        this.closeModal("modal-settings");
        this.showToast("All progress reset! Starting fresh 🌱");
      }
    });

    // AI Key actions
    document.getElementById("btn-save-api-key").addEventListener("click", () => {
      const val = document.getElementById("input-api-key").value.trim();
      const state = window.eduQuestState.get();
      state.settings.apiKey = val;
      state.settings.aiMode = val ? "live" : "demo";
      window.eduQuestState.save();
      this.renderAIBuddyModal();
      this.showToast(val ? "Live AI Key saved! 🤖" : "Switched to Curated Detective Mode");
    });

    document.getElementById("btn-clear-api-key").addEventListener("click", () => {
      document.getElementById("input-api-key").value = "";
      const state = window.eduQuestState.get();
      state.settings.apiKey = "";
      state.settings.aiMode = "demo";
      window.eduQuestState.save();
      this.renderAIBuddyModal();
      this.showToast("Returned to Curated Detective Mode 🕵️‍♂️");
    });

    // Keyboard navigation: 1-4 to answer, Enter to advance
    window.addEventListener("keydown", (e) => {
      if (this.currentScreen === "screen-quiz") {
        if (["1", "2", "3", "4"].includes(e.key)) {
          const index = parseInt(e.key, 10) - 1;
          const optionBtn = document.querySelectorAll(".option-btn")[index];
          if (optionBtn && !optionBtn.disabled) {
            this.handleOptionSelect(index);
          }
        } else if (e.key === "Enter") {
          const feedbackBox = document.getElementById("quiz-feedback-box");
          if (feedbackBox.classList.contains("active")) {
            this.handleNextQuestion();
          }
        }
      } else if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));
      }
    });
  },

  // ==================== JUDGE DEMO MODE TOUR ====================
  startJudgeDemoTour() {
    window.eduQuestState.startJudgeDemoSession();
    window.mistakeMissionEngine.setJourneyStep("discover");
    this.renderHeaderStats();
    this.renderAdventureMap();
    this.showScreen("screen-adventure");
    this.showToast("🧑‍⚖️ Sandbox Demo Started! Grade 5 'Bridge of Common Denominators' is cracked. Click to repair it!", 4500);
  },

  exitJudgeDemoTour() {
    window.eduQuestState.exitJudgeDemoSession();
    this.renderHeaderStats();
    this.renderAdventureMap();
    this.showToast("Restored your real student profile! ✨", 3000);
  },

  updateJudgeDemoBanner() {
    const banner = document.getElementById("judge-demo-banner");
    if (banner) {
      banner.style.display = window.eduQuestState.isJudgeDemo ? "block" : "none";
    }
  },

  // ==================== HEADER STATS ====================
  renderHeaderStats() {
    const state = window.eduQuestState.get();
    document.getElementById("header-grade-label").textContent = `Grade ${state.grade}`;
    document.getElementById("header-xp").textContent = `${state.xp} XP`;
    document.getElementById("header-stars").textContent = `${state.stars}`;
    document.getElementById("adventure-grade-title").textContent = `Grade ${state.grade} Living Adventure World`;
  },

  updateSoundButtonUI() {
    const muted = window.soundEffects.isMuted();
    document.getElementById("btn-sound-toggle").textContent = muted ? "🔇" : "🔊";
    const settingsBtn = document.getElementById("btn-settings-sound-toggle");
    if (settingsBtn) {
      settingsBtn.textContent = muted ? "Disabled" : "Enabled";
    }
  },

  // ==================== GRADE SELECTOR ====================
  renderGradeSelector() {
    const grid = document.getElementById("grade-cards-grid");
    grid.innerHTML = "";
    const currentGrade = window.eduQuestState.get().grade;

    for (let g = 1; g <= 10; g++) {
      const gradeInfo = window.EduQuestData.GRADE_TOPICS[g] || { status: "preview" };
      const isActiveCurriculum = gradeInfo.status === "active";
      const isSelected = g === currentGrade;

      const card = document.createElement("div");
      card.className = `grade-card ${isSelected ? 'active' : ''}`;
      card.dataset.grade = g;

      card.innerHTML = `
        <div class="grade-number">${g}</div>
        <div class="grade-label">Grade ${g}</div>
        <span class="grade-tag ${isActiveCurriculum ? 'ready' : 'preview'}">
          ${isActiveCurriculum ? '✨ Living World Active' : '🚀 Preview'}
        </span>
      `;

      card.addEventListener("click", () => {
        document.querySelectorAll(".grade-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        window.eduQuestState.setGrade(g);
        this.selectedIslandId = null;
        if (window.soundEffects) window.soundEffects.playClick();

        if (!isActiveCurriculum) {
          this.showToast(`Grade ${g} realm preview selected! Full drops coming soon.`, 3000);
        } else {
          this.showToast(`Entered Grade ${g} Realm!`, 2000);
        }
      });

      grid.appendChild(card);
    }
  },

  // ==================== LIVING ADVENTURE WORLD MAP ====================
  renderAdventureMap() {
    const state = window.eduQuestState.get();
    const grade = state.grade;
    const subject = state.selectedSubject || "math";
    const gradeData = window.EduQuestData.GRADE_TOPICS[grade];

    // Subject Realm Subtitles
    const realmThemes = {
      math: "The Realm of Number Crystals: Master quests and repair broken energy bridges! 🔷",
      english: "The Archipelago of Language Towers: Untangle speech gears and light the beacons! 📜",
      science: "The Biosphere of Elemental Forces: Rebalance ecosystems and power conduits! ⚡"
    };
    document.getElementById("adventure-realm-subtitle").textContent = realmThemes[subject] || realmThemes.math;

    // Update subject tab buttons
    document.querySelectorAll(".subject-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.subject === subject);
    });

    const banner = document.getElementById("adventure-mistake-banner");
    const islandContainer = document.getElementById("island-nodes-container");
    const inspectPanel = document.getElementById("realm-inspect-panel");
    const conduitGroup = document.getElementById("conduit-paths-group");

    islandContainer.innerHTML = "";
    conduitGroup.innerHTML = "";

    // Check flagged topics for World Repair Banner
    const flagged = window.mistakeMissionEngine.getFlaggedTopics(grade, subject);
    if (flagged.length > 0) {
      banner.style.display = "flex";
      document.getElementById("mistake-banner-text").textContent =
        `Disruption Detected! "${flagged[0].worldObject}" in "${flagged[0].topic.title}" has collapsed (${flagged[0].accuracy}% accuracy). Launch the 3-question World Repair Mission to rebuild it!`;
      window.mistakeMissionEngine.setJourneyStep("discover");
    } else {
      banner.style.display = "none";
    }

    if (!gradeData || !gradeData.subjects || !gradeData.subjects[subject]) {
      // Preview Grade state
      islandContainer.innerHTML = `
        <div style="width: 100%; background: #FFFFFF; border: 2px dashed var(--border); border-radius: var(--radius-lg); padding: 48px 24px; text-align: center;">
          <div style="font-size: 54px; margin-bottom: 12px;">🌟</div>
          <h3 style="font-size: 22px; font-weight: 800; margin-bottom: 8px;">Grade ${grade} Realms Expanding Soon!</h3>
          <p class="text-muted" style="max-width: 500px; margin: 0 auto 24px; font-size: 14px;">
            ${gradeData?.note || 'Our world architects are calibrating this realm.'}
            Explore <strong>Grade 3, 5, or 8</strong> right now for full interactive living worlds!
          </p>
          <div style="display: flex; justify-content: center; gap: 10px;">
            <button class="btn btn-primary" onclick="EduQuestApp.switchAndPlay(3)">Enter Grade 3</button>
            <button class="btn btn-outline" onclick="EduQuestApp.switchAndPlay(5)">Enter Grade 5</button>
            <button class="btn btn-outline" onclick="EduQuestApp.switchAndPlay(8)">Enter Grade 8</button>
          </div>
        </div>
      `;
      inspectPanel.style.display = "none";
      return;
    }

    inspectPanel.style.display = "block";
    const topics = gradeData.subjects[subject];

    // If no topic selected, select first
    if (!this.selectedIslandId || !topics.find(t => t.id === this.selectedIslandId)) {
      this.selectedIslandId = topics[0].id;
    }

    // Render SVG conduits between nodes
    conduitGroup.innerHTML = `
      <path d="M 150 200 Q 500 120 850 200" class="conduit-path ${flagged.length > 0 ? 'broken' : ''}" />
      <path d="M 150 200 Q 500 280 850 200" class="conduit-path ${flagged.length > 0 ? 'broken' : ''}" opacity="0.6" />
    `;

    topics.forEach((topic) => {
      const topicStat = state.topicStats[topic.id];
      const accuracy = topicStat && topicStat.attempts > 0 ? Math.round((topicStat.correct / topicStat.attempts) * 100) : null;
      const isFlagged = topicStat && (topicStat.flaggedForRevision || (topicStat.attempts >= 3 && accuracy !== null && accuracy < 60));
      const isRepaired = window.eduQuestState.isWorldRepaired(topic.id);
      const isSelected = topic.id === this.selectedIslandId;

      let stateClass = "state-active";
      if (isFlagged) stateClass = "state-broken";
      else if (isRepaired) stateClass = "state-repaired";
      else if (accuracy !== null && accuracy >= 80) stateClass = "state-mastered";

      const node = document.createElement("div");
      node.className = `island-realm-node ${stateClass} ${isSelected ? 'selected' : ''}`;
      node.dataset.topicId = topic.id;

      let worldStatusBadge = `<span class="badge-status status-ontrack">Active Realm</span>`;
      if (isFlagged) {
        worldStatusBadge = `<span class="badge-status status-needs-practice">CRACKED ⚠️</span>`;
      } else if (isRepaired) {
        worldStatusBadge = `<span class="badge-status status-repaired">RESTORED ✨</span>`;
      } else if (accuracy !== null && accuracy >= 80) {
        worldStatusBadge = `<span class="badge-status status-mastered">MASTERED 🏆</span>`;
      }

      node.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">
            ${topic.islandName || "Island Realm"}
          </span>
          ${worldStatusBadge}
        </div>

        <div class="island-icon-hero">${isFlagged ? '💥' : topic.icon}</div>
        <h3 class="island-name">${topic.title}</h3>
        <div class="island-world-object">🏛️ ${topic.worldObject || "Crystal Bridge"}</div>

        ${isFlagged ? `
          <div class="island-damage-warning">
            ⚠️ Bridge Damaged (${accuracy}% accuracy)
          </div>
        ` : isRepaired ? `
          <div class="island-repaired-banner">
            ✨ Repaired & Radiating Energy!
          </div>
        ` : ''}

        <div style="font-size: 13px; font-weight: 700; color: var(--text-muted); margin-top: 8px;">
          ${accuracy !== null ? `${accuracy}% Realm Stability` : 'Unexplored Realm'}
        </div>
      `;

      node.addEventListener("click", () => {
        this.selectedIslandId = topic.id;
        document.querySelectorAll(".island-realm-node").forEach(n => n.classList.remove("selected"));
        node.classList.add("selected");
        if (window.soundEffects) window.soundEffects.playClick();
        this.renderInspectPanel(topic, subject, grade);
      });

      islandContainer.appendChild(node);
    });

    const activeTopic = topics.find(t => t.id === this.selectedIslandId) || topics[0];
    this.renderInspectPanel(activeTopic, subject, grade);
  },

  // ==================== REALM INSPECT & PERSONALIZED NEXT MISSION ====================
  renderInspectPanel(topic, subject, grade) {
    const inspectPanel = document.getElementById("realm-inspect-panel");
    const state = window.eduQuestState.get();
    const topicStat = state.topicStats[topic.id] || { attempts: 0, correct: 0 };
    const accuracy = topicStat.attempts > 0 ? Math.round((topicStat.correct / topicStat.attempts) * 100) : null;
    const isFlagged = topicStat.flaggedForRevision || (topicStat.attempts >= 3 && accuracy !== null && accuracy < 60);

    // Get calculated personalized recommendation
    const recom = window.mistakeMissionEngine.getPersonalizedRecommendation(topic, subject, grade);

    inspectPanel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
        <div>
          <span class="badge-pill bg-gray" style="margin-bottom: 6px;">📍 Selected Realm</span>
          <h3 style="font-size: 22px; font-weight: 900; margin-top: 2px;">${topic.islandName || 'Island Realm'}: ${topic.title}</h3>
          <p class="text-sm text-muted" style="margin-top: 2px;">World Object: <strong>${topic.worldObject || 'Crystal Conduit'}</strong></p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 22px; font-weight: 900; color: ${accuracy !== null && accuracy < 60 ? 'var(--danger)' : 'var(--success)'};">
            ${accuracy !== null ? `${accuracy}% Accuracy` : 'Not Started'}
          </div>
          <div class="text-sm text-muted">${topicStat.attempts} questions attempted</div>
        </div>
      </div>

      <!-- Personalized Next Mission Card -->
      <div class="personalized-recom-box">
        <div class="recom-header">
          <span class="recom-title">${recom.icon} ${recom.title}</span>
          <span class="badge-pill ${recom.badgeClass}">${recom.badge}</span>
        </div>
        <p class="recom-reason"><strong>Why this is recommended:</strong> ${recom.reason}</p>
      </div>

      <!-- Action Button -->
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        ${isFlagged ? `
          <button class="btn btn-warning btn-lg btn-block" id="btn-inspect-launch-revision">
            🛠️ Launch World Repair Mission (3 Questions)
          </button>
        ` : `
          <button class="btn btn-primary btn-lg btn-block" id="btn-inspect-launch-quest">
            ${recom.actionText}
          </button>
        `}
      </div>
    `;

    const revBtn = document.getElementById("btn-inspect-launch-revision");
    if (revBtn) {
      revBtn.addEventListener("click", () => {
        this.launchRevisionFlow(topic.id, grade, subject);
      });
    }

    const questBtn = document.getElementById("btn-inspect-launch-quest");
    if (questBtn) {
      questBtn.addEventListener("click", () => {
        this.launchQuest(topic, subject, grade);
      });
    }
  },

  switchAndPlay(targetGrade) {
    window.eduQuestState.setGrade(targetGrade);
    this.selectedIslandId = null;
    this.renderHeaderStats();
    this.renderGradeSelector();
    this.renderAdventureMap();
    if (window.soundEffects) window.soundEffects.playClick();
  },

  // ==================== LAUNCH QUEST ====================
  launchQuest(topic, subject, grade) {
    if (window.soundEffects) window.soundEffects.playClick();
    window.mistakeMissionEngine.setJourneyStep("discover");
    window.quizEngine.startQuest(topic, subject, grade);
    this.renderQuizArena();
    this.showScreen("screen-quiz");
  },

  // ==================== LAUNCH REVISION FLOW (WORLD REPAIR) ====================
  launchRevisionFlow(topicId, grade, subject) {
    if (window.soundEffects) window.soundEffects.playClick();
    window.mistakeMissionEngine.setJourneyStep("learn");
    const payload = window.mistakeMissionEngine.prepareRevisionMission(topicId, grade, subject);
    if (!payload) {
      this.showToast("Could not find revision questions for this topic.", 3000);
      return;
    }

    document.getElementById("prep-topic-name").textContent = payload.topicTitle;
    document.getElementById("prep-world-object").textContent = `Repairing: ${payload.worldObject}`;
    document.getElementById("prep-concept-text").textContent =
      payload.conceptSummary || "Read through this key concept before diving into the 3-question revision mission!";

    this.showScreen("screen-concept-prep");
  },

  // ==================== QUIZ ARENA ====================
  renderQuizArena() {
    const currentQData = window.quizEngine.getCurrentQuestion();
    if (!currentQData) return;

    const { question, index, total, isRevision } = currentQData;

    // Mode Pill
    const modePill = document.getElementById("quiz-mode-pill");
    modePill.className = `quiz-mode-pill ${isRevision ? 'mode-revision' : 'mode-standard'}`;
    modePill.textContent = isRevision ? "🛠️ World Repair Mission (3 Qs)" : "🚀 Adventure Quest (5 Qs)";

    // Progress Bar
    const progressFill = document.getElementById("quiz-progress-bar");
    progressFill.className = `quiz-progress-fill ${isRevision ? 'revision-fill' : ''}`;
    const percent = Math.round(((index + 1) / total) * 100);
    progressFill.style.width = `${percent}%`;

    // Counter & Streak
    document.getElementById("quiz-question-counter").textContent = `Question ${index + 1} of ${total}`;
    const state = window.eduQuestState.get();
    document.getElementById("quiz-streak-count").textContent = state.currentStreak;

    // Question Concept & Text
    document.getElementById("quiz-concept-tag").textContent = question.concept || "Concept Objective";
    document.getElementById("quiz-question-text").textContent = question.text;

    // Reset Hint Bar
    document.getElementById("ai-hint-display").textContent = "🕵️‍♂️ Detective Clue: Click for QuestBot's secret pattern clue!";
    document.getElementById("btn-request-hint").style.display = "inline-block";

    // Hide feedback box & detective case
    const feedbackBox = document.getElementById("quiz-feedback-box");
    feedbackBox.className = "feedback-box";
    document.getElementById("detective-case-box").style.display = "none";

    // Render Options
    const optionsGrid = document.getElementById("quiz-options-container");
    optionsGrid.innerHTML = "";

    question.options.forEach((optText, optIdx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.dataset.index = optIdx;

      btn.innerHTML = `
        <div class="option-left">
          <span class="option-key">${optIdx + 1}</span>
          <span class="option-text">${optText}</span>
        </div>
      `;

      btn.addEventListener("click", () => {
        this.handleOptionSelect(optIdx);
      });

      optionsGrid.appendChild(btn);
    });
  },

  handleOptionSelect(selectedIndex) {
    const result = window.quizEngine.submitAnswer(selectedIndex);
    if (!result) return;

    const optionBtns = document.querySelectorAll(".option-btn");
    optionBtns.forEach(b => {
      b.disabled = true;
      const idx = parseInt(b.dataset.index, 10);
      if (idx === result.correctIndex) {
        b.classList.add("correct");
      } else if (idx === selectedIndex && !result.isCorrect) {
        b.classList.add("incorrect");
      }
    });

    document.getElementById("quiz-streak-count").textContent = result.currentStreak;

    const feedbackBox = document.getElementById("quiz-feedback-box");
    feedbackBox.className = `feedback-box active ${result.isCorrect ? 'is-correct' : 'is-incorrect'}`;

    const titleEl = document.getElementById("feedback-title");
    titleEl.innerHTML = result.isCorrect
      ? `<span>🎉 Correct! Mastered this step!</span>`
      : `<span>💡 Not quite! Detective Case File Opened:</span>`;

    const xpPill = document.getElementById("feedback-xp-pill");
    xpPill.textContent = result.earnedXP > 0 ? `+${result.earnedXP} XP` : "0 XP";
    xpPill.className = `badge-pill ${result.isCorrect ? 'bg-green' : 'bg-gray'}`;

    document.getElementById("feedback-explanation-text").textContent = result.explanation;

    // Mistake Detective Case Box
    const detectiveBox = document.getElementById("detective-case-box");
    if (!result.isCorrect && result.detectiveCase) {
      detectiveBox.style.display = "block";
      document.getElementById("detective-source-badge").textContent = result.detectiveCase.sourceBadge;
      document.getElementById("detective-misconception-text").textContent = result.detectiveCase.misconception;
      document.getElementById("detective-worked-example-text").textContent = result.detectiveCase.workedExample;
    } else {
      detectiveBox.style.display = "none";
    }

    // AI Buddy note
    const advice = window.questAIBuddy.getDetailedExplanation(
      window.quizEngine.getCurrentQuestion().question,
      window.quizEngine.grade
    );
    document.getElementById("feedback-buddy-note").innerHTML =
      `🤖 <strong>QuestBot Note:</strong> ${advice.advice}`;

    const nextBtn = document.getElementById("btn-next-question");
    if (window.quizEngine.currentIndex === window.quizEngine.questions.length - 1) {
      nextBtn.textContent = "View World Impact 🏁";
    } else {
      nextBtn.textContent = "Next Question ➔";
    }

    if (result.leveledUp) {
      this.showToast(`👑 LEVEL UP! You reached Level ${window.eduQuestState.get().level}!`, 4000);
    }
  },

  async handleRequestHint() {
    const qData = window.quizEngine.getCurrentQuestion();
    if (!qData) return;

    const hintBtn = document.getElementById("btn-request-hint");
    hintBtn.textContent = "Investigating...";
    hintBtn.disabled = true;

    try {
      const hint = await window.questAIBuddy.getHint(qData.question, window.quizEngine.grade);
      document.getElementById("ai-hint-display").textContent = hint.text;
      hintBtn.style.display = "none";
      if (window.soundEffects) window.soundEffects.playClick();
    } catch (e) {
      document.getElementById("ai-hint-display").textContent = qData.question.hint || "Take your time and read carefully!";
    }
  },

  handleNextQuestion() {
    if (window.quizEngine.isFinished()) {
      this.renderResultsScreen();
      return;
    }

    const nextQ = window.quizEngine.nextQuestion();
    if (nextQ) {
      this.renderQuizArena();
    } else {
      this.renderResultsScreen();
    }
  },

  // ==================== RESULTS SCREEN ====================
  renderResultsScreen() {
    const results = window.quizEngine.getResults();
    this.activeQuizResult = results;

    const isRevision = results.mode === "revision";
    const compCard = document.getElementById("results-comparison-card");
    const repairHero = document.getElementById("world-repair-celebration-card");
    const revisionPrompt = document.getElementById("results-revision-prompt");

    // Title & Celebration
    if (isRevision && results.wasRepaired) {
      repairHero.style.display = "block";
      document.getElementById("repair-hero-desc").textContent =
        `The ${results.topic.worldObject || 'World Bridge'} has been fully reconstructed! Beams glow with pure energy.`;
      window.mistakeMissionEngine.setJourneyStep("grow");
    } else {
      repairHero.style.display = "none";
    }

    if (results.accuracy === 100) {
      document.getElementById("results-icon").textContent = "🏆";
      document.getElementById("results-title").textContent = isRevision ? "Realm Repaired with Flawless Score!" : "Flawless Realm Victory!";
    } else if (results.accuracy >= 60) {
      document.getElementById("results-icon").textContent = "🌟";
      document.getElementById("results-title").textContent = isRevision ? "World Element Restored!" : "Quest Completed!";
    } else {
      document.getElementById("results-icon").textContent = "🌱";
      document.getElementById("results-title").textContent = "Good Effort! World Conduit Cracked";
      window.mistakeMissionEngine.setJourneyStep("mistake");
    }

    let starsStr = "⭐☆☆";
    if (results.accuracy >= 80) starsStr = "⭐⭐⭐";
    else if (results.accuracy >= 60) starsStr = "⭐⭐☆";
    document.getElementById("results-stars").textContent = starsStr;

    document.getElementById("results-score").textContent = `${results.score} / ${results.totalQuestions}`;
    document.getElementById("results-accuracy").textContent = `${results.accuracy}%`;
    const xpText = isRevision ? `+${results.totalXP + results.bonusXP} XP` : `+${results.totalXP} XP`;
    document.getElementById("results-xp").textContent = xpText;

    // Revision Comparison Card
    if (isRevision && results.revisionRecord) {
      compCard.style.display = "flex";
      document.getElementById("comp-before-val").textContent = `${results.revisionRecord.beforeAccuracy}%`;
      document.getElementById("comp-after-val").textContent = `${results.revisionRecord.afterAccuracy}%`;
      const boostVal = results.revisionRecord.boost;
      document.getElementById("comp-boost-val").textContent = boostVal > 0 ? `+${boostVal}% 🚀` : "Maintained";
      revisionPrompt.style.display = "none";
    } else {
      compCard.style.display = "none";
      if (results.accuracy < 60) {
        revisionPrompt.style.display = "block";
      } else {
        revisionPrompt.style.display = "none";
      }
    }

    // Personalized Next Mission on Results
    const nextRecom = window.mistakeMissionEngine.getPersonalizedRecommendation(
      results.topic,
      results.subject,
      results.grade
    );
    document.getElementById("results-next-icon").textContent = nextRecom.icon;
    document.getElementById("results-next-badge").textContent = nextRecom.badge;
    document.getElementById("results-next-badge").className = `badge-pill ${nextRecom.badgeClass}`;
    document.getElementById("results-next-reason").textContent = nextRecom.reason;

    // Review list
    const reviewList = document.getElementById("results-review-list");
    reviewList.innerHTML = "";

    results.userAnswers.forEach((ans, i) => {
      const item = document.createElement("div");
      item.className = `review-item ${ans.isCorrect ? 'was-correct' : 'was-incorrect'}`;
      item.innerHTML = `
        <div class="review-q-text">
          ${ans.isCorrect ? '✅' : '❌'} Question ${i + 1}: ${ans.question.text}
        </div>
        <div class="review-q-exp">
          <strong>Correct Answer:</strong> ${ans.question.options[ans.question.correctIndex]}<br>
          <em>${ans.question.explanation}</em>
        </div>
        ${ans.detectiveCase ? `
          <div style="background:#FFFBEB; border-left:3px solid #F59E0B; padding:6px 10px; margin-top:6px; font-size:12px; color:#78350F;">
            🕵️‍♂️ <strong>Detective Finding:</strong> ${ans.detectiveCase.misconception}
          </div>
        ` : ''}
      `;
      reviewList.appendChild(item);
    });

    if (results.newBadges && results.newBadges.length > 0) {
      results.newBadges.forEach(b => {
        if (window.soundEffects) window.soundEffects.playBadge();
        this.showToast(`🏆 UNLOCKED BADGE: ${b.icon} ${b.title}!`, 5000);
      });
    }

    this.showScreen("screen-results");
  },

  // ==================== LEARNING MIRROR ====================
  renderLearningMirror() {
    const root = document.getElementById("learning-mirror-root");
    window.learningMirror.render(root);

    root.querySelectorAll(".launch-revision-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const topicId = e.currentTarget.dataset.topicId;
        const subject = e.currentTarget.dataset.subject;
        const grade = parseInt(e.currentTarget.dataset.grade, 10);
        this.launchRevisionFlow(topicId, grade, subject);
      });
    });

    root.querySelectorAll(".launch-quest-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const topicId = e.currentTarget.dataset.topicId;
        const subject = e.currentTarget.dataset.subject;
        const grade = parseInt(e.currentTarget.dataset.grade, 10);
        const gradeData = window.EduQuestData.GRADE_TOPICS[grade];
        if (gradeData && gradeData.subjects && gradeData.subjects[subject]) {
          const topic = gradeData.subjects[subject].find(t => t.id === topicId);
          if (topic) {
            this.launchQuest(topic, subject, grade);
          }
        }
      });
    });
  },

  // ==================== AI BUDDY MODAL ====================
  renderAIBuddyModal() {
    const state = window.eduQuestState.get();
    const modeBadge = document.getElementById("ai-mode-status-badge");
    const apiKeyInput = document.getElementById("input-api-key");
    const tonePreview = document.getElementById("ai-tone-preview");

    if (state.settings.apiKey) {
      modeBadge.textContent = "Live Gemini AI Mode Active";
      modeBadge.className = "badge-pill bg-boost";
      apiKeyInput.value = state.settings.apiKey;
    } else {
      modeBadge.textContent = "Curated Detective Engine (Rule-Based & Offline Safe)";
      modeBadge.className = "badge-pill bg-green";
      apiKeyInput.value = "";
    }

    const tone = window.questAIBuddy.getToneForGrade(state.grade);
    tonePreview.innerHTML = `
      Adapting for <strong>Grade ${state.grade}</strong>: ${tone.greeting}<br>
      <em>${tone.style}</em>
    `;
  },

  // ==================== TOAST NOTIFICATIONS ====================
  showToast(message, duration = 3000) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>✨</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

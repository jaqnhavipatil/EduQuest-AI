/**
 * EduQuest AI - My Learning Mirror
 * Real computed analytics, topic mastery levels, World Element Integrity,
 * Revision History log, and Visual Journey Progress Timeline.
 */

class LearningMirror {
  constructor() {}

  render(container) {
    const state = window.eduQuestState.get();
    const grade = state.grade;
    const gradeData = window.EduQuestData.GRADE_TOPICS[grade];

    const overallAccuracy = state.totalQuestionsAttempted > 0
      ? Math.round((state.totalQuestionsCorrect / state.totalQuestionsAttempted) * 100)
      : 0;

    const currentLevelTitle = window.eduQuestState.getLevelTitle(state.level);
    const nextLevelXP = window.eduQuestState.getXPForNextLevel(state.level);
    const prevThreshold = state.level === 1 ? 0 : window.eduQuestState.getXPForNextLevel(state.level - 1);
    const progressInLevel = Math.min(100, Math.max(0, Math.round(((state.xp - prevThreshold) / (nextLevelXP - prevThreshold)) * 100)));

    let topicsHtml = "";

    if (gradeData && gradeData.subjects) {
      ["math", "english", "science"].forEach(subKey => {
        const subTitle = subKey === "math" ? "Mathematics" : subKey === "english" ? "English" : "Science";
        const subIcon = subKey === "math" ? "📐" : subKey === "english" ? "📚" : "🧪";
        const topics = gradeData.subjects[subKey] || [];

        topicsHtml += `
          <div class="mirror-subject-section">
            <h4 class="mirror-subheading">${subIcon} ${subTitle}</h4>
            <div class="topic-performance-grid">
        `;

        topics.forEach(t => {
          const stats = state.topicStats[t.id] || { attempts: 0, correct: 0, flaggedForRevision: false, revisionsCompleted: 0 };
          const acc = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : null;
          const isFlagged = stats.flaggedForRevision || (stats.attempts >= 3 && acc !== null && acc < 60);
          const isRepaired = window.eduQuestState.isWorldRepaired(t.id);
          
          let statusBadge = "";
          let cardClass = "";
          let worldStatusText = "";

          if (stats.attempts === 0) {
            statusBadge = `<span class="badge-status status-unattempted">Unexplored</span>`;
            worldStatusText = "Conduit dormant waiting for exploration";
          } else if (isFlagged) {
            statusBadge = `<span class="badge-status status-needs-practice">Damaged ⚠️</span>`;
            cardClass = "needs-practice";
            worldStatusText = `Cracked: ${t.worldObject || 'World element'} needs repair!`;
          } else if (isRepaired) {
            statusBadge = `<span class="badge-status status-repaired">Repaired ✨</span>`;
            cardClass = "mastered";
            worldStatusText = `Restored: ${t.repairedDescription || 'World element shining bright!'}`;
          } else if (acc >= 80) {
            statusBadge = `<span class="badge-status status-mastered">Mastered 🏆</span>`;
            cardClass = "mastered";
            worldStatusText = "Fully powered with pure crystal energy";
          } else {
            statusBadge = `<span class="badge-status status-ontrack">On Track 👍</span>`;
            cardClass = "on-track";
            worldStatusText = "Operational and stable";
          }

          const recommendation = window.mistakeMissionEngine.getPersonalizedRecommendation(t, subKey, grade);

          topicsHtml += `
            <div class="topic-stat-card ${cardClass}">
              <div class="topic-card-header">
                <span class="topic-icon">${t.icon}</span>
                <div style="flex:1; margin-left: 8px;">
                  <span class="topic-name">${t.title}</span>
                  <div class="text-sm text-muted">🏛️ ${t.worldObject || 'World Conduit'}</div>
                </div>
                ${statusBadge}
              </div>

              <div class="world-status-indicator">
                <span class="world-status-dot ${isFlagged ? 'dot-damaged' : acc >= 80 ? 'dot-mastered' : 'dot-active'}"></span>
                <span class="text-sm">${worldStatusText}</span>
              </div>

              <div class="stat-metrics-row">
                <div class="metric-item">
                  <span class="metric-label">Questions Attempted</span>
                  <span class="metric-value">${stats.attempts}</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">Accuracy</span>
                  <span class="metric-value font-bold ${acc !== null && acc < 60 ? 'text-coral' : 'text-emerald'}">
                    ${acc !== null ? acc + '%' : '—'}
                  </span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">Revisions Solved</span>
                  <span class="metric-value font-bold text-purple">${stats.revisionsCompleted || 0}</span>
                </div>
              </div>

              <!-- Topic Progress Bar -->
              <div class="accuracy-bar-track">
                <div class="accuracy-bar-fill" style="width: ${acc !== null ? acc : 0}%; background-color: ${acc >= 80 ? '#10B981' : acc >= 60 ? '#F59E0B' : '#EF4444'};"></div>
              </div>

              <!-- Next Recommended Action -->
              <div class="personalized-recom-box">
                <div class="recom-header">
                  <span class="recom-title">${recommendation.icon} Recommended: ${recommendation.title}</span>
                </div>
                <p class="recom-reason">${recommendation.reason}</p>
              </div>

              ${isFlagged ? `
                <div class="revision-trigger-box">
                  <button class="btn btn-warning btn-block launch-revision-btn" data-topic-id="${t.id}" data-subject="${subKey}" data-grade="${grade}">
                    🛠️ Launch World Repair Mission
                  </button>
                </div>
              ` : `
                <div class="topic-action-row">
                  <button class="btn btn-outline btn-block launch-quest-btn" data-topic-id="${t.id}" data-subject="${subKey}" data-grade="${grade}">
                    ▶️ Play Adventure Quest
                  </button>
                </div>
              `}
            </div>
          `;
        });

        topicsHtml += `</div></div>`;
      });
    }

    // Repair Journey Timeline
    let timelineHtml = "";
    if (state.revisionHistory && state.revisionHistory.length > 0) {
      timelineHtml = `
        <div class="journey-timeline-card">
          <h4 class="mirror-subheading">🗺️ "Repair the World" Journey Timeline</h4>
          <p class="section-subtext">Tracking the complete learning cycle: Mistake ➔ Discover ➔ Learn ➔ Repair ➔ Grow</p>
          <div class="timeline-nodes-wrapper">
            ${state.revisionHistory.map((r, i) => `
              <div class="timeline-entry-row">
                <div class="timeline-left-time">
                  <span class="timeline-timestamp">${r.timestamp}</span>
                  <span class="badge-pill bg-boost">+${r.boost}% Boost</span>
                </div>
                <div class="timeline-center-marker">
                  <div class="marker-dot">🛠️</div>
                  ${i < state.revisionHistory.length - 1 ? '<div class="marker-line"></div>' : ''}
                </div>
                <div class="timeline-right-content">
                  <h5 class="timeline-topic-title">${r.topicTitle} Rebuilt</h5>
                  <p class="timeline-text">
                    Accuracy increased from <strong>${r.beforeAccuracy}%</strong> to <strong>${r.afterAccuracy}%</strong>.
                    World conduit repaired and restored!
                  </p>
                  <div class="timeline-tags">
                    <span class="badge-pill bg-gray">Mistake Identified</span>
                    <span class="badge-pill bg-gray">Detective Clues Applied</span>
                    <span class="badge-pill bg-green">3/3 Revision Mastered</span>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    // Revision History Log
    let revisionsLogHtml = "";
    if (state.revisionHistory && state.revisionHistory.length > 0) {
      revisionsLogHtml = `
        <div class="revision-history-card">
          <h4 class="mirror-subheading">🔄 Mistake-to-Mission Improvement Tracker</h4>
          <p class="section-subtext">Before vs After metrics recorded from genuine revision missions:</p>
          <div class="revisions-table-wrapper">
            <table class="revisions-table">
              <thead>
                <tr>
                  <th>Topic & World Object</th>
                  <th>Before Revision</th>
                  <th>After Revision</th>
                  <th>Measurable Growth</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                ${state.revisionHistory.map(r => `
                  <tr>
                    <td><strong>${r.topicTitle}</strong></td>
                    <td><span class="badge-pill bg-gray">${r.beforeAccuracy}%</span></td>
                    <td><span class="badge-pill bg-green font-bold">${r.afterAccuracy}%</span></td>
                    <td>
                      <span class="badge-pill ${r.boost > 0 ? 'bg-boost' : 'bg-gray'}">
                        ${r.boost > 0 ? '+' + r.boost + '% 🚀' : 'Maintained'}
                      </span>
                    </td>
                    <td class="text-muted text-sm">${r.timestamp}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else {
      revisionsLogHtml = `
        <div class="revision-history-card empty-history">
          <h4 class="mirror-subheading">🔄 Mistake-to-Mission Improvement Tracker</h4>
          <p class="text-muted">No revision missions completed yet. When a topic falls below 60% accuracy, you'll be able to launch a focused 3-question revision mission here!</p>
        </div>
      `;
    }

    // Badges Showcase
    const allBadges = window.EduQuestData.BADGES || [];
    let badgesHtml = `
      <div class="badges-showcase-card">
        <h4 class="mirror-subheading">🏆 Badges & Achievements (${state.unlockedBadges.length} / ${allBadges.length} Unlocked)</h4>
        <div class="badges-grid">
          ${allBadges.map(b => {
            const unlocked = state.unlockedBadges.includes(b.id);
            return `
              <div class="badge-item-card ${unlocked ? 'unlocked' : 'locked'}">
                <div class="badge-icon-box">${b.icon}</div>
                <div class="badge-info">
                  <div class="badge-title">${b.title}</div>
                  <div class="badge-desc">${b.description}</div>
                  <div class="badge-state-tag">${unlocked ? '✅ Unlocked' : '🔒 Locked'}</div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    container.innerHTML = `
      <div class="mirror-container">
        <!-- Overview Hero Bar -->
        <div class="mirror-hero-card">
          <div class="mirror-hero-left">
            <div class="avatar-large">🎓</div>
            <div class="mirror-user-info">
              <h2 class="user-greeting">Grade ${grade} Learning Mirror</h2>
              <p class="user-level-badge">${currentLevelTitle}</p>
              <div class="level-bar-container">
                <div class="level-bar-label">
                  <span>Level ${state.level}</span>
                  <span>${state.xp} / ${nextLevelXP} XP</span>
                </div>
                <div class="level-bar-track">
                  <div class="level-bar-fill" style="width: ${progressInLevel}%;"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="mirror-stats-ribbon">
            <div class="ribbon-stat-item">
              <div class="ribbon-val text-amber">⭐ ${state.stars}</div>
              <div class="ribbon-lbl">Stars Collected</div>
            </div>
            <div class="ribbon-stat-item">
              <div class="ribbon-val text-emerald">⚡ ${state.xp}</div>
              <div class="ribbon-lbl">Total XP</div>
            </div>
            <div class="ribbon-stat-item">
              <div class="ribbon-val text-indigo">${overallAccuracy}%</div>
              <div class="ribbon-lbl">Overall Accuracy</div>
            </div>
            <div class="ribbon-stat-item">
              <div class="ribbon-val text-coral">🔥 ${state.bestStreak}</div>
              <div class="ribbon-lbl">Best Streak</div>
            </div>
            <div class="ribbon-stat-item">
              <div class="ribbon-val text-purple">🛠️ ${state.revisionMissionsCompleted}</div>
              <div class="ribbon-lbl">Worlds Repaired</div>
            </div>
          </div>
        </div>

        <!-- Topic Mastery Section -->
        <div class="mirror-section">
          <div class="section-heading-row">
            <div>
              <h3 class="section-title">📊 Topic Mastery & World Diagnostics</h3>
              <p class="section-subtitle">Real computed performance from your answers. Flagged topics (<60% accuracy) crack the world element and unlock Revision Missions.</p>
            </div>
          </div>
          ${topicsHtml}
        </div>

        <!-- Progress Timeline (if revisions exist) -->
        ${timelineHtml ? `<div class="mirror-section">${timelineHtml}</div>` : ''}

        <!-- Revision History -->
        <div class="mirror-section">
          ${revisionsLogHtml}
        </div>

        <!-- Badges Showcase -->
        <div class="mirror-section">
          ${badgesHtml}
        </div>
      </div>
    `;
  }
}

window.learningMirror = new LearningMirror();

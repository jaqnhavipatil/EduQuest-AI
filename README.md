# EduQuest AI 🚀
> *"Every child learns differently. EduQuest makes learning a game."*  
> **Core Innovation:** *"Your mistakes don't end the game. They change the world and open a new mission."*

EduQuest AI transforms education into an **interactive living adventure game** for school students from **Grade 1 to Grade 10**. Rather than a static quiz dashboard, EduQuest features an illustrated realm of floating islands, connected energy conduits, and repairable world objects (ancient bridges, celestial clockwork towers, kinetic energy conduits, and bio-domes).

When a learner struggles with a concept, the world physically reacts: bridges crack, beacons darken, and the path ahead becomes blocked. **QuestBot** equips its **Mistake Detective** magnifying glass to uncover the misconception, provides a mini worked example, and unlocks a targeted **World Repair Mission**. Upon mastering the 3-question revision, the world element animates back to life with glowing light beams!

---

## 🗺️ 1. The Living Adventure World

- **Illustrated Realm Canvas:** A dynamic world featuring thematic realms:
  - 🔷 **The Realm of Number Crystals** (Mathematics)
  - 📜 **The Archipelago of Language Towers** (English)
  - ⚡ **The Biosphere of Elemental Forces** (Science)
- **Interactive Floating Islands:** Interactive nodes that gently bob on the canvas, connected by dynamic SVG energy conduits that pulse with light.
- **Physical World State Transformations:**
  - `ACTIVE / HEALTHY`: Glowing cyan/emerald beacon, calm floating elevation.
  - `CRACKED / DAMAGED (Mistake Detected)`: Red fissures, fractured bridge graphic, floating warning particles, and glowing "REPAIR NEEDED" alert.
  - `RESTORED (Post-Revision)`: Radiant golden restoration aura, sparkling crystal animations.
  - `MASTERED`: Crystal shrine with spinning golden stars.

---

## 💥 2. Mistakes That Change the World

Traditional software treats a wrong answer as a failure mark. In EduQuest AI:

```
[ Quiz Attempt ] 
       ↓ 
[ Real Threshold Triggered: ≥ 3 attempts, < 60% accuracy ]
       ↓
[ World Element Breaks: Bridge collapses / Beacon darkens ]
       ↓
[ QuestBot Mistake Detective Briefing (Misconception + Mini Worked Example) ]
       ↓
[ 3-Question World Repair Mission ]
       ↓
[ World Element Restores with Golden Light Beams + Fanfare ]
       ↓
[ Before vs After Growth Recorded: e.g. 33% → 100% (+67% Boost!) ]
```

---

## 🕵️‍♂️ 3. QuestBot Mistake Detective

After any incorrect answer, QuestBot opens a dedicated **Case File**:
1. **Misconception Analysis:** Pinpoints the common trap (e.g., *"Trap: Adding denominators 5 + 5 instead of keeping the common denominator fifths"*).
2. **Mini Worked Example 💡:** A concise step-by-step model showing how to solve the problem before moving forward.
3. **Age-Appropriate Language:**
   - *Grade 3:* Playful analogies, emojis, and visual clues.
   - *Grade 5:* Structured clues and guided logic.
   - *Grade 8:* Analytical cognitive breakdowns and mathematical definitions.
4. **Honest Labeling:** Clearly marked as **"Curated Detective Engine (Rule-Based & Offline Safe)"** by default, with an optional Google Gemini API key configuration in settings.

---

## 🎯 4. Personalized Next Mission Recommendation

EduQuest AI continuously evaluates actual topic accuracy to dynamically personalize the learner's next step:

| Accuracy Tier | Recommended Mission | Pedagogical Explanation |
| :--- | :--- | :--- |
| **Below 60%** ($\ge 3$ attempts) | **World Repair Quest 🛠️** | *"Current accuracy is {acc}%. The {worldObject} has collapsed from misconceptions. Guided revision is recommended to rebuild the bridge!"* |
| **60% to 79%** | **Reinforcement Expedition ⚡** | *"Current accuracy is {acc}%. Good working grasp! A short reinforcement mission will lock in rock-solid consistency."* |
| **80% or Higher** | **Mastery Trailblazer 👑** | *"Superb accuracy of {acc}%! You have conquered the core concepts. Take the mastery challenge to set a new record!"* |
| **Unexplored** (0 attempts) | **Beginner Expedition 🧭** | *"You haven't visited this realm yet. Begin your first exploratory quest!"* |

---

## ⚡ 5. "Repair the World" Journey & Non-Destructive Judge Demo

### "Repair the World" Visual Journey Tracker
A prominent 5-step visual breadcrumb bar on the Adventure World screen:
```
[ 1. Mistake 💥 ] ➔ [ 2. Discover 🔍 ] ➔ [ 3. Learn 💡 ] ➔ [ 4. Repair 🛠️ ] ➔ [ 5. Grow 🚀 ]
```
Tracks and highlights the student's exact stage in real time.

### 60-Second Demo for Judges & Hackathon Evaluators
- A dedicated **"⚡ Try Sample Journey"** button in the header and map.
- Automatically loads a safe sandbox session in **Grade 5 Fractions**:
  - The *Bridge of Common Denominators* is visibly cracked and smoking red on the map.
  - The judge inspects the damage, opens the Detective Case Briefing, and solves 3 quick questions.
  - The animated **World Element Restored** event fires: the bridge rebuilds with golden light beams and fanfare sound effects!
  - The comparison card logs Before (33%) ➔ After (100%) (**+67% Boost! 🚀**).
  - Clicking **"Exit Demo & Restore Profile"** immediately restores the original student profile with **zero data corruption**.

---

## 📁 Project Architecture & Clean Code Organization

```
new edugames/
├── index.html                   # Living Adventure World shell, SVG canvas, screens & modals
├── run_app.ps1                  # One-click lightweight local HTTP server (PowerShell)
├── README.md                    # Complete documentation & verified test logs
├── css/
│   └── styles.css               # Design system, SVG conduits, island floating keyframes, responsive layouts
├── js/
│   ├── app.js                   # Application coordinator, SVG canvas wiring, screen routing
│   ├── audio.js                 # Web Audio API sound synthesizer (zero external assets)
│   ├── state.js                 # Central state manager, localStorage sync, and Judge Demo sandbox
│   ├── quizEngine.js            # Standard quests, repair missions, and streak multipliers
│   ├── mistakeMission.js        # World repair engine, personalized mission recommendation rules
│   ├── aiBuddy.js               # QuestBot Mistake Detective with worked examples & grade adaptation
│   ├── learningMirror.js        # Computed diagnostic dashboard, world status indicators, and timeline
│   └── data/
│       ├── questionBank.js      # 72 verified questions with world objects, traps, and worked examples
│       └── badges.js            # 11 achievement badge rules
└── tests/
    ├── verify_data.ps1          # 38-test automated syntax, world building & integrity suite
    └── e2e_simulation.html      # Headless browser simulation of complete world repair cycle
```

---

## 🚀 How to Run the Application

EduQuest AI requires **no compilation, no node_modules, and no paid API keys**.

### Option A: Direct Browser Launch
Open [index.html](file:///c:/Users/aksha/OneDrive/Desktop/new%20edugames/index.html) directly in any browser:
```
file:///c:/Users/aksha/OneDrive/Desktop/new edugames/index.html
```

### Option B: Local PowerShell Web Server
In PowerShell, run:
```powershell
.\run_app.ps1
```
This serves the application at `http://localhost:8080/` and opens your default browser.

---

## 🧪 Actual Test Verification & QA Results

### 1. Structure & World Metadata Test Suite (`tests/verify_data.ps1`)
Run via PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File .\tests\verify_data.ps1
```
**Results:**
```
==========================================
   EduQuest AI - Automated Test Suite    
==========================================
1. Verifying File Existence...
  [PASS] All 11 files verified
2. Verifying index.html Semantic Markup...
  [PASS] '⚡ Try Sample Journey' Judge Demo button verified
  [PASS] Judge Demo Sandbox banner verified
  [PASS] 'Repair the World' Journey Progress Bar verified
  [PASS] Living Adventure World Canvas verified
  [PASS] SVG Energy Conduits / Bridges verified
  [PASS] Realm Inspection & Next Mission Panel verified
  [PASS] Mistake Detective Case Box & Worked Example Box verified
  [PASS] World Element Restored Celebration Hero verified
3. Verifying Question Bank Integrity & World Metadata...
  [PASS] World objects, island names, and damage descriptions verified
  [PASS] Misconception detective analyses and mini worked examples verified
  [PASS] 45 standard questions + 27 revision questions verified (72 total)
4. Verifying Mistake Detective & Personalization Logic...
  [PASS] QuestBot implements getDetectiveCase()
  [PASS] Personalized recommendations verified (<60% Repair, 60-79% Reinforce, >=80% Mastery)
5. Verifying Non-Destructive Judge Demo Sandbox...
  [PASS] startJudgeDemoSession() and exitJudgeDemoSession() verified
  [PASS] Safe real-profile backup key verified

TEST RESULTS: 38 / 38 PASSED (100%)
```

### 2. Full Upgraded Headless Browser Simulation (`tests/e2e_simulation.html`)
Executed inside live headless Chrome (`chrome.exe --headless=new --dump-dom`):
- **User Journey Simulated:**
  1. Selected Grade 5 Mathematics (*Fraction Archipelago*).
  2. Answered question incorrectly to trigger **QuestBot Mistake Detective**; verified misconception analysis and worked example generated.
  3. Finished initial quiz with score 2/5 (40% accuracy).
  4. Verified world element cracked (`flaggedForRevision === true`).
  5. Verified Personalized Next Mission dynamically updated to **"World Repair Quest 🛠️"**.
  6. Launched World Repair Mission and completed 3 revision questions with 100% accuracy.
  7. Verified `wasRepaired === true`, accuracy boost **+60%**, and state marked as **REPAIRED & RESTORED**.
  8. Verified Next Mission upgraded post-repair to **Reinforcement / Mastery**.
  9. Activated **Judge Demo Mode**: verified sandbox struggle state loaded, and exiting safely restored the real student profile without loss of XP.
- **Output:** `=== ALL UPGRADED E2E ADVENTURE SIMULATION TESTS COMPLETED SUCCESSFULLY ===` with 0 failures.

---

## 🛡️ Child Safety & Privacy
- **Zero Personal Data Stored:** No student names, emails, passwords, or location data collected.
- **100% Offline Capable:** Runs entirely client-side with browser `localStorage`.
- **Constructive Framing:** Mistakes are never presented as failures, but as physical world events that awaken the Mistake Detective and initiate repair missions.

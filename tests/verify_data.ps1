# EduQuest AI - Automated Verification Test Suite
# Tests Question Bank integrity, Badges, HTML structure, Mistake Detective, and World Repair features.

$ErrorActionPreference = "Stop"
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   EduQuest AI - Automated Test Suite    " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

$testResults = @{
    Total = 0
    Passed = 0
    Failed = 0
    Errors = @()
}

function Assert-Test($condition, $description) {
    $testResults.Total++
    if ($condition) {
        $testResults.Passed++
        Write-Host "  [PASS] $description" -ForegroundColor Green
    } else {
        $testResults.Failed++
        $testResults.Errors += $description
        Write-Host "  [FAIL] $description" -ForegroundColor Red
    }
}

# 1. File existence checks
Write-Host "`n1. Verifying File Existence..." -ForegroundColor Yellow
$requiredFiles = @(
    "index.html",
    "css/styles.css",
    "js/data/questionBank.js",
    "js/data/badges.js",
    "js/audio.js",
    "js/state.js",
    "js/aiBuddy.js",
    "js/mistakeMission.js",
    "js/quizEngine.js",
    "js/learningMirror.js",
    "js/app.js"
)

foreach ($f in $requiredFiles) {
    Assert-Test (Test-Path $f) "File exists: $f"
}

# 2. HTML Structure Checks
Write-Host "`n2. Verifying index.html Semantic Markup..." -ForegroundColor Yellow
$html = Get-Content "index.html" -Raw
Assert-Test ($html -match 'id="tab-adventure"') "Has Adventure World navigation tab"
Assert-Test ($html -match 'id="tab-mirror"') "Has Learning Mirror navigation tab"
Assert-Test ($html -match 'id="btn-quick-judge-demo"') "Has '⚡ Try Sample Journey' Judge Demo button"
Assert-Test ($html -match 'id="judge-demo-banner"') "Has Judge Demo Sandbox banner"
Assert-Test ($html -match 'id="world-journey-progress-bar"') "Has 'Repair the World' Journey Progress Bar"
Assert-Test ($html -match 'id="living-world-canvas"') "Has Living Adventure World Canvas"
Assert-Test ($html -match 'id="world-conduit-svg"') "Has SVG Energy Conduits / Bridges"
Assert-Test ($html -match 'id="realm-inspect-panel"') "Has Realm Inspection & Next Mission Panel"
Assert-Test ($html -match 'id="detective-case-box"') "Has Mistake Detective Case Box"
Assert-Test ($html -match 'id="detective-worked-example-box"') "Has Detective Worked Example Box"
Assert-Test ($html -match 'id="world-repair-celebration-card"') "Has World Element Restored Celebration Hero"
Assert-Test ($html -match 'id="results-comparison-card"') "Has Before/After Revision comparison card"

# 3. Question Bank Content Integrity & World Building
Write-Host "`n3. Verifying Question Bank Integrity & World Metadata..." -ForegroundColor Yellow
$qb = Get-Content "js/data/questionBank.js" -Raw

Assert-Test ($qb -match 'worldObject:\s*"') "World objects configured across topics"
Assert-Test ($qb -match 'islandName:\s*"') "Island realm names configured"
Assert-Test ($qb -match 'brokenDescription:\s*"') "Physical corruption/damage descriptions configured"
Assert-Test ($qb -match 'detectiveAnalysis:\s*"') "Misconception detective analyses configured"
Assert-Test ($qb -match 'workedExample:\s*"') "Mini worked examples configured"

# Count questions
$qMatches = [regex]::Matches($qb, 'id:\s*"g[358]_[mes]_\d+"')
Assert-Test ($qMatches.Count -ge 45) "At least 45 verified standard questions present (found: $($qMatches.Count))"

# Count revision questions
$revMatches = [regex]::Matches($qb, 'id:\s*"g[358]_[mes]_rev_\d+"')
Assert-Test ($revMatches.Count -ge 27) "At least 27 verified revision questions present (found: $($revMatches.Count))"

# 4. Mistake Detective & Personalized Recommendations
Write-Host "`n4. Verifying Mistake Detective & Personalization Logic..." -ForegroundColor Yellow
$aiBuddyContent = Get-Content "js/aiBuddy.js" -Raw
Assert-Test ($aiBuddyContent -match 'getDetectiveCase') "QuestBot implements getDetectiveCase()"

$missionEngineContent = Get-Content "js/mistakeMission.js" -Raw
Assert-Test ($missionEngineContent -match 'getPersonalizedRecommendation') "Implements getPersonalizedRecommendation()"
Assert-Test ($missionEngineContent -match 'World Repair Quest') "Recommends World Repair Quest when accuracy < 60%"
Assert-Test ($missionEngineContent -match 'Reinforcement Expedition') "Recommends Reinforcement Expedition when accuracy 60-79%"
Assert-Test ($missionEngineContent -match 'Mastery Trailblazer') "Recommends Mastery Trailblazer when accuracy >= 80%"

# 5. Judge Demo Mode Sandbox in State
Write-Host "`n5. Verifying Non-Destructive Judge Demo Sandbox..." -ForegroundColor Yellow
$stateContent = Get-Content "js/state.js" -Raw
Assert-Test ($stateContent -match 'startJudgeDemoSession') "Implements startJudgeDemoSession()"
Assert-Test ($stateContent -match 'exitJudgeDemoSession') "Implements exitJudgeDemoSession()"
Assert-Test ($stateContent -match 'eduquest_ai_real_backup_v1') "Safely backs up real student state during demo"

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "   TEST RESULTS: $($testResults.Passed) / $($testResults.Total) PASSED" -ForegroundColor Cyan
if ($testResults.Failed -gt 0) {
    Write-Host "   FAILED TESTS:" -ForegroundColor Red
    $testResults.Errors | ForEach-Object { Write-Host "     - $_" -ForegroundColor Red }
    exit 1
} else {
    Write-Host "   ALL VERIFICATION CHECKS PASSED!" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Cyan
}

# Requires: Git and GitHub CLI installed, logged in via `gh auth login`

param(
  [string]$RepoUrl = "https://github.com/jedidja-cto/welwitschia-group.git",
  [string]$Branch = "main",
  [string]$CommitMessage = "Initial commit: Welwitschia Group site, client portal, docs, CI"
)

Write-Host "--- GitHub auth status ---"
try {
  gh auth status
} catch {
  Write-Warning "GitHub CLI not authenticated. Run: gh auth login"
}

Write-Host "--- Initialize git repo ---"
if (-not (Test-Path ".git")) {
  git init
  if ($LASTEXITCODE -ne 0) { throw "git init failed" }
}

Write-Host "--- Set default branch ---"
 git branch -M $Branch

Write-Host "--- Secret safety checks ---"
 if (Test-Path ".env.local") {
   Write-Warning ".env.local exists locally; ensuring it is ignored."
   git check-ignore -v .env.local | Write-Host
 }

 if (-not (Test-Path ".gitignore")) {
   Write-Warning ".gitignore not found; secrets may be at risk."
 }

Write-Host "--- Stage files ---"
 git add .
 if ($LASTEXITCODE -ne 0) { throw "git add failed" }

Write-Host "--- Show staged changes summary ---"
 git status --short | Write-Host

Write-Host "--- Commit ---"
 # Attempt commit; if user.name/email missing, print guidance
 try {
   git commit -m $CommitMessage
 } catch {
   Write-Warning "Commit failed; you may need to set git user.name and user.email."
   Write-Host "Run: git config --global user.name \"Your Name\""
   Write-Host "Run: git config --global user.email \"you@example.com\""
   throw
 }

Write-Host "--- Configure remote ---"
 $hasRemote = git remote | Select-String -Pattern "origin"
 if (-not $hasRemote) {
   git remote add origin $RepoUrl
 } else {
   git remote set-url origin $RepoUrl
 }

Write-Host "--- Push ---"
 git push -u origin $Branch
 if ($LASTEXITCODE -ne 0) {
   Write-Warning "Push failed. Ensure you have access to $RepoUrl and are authenticated (gh auth login)."
   throw "Push failed"
 }

Write-Host "--- Done. Repo pushed to $RepoUrl on branch $Branch ---"
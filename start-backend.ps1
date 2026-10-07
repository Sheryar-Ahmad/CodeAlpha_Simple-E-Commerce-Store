param(
  [switch]$UseMongo,
  [switch]$Memory
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ServerRoot = Join-Path $ProjectRoot "server"
$EnvPath = Join-Path $ServerRoot ".env"
$EnvExamplePath = Join-Path $ServerRoot ".env.example"

if (-not (Test-Path -LiteralPath $ServerRoot)) {
  throw "The server folder was not found: $ServerRoot"
}

Push-Location $ServerRoot

try {
  if (-not (Test-Path -LiteralPath $EnvPath)) {
    Copy-Item -LiteralPath $EnvExamplePath -Destination $EnvPath
    Write-Host "Created server/.env from server/.env.example"
  }

  if (-not (Test-Path -LiteralPath "node_modules")) {
    Write-Host "Installing backend dependencies..."
    npm install
  }

  Write-Host ""
  # MongoDB is normal startup; memory mode is only for temporary demos.
  if (-not $Memory) {
    $env:USE_MEMORY_DB = "false"
    Write-Host "Starting Simple Store API with MongoDB..."
    Write-Host "If this fails with MongoDB connection failed, start MongoDB or update server/.env MONGODB_URI."
    npm run dev
  } else {
    Write-Host "Starting Simple Store API in memory mode..."
    Write-Host "This mode runs immediately without MongoDB. Data resets when the server stops."
    npm run dev:memory
  }
} finally {
  Pop-Location
}

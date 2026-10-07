param(
  [int]$Port = 5501
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Push-Location $ProjectRoot

try {
  Write-Host "Starting Simple Store frontend..."
  Write-Host "Open: http://localhost:$Port/index.html"
  py -m http.server $Port
} finally {
  Pop-Location
}

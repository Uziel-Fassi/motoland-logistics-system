#!/usr/bin/env powershell
# Motoland Quick Start - Build, Deploy & Run

$ErrorActionPreference = "Stop"
$workspaceFolder = if ($PSScriptRoot) { $PSScriptRoot } elseif ($MyInvocation.MyCommand.Path) { Split-Path -Parent $MyInvocation.MyCommand.Path } else { (Get-Location).Path }

Write-Host "Starting Motoland..." -ForegroundColor Cyan
Write-Host ""

# Verificar TOMCAT_HOME
if ([string]::IsNullOrWhiteSpace($env:TOMCAT_HOME)) {
    Write-Host "TOMCAT_HOME not set. Please configure it first:" -ForegroundColor Yellow
    Write-Host " › set TOMCAT_HOME=""C:\Users\HP\Desktop\tomcat\apache-tomcat-9.0.109-windows-x64\apache-tomcat-9.0.109""" -ForegroundColor Gray
    exit 1
}

# Step 1: Build
Write-Host "Building project..." -ForegroundColor Yellow
.\mvnw.cmd clean package -DskipTests -q
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Build completed" -ForegroundColor Green
Write-Host ""

# Step 2: Deploy
Write-Host "Deploying to Tomcat..." -ForegroundColor Yellow
$warFile = Join-Path $workspaceFolder "target\motoland.war"
$tomcatWebapps = Join-Path $env:TOMCAT_HOME "webapps"

# Remove old legacy deployment to avoid opening the wrong (Spanish) app context.
$legacyName = "miloginwebcontodo-1.0-SNAPSHOT"
$legacyDir = Join-Path $tomcatWebapps $legacyName
$legacyWar = Join-Path $tomcatWebapps ($legacyName + ".war")
if (Test-Path $legacyDir) {
    Remove-Item $legacyDir -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Removed legacy app folder: $legacyName" -ForegroundColor DarkGray
}
if (Test-Path $legacyWar) {
    Remove-Item $legacyWar -Force -ErrorAction SilentlyContinue
    Write-Host "Removed legacy app WAR: $legacyName.war" -ForegroundColor DarkGray
}

if (!(Test-Path $warFile)) {
    Write-Host "WAR file not found: $warFile" -ForegroundColor Red
    exit 1
}

Copy-Item $warFile $tomcatWebapps -Force -ErrorAction Stop
Write-Host "WAR deployed" -ForegroundColor Green
Write-Host ""

# Step 3: Start Tomcat
Write-Host "Starting Tomcat..." -ForegroundColor Yellow
$startupScript = Join-Path $env:TOMCAT_HOME "bin\startup.bat"

if (!(Test-Path $startupScript)) {
    Write-Host "Tomcat startup script not found" -ForegroundColor Red
    exit 1
}

& $startupScript

# wait until app is reachable (avoid 404 justo al inicio)
$appUrl = "http://localhost:8080/motoland/index.html"
$ready = $false
for ($i = 0; $i -lt 30; $i++) {
    try {
        $resp = Invoke-WebRequest -Uri $appUrl -UseBasicParsing -TimeoutSec 3
        if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 400) {
            $ready = $true
            break
        }
    } catch {
        Start-Sleep -Seconds 1
    }
}

Write-Host ""
if ($ready) {
    Write-Host "Motoland is ready!" -ForegroundColor Green
    Write-Host "Opening: $appUrl" -ForegroundColor Cyan
    Write-Host ""
    Start-Process $appUrl
} else {
    Write-Host "Tomcat inicio, pero la app aun no responde." -ForegroundColor Yellow
    Write-Host "Intenta manualmente en 10-20s: $appUrl" -ForegroundColor Yellow
}

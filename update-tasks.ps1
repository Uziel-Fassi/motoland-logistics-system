#!/usr/bin/env powershell

$tasksFile = ".\.vscode\tasks.json"

# Leer el contenido actual
$content = Get-Content $tasksFile -Raw

# Reemplazar referencias al WAR antiguo
$content = $content -replace 'miloginwebcontodo-1.0-SNAPSHOT\.war', 'motoland.war'

# Actualizar labels de tareas
$content = $content -replace '"Motoland: Build WAR"', '"🏗️ build: motoland"'
$content = $content -replace '"Motoland: Deploy WAR to Tomcat"', '"📦 deploy: motoland"'
$content = $content -replace '"Motoland: Start Tomcat"', '"▶️ start: tomcat"'
$content = $content -replace '"Motoland: Stop Tomcat"', '"⏹️ stop: tomcat"'
$content = $content -replace '"Motoland: Build \+ Deploy \+ Start"', '"🚀 START MOTOLAND"'

# Guardar
Set-Content $tasksFile -Value $content -Encoding UTF8

Write-Host "✅ tasks.json updated successfully!" -ForegroundColor Green
Write-Host "URLs will now use: http://localhost:8080/motoland" -ForegroundColor Cyan

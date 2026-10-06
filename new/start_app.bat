@echo off
title SRM US Live - University Student App Prototype
color 0C

echo ================================================================
echo       SRM US LIVE - UNIVERSITY STUDENT APPLICATION (V1)
echo ================================================================
echo.
echo [1/3] Checking environment & building backend...

if not exist "backend\bin" mkdir backend\bin

javac -d backend/bin backend/src/*.java backend/src/models/*.java 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [2/3] Backend compiled successfully with Java!
    echo [3/3] Starting server at http://localhost:8080 ...
    echo.
    start http://localhost:8080/
    java -cp backend/bin Server
) else (
    echo [INFO] Java compiler not available or failed. Starting via PowerShell server...
    start http://localhost:8080/
    powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
)

pause

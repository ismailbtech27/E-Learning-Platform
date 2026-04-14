@echo off
title Online Learning Platform Launcher

echo ===================================================
echo Starting Online Learning Platform...
echo ===================================================
echo.

:: Start the backend
echo [1/2] Starting Backend Server (Spring Boot)...
cd /d "%~dp0backend"
:: Use the provided maven distribution
set M2_HOME=%~dp0backend\apache-maven-3.9.6
set PATH=%M2_HOME%\bin;%PATH%
start "Backend Server - DO NOT CLOSE" cmd /c "echo Starting Backend... && mvn spring-boot:run || pause"

:: Give backend a moment to initiate
timeout /t 3 /nobreak > NUL

:: Start the frontend
echo [2/2] Starting Frontend Server (Vite/React)...
cd /d "%~dp0Online learning platform"
start "Frontend Server - DO NOT CLOSE" cmd /c "echo Checking frontend packages... && npm install && echo Starting Frontend... && npm run dev || pause"

echo.
echo Waiting for servers to start...
timeout /t 5 /nobreak > NUL

start chrome --app=http://localhost:5173 || start msedge --app=http://localhost:5173 || start http://localhost:5173

echo.
echo ===================================================
echo DONE. Both servers have been launched in separate windows.
echo Keep the new black windows open to keep the servers running.
echo You can close this window now.
echo ===================================================
pause

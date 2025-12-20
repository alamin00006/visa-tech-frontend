@echo off
echo Building Apollo Visa Tech...
echo.

cd /d "%~dp0"

echo Running Vite build...
node node_modules\vite\bin\vite.js build

echo.
echo Build complete! Check the dist folder.
pause

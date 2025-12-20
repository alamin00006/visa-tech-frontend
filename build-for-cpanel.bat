@echo off
echo ========================================
echo Apollo Visa Tech - Build for cPanel
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/3] Building production files...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)
echo.

echo [3/3] Creating deployment package...
if exist "apollo-visa-tech-deploy.zip" del "apollo-visa-tech-deploy.zip"

echo Creating ZIP file for cPanel upload...
powershell -command "Compress-Archive -Path 'dist\*', '.htaccess' -DestinationPath 'apollo-visa-tech-deploy.zip' -Force"

if exist "apollo-visa-tech-deploy.zip" (
    echo.
    echo ========================================
    echo BUILD SUCCESSFUL!
    echo ========================================
    echo.
    echo Deployment package created: apollo-visa-tech-deploy.zip
    echo.
    echo NEXT STEPS:
    echo 1. Login to your cPanel account
    echo 2. Go to File Manager
    echo 3. Navigate to public_html
    echo 4. Upload apollo-visa-tech-deploy.zip
    echo 5. Extract the ZIP file
    echo 6. Visit your domain to test
    echo.
    echo For detailed instructions, see CPANEL_DEPLOYMENT_GUIDE.md
    echo ========================================
) else (
    echo ERROR: Failed to create deployment package
)

echo.
pause

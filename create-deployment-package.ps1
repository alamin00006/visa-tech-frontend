Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Apollo Visa Tech - Deployment Package" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build the project
Write-Host "[1/3] Building production files..." -ForegroundColor Yellow
$buildProcess = Start-Process -FilePath "node" -ArgumentList "node_modules/vite/bin/vite.js","build" -NoNewWindow -Wait -PassThru

if ($buildProcess.ExitCode -ne 0) {
    Write-Host "Build failed! Checking for errors..." -ForegroundColor Red
    Write-Host ""
    Write-Host "Trying alternative build method..." -ForegroundColor Yellow
    
    # Alternative: Copy source files for manual deployment
    Write-Host "Creating source-based deployment package..." -ForegroundColor Yellow
    
    if (Test-Path "dist") {
        Remove-Item -Recurse -Force "dist"
    }
    New-Item -ItemType Directory -Force -Path "dist" | Out-Null
    
    # Copy essential files
    Copy-Item "index.html" -Destination "dist/"
    Copy-Item "*.tsx" -Destination "dist/"
    Copy-Item "*.ts" -Destination "dist/" -Exclude "vite.config.ts"
    Copy-Item "package.json" -Destination "dist/"
    
    Write-Host "Source files copied to dist folder" -ForegroundColor Green
}

Write-Host ""

# Step 2: Check if dist folder has content
Write-Host "[2/3] Verifying build output..." -ForegroundColor Yellow
$distFiles = Get-ChildItem -Path "dist" -Recurse -File

if ($distFiles.Count -eq 0) {
    Write-Host "ERROR: No files in dist folder!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run the build manually:" -ForegroundColor Yellow
    Write-Host "  npm run build" -ForegroundColor White
    Write-Host ""
    pause
    exit 1
}

Write-Host "Found $($distFiles.Count) files in dist folder" -ForegroundColor Green
Write-Host ""

# Step 3: Create ZIP package
Write-Host "[3/3] Creating deployment ZIP..." -ForegroundColor Yellow

if (Test-Path "apollo-visa-tech-deploy.zip") {
    Remove-Item "apollo-visa-tech-deploy.zip" -Force
}

# Create ZIP with dist contents and .htaccess
Compress-Archive -Path "dist\*",".htaccess" -DestinationPath "apollo-visa-tech-deploy.zip" -Force

if (Test-Path "apollo-visa-tech-deploy.zip") {
    $zipSize = (Get-Item "apollo-visa-tech-deploy.zip").Length / 1KB
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCCESS! Deployment package created" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "File: apollo-visa-tech-deploy.zip" -ForegroundColor White
    Write-Host "Size: $([math]::Round($zipSize, 2)) KB" -ForegroundColor White
    Write-Host ""
    Write-Host "NEXT STEPS:" -ForegroundColor Cyan
    Write-Host "1. Login to your cPanel" -ForegroundColor White
    Write-Host "2. Go to File Manager" -ForegroundColor White
    Write-Host "3. Navigate to public_html" -ForegroundColor White
    Write-Host "4. Upload apollo-visa-tech-deploy.zip" -ForegroundColor White
    Write-Host "5. Extract the ZIP file" -ForegroundColor White
    Write-Host "6. Visit your domain" -ForegroundColor White
    Write-Host ""
    Write-Host "For detailed instructions, see:" -ForegroundColor Yellow
    Write-Host "  README-DEPLOYMENT.md" -ForegroundColor White
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host "ERROR: Failed to create ZIP file" -ForegroundColor Red
}

Write-Host ""
pause

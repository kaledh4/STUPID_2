@echo off
setlocal

echo Building Neon Splash Documentation Hub...
echo.

:menu
echo ================================
echo  Neon Splash Build Menu
echo ================================
echo 1. Start Development Server
echo 2. Validate HTML Files
echo 3. Check Links
echo 4. Run All Tests
echo 5. Exit
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto start_server
if "%choice%"=="2" goto validate_html
if "%choice%"=="3" goto check_links
if "%choice%"=="4" goto run_tests
if "%choice%"=="5" goto exit_script

echo Invalid choice. Please try again.
goto menu

:start_server
echo Starting development server...
npx serve docs
goto menu

:validate_html
echo Validating HTML files...
npx html-validator --files="docs/**/*.html"
pause
goto menu

:check_links
echo Checking links...
npx linkinator docs --recurse --skip "github.com,raw.githubusercontent.com"
pause
goto menu

:run_tests
echo Running all tests...
npx html-validator --files="docs/**/*.html"
npx linkinator docs --recurse --skip "github.com,raw.githubusercontent.com"
echo All tests completed.
pause
goto menu

:exit_script
echo Exiting build script...
exit /b 0
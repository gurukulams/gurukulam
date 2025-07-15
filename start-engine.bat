@echo off
setlocal ENABLEDELAYEDEXPANSION

REM === Load from .env ===
for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
    set %%A=%%B
)

set "FOLDER=engine-%TAG%"
set "JDK_FOLDER=%FOLDER%\jdk"
set "JAR_PATH=%FOLDER%\%JAR_NAME%"
set "JDK_ARCH=windows-x64"
set "JDK_URL=https://download.oracle.com/java/24/latest/jdk-24_%JDK_ARCH%_bin.zip"

REM === Create working directory ===
if not exist "%FOLDER%" mkdir "%FOLDER%"
cd "%FOLDER%"

REM === Download JDK if needed ===
if not exist "%JDK_FOLDER%\bin\java.exe" (
    echo Downloading JDK...
    powershell -Command "Invoke-WebRequest -Uri '%JDK_URL%' -OutFile 'openjdk.zip'"
    powershell -Command "Expand-Archive -Path 'openjdk.zip' -DestinationPath '%JDK_FOLDER%'"
    del openjdk.zip
)

REM === Download JAR if needed ===
if not exist "%JAR_NAME%" (
    echo Downloading engine jar...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/%REPO%/releases/download/%TAG%/%JAR_NAME%' -OutFile '%JAR_NAME%'"
)

REM === Kill existing process ===
for /f "tokens=2" %%p in ('tasklist ^| findstr /i "%JAR_NAME%"') do (
    echo Killing process %%p
    taskkill /PID %%p /F
)

cd ..

REM === Start Java process from root ===
echo Starting Java process...
start "" "%CD%\%JDK_FOLDER%\bin\java.exe" -jar "%CD%\%JAR_PATH%"

echo Done.

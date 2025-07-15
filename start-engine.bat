@echo off
setlocal ENABLEDELAYEDEXPANSION

REM === Load from .env ===
for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
    set %%A=%%B
)

set "FOLDER=engine-%TAG%"
set "JDK_FOLDER=jdk"
set "JAR_PATH=%FOLDER%\%JAR_NAME%"
set "JDK_ARCH=windows-x64"
set "JDK_URL=https://download.java.net/java/GA/jdk24.0.1/24a58e0e276943138bf3e963e6291ac2/9/GPL/openjdk-24.0.1_windows-x64_bin.zip"

REM === Create working directory ===
if not exist "%FOLDER%" mkdir "%FOLDER%"
cd "%FOLDER%"

REM === Download and extract JDK if needed ===
if not exist "%JDK_FOLDER%\bin\java.exe" (
    echo [INFO] Downloading JDK...
    powershell -Command "Invoke-WebRequest -Uri '%JDK_URL%' -OutFile 'openjdk.zip'"

    echo [INFO] Extracting JDK...
    powershell -Command "Expand-Archive -Path 'openjdk.zip' -DestinationPath 'tmp_jdk'"

    echo [INFO] Moving JDK contents...
    powershell -Command ^
      "Get-ChildItem -Path 'tmp_jdk' -Directory | ForEach-Object { Move-Item -Path $_.FullName\* -Destination '%JDK_FOLDER%' -Force }"

    rd /s /q tmp_jdk
    del openjdk.zip
)

REM === Download JAR if needed ===
if not exist "%JAR_NAME%" (
    echo [INFO] Downloading engine jar...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/%REPO%/releases/download/%TAG%/%JAR_NAME%' -OutFile '%JAR_NAME%'"
)

REM === Kill existing process ===
for /f "tokens=2" %%p in ('tasklist ^| findstr /i "%JAR_NAME%"') do (
    echo [INFO] Killing process %%p
    taskkill /PID %%p /F
)

cd ..

REM === Start Java process from project root ===
echo [INFO] Starting Java process...
start "" "%CD%\%FOLDER%\%JDK_FOLDER%\bin\java.exe" -jar "%CD%\%JAR_PATH%"

echo [INFO] Done.

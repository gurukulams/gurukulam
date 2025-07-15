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
set "JDK_ZIP=openjdk.zip"
set "JDK_URL=https://download.java.net/java/GA/jdk24.0.1/24a58e0e276943138bf3e963e6291ac2/9/GPL/openjdk-24.0.1_windows-x64_bin.zip"

REM === Create working directory ===
if not exist "%FOLDER%" mkdir "%FOLDER%"
cd "%FOLDER%"

REM === Download and extract JDK if not already extracted ===
if not exist "%JDK_FOLDER%\bin\java.exe" (
    echo [INFO] JDK not found, downloading...

    if not exist "%JDK_ZIP%" (
        echo [INFO] Downloading JDK ZIP...
        powershell -Command "Invoke-WebRequest -Uri '%JDK_URL%' -OutFile '%JDK_ZIP%'"
    ) else (
        echo [INFO] JDK ZIP already downloaded, skipping download.
    )

    echo [INFO] Extracting JDK...
    powershell -Command "Expand-Archive -Path '%JDK_ZIP%' -DestinationPath 'tmp_jdk'"

    echo [INFO] Moving JDK contents into %JDK_FOLDER%...
    powershell -Command ^
      "Get-ChildItem -Path 'tmp_jdk' -Directory | ForEach-Object { Move-Item -Path (Join-Path $_.FullName '*') -Destination '%JDK_FOLDER%' -Force }"

    rd /s /q tmp_jdk
    del "%JDK_ZIP%"
) else (
    echo [INFO] JDK already exists, skipping download.
)

REM === Download engine JAR if not already present ===
if not exist "%JAR_NAME%" (
    echo [INFO] Downloading engine JAR...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/%REPO%/releases/download/%TAG%/%JAR_NAME%' -OutFile '%JAR_NAME%'"
) else (
    echo [INFO] Engine JAR already exists, skipping download.
)

REM === Kill existing Java process running the JAR ===
for /f "tokens=2" %%p in ('tasklist ^| findstr /i "%JAR_NAME%"') do (
    echo [INFO] Killing existing Java process %%p
    taskkill /PID %%p /F
)

cd ..

REM === Start Java process from root ===
echo [INFO] Starting Java process...
start "" "%CD%\%FOLDER%\%JDK_FOLDER%\bin\java.exe" -jar "%CD%\%JAR_PATH%"

echo [INFO] Done.

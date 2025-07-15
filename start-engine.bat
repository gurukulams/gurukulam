@echo off
setlocal ENABLEDELAYEDEXPANSION

REM === Load variables from .env ===
for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
    set %%A=%%B
)

REM === Config ===
set "FOLDER=engine-%TAG%"
set "JDK_FOLDER=jdk"
set "JAR_PATH=%FOLDER%\%JAR_NAME%"
set "JDK_ZIP=%FOLDER%\openjdk.zip"
set "JDK_URL=https://github.com/adoptium/temurin24-binaries/releases/latest/download/OpenJDK24U-jdk_x64_windows_hotspot_24.0.1_1.zip"

REM === Create engine folder if missing ===
if not exist "%FOLDER%" mkdir "%FOLDER%"

REM === Download and extract JDK if not already present ===
if not exist "%FOLDER%\%JDK_FOLDER%\bin\java.exe" (
    echo [INFO] Downloading Adoptium JDK...
    curl -L -o "%JDK_ZIP%" "%JDK_URL%"

    echo [INFO] Extracting JDK...
    powershell -Command "Expand-Archive -Path '%JDK_ZIP%' -DestinationPath '%FOLDER%\%JDK_FOLDER%'"
    del "%JDK_ZIP%"
) else (
    echo [INFO] JDK already present, skipping download.
)

REM === Download engine jar if missing ===
if not exist "%JAR_PATH%" (
    echo [INFO] Downloading engine JAR...
    curl -L -o "%JAR_PATH%" "https://github.com/%REPO%/releases/download/%TAG%/%JAR_NAME%"
) else (
    echo [INFO] Engine JAR already present, skipping download.
)

REM === Kill existing Java process ===
for /f "tokens=2" %%p in ('tasklist ^| findstr /i "%JAR_NAME%"') do (
    echo [INFO] Killing existing process PID %%p
    taskkill /PID %%p /F
)

REM === Start engine ===
echo [INFO] Starting engine...

REM Find java.exe in the extracted folder (first match)
for /f "delims=" %%j in ('dir /b /s "%FOLDER%\%JDK_FOLDER%\bin\java.exe"') do (
    set "JAVA_EXE=%%j"
    goto :foundjava
)
:foundjava

start "" cmd /c ""!JAVA_EXE!" -jar "%CD%\%JAR_PATH%" > engine.log 2>&1"

echo [INFO] Done. Output will be written to engine.log.

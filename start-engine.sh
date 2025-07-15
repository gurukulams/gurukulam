#!/bin/bash

set -e

# === Load config from .env ===
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/.env"

FOLDER="engine-$TAG"
JDK_FOLDER="jdk"
GITHUB_RELEASE_URL="https://github.com/$REPO/releases/download/$TAG/$JAR_NAME"

# === Platform Detection ===
OS=$(uname -s)
ARCH=$(uname -m)

case "$OS" in
  "Linux")
    PLATFORM="linux-$( [[ "$ARCH" == "x86_64" ]] && echo x64 || echo aarch64 )"
    ;;
  "Darwin")
    PLATFORM="macos-$( [[ "$ARCH" == "x86_64" ]] && echo x64 || echo aarch64 )"
    ;;
  *)
    echo "Unsupported OS: $OS"
    exit 1
    ;;
esac

JDK_URL="https://download.oracle.com/java/24/latest/jdk-24_${PLATFORM}_bin.tar.gz"

# === Create working directory ===
mkdir -p "$SCRIPT_DIR/$FOLDER"
cd "$SCRIPT_DIR/$FOLDER"

# === Download JDK (skip if exists) ===
if ! find "$JDK_FOLDER" -type f -name java -path "*/bin/java" | grep -q .; then
  echo "Downloading JDK..."
  curl -L -o openjdk.tar.gz "$JDK_URL"
  mkdir -p "$JDK_FOLDER"
  tar -xzf openjdk.tar.gz -C "$JDK_FOLDER"
  rm openjdk.tar.gz
fi

JAVA_PATH=$(find "$JDK_FOLDER" -type f -path "*/bin/java" -perm +111 | head -n 1)

if [ ! -x "$JAVA_PATH" ]; then
  echo "Java binary not found."
  exit 1
fi

chmod +x "$JAVA_PATH"

# === Download JAR ===
if [ ! -f "$JAR_NAME" ]; then
  curl -L -o "$JAR_NAME" "$GITHUB_RELEASE_URL"
fi

# === Kill existing Java process ===
PID=$(pgrep -f "$JAR_NAME" || true)
if [ -n "$PID" ]; then
  kill -9 "$PID"
fi

# === Start from project root ===
cd "$SCRIPT_DIR"
JAR_PATH="$SCRIPT_DIR/$FOLDER/$JAR_NAME"
"$SCRIPT_DIR/$FOLDER/$JAVA_PATH" -jar "$JAR_PATH" > engine.log 2>&1 &

sleep 1
NEW_PID=$(pgrep -f "$JAR_NAME" || true)
[ -n "$NEW_PID" ] && echo "Engine started with PID $NEW_PID" || echo "Failed to start engine. Check engine.log"

#!/bin/bash

# Check for source argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 /path/to/source"
    exit 1
fi

SOURCE="$1/content.en/"
DEST="site/content.en/books/csebooks/"

echo "Watching $SOURCE and syncing to $DEST..."

# Create destination directory if it doesn't exist
mkdir -p "$DEST"

while true; do
    inotifywait -r -e modify,create,delete,move "$SOURCE"
    rsync -avh --delete "$SOURCE/" "$DEST/"
done
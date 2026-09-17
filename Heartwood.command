#!/bin/bash
# Double-click this to start Heartwood and open it in your browser.
cd "$(dirname "$0")" || exit 1
if [ ! -d node_modules ]; then
  echo "First run — installing. This takes a minute."
  npm install || exit 1
fi
echo "Starting Heartwood. Close this window when you are finished."
( sleep 3; open http://localhost:5173 ) &
npm run dev

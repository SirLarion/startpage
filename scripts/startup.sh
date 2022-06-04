#!/bin/bash

START="/home/sirlarion/repos/startpage"

NO_BROWSER=false

for var in "$@"
do
  if [ "$var" = "--no-browser" ]; then
    NO_BROWSER=true
  fi
done

echo "Starting Node server"

cd $START/backend
node index.js &

if ! "$NO_BROWSER" = true; then
  firefox --kiosk --new-window http://localhost:12345 &
fi
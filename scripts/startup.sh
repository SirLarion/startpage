#!/bin/bash

START="/home/sirlarion/repos/startpage"

echo "Starting Bun server"

cd $START/backend
bun run start &
sleep 0.1
firefox --kiosk --new-window http://localhost:12345 &

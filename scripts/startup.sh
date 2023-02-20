#!/bin/bash

START="/home/sirlarion/repos/startpage"

sleep 0.1

echo "Starting Node server"

cd $START/backend
node index.js &
firefox --kiosk --new-window http://localhost:12345 &

#!/bin/bash

START="/home/sirlarion/repos/startpage"

echo "Starting Node server"

cd $START/backend
node index.js &

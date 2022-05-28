START="/home/sirlarion/repos/startpage"

cd $START/backend
node index.js &

firefox --kiosk --new-window http://localhost:5000 &
START="/home/sirlarion/repos/startpage"

rm -r $START/backend/build
cp -r $START/frontend/build $START/backend/.
cd $START/backend
node index.js &

firefox --kiosk --new-window http://localhost:5000 &
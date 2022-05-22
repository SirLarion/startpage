rm -r backend/build
cp -r frontend/build backend/.
cd backend
node index.js &

firefox --kiosk --new-window http://localhost:5000
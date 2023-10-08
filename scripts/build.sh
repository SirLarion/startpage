START="/home/sirlarion/repos/startpage"

cd $START/frontend
npm run build

rm -r $START/backend/build
cp -r $START/frontend/build $START/backend/.
cp -r $START/frontend/build $START/backend-rust/.

cd $START/backend-rust
cargo build --release
# Startpage

<img src="production.gif"/>

### Requirements

Node and npm + `npm install` in both ./backend and ./frontend. Tested on Manjaro & Arch Linux

### Setup

1. Run `scripts/build.sh`
2. Create `backend/.env` file and add in PORT and MODE variables where MODE is either `production` or `entertainment` (this changes which apps are displayed by default)
3. Run `scripts/startup.sh` (or `node index.js` in `backend`) to launch

### Autostarting

`startup.sh` can be called in any desired way. For distros with `systemd`, there's also a ready-made `startpage.service`. Autostarting Firefox in Kiosk mode (after starting node) can be done with `scripts/kiosk.desktop` (KDE)

### Known issues

28.10.2022: `startup.sh` doesn't work as a login script in KDE Plasma. A workaround is to create another script that calls `startup.sh`

### License

MIT

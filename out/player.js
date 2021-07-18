"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require('child_process');
const path = require('path');
const player = require('play-sound')();
const _isWindows = process.platform === 'win32';
const _playerWindowsPath = path.join(__dirname, '..', 'audio', 'sounder.exe');
const playerAdapter = (opts) => ({
    afplay: ['-v', opts.macVol],
    mplayer: ['-af', `volume=${opts.linuxVol}`],
});
exports.default = {
    play(filePath, config) {
        return new Promise((resolve, reject) => {
            if (_isWindows) {
                cp.execFile(_playerWindowsPath, ['/vol', config.winVol, filePath]);
                resolve();
            }
            else {
                player.play(filePath, playerAdapter(config), (err) => {
                    if (err) {
                        console.error("Error playing sound:", filePath, " - Description:", err);
                        return reject(err);
                    }
                    resolve();
                });
            }
        });
    }
};
//# sourceMappingURL=player.js.map
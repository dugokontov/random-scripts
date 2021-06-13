const { spawn } = require('child_process');
const { log } = require('./util');

/**
 * @param {string} filePath
 */
exports.print = async (filePath) =>
    new Promise((resolve, reject) => {
        const lp = spawn('lp', [filePath]);

        lp.stdout.on('data', (data) => log(data.toString()));
        lp.stderr.on('data', (data) => log(data.toString()));

        lp.on('error', reject);
        lp.on('close', resolve);
    });

/**
 * @param {string} filePath
 */
exports.rm = async (filePath) =>
    new Promise((resolve, reject) => {
        const rm = spawn('rm', [filePath]);

        rm.stdout.on('data', (data) => log(data.toString()));
        rm.stderr.on('data', (data) => log(data.toString()));

        rm.on('error', reject);
        rm.on('close', resolve);
    });

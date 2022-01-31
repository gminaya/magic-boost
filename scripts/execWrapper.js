const { exec } = require('child_process');

/**
 * Executes a nodeJS child process
 * and wrapps all output to console
 */
const verboseExec = (cmd) => {
  console.log(cmd);
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

module.exports = { exec: verboseExec };
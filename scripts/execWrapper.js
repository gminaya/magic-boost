const { exec } = require('child_process');
const fs = require('fs')

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


const BUILD_CONFIG_PATH = './.buildconfig.js';
const FS_OPTIONS = { encoding: 'utf8' };

const ensureBuildConfigExists = () => {
  if (!fs.existsSync(BUILD_CONFIG_PATH)) {
    fs.writeFileSync(BUILD_CONFIG_PATH, JSON.stringify({
      activeBuild: 'dev'
    }), FS_OPTIONS);
  }
}

/** 
 * Gets active environment from buildconfig.js file.
 * If the file is not present, it creates it 
 * */
const getActiveEnv = () => {
  // check if file exists, otherwise create it
  try {
    ensureBuildConfigExists();
    const fileContents = fs.readFileSync(BUILD_CONFIG_PATH, FS_OPTIONS);
    return JSON.parse(fileContents).activeBuild;
  } catch (err) {
    console.log('something went wrong attempting to read local build configuration', err);
  }
}

/** 
 * Sets the active environment on buildconfig.js file.
 * If the file is not present, it creates it 
 * */
const setActiveEnv = (envName) => {
  try {
    ensureBuildConfigExists();
    const config = JSON.parse(fs.readFileSync(BUILD_CONFIG_PATH, FS_OPTIONS));
    config.activeBuild = envName;
    fs.writeFileSync(BUILD_CONFIG_PATH, JSON.stringify(config), FS_OPTIONS);
  } catch (err) {
    console.log('something went wrong attempting to write local build configuration', err);
  }
}

module.exports = { exec: verboseExec, getActiveEnv, setActiveEnv };
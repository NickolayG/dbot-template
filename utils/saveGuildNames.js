const fs = require('node:fs');
const path = require('node:path');
const logger = require('./log.js');

// Save names of guilds
async function createDirectory() {
    // Directory path to Data folder
    const dataFolderPath = path.resolve(__dirname, '../data');

    // Check if directory exists if so return
    if (fs.existsSync(dataFolderPath)) {
        return;
    }

    // Create directory
    try {
        // Create directory
        fs.mkdirSync(dataFolderPath);

        // Log success
        logger.toConsole('Data directory successfully created!', 'INFO');
    } catch (error) {
        // Log error
        logger.toConsole(error, 'ERROR');
    }
}

 async function saveGuildNames(client) {
    // Get guilds from client
    const guilds = client.guilds.cache;
    // Make variable to keep track of guild names
    var guildNames = '';
    // Run through each guild to get name
    for (const guild of guilds) {
        guildNames = guildNames + guild[1].name + ',\n';
    }

    // Wait for function to check if directory exists
    await createDirectory();

    // Path to guildNames file
    const guildNamesFilePath = path.resolve(__dirname, '../data/guildNames.txt');

    fs.writeFile(guildNamesFilePath, guildNames, (error) => {
        if (error) {
            // Log error
            logger.toConsole(error, 'ERROR');
        }
    });
}

module.exports = { saveGuildNames };
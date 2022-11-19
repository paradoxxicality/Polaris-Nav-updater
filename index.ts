// Imports | Requires \\
import os from 'node:os'; import fs from 'fs'; import DOMParser from 'xmldom'; import {select} from 'xpath'
const xpath = require('xpath')

// Variables \\
const userInfo = os.userInfo()
const pluginFolder = userInfo.homedir + "\\AppData\\Local\\Roblox\\Plugins"
const tempDir = __dirname + '\\' + __filename
console.log(tempDir)

// Functions

function findPluginFile(dir : string) {
    fs.readdir(dir, function (err, foundFiles : any) {
        if (err) {
          console.log(err);
          return;
        }
        for (let i = 0; i < foundFiles.length; i++) {
            console.log(i)
            var foundFile : string = foundFiles[i]
            if (foundFile.endsWith(".rbxmx")) {
                var dp1 = new DOMParser.DOMParser
                var doc = dp1.parseFromString(fs.readFileSync(pluginFolder + '\\' + foundFile, 'utf8'))
                var nodes = select("//Item/Item/Item/Properties/string", doc)
                for (let l = 0; l < nodes.length; l++) {
                    var currentNode = nodes[l]
                    if (currentNode.toString() == '<string name="Value">0.0.1-beta</string>') {
                        console.log(currentNode)
                    }
                }
            }
        }
    });
}


findPluginFile(pluginFolder)


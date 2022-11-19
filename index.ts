// Imports | Requires \\
import os from 'node:os'; import fs from 'fs'; import DOMParser from 'xmldom'; import {select} from 'xpath'
import { json } from 'stream/consumers';
const xpath = require('xpath')

// Variables \\
const userInfo = os.userInfo()
const pluginFolder = userInfo.homedir + "\\AppData\\Local\\Roblox\\Plugins"
const tempDir = __dirname + '\\' + __filename
console.log(tempDir)

// Functions

async function getPluginVer(plugDir : string) {
    fs.readdir(plugDir, function (err, foundFiles : any) {
        if (err) {
          console.log(err);
          return;
        }
        for (let i = 0; i < foundFiles.length; i++) {
            console.log(i)
            var foundFile : any  = foundFiles[i]
            if (foundFile.endsWith(".rbxmx")) {
                var dp1 = new DOMParser.DOMParser
                var doc = dp1.parseFromString(fs.readFileSync(pluginFolder + '\\' + foundFile, 'utf8'))
                var nodes = select("//Item/Item/Item/Properties/string", doc)
                for (let l = 0; l < nodes.length; l++) {
                    var currentNode = nodes[l]
                    if (currentNode.toString().startsWith('<string name="Value">') && currentNode.toString().endsWith('</string>') ) {
                        return currentNode.toString().split('>')[1].split('</')[0].toString()
                    }
                }
            }
        }
    });
}



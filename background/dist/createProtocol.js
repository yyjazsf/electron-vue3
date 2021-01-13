"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var fs_1 = require("fs");
var url_1 = require("url");
function default_1(scheme) {
    electron_1.protocol.registerBufferProtocol(scheme, function (request, respond) {
        var pathName = new url_1.URL(request.url).pathname;
        pathName = decodeURI(pathName); // Needed in case URL contains spaces
        fs_1.readFile(path.join(__dirname, pathName), function (error, data) {
            if (error) {
                console.error("Failed to read " + pathName + " on " + scheme + " protocol", error);
            }
            var extension = path.extname(pathName).toLowerCase();
            var mimeType = '';
            if (extension === '.js') {
                mimeType = 'text/javascript';
            }
            else if (extension === '.html') {
                mimeType = 'text/html';
            }
            else if (extension === '.css') {
                mimeType = 'text/css';
            }
            else if (extension === '.svg' || extension === '.svgz') {
                mimeType = 'image/svg+xml';
            }
            else if (extension === '.json') {
                mimeType = 'application/json';
            }
            else if (extension === ".wasm") {
                mimeType = "application/wasm";
            }
            respond({ mimeType: mimeType, data: data });
        });
    });
}
exports["default"] = default_1;
//# sourceMappingURL=createProtocol.js.map
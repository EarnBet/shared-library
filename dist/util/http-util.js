"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGet = exports.httpGetJson = exports.httpsGetJson = void 0;
const https = require("https");
const http = require("http");
function httpsGetJson(url) {
    return new Promise((resolve, reject) => {
        https
            .get("https://" + url, (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            resp.on("end", () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                }
                catch (error) {
                    console.log(data);
                    reject(error);
                }
            });
        })
            .on("error", (err) => {
            reject(err);
        });
    });
}
exports.httpsGetJson = httpsGetJson;
function httpGetJson(url) {
    return new Promise((resolve, reject) => {
        http
            .get("http://" + url, (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            resp.on("end", () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                }
                catch (error) {
                    console.log(data);
                    reject(error);
                }
            });
        })
            .on("error", (err) => {
            reject(err);
        });
    });
}
exports.httpGetJson = httpGetJson;
function httpGet(url) {
    return new Promise((resolve, reject) => {
        http
            .get("http://" + url, (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            resp.on("end", () => {
                resolve(data);
            });
        })
            .on("error", (err) => {
            reject(err);
        });
    });
}
exports.httpGet = httpGet;
//# sourceMappingURL=http-util.js.map
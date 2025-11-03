"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpsGetJson = httpsGetJson;
exports.httpGetJson = httpGetJson;
exports.httpGet = httpGet;
const https = __importStar(require("https"));
const http = __importStar(require("http"));
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
//# sourceMappingURL=http-util.js.map
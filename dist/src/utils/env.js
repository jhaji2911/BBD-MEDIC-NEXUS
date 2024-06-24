"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPort = getPort;
exports.getHost = getHost;
const check_1 = require("./check");
function getPort() {
    return !(0, check_1.isEmpty)(process.env.PORT) ? Number(process.env.PORT) : 3000;
}
function getHost() {
    return !(0, check_1.isEmpty)(process.env.HOST) ? String(process.env.HOST) : '0.0.0.0';
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrl = void 0;
exports.isEmpty = isEmpty;
exports.doesFolderPathExist = doesFolderPathExist;
exports.doesFileExists = doesFileExists;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function isEmpty(value) {
    return value === null || value === undefined || value === '';
}
;
function doesFolderPathExist(folderPath) {
    try {
        // Resolve the folder path relative to the project root
        const projectRoot = path_1.default.resolve(__dirname, "../../../../");
        const fullPath = path_1.default.join(projectRoot, folderPath);
        console.log("projectRoot->", projectRoot, "\n", "fullPath->", fullPath);
        // Check if the folder path exists and is a directory
        return fs_1.default.existsSync(fullPath) && fs_1.default.lstatSync(fullPath).isDirectory();
    }
    catch (error) {
        // Log the error if needed
        console.error(`Error checking folder path: ${error.message}`);
        return false;
    }
}
function doesFileExists(folderPath) {
    try {
        // Resolve the folder path relative to the project root
        const projectRoot = path_1.default.resolve(__dirname, "../../../../");
        const fullPath = path_1.default.join(projectRoot, folderPath);
        console.log("projectRoot->", projectRoot, "\n", "fullPath->", fullPath);
        // Check if the folder path exists and is a directory
        return fs_1.default.existsSync(fullPath) && fs_1.default.lstatSync(fullPath).isFile();
    }
    catch (error) {
        // Log the error if needed
        console.error(`Error checking folder path: ${error.message}`);
        return false;
    }
}
const isUrl = (str) => {
    try {
        new URL(str);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.isUrl = isUrl;

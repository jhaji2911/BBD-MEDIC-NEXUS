import fs from 'fs'
import path from 'path';

export function isEmpty<T> (value: T): boolean {
    return value === null || value === undefined || value === ''
  }

;
export function doesFolderPathExist(folderPath: string): boolean {
  try {
    // Resolve the folder path relative to the project root
    const projectRoot = path.resolve(__dirname, "../../../../");
    const fullPath = path.join(projectRoot, folderPath);
    console.log("projectRoot->", projectRoot, "\n", "fullPath->", fullPath);
    // Check if the folder path exists and is a directory
    return fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory();
  } catch (error) {
    // Log the error if needed
    console.error(`Error checking folder path: ${error.message}`);
    return false;
  }
}

export function doesFileExists(folderPath: string): boolean {
  try {
    // Resolve the folder path relative to the project root
    const projectRoot = path.resolve(__dirname, "../../../../");
    const fullPath = path.join(projectRoot, folderPath);
    console.log("projectRoot->", projectRoot, "\n", "fullPath->", fullPath);
    // Check if the folder path exists and is a directory
    return fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile();
  } catch (error) {
    // Log the error if needed
    console.error(`Error checking folder path: ${error.message}`);
    return false;
  }
}

export const isUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
};




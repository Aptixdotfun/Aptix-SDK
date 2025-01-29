"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInput = readInput;
exports.displayMessage = displayMessage;
const readline_sync_1 = __importDefault(require("readline-sync"));
const chalk_1 = __importDefault(require("chalk"));
/** Read user input */
function readInput(prompt) {
    return readline_sync_1.default.question(chalk_1.default.blue(prompt));
}
/** Display a message */
function displayMessage(message) {
    console.log(chalk_1.default.green(message));
}

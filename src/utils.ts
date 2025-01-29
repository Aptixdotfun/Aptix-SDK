import readlineSync from "readline-sync";
import chalk from "chalk";

export function readInput(prompt: string): string {
  return readlineSync.question(chalk.blue(prompt));
}

export function displayMessage(message: string): void {
  console.log(chalk.green(message));
}

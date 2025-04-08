import * as vscode from "vscode";

export const prompt = {
  getInputStr: async (placeHolder: string): Promise<string> => {
    const value = await vscode.window.showInputBox({
      placeHolder: placeHolder,
    });

    if (!value) {
      throw new Error("value is empty");
    }

    return value;
  },

  getInputInt: async (placeHolder: string): Promise<number> => {
    const value = await vscode.window.showInputBox({
      placeHolder: placeHolder,
    });

    if (!value) {
      throw new Error("value is empty");
    }

    if (isNaN(parseInt(value))) {
      throw new Error("value is not a number");
    }

    return parseInt(value);
  },
};

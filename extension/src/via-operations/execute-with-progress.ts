import * as vscode from "vscode";

type Input = {
  title: string;
  task: (taskInput: TaskInput) => Promise<void>;
};

type TaskInput = {
  showProgress: (amount: number) => void;
  showMessage: (message: string) => void;
  onCancellationRequested: (callback: Callback) => void;
};

type Callback = () => void;

export const executeWithProgress = (input: Input) => {
  vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: input.title,
      cancellable: true,
    },
    (token, { onCancellationRequested }) => {
      return new Promise<void>(async (resolve) => {
        await input.task({
          showProgress: (amount) => {
            token.report({ increment: amount });
          },
          showMessage: (message) => {
            token.report({ message: message });
          },
          onCancellationRequested: (callback) => {
            onCancellationRequested(callback);
          },
        });

        token.report({ increment: 100, message: "Done" });
        await new Promise((resolve) => setTimeout(resolve, 500));
        resolve();
      });
    }
  );
};

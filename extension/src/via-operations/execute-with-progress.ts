import * as vscode from "vscode";

type Input = {
  title: string;
  task: (taskInput: TaskInput) => Promise<void>;
};

type TaskInput = {
  showProgress: (percent: number, message: string) => void;
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
          showProgress: (percent, message) => {
            const reporter = new ProgressReporter(token);
            reporter.set(percent, message);
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

class ProgressReporter {
  private lastPercent = 0;
  private token: vscode.Progress<{ message?: string; increment?: number }>;

  constructor(
    token: vscode.Progress<{ message?: string; increment?: number }>
  ) {
    this.token = token;
  }

  set(percent: number, message?: string) {
    const clamped = Math.max(0, Math.min(100, percent)); // Clamp to [0, 100]
    const increment = clamped - this.lastPercent;
    if (increment !== 0) {
      this.token.report({ increment, message });
      this.lastPercent = clamped;
    }
  }
}

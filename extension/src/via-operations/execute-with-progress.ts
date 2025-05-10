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
    async (progress, token) => {
      // wire up cancellation
      token.onCancellationRequested(() => {
        // if your task needs to handle cancellation, you can hook into this
      });

      // create a reporter tied to the VS Code progress API
      const reporter = new ProgressReporter(progress);

      await input.task({
        showProgress: (percent, message) => reporter.set(percent, message),
        showMessage: (message) => progress.report({ message }),
        onCancellationRequested: (callback) =>
          token.onCancellationRequested(callback),
      });

      // ensure we finish at 100%
      reporter.set(100, "Done");
      // small delay so user sees "Done"
      await new Promise((r) => setTimeout(r, 500));
    }
  );
};

class ProgressReporter {
  private lastPercent = 0;

  constructor(
    private progress: vscode.Progress<{ message?: string; increment?: number }>
  ) {}

  set(percent: number, message?: string) {
    const clamped = Math.max(0, Math.min(100, percent));
    const increment = clamped - this.lastPercent;
    if (increment !== 0) {
      this.progress.report({ increment, message });
      this.lastPercent = clamped;
    }
  }
}

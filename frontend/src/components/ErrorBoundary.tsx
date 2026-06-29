import { Component, type ErrorInfo, type ReactNode } from "react";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("JanSathi UI error", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-background p-6">
          <div className="max-w-md rounded-lg border bg-card p-6 text-card-foreground shadow-soft">
            <h1 className="text-xl font-semibold">Something went wrong</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Refresh the page and try again. No document or Aadhaar image is stored by this milestone.
            </p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

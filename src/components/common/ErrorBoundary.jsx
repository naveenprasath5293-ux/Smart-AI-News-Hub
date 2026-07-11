import { Component } from "react";
import { AlertTriangle } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In production this would report to a monitoring service.
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-24 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-alert/10 text-alert">
            <AlertTriangle size={26} />
          </div>
          <h2 className="font-display text-xl font-semibold text-ink">
            Something broke on this screen
          </h2>
          <p className="max-w-sm text-sm text-ink-dim">
            The signal dropped for a moment. Try reloading this section.
          </p>
          <button
            onClick={this.handleReset}
            className="rounded-full border border-line px-5 py-2 text-sm font-medium text-ink transition hover:border-signal hover:text-signal"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

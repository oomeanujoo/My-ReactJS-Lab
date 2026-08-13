// REFERENCE ONLY — this file is never imported or rendered anywhere in the
// running app. It exists purely to show what navBar.js's real session
// timer + render counter would have looked like written the "legacy" way,
// before Hooks existed (pre-React 16.8, 2019).
// Concept: class components -> hooks (see LEARNING_NOTES.md).
import React from "react";

class SessionTimerClassExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sessionSeconds: 0 };
    // A plain instance field — the class-era equivalent of useRef: it
    // persists across renders, but changing it doesn't trigger one.
    this.renderCount = 0;
  }

  componentDidMount() {
    // Runs once, right after this component first appears on screen —
    // the class-era equivalent of useEffect(fn, []).
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        sessionSeconds: prevState.sessionSeconds + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    // Runs right before this component disappears — the class-era
    // equivalent of useEffect's cleanup function (the `return () => ...`).
    clearInterval(this.intervalId);
  }

  render() {
    this.renderCount += 1;
    return (
      <span>
        Session: {this.state.sessionSeconds}s (renders: {this.renderCount})
      </span>
    );
  }
}

export default SessionTimerClassExample;

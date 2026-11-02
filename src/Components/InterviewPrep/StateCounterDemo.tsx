import { useState } from "react";

export default function StateCounterDemo() {
  // State: a value React remembers; setter: the function requesting its update.
  const [count, setCount] = useState(0);

  // Render: React calls this function to calculate the screen's JSX description.
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">useState — Update a number</h1>
      <p>Count: {count}</p>
      {/* Updater: receives the pending state and returns the next state. */}
      <button
        type="button"
        className="rounded-md border border-blue-700 bg-blue-600 px-4 py-2 font-semibold text-white cursor-pointer hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        onClick={() => setCount(previous => previous + 1)}
      >
        Add one
      </button>
      {/* Commit: React applies needed changes to the DOM (browser page elements). */}
    </section>
  );
}

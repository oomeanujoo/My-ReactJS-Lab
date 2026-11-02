import { useState } from "react";
// @ts-expect-error This build requires .tsx imports; the installed TS compiler rejects that extension.
import CountDisplay from "./CountDisplay.tsx";

export default function StatePropsDemo() {
  // State: data this component remembers. The setter requests its update.
  const [count, setCount] = useState(0);

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">State and props — Parent and child</h1>
      <p>Parent owns count: {count}</p>
      <button
        type="button"
        className="rounded-md border border-blue-700 bg-blue-600 px-4 py-2 font-semibold text-white cursor-pointer hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        onClick={() => setCount(previous => previous + 1)}
      >
        Add one in parent
      </button>
      {/* count={count} passes the parent's state to the child as a prop. */}
      <CountDisplay count={count} />
    </section>
  );
}

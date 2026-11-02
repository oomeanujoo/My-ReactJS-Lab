import { useRef, useState } from "react";

export default function RefDemo() {
  const clicks = useRef(0);
  const [screenUpdates, setScreenUpdates] = useState(0);

  function rememberClick() {
    clicks.current += 1;
    alert(`Remembered clicks: ${clicks.current}`);
  }

  return (
    <section>
      <h1>useRef: remember without re-rendering</h1>
      <p>Screen updates requested: {screenUpdates}</p>
      <button
        className="my-2 rounded-md border border-blue-700 bg-blue-600 px-4 py-2 font-semibold text-white cursor-pointer hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        onClick={rememberClick}
      >
        Remember a click
      </button>
      <br />
      <button
        className="my-2 rounded-md border border-gray-500 bg-gray-700 px-4 py-2 font-semibold text-white cursor-pointer hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        onClick={() => setScreenUpdates(n => n + 1)}
      >
        Update the screen
      </button>
    </section>
  );
}

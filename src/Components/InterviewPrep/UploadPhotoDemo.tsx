import { useRef } from "react";

export default function UploadPhotoDemo() {
  // useRef: remembers a reference (access to an element) between renders.
  // HTMLInputElement: the TypeScript DOM type for a browser input; null means empty.
  // current: the ref property where React puts the actual input element.
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">useRef — Choose a photo</h1>
      <p>Click Upload photo to open the file picker. This demo only chooses a file.</p>
      {/* type="file" opens file selection; accept suggests images; hidden hides the input. */}
      <input type="file" accept="image/*" ref={fileInput} hidden />
      {/* ?. means "if current exists"; click() activates the input to open the picker. */}
      <button
        type="button"
        className="rounded-md border border-blue-700 bg-blue-600 px-4 py-2 font-semibold text-white cursor-pointer hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        onClick={() => fileInput.current?.click()}
      >
        Upload photo
      </button>
    </section>
  );
}

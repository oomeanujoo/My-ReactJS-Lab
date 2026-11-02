import { Profiler } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import RefDemo from "./RefDemo";

test("ref clicks do not commit a render and survive a state update", () => {
  const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  const onRender = jest.fn();
  try {
    render(<Profiler id="ref-demo" onRender={onRender}><RefDemo /></Profiler>);
    const initialCommits = onRender.mock.calls.length;
    fireEvent.click(screen.getByText("Remember a click"));
    fireEvent.click(screen.getByText("Remember a click"));
    expect(alertMock).toHaveBeenLastCalledWith("Remembered clicks: 2");
    expect(onRender).toHaveBeenCalledTimes(initialCommits);

    fireEvent.click(screen.getByText("Update the screen"));
    expect(screen.getByText("Screen updates requested: 1")).toBeTruthy();
    expect(onRender).toHaveBeenCalledTimes(initialCommits + 1);
    fireEvent.click(screen.getByText("Remember a click"));
    expect(alertMock).toHaveBeenLastCalledWith("Remembered clicks: 3");
    expect(onRender).toHaveBeenCalledTimes(initialCommits + 1);
  } finally {
    alertMock.mockRestore();
  }
});

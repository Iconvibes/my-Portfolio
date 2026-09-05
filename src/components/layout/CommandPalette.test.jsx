/** @vitest-environment jsdom */

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import CommandPalette from "./CommandPalette";

afterEach(cleanup);

describe("CommandPalette", () => {
  it("opens and filters commands from the launcher", () => {
    render(
      <MemoryRouter>
        <CommandPalette />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /open command palette/i }),
    );
    expect(
      screen.getByRole("dialog", { name: /command palette/i }),
    ).toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox", { name: /command/i }), {
      target: { value: "contact" },
    });

    expect(
      screen.getByRole("option", { name: /contactstart a conversation/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: /home go to homepage/i }),
    ).not.toBeInTheDocument();
  });
});

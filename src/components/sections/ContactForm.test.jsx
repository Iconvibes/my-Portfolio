/** @vitest-environment jsdom */

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ContactForm from "./ContactForm";

afterEach(cleanup);

describe("ContactForm", () => {
  it("marks the name, email, and message fields as required", () => {
    render(<ContactForm />);

    expect(screen.getByRole("textbox", { name: /full name/i })).toBeRequired();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeRequired();
    expect(
      screen.getByRole("textbox", { name: /project details/i }),
    ).toBeRequired();
  });

  it("includes the Netlify honeypot field and remains invalid when it is empty", () => {
    render(<ContactForm />);
    const form = screen
      .getByRole("button", { name: /send message/i })
      .closest("form");
    const honeypot = form?.querySelector('input[name="company-url"]');

    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(form).not.toBeNull();
    expect(honeypot).toHaveValue("");

    fireEvent.submit(form);
    expect(screen.getByRole("textbox", { name: /full name/i })).toBeInvalid();
  });
});

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTodo from "./AddTodo";

describe("AddTodo", () => {
  it("renders an input and an Add button", () => {
    render(<AddTodo onAdd={vi.fn()} />);

    expect(screen.getByLabelText(/new todo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("calls onAdd with the typed text and clears the input on submit", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddTodo onAdd={onAdd} />);

    const input = screen.getByLabelText(/new todo/i);
    await user.type(input, "Buy milk");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(onAdd).toHaveBeenCalledWith("Buy milk");
    expect(input).toHaveValue("");
  });

  it("shows a validation error when submitting empty", async () => {
    const user = userEvent.setup();
    render(<AddTodo onAdd={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/required/i);
  });

  it("clears the validation error once the user starts typing again", async () => {
    const user = userEvent.setup();
    render(<AddTodo onAdd={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Proving absence: queryBy* returns null instead of throwing, so
    // it's the right tool for asserting something is NOT there.
    await user.type(screen.getByLabelText(/new todo/i), "a");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
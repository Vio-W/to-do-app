import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UsersPage from "./UsersPage";

const mockUsers = [
  { id: 1, name: "Leanne Graham", email: "leanne@example.com", company: { name: "Romaguera Group" }, address: { city: "Gwenborough" } },
  { id: 2, name: "Ervin Howell", email: "ervin@example.com", company: { name: "Deckow-Crist" }, address: { city: "Wisokyburgh" } },
];

function renderUsersPage() {
  return render(
    <MemoryRouter>
      <UsersPage />
    </MemoryRouter>
  );
}

describe("UsersPage", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockUsers,
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a loading skeleton, then the fetched users", async () => {
    renderUsersPage();

    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
  });

  it("removes the loading skeleton once data has loaded", async () => {
    const { container } = renderUsersPage();

    await screen.findByText("Leanne Graham");

    expect(container.querySelector(".skeleton")).not.toBeInTheDocument();
  });

  it("shows an error message when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) })
    );

    renderUsersPage();

    expect(await screen.findByText(/couldn't load users/i)).toBeInTheDocument();
  });
});
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// Mock Loader to skip loading sequence in tests
vi.mock("@/components/ui/Loader", () => ({
  default: ({ onFinished, isReady }: { onFinished: () => void; isReady: boolean }) => {
    useEffect(() => {
      if (isReady) {
        onFinished();
      }
    }, [isReady, onFinished]);
    return <div data-testid="loader-mock">Loader Mock</div>;
  },
}));

// Mock HeroScene to avoid Three.js issues in JSDOM
vi.mock("@/components/ui/HeroScene", () => ({
  default: () => <div data-testid="hero-scene">Hero Scene Mock</div>,
}));

// Mock CustomCursor and Magnetic to avoid Framer Motion / JSDOM issues
vi.mock("@/components/ui/CustomCursor", () => ({
  default: () => <div data-testid="cursor-mock" />,
}));

vi.mock("@/components/shared/Magnetic", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import { useEffect } from "react";

describe("Router", () => {
  it("renders the landing page by default", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    
    // Trigger the model ready event to hide loader
    window.dispatchEvent(new CustomEvent("hero-model-ready"));

    // Landing page is lazy-loaded, so we might need a longer wait
    await waitFor(() => {
      // Find the Sharper text specifically in the main H1
      const headings = screen.getAllByText(/Sharper/i);
      const mainHeading = headings.find(h => h.tagName === "H1");
      expect(mainHeading).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it("navigates to portfolio page", async () => {
    render(
      <MemoryRouter initialEntries={["/portfolio"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Find the Portfolio heading specifically
      const headings = screen.getAllByText(/Portfolio/i);
      const mainHeading = headings.find(h => h.tagName === "H2");
      expect(mainHeading).toBeInTheDocument();
    });

    expect(screen.getByText(/A curated collection/i)).toBeInTheDocument();
  });

  it("navigates to about page", async () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Alex/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Moreau/i)).toBeInTheDocument();
  });

  it("navigates to contact page", async () => {
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Let's create/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/something/i)).toBeInTheDocument();
  });

  it("renders 404 page for unknown routes", async () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});

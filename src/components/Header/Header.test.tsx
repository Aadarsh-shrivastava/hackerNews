import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";

jest.mock("./hackernews.svg", () => "hackernews.svg");

describe("Header component", () => {
  it("renders the logo image", () => {
    render(<Header />);
    const img = screen.getByTestId("header-logo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "hackernews.svg");
  });

  it("has the correct container class", () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toHaveClass(
      "header-container",
      "casts-shadow"
    );
  });
});

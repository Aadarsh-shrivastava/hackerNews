import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "./Footer";

jest.mock("./hackernews.svg", () => "hackernews.svg");

describe("Header component", () => {
  it("renders the logo image", () => {
    render(<Footer />);
    const img = screen.getByTestId("footer-logo");
    expect(img).toBeInTheDocument();
  });
});

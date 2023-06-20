import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Landing from "../components/landing/Landing";
import "@testing-library/jest-dom/extend-expect";

test("renders landing component with title", () => {
  render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );

  const titleElement = screen.getByText(
    /All your grocery list needs, in one place./i
  );
  expect(titleElement).toBeInTheDocument();
});

test("renders landing component with start listing button", () => {
  render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );

  const buttonElement = screen.getByRole("link", { name: /Start listing/i });
  expect(buttonElement).toBeInTheDocument();
});

test("renders landing component with sign up button when not logged in", () => {
  render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );

  const buttonElement = screen.getByRole("link", {
    name: /Sign up to start sharing/i,
  });
  expect(buttonElement).toBeInTheDocument();
});

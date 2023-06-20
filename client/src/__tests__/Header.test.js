import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HeaderBar from "../components/landing/Header";

describe("HeaderBar component", () => {
  test("renders the title", () => {
    render(<HeaderBar />);
    const titleElement = screen.getByText("RideCo-Grocery");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the navigation links", () => {
    render(<HeaderBar />);
    const myListsLink = screen.getByText("My lists");
    const sharedListsLink = screen.getByText("Shared lists");
    expect(myListsLink).toBeInTheDocument();
    expect(sharedListsLink).toBeInTheDocument();
  });

  test("displays login and register buttons", () => {
    render(<HeaderBar />);
    const loginButton = screen.getByText("Login");
    const registerButton = screen.getByText("Register");
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test("Logs in user and checks for the logout button", () => {
    // Set up the test conditions
    document.cookie = "AuthToken=exampleToken";
    document.cookie = "Email=exampleEmail";

    // Render the component
    render(<HeaderBar />);

    // Check if the React cookies are set
    expect(document.cookie).toContain("AuthToken=exampleToken");
    expect(document.cookie).toContain("Email=exampleEmail");

    // Check if the button is present
    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();
  });
});

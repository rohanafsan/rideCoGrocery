import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../components/auth/Login";
import "@testing-library/jest-dom/extend-expect";

test("renders login component with input fields and submit button", () => {
  render(<Login />);

  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submitButton = screen.getByRole("button", { name: /Log In/i });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("displays error message when login fails", async () => {
  render(<Login />);

  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submitButton = screen.getByRole("button", { name: /Log In/i });

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });
  fireEvent.click(submitButton);

  // Mock response from the backend
  const mockErrorResponse = { message: "Invalid credentials" };
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: () => Promise.resolve(mockErrorResponse),
  });

  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText("Invalid credentials");
  expect(errorMessage).toBeInTheDocument();
});

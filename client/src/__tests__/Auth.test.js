import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthComponent from "../components/auth/Auth";
import "@testing-library/jest-dom/extend-expect";

test("renders auth component with input fields and submit button", () => {
  render(<AuthComponent />);

  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  const submitButton = screen.getByRole("button", { name: /Create Account/i });

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("displays error message when passwords do not match", () => {
  render(<AuthComponent />);

  const EmailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  const submitButton = screen.getByRole("button", { name: /Create Account/i });

  fireEvent.change(EmailInput, { target: { value: "abc@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, {
    target: { value: "differentpass" },
  });
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText("Passwords do not match");
  expect(errorMessage).toBeInTheDocument();
});

test("displays error message when email is invalid format", () => {
  render(<AuthComponent />);

  const EmailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  const submitButton = screen.getByRole("button", { name: /Create Account/i });

  fireEvent.change(EmailInput, { target: { value: "" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, {
    target: { value: "differentpass" },
  });
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText("Invalid email format");
  expect(errorMessage).toBeInTheDocument();
});

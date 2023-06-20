import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToDoComponent from "../components/todo/ToDoComponent";
import "@testing-library/jest-dom/extend-expect";

test("renders the ToDoComponent", () => {
  render(<ToDoComponent />);
  const inputElement = screen.getByPlaceholderText("Add an item...");
  expect(inputElement).toBeInTheDocument();
});

test("adds an item to the list", () => {
  render(<ToDoComponent />);
  const inputElement = screen.getByPlaceholderText("Add an item...");
  const addButton = screen.getByText("Add Item");

  fireEvent.change(inputElement, { target: { value: "New Item" } });
  fireEvent.click(addButton);

  const newItemElement = screen.getByText("New Item:");
  expect(newItemElement).toBeInTheDocument();
});

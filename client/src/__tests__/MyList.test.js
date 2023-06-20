import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import MyList from "../components/lists/MyList";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-cookie", () => ({
  useCookies: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("MyList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component and adds a new list", () => {
    const navigateMock = jest.fn();
    useCookies.mockReturnValue([{ Email: "test@example.com" }]);
    useNavigate.mockReturnValue(navigateMock);

    render(<MyList />);

    const inputElement = screen.getByPlaceholderText("Add a list...");
    const addButton = screen.getByText("Add List");

    // Verify initial state
    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(screen.queryByText("List 1")).toBeNull();

    // Add a new list
    fireEvent.change(inputElement, { target: { value: "List 1" } });
    fireEvent.click(addButton);

    // Verify list added
    expect(screen.getByText("List 1")).toBeInTheDocument();
  });
  test("deletes a list", () => {
    const navigateMock = jest.fn();
    useCookies.mockReturnValue([{ Email: "test@example.com" }]);
    useNavigate.mockReturnValue(navigateMock);

    // Mock initial lists state
    const initialLists = [
      { id: 1, listname: "List 1", email: "test@example.com" },
    ];
    jest
      .spyOn(React, "useState")
      .mockReturnValueOnce([initialLists, jest.fn()]);

    render(<MyList />);

    const inputElement = screen.getByPlaceholderText("Add a list...");
    const addButton = screen.getByText("Add List");

    // Verify initial state
    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(screen.queryByText("List 1")).toBeNull();

    // Add a new list
    fireEvent.change(inputElement, { target: { value: "List 1" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByTestId("delete-button-0");

    // Delete the list
    fireEvent.click(deleteButton);

    // Verify list deleted
    expect(screen.queryByText("List 1")).toBeNull();
  });
});

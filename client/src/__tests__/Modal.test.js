import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/lists/Modal";
import { useCookies } from "react-cookie";
import "@testing-library/jest-dom/extend-expect";

describe("Modal component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(
      <Modal open={true} onClose={mockOnClose} itemId={1} listName="My List" />
    );
  });

  test("renders the component", () => {
    // Check if the component renders without errors
    const modalElement = screen.getByText(
      "Share your list with a family member"
    );
    expect(modalElement).toBeInTheDocument();
  });

  test("shares the list and displays success message", async () => {
    // Mock the fetch function
    const mockFetch = jest.fn().mockResolvedValue({});
    global.fetch = mockFetch;

    // Simulate user input and button click
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });

    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);

    // Wait for the success message to be displayed
    const successMessageElement = await screen.findByText(
      "List shared successfully!"
    );
    expect(successMessageElement).toBeInTheDocument();

    // Check if the fetch function was called with the correct arguments
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_HOST}/sharelists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemid: 1,
          sharedby: undefined, // Depends on the cookies mock
          sharedto: "user@example.com",
          listname: "My List",
        }),
      }
    );
  });

  test("calls onClose when the close button is clicked", () => {
    // Simulate the close button click
    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

    // Check if the onClose function was called
    expect(mockOnClose).toHaveBeenCalled();
  });
});

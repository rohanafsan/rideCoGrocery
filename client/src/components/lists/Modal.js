import "./modal.css";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ open, onClose, itemId, listName }) => {
  // State variables
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [emailInput, setEmailInput] = useState(null);
  const [shared, setShared] = useState(false); // State variable to track shared status

  // Close the modal if it is not open
  if (!open) return null;

  // Share the list with the user and update the database with share information
  const handleShare = async () => {
    if (emailInput == cookies.Email) {
      setError("You cannot share a list with yourself!");
      return;
    }

    const item = {
      itemid: itemId,
      sharedby: cookies.Email,
      sharedto: emailInput,
      listname: listName,
    };

    // Update the database
    try {
      const response = await fetch(`http://localhost:8000/sharelists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    } catch (err) {
      console.error(err.message);
    }

    setShared(true);
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-right">
          <p className="close-button" onClick={onClose}>
            X
          </p>
          <div className="modal-content">
            <h2>Share your list with a family member</h2>
            <div className="modal-form">
              <div className="modal-form-label">
                <input
                  type="text"
                  required
                  placeholder="Email"
                  onChange={(event) => setEmailInput(event.target.value)}
                />
              </div>
              <button className="share-button" onClick={() => handleShare()}>
                Share
              </button>
            </div>
          </div>
        </div>
        {shared && (
          <p className="share-list-success">List shared successfully!</p>
        )}
        {error && <p className="share-list-error">{error}</p>}
      </div>
    </div>
  );
};

export default Modal;

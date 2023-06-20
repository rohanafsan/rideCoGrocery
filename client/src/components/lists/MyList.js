import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./myList.css";

import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const MyList = () => {
  // State variables
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [lists, setLists] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [listId, setListId] = useState(null);
  const [listname, setListname] = useState("");

  // Get all lists added by the user
  useEffect(() => {
    const getLists = async () => {
      try {
        console.log(cookies.Email);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_HOST}/mylists/${cookies.Email}`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        setLists(jsonData);
      } catch (err) {
        // console.error(err.message);
        console.log("No lists found");
      }
    };
    getLists();
  }, []);

  // Redirect to the list page
  const redirectToToDo = (listid) => {
    if (listid === null) {
      setListId(1);
    }
    // navigate(`/list/${listId}`);
    // window.location.href = `/list/${listId}`;
    navigate(`/list/${listid}`);
  };

  // Add a new list to the database and update state
  const handleAddButtonClick = async () => {
    // add new item to backend server
    const newListAdd = {
      id: "",
      listname: inputValue,
      email: cookies.Email,
    };

    const newItems = [...lists, newListAdd];
    setLists(newItems);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/mylists`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newListAdd),
        }
      );
      const data = await response.json();
      newListAdd.id = data;
      const newItems = [...lists, newListAdd];
      setLists(newItems);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }

    setInputValue("");
  };

  // Delete a list from the database and update state
  const handleDeleteButtonClick = async (index) => {
    const newListDelete = lists[index];
    const newItems = lists.filter((item) => item !== lists[index]);
    setLists(newItems);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/mylists/${newListDelete.id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Share a list with another user using a share modal
  const shareList = async (e, item) => {
    e.preventDefault();
    setListId(item.id);
    setListname(item.listname);
    setOpenModal(true);
  };

  return (
    <div className="list-background">
      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          itemId={listId}
          listName={listname}
        />
      )}
      <div className="list-container">
        <p>Organize your lists, with ease.</p>
        <div className="list-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="list-item-input"
            placeholder="Add a list..."
          />
        </div>
        <div className="list-item-button">
          <button onClick={() => handleAddButtonClick()}>
            <FontAwesomeIcon icon={faPlus} /> Add List
          </button>
        </div>
        <div
          className="list-items"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          {lists.map((item, index) => (
            <div className="list-item-container" key={index}>
              <div
                className="list-item-name"
                onClick={() => redirectToToDo(item.id)}
              >
                <span>
                  <div key="{index}">{item.listname}</div>
                </span>
              </div>
              <div className="list-container-buttons">
                <div className="container-buttons">
                  <button>
                    <FontAwesomeIcon
                      icon={faTrash}
                      data-testid={`delete-button-${index}`}
                      onClick={() => handleDeleteButtonClick(index)}
                    />
                  </button>
                  <button>
                    <FontAwesomeIcon
                      icon={faShare}
                      onClick={(event) => shareList(event, item)}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyList;

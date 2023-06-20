import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faCheck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "./toDo.css";
import { useCookies } from "react-cookie";
import LazyLoad from "react-lazyload";

const ToDoComponent = () => {
  // State variables
  const { id } = useParams();

  const [cookies, setCookie, removeCookie] = useCookies(null);

  const [items, setItems] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [item, setItem] = useState({});
  const [index, setIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Get all items added by the user
  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_HOST}/todoList/${id}`
        );
        const jsonData = await response.json();
        if (jsonData.length > 0) {
          setItems(jsonData);
        } else {
          console.log("No items found");
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    getItems();
  }, []);

  // Add an item from the database and update state
  const handleAddButtonClick = async () => {
    const newItem = {
      id: "",
      title: inputValue,
      quantity: quantity,
      listid: id,
      isSelected: false,
    };

    const testItem = {
      title: inputValue,
      quantity: quantity,
      listid: id,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue("");
    setQuantity("");

    // Add new item to backend server
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/todoList`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testItem),
        }
      );
      const data = await response.json();
      newItem.id = data.id;
      const newItems = [...items, newItem];
      setItems(newItems);

      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Edit an item in the database and update state
  const handleEditButtonClick = (item, listIndex) => {
    // add new item to backend server
    setInputValue(item.title);
    setQuantity(item.quantity);
    setIsEdit(true);
    setItem(item);
    setIndex(listIndex);
  };

  // Update an item in the database and update state
  const editListItem = async () => {
    const updateItem = {
      id: item.id,
      title: inputValue,
      quantity: quantity,
      listid: item.listid,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/todoList/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateItem),
        }
      );
      setIsEdit(false);
      setInputValue("");
      setQuantity("");
      const data = await response.json();
      console.log("data");
      console.log(data[0]["title"]);
      const newItems = [...items];
      newItems[index].title = data[0]["title"];
      newItems[index].quantity = data[0]["quantity"];
      setItems(newItems);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Delete an item from the database and update state
  const handleDeleteButtonClick = async (itemId, listIndex) => {
    // delete item from backend server

    setItems((items) => items.filter((_, i) => i !== listIndex));
    setIsEdit(false);
    setInputValue("");
    setQuantity("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/todoList/${itemId}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Toggle an item's completion status in state and delete item from database
  const toggleComplete = async (index) => {
    const newItems = [...items];

    newItems[index].isSelected = !newItems[index].isSelected;

    setItems(newItems);

    //
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_HOST}/todoList/${newItems[index].id}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <LazyLoad>
      <div className="app-background">
        <div className="main-container">
          <div className="input-container">
            <div className="add-item-box">
              <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                className="add-item-input"
                placeholder="Add an item..."
              />
            </div>
            <div className="add-item-box">
              <select
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className="add-item-quantity"
                placeholder="Add quantity..."
              >
                <option value="">Select quantity...</option>
                {[...Array(20)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="add-item-button">
            {!isEdit ? (
              <button onClick={() => handleAddButtonClick()}>
                <FontAwesomeIcon icon={faPlus} /> Add Item
              </button>
            ) : (
              <button onClick={() => editListItem()}>
                <FontAwesomeIcon icon={faPlus} /> Update Item
              </button>
            )}
          </div>
          <div
            className="item-list"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {items.map((item, listIndex) => (
              <div className="item-container" key={listIndex}>
                <div className="item-name">
                  {item.isSelected ? (
                    <>
                      <span className="completed">
                        {item.title + ":" + item.quantity}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{item.title + ":" + item.quantity}</span>
                    </>
                  )}
                </div>
                <div className="to-do-container-buttons">
                  <button>
                    <FontAwesomeIcon
                      icon={faCheck}
                      onClick={() => toggleComplete(listIndex)}
                      data-testid="complete-button"
                    />
                  </button>
                  <button>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleEditButtonClick(item, listIndex)}
                      data-testid="edit-button"
                    />
                  </button>
                  <button>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() =>
                        handleDeleteButtonClick(item.id, listIndex)
                      }
                      data-testid="delete-button"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LazyLoad>
  );
};

export default ToDoComponent;

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./sharelist.css";

const ShareList = () => {
  // State variables
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [lists, setLists] = useState([]);
  const [isEmpty, setEmpty] = useState(true);
  const navigate = useNavigate();

  // Get all lists shared with the user
  useEffect(() => {
    console.log(cookies.Email);
    const getLists = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/sharelists/${cookies.Email}`
        );
        const jsonData = await response.json();
        if (jsonData.length > 0) {
          setEmpty(false);
          setLists(jsonData);
          console.log(jsonData);
        }
      } catch (err) {
        // console.error(err.message);
        console.log("No lists found");
      }
    };
    getLists();
  }, []);

  // Redirect to the list page
  const redirectToToDo = (listid) => {
    // navigate(`/list/${listId}`);
    // window.location.href = `/list/${listId}`;
    navigate(`/list/${listid}`);
  };

  return (
    <div className="share-list-background">
      <div className="share-list-container">
        {isEmpty ? (
          <div className="empty-lists">
            {cookies.Email === undefined ? (
              <div className="landing-buttons">
                <p>Please login to view your shared lists.</p>
                <Link to="/login" className="landing-button">
                  Login
                </Link>
              </div>
            ) : (
              <p>Your shared lists will show here.</p>
            )}
          </div>
        ) : (
          <div
            className="share-list-items"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <div className="empty-lists">
              <p>Here are the lists shared with you:</p>
            </div>
            {lists.map((item, index) => (
              <div className="share-list-item-container" key={index}>
                <div onClick={() => redirectToToDo(item.itemid)}>
                  <span>
                    <div>
                      <p className="share-list-name">{item.name}</p>
                    </div>
                  </span>
                  <span>
                    <div className="share-list-item-email">
                      Shared by: {item.sharedby}
                    </div>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareList;

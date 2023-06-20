import ToDoComponent from "./components/ToDoComponent";
import AuthComponent from "./components/Auth";
import HeaderBar from "./components/Header";
import Landing from "./components/Landing";
import MyList from "./components/MyList";
import Login from "./components/Login";
import ShareList from "./components/ShareList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <HeaderBar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/list/:id" element={<ToDoComponent />} />
        <Route path="/signup" element={<AuthComponent />} />

        <Route path="/login" element={<Login />} />
        <Route path="/mylists" element={<MyList />} />
        <Route path="/sharedlists" element={<ShareList />} />
      </Routes>
    </Router>
  );
}

export default App;

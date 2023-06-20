// import ToDoComponent from "./components/ToDoComponent";
import AuthComponent from "./components/auth/Auth";
import HeaderBar from "./components/landing/Header";
import Landing from "./components/landing/Landing";
import MyList from "./components/lists/MyList";
import Login from "./components/auth/Login";
import ShareList from "./components/lists/ShareList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <HeaderBar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        {/* <Route path="/list/:id" element={<ToDoComponent />} /> */}
        <Route path="/register" element={<AuthComponent />} />

        <Route path="/login" element={<Login />} />
        <Route path="/mylists" element={<MyList />} />
        <Route path="/sharedlists" element={<ShareList />} />
      </Routes>
    </Router>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { loadUser } from "./Redux/Actions/userActions";
import Profile from "./components/Profile/Profile";
import UpdatePassword from "./components/Profile/UpdatePassword";
import UpdateProfile from "./components/Profile/UpdateProfile";
import Login from "./components/Authenticate/Login";
import SignUp from "./components/Authenticate/SignUp";
import AddNote from "./components/Notes/AddNote";
import MyNotes from "./components/Notes/MyNotes";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/addnote" element={<AddNote />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/password/change" element={<UpdatePassword />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
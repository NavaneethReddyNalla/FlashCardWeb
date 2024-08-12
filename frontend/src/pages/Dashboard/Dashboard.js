import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Dashboard.css";
import Drawer from "../../components/Drawer/Drawer";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/slices/userSlice";
import { Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signOut() {
    dispatch(reset());
    navigate("/");
  }

  return (
    <>
      <div className="navButtonContainer">
        <button className="navButton" onClick={() => setDrawer(true)}>
          <GiHamburgerMenu className="fs-1" />
        </button>
      </div>
      <Drawer open={drawer} setOpen={setDrawer}>
        <button>Create Card</button>
        <button>Edit Card</button>
        <button onClick={signOut}>Sign Out</button>
      </Drawer>
      <Outlet />
    </>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Dashboard.css";
import Drawer from "../../components/Drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/slices/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCards } from "../../redux/slices/flashcardSlice";

function Dashboard() {
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);

  function signOut() {
    dispatch(reset());
    navigate("/");
  }

  useEffect(() => {
    const fetchCards = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_HOST_URL}/cards/${userId}`
      );

      if (res.data.length) {
        dispatch(setCards(res.data));
      } else {
        dispatch(
          setCards([
            {
              id: 0,
              user_id: null,
              question: "Did you create any cards?",
              answer: "No. Create some cards from the create cards menu.",
              category: "No Cards",
            },
          ])
        );
      }
    };

    fetchCards();
  }, [dispatch, userId]);

  return (
    <>
      <div className="navButtonContainer">
        <button className="navButton" onClick={() => setDrawer(true)}>
          <GiHamburgerMenu className="fs-1" />
        </button>
      </div>
      <Drawer open={drawer} setOpen={setDrawer}>
        <button onClick={() => navigate("/")}>Flash Cards</button>
        <button onClick={() => navigate("/create")}>Create Card</button>
        <button onClick={() => navigate("/edit")}>Edit Card</button>
        <button onClick={signOut} className="text-danger">
          Sign Out
        </button>
      </Drawer>
      <Outlet />
    </>
  );
}

export default Dashboard;

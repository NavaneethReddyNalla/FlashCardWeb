import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home p-4">
      <Link to="/login" className="d-block btn w-25 mx-auto btn-primary m-1">
        Login
      </Link>
      <Link to="/register" className="d-block btn btn-info w-25 mx-auto m-1">
        Register
      </Link>
    </div>
  );
}

export default Home;

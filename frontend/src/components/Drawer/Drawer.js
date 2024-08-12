import "./Drawer.css";
import React from "react";
import { IoClose } from "react-icons/io5";

function Drawer({ open, setOpen, children }) {
  return (
    <div className={`drawer ${open && "drawer-open"}`}>
      <div className="btn drawer-close" onClick={() => setOpen(false)}>
        <IoClose className="fs-2 drawer-close-icon" />
      </div>
      {children}
    </div>
  );
}

export default Drawer;

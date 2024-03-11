import React from "react";
import "./Sidebar.css";
import Histogram from "../histogram/Histogram";
import Icongrid from "../icongrid/Icongrid";

function Sidebar({displayHistogram, handleOperation}) {
return (
    <div className="sidebar">
        <Histogram displayHistogram={displayHistogram}/>
        <Icongrid  
        handleOperation = {handleOperation}
        />
    </div>
  );
}

export default Sidebar;

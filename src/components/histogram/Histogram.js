import React from "react";
import "./Histogram.css";

function Histogram({displayHistogram}) {
return (
    <div className="histogram">
         {displayHistogram && <img src={displayHistogram} alt="Histogram Unavailable" className="histogram" />}
    </div>
  );
}

export default Histogram;

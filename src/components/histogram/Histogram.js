import React from "react";
import "./Histogram.css";

/**
 * Histogram component to display image histogram.
 * @param {Object} props - Component props
 * @param {string} props.displayHistogram - URL of the histogram image to display
 * @returns {JSX.Element} Histogram component JSX
 */
function Histogram({ displayHistogram }) {
  return (
    <div className="histogram">
      {/* Display the histogram image if available */}
      {displayHistogram && <img src={displayHistogram} alt="Histogram Unavailable" className="histogram" />}
    </div>
  );
}

export default Histogram;

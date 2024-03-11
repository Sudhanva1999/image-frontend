import React from "react";
import "./Sidebar.css";
import Histogram from "../histogram/Histogram";
import Icongrid from "../icongrid/Icongrid";

/**
 * Sidebar component for displaying histogram and icon grid.
 * @param {Object} props - Component props.
 * @param {boolean} props.displayHistogram - Whether to display the histogram.
 * @param {Function} props.handleOperation - Function to handle image operations.
 * @returns {JSX.Element} - JSX for Sidebar component.
 */
function Sidebar({ displayHistogram, handleOperation }) {
  return (
    <div className="sidebar">
      {/* Histogram component */}
      <Histogram displayHistogram={displayHistogram} />

      {/* Icongrid component */}
      <Icongrid
        handleOperation={handleOperation}
      />
    </div>
  );
}

export default Sidebar;
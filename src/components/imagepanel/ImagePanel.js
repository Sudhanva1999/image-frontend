import React, { useState } from "react";
import "./ImagePanel.css";
import ResetIcon from "../../resources/menubaricons/reset-icon.png"
import UploadIcon from "../../resources/menubaricons/upload-icon.png"
import DownloadIcon from "../../resources/menubaricons/download-icon.png"
import SaveIcon from "../../resources/menubaricons/save-icon.png"

function ImagePanel({displayImage, handleImageChange}) {
    return (
        <div className="image-side">
            <div id="img-panel" className="image-panel">
                {displayImage && <img src={displayImage} alt="Uploaded" className="display-image" />}
            </div>
            <div className="menubar">
                <label htmlFor="file-upload" className="menu-icons">
                   <img className="menu-img" src={UploadIcon} />
                </label>
                <input className="menu-input" onChange={(e) => handleImageChange(e)}  id="file-upload" type="file" />
                <label htmlFor="file-upload" className="menu-icons">
                   <img className="menu-img" src={DownloadIcon} />
                </label>
                <input className="menu-input" onChange={handleImageChange}  id="file-upload" type="file" />
                <label htmlFor="file-upload" className="menu-icons">
                   <img className="menu-img" src={ResetIcon} />
                </label>
                <input className="menu-input" onChange={handleImageChange}  id="file-upload" type="file" />
                <label htmlFor="file-upload" className="menu-icons">
                   <img className="menu-img" src={SaveIcon} />
                </label>
                <input className="menu-input" onChange={() => console.log("Helloo")}  id="file-upload" type="file" />
            </div>
        </div>

    );
}

export default ImagePanel;

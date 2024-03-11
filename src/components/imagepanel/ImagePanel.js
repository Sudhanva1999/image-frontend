import React, { useState } from "react";
import "./ImagePanel.css";
import ResetIcon from "../../resources/menubaricons/reset-icon.png"
import UploadIcon from "../../resources/menubaricons/upload-icon.png"
import DownloadIcon from "../../resources/menubaricons/download-icon.png"
import SaveIcon from "../../resources/menubaricons/save-icon.png"
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

function ImagePanel({displayImage, handleImageChange, handleDownload, handleReset, handleSaveOriginal}) {
    return (
        <div className="image-side">
            <div id="img-panel" className="image-panel">
                {displayImage && <img src={displayImage} alt="Uploaded" className="display-image" />}
            </div>
            <div className="menubar">
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Upload Image">
                <label htmlFor="file-upload" className="menu-icons">
                   <img className="menu-img" src={UploadIcon} />
                </label>
                </Tooltip>
                <input className="menu-input" onChange={(e) => handleImageChange(e)}  id="file-upload" type="file" />

                <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Download Image">
                <label htmlFor="file-download" className="menu-icons">
                   <img className="menu-img" src={DownloadIcon} />
                </label>
              
                </Tooltip>
                <input className="menu-input" onClick={() => handleDownload()}  id="file-download" />

                <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Reset to original">
                <label htmlFor="file-reset" className="menu-icons">
                   <img className="menu-img" src={ResetIcon} />
                </label>
              
                </Tooltip>
                <input className="menu-input" onClick={() => handleReset()}  id="file-reset"  />


                <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Save as original">
                <label htmlFor="file-save-original" className="menu-icons">
                   <img className="menu-img" src={SaveIcon} />
                </label>
               
                </Tooltip>
                <input className="menu-input" onClick={() => handleSaveOriginal()}   id="file-save-original" />
            </div>
        </div>

    );
}

export default ImagePanel;

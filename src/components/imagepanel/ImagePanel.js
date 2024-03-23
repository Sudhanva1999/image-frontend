import React from "react";
import "./ImagePanel.css";
import ResetIcon from "../../resources/menubaricons/reset-icon.png"
import UploadIcon from "../../resources/menubaricons/upload-icon.png"
import DownloadIcon from "../../resources/menubaricons/download-icon.png"
import SaveIcon from "../../resources/menubaricons/save-icon.png"
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

/**
 * ImagePanel component for displaying uploaded images and menu bar options.
 * @param {Object} props - Component props.
 * @param {string} props.displayImage - URL of the image to display.
 * @param {Function} props.handleImageChange - Function to handle image upload.
 * @param {Function} props.handleDownload - Function to handle image download.
 * @param {Function} props.handleReset - Function to reset the image to its original state.
 * @param {Function} props.handleSaveOriginal - Function to save the image as original.
 * @returns {JSX.Element} - JSX for ImagePanel component.
 */
function ImagePanel({ displayImage, handleImageChange, handleDownload, handleReset, handleSaveOriginal }) {
    return (
        <div className="image-side">
            <div id="img-panel" className="image-panel">
                {/* Display uploaded image */}
                {displayImage ? (
                    <img src={displayImage} alt="Uploaded" className="display-image" />
                ) : (
                    <p className="altText">Load an image to get started &#x2192;</p>
                )}
            </div>
            {/* Menu bar */}
            <div className="menubar">
                {/* Upload Image */}
                <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Upload Image">
                    <label htmlFor="file-upload" className="button-icon-menu">
                        <img className="menu-img" src={UploadIcon} alt="Upload Icon" />
                    </label>
                </Tooltip>
                <input className="menu-input" onChange={(e) => handleImageChange(e)} id="file-upload" type="file" />

                {/* Download Image */}
                <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Download Image">
                    <label htmlFor="file-download" className="button-icon-menu">
                        <img className="menu-img" src={DownloadIcon} alt="Download Icon" />
                    </label>
                </Tooltip>
                <input className="menu-input" onClick={() => handleDownload()} id="file-download" />

                {/* Reset to original */}
                <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Reset to original">
                    <label htmlFor="file-reset" className="button-icon-menu">
                        <img className="menu-img" src={ResetIcon} alt="Reset Icon" />
                    </label>
                </Tooltip>
                <input className="menu-input" onClick={() => handleReset()} id="file-reset" />

                {/* Save as original */}
                <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Save as original">
                    <label htmlFor="file-save-original" className="button-icon-menu">
                        <img className="menu-img" src={SaveIcon} alt="Save Icon" />
                    </label>
                </Tooltip>
                <input className="menu-input" onClick={() => handleSaveOriginal()} id="file-save-original" />
            </div>
        </div>
    );
}

export default ImagePanel;

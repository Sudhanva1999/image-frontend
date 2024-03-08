import React from "react";
import "./Icongrid.css";

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';


import BlueIcon from "../../resources/commandIcons/blue-icon.png";
import GreenIcon from "../../resources/commandIcons/green-icon.png";
import RedIcon from "../../resources/commandIcons/red-icon.png";

import BlurIcon from "../../resources/commandIcons/blur-icon.png";
import SharpenIcon from "../../resources/commandIcons/sharpen-icon.png";

import BrightenIcon from "../../resources/commandIcons/brighten-icon.png";
import DarkenIcon from "../../resources/commandIcons/darken-icon.png";

import GreyscaleIcon from "../../resources/commandIcons/greyscale-icon.png";
import SepiaIcon from "../../resources/commandIcons/sepia-icon.png";

import HorizontalIcon from "../../resources/commandIcons/horizontal-icon.png";
import VerticalIcon from "../../resources/commandIcons/vertical-icon.png";

import IntensityIcon from "../../resources/commandIcons/intensity-icon.png";
import LumaIcon from "../../resources/commandIcons/luma-icon.png";
import ValueIcon from "../../resources/commandIcons/value-icon.png";

import LevelsIcon from "../../resources/commandIcons/levels-adjustment-icon.png";
import ColorCorrectIcon from "../../resources/commandIcons/color-correct-icon.png";
import CompressIcon from "../../resources/commandIcons/compress-icon.png";




function Icongrid({handleOperation}) {
    return (
        <div className="icongrid flex-container">
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Generate Red Component">
                <div className="command-icon" onClick={ () => handleOperation("/component/color?color=red&")}> 
                    <img className="icon" src={RedIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Generate Green Component">
                <div className="command-icon" onClick={ () => handleOperation("/component/color?color=green&")}>
                    <img className="icon" src={GreenIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Generate Blue Component">
                <div className="command-icon" onClick={ () => handleOperation("/component/color?color=blue&")}>
                    <img className="icon" src={BlueIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Sharpen Image">

                <div className="command-icon" onClick={ () => handleOperation("/sharpen?")}>
                    <img className="icon" src={SharpenIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Blur Image">
                <div className="command-icon" onClick={ () => handleOperation("/blur?")}>
                    <img className="icon" src={BlurIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Darken Image">
                <div className="command-icon" >
                    <img className="icon" src={DarkenIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Brighten Image">
                <div className="command-icon" >
                    <img className="icon" src={BrightenIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Luma Component Image">
                <div className="command-icon" onClick={ () => handleOperation("/component/ilv?ilv=luma&")}>
                    <img className="icon" src={LumaIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Value Component Image">
                <div className="command-icon"  onClick={ () => handleOperation("/component/ilv?ilv=value&")}>
                    <img className="icon" src={ValueIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Intensity Component Image">
                <div className="command-icon"  onClick={ () => handleOperation("/component/ilv?ilv=intensity&")}>
                    <img className="icon" src={IntensityIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Greyscale Filter">
                <div className="command-icon" onClick={ () => handleOperation("/filter/greyscale?")}>
                    <img className="icon" src={GreyscaleIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Sepia Filter">
                <div className="command-icon" onClick={ () => handleOperation("/filter/sepia?")}>
                    <img className="icon" src={SepiaIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Color Correct Image">
                <div className="command-icon">
                    <img className="icon" src={ColorCorrectIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Compress Image">
                <div className="command-icon">
                    <img className="icon" src={CompressIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Adjust Levels">
                <div className="command-icon">
                    <img className="icon" src={LevelsIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Flip Verticaly">
                <div className="command-icon">
                    <img className="icon" src={VerticalIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Flip Horizontaly">
                <div className="command-icon">
                    <img className="icon" src={HorizontalIcon} />
                </div>
            </Tooltip>
        </div>
    );
}

export default Icongrid;

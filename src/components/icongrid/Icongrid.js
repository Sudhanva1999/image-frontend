import { React, useState } from "react";
import "./Icongrid.css";

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Slider from '@mui/material/Slider';


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
import { Button } from "@mui/base";

function CustomPopup({ children, onClose }) {
    return (
        <div className="custom-popup-overlay">
            <div className="custom-popup">
                <div className="custom-popup-content">
                    {children}
                </div>
                <button className="custom-popup-close" onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
}

function Icongrid({ handleOperation}) {
    const [openBright, setOpenBright] = useState(false);
    const [openDark, setOpenDark] = useState(false);
    const [openCompress, setOpenCompress] = useState(false);
    const [openLevels, setOpenLevels] = useState(false);
    const [brightVal, setBrightVal] = useState(10);
    const [darkVal, setDarkVal] = useState(10);
    const [compressVal, setCompressVal] = useState(10);
    const [levelsValBlack, setLevelsValBlack] = useState(undefined);
    const [levelsValMid, setLevelsValMid] = useState(undefined);
    const [levelsValWhite, setLevelsValWhite] = useState(undefined);

    const openPopup = (operation) => {
        switch (operation) {
            case 'bright':
                setOpenBright(true);
                break;
            case 'dark':
                setOpenDark(true);
                break;
            case 'compress':
                setOpenCompress(true);
                break;
            case 'levels':
                setOpenLevels(true);
                break;
            default:
                break;
        }
    };

    const closePopup = (operation) => {
        switch (operation) {
            case 'bright':
                setOpenBright(false);
                break;
            case 'dark':
                setOpenDark(false);
                break;
            case 'compress':
                setOpenCompress(false);
                break;
            case 'levels':
                setOpenLevels(false);
                break;
            default:
                break;
        }
    };

    const handleOperationInput = (operation) => {
        switch (operation) {
            case 'bright':
                handleOperation(`/brighten?factor=${brightVal}&`);
                setOpenBright(false);
                break;
            case 'dark':
                handleOperation(`/brighten?factor=-${brightVal}&`);
                setOpenDark(false);
                break;
            case 'compress':
                handleOperation(`/compress?factor=${compressVal}&`);
                setOpenCompress(false)
                break;
            case 'levels':
                if(!(levelsValBlack < levelsValMid) || !(levelsValMid < levelsValWhite)) {
                    alert("The levels must be in asecending order ! ");
                    break;
                }
                handleOperation(`/levelsAdjust?blackVal=${levelsValBlack}&midVal=${levelsValMid}&whiteVal=${levelsValWhite}&`);
                setOpenLevels(false);
                break;
            default:
                break;
        }
        
    }

    return (
        <div className="icongrid flex-container">
            {openBright && (
                <CustomPopup onClose={() => closePopup("bright")} className="popup">
                    <h1>How much do you want to brighten the image ?</h1>
                    <Slider
                        id="brightVal"
                        className="sliderClass"
                        aria-label="Small steps"
                        defaultValue={10}
                        step={10}
                        marks
                        min={10}
                        max={250}
                        valueLabelDisplay="auto"
                        onChange={(_, value) => setBrightVal(value)}
                    />
                    <Button className="button-27" onClick={() => handleOperationInput("bright")} > Brighten by {brightVal}</Button>
                </CustomPopup>
            )}

            {openDark && (
                <CustomPopup onClose={() => closePopup("dark")} className="popup">
                    <h1>How much do you want to darken the image ?</h1>
                    <Slider
                        id="darkVal"
                        className="sliderClass"
                        aria-label="Small steps"
                        defaultValue={10}
                        step={10}
                        marks
                        min={10}
                        max={250}
                        onChange={(_, value) => setDarkVal(value)}
                        valueLabelDisplay="auto"
                    />
                    <Button className="button-27" onClick={() => handleOperationInput("dark")}> Darken  by {darkVal}</Button>
                </CustomPopup>
            )}

            {openCompress && (
                <CustomPopup onClose={() => closePopup("compress")} className="popup">
                    <h1>How much do you want to compress the image ?</h1>
                    <Slider
                        id="compressVal"
                        className="sliderClass"
                        aria-label="Small steps"
                        defaultValue={10}
                        step={10}
                        marks
                        min={10}
                        max={90}
                        valueLabelDisplay="auto"
                        onChange={(_, value) => setCompressVal(value)}
                    />
                    <Button className="button-27" onClick={() => handleOperationInput("compress")}> Compress by {compressVal}</Button>
                </CustomPopup>
            )}

            {openLevels && (
                <CustomPopup onClose={() => closePopup("levels")} className="popup">
                    <h1>Adjust slider values to adjust color levels in image.</h1>
                    <h3>Black Value</h3>
                    <Slider
                        id="colorBlackVal"
                        className="sliderClass"
                        aria-label="Small steps"
                        defaultValue={10}
                        step={10}
                        marks
                        min={0}
                        max={250}
                        valueLabelDisplay="auto"
                        onChange={(_, value) => setLevelsValBlack(value)}
                    />
                    <h3>Mid Value</h3>
                    <Slider
                        id="colorMidVal"
                        className="sliderClass"
                        aria-label="Small steps"
                        defaultValue={10}
                        step={10}
                        marks
                        min={0}
                        max={250}
                        valueLabelDisplay="auto"
                        onChange={(_, value) => setLevelsValMid(value)}
                    />
                    <h3>White Value</h3>
                    <Slider
                        id="colorWhiteVal"
                        className="sliderClass"
                        aria-label="Small steps"
                        defaultValue={10}
                        step={10}
                        marks
                        min={0}
                        max={250}
                        valueLabelDisplay="auto"
                        onChange={(_, value) => setLevelsValWhite(value)}
                    />
                    <Button className="button-27"> Black:{levelsValBlack}, Mid:{levelsValMid}, White:{levelsValWhite}</Button>
                    <Button className="button-27" onClick={() => handleOperationInput("levels")}> Adjust Levels</Button>
                </CustomPopup>
            )}

            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Generate Red Component">
                <div className="command-icon" onClick={() => handleOperation("/component/color?color=red&")}>
                    <img className="icon" src={RedIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Generate Green Component">
                <div className="command-icon" onClick={() => handleOperation("/component/color?color=green&")}>
                    <img className="icon" src={GreenIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Generate Blue Component">
                <div className="command-icon" onClick={() => handleOperation("/component/color?color=blue&")}>
                    <img className="icon" src={BlueIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Sharpen Image">

                <div className="command-icon" onClick={() => handleOperation("/sharpen?")}>
                    <img className="icon" src={SharpenIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Blur Image">
                <div className="command-icon" onClick={() => handleOperation("/blur?")}>
                    <img className="icon" src={BlurIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Darken Image">
                <div className="command-icon" onClick={() => openPopup("dark")} >
                    <img className="icon" src={DarkenIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Brighten Image">
                <div className="command-icon" onClick={() => openPopup("bright")} >
                    <img className="icon" src={BrightenIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Luma Component Image">
                <div className="command-icon" onClick={() => handleOperation("/component/ilv?ilv=luma&")}>
                    <img className="icon" src={LumaIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Value Component Image">
                <div className="command-icon" onClick={() => handleOperation("/component/ilv?ilv=value&")}>
                    <img className="icon" src={ValueIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Intensity Component Image">
                <div className="command-icon" onClick={() => handleOperation("/component/ilv?ilv=intensity&")}>
                    <img className="icon" src={IntensityIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Greyscale Filter">
                <div className="command-icon" onClick={() => handleOperation("/filter/greyscale?")}>
                    <img className="icon" src={GreyscaleIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Sepia Filter">
                <div className="command-icon" onClick={() => handleOperation("/filter/sepia?")}>
                    <img className="icon" src={SepiaIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Color Correct Image">
                <div className="command-icon" onClick={() => handleOperation("/color-correct?")}>
                    <img className="icon" src={ColorCorrectIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Compress Image">
                <div className="command-icon" onClick={() => openPopup("compress")}>
                    <img className="icon" src={CompressIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Adjust Levels">
                <div className="command-icon" onClick={() => openPopup("levels")}>
                    <img className="icon" src={LevelsIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Flip Verticaly">
                <div className="command-icon" onClick={() => handleOperation("/flip?axis=x&")}>
                    <img className="icon" src={VerticalIcon} />
                </div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} enterDelay={600} title="Flip Horizontaly">
                <div className="command-icon" onClick={() => handleOperation("/flip?axis=y&")}>
                    <img className="icon" src={HorizontalIcon} />
                </div>
            </Tooltip>
        </div>
    );
}

export default Icongrid;

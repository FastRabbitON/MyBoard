import { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

const BoardSettings = ({
    selectedBackgroundColor,
    setSelectedBackgroundColor,
    boardTitleSize,
    setBoardTitleSize,
    boardTitleColor,
    setBoardTitleColor,
    boardFontStyle,
    setBoardFontStyle,
    activeBoardSettings,
    setActiveBoardSettings,
    BoardSettingsWindow,
    activeNoteSettings,
    setActiveNoteSettings,
    activeClockSettings,
    setActiveClockSettings
}) => {

    //VARIABLES
    const [boardPlaneColor, setBoardPlaneColor] = useState(() => {
        const localDataTitle = localStorage.getItem("BackgroundPlane");
        return localDataTitle ? JSON.parse(localDataTitle) : "#b7b6bb";
    })

    const [boardGradOneColor, setBoardGradOneColor] = useState(() => {
        const localDataTitle = localStorage.getItem("BackgroundGradOne");
        return localDataTitle ? JSON.parse(localDataTitle) : "#3f5efb";
    })

    const [boardGradTwoColor, setBoardGradTwoColor] = useState(() => {
        const localDataTitle = localStorage.getItem("BackgroundGradTwo");
        return localDataTitle ? JSON.parse(localDataTitle) : "#fc466b";
    })

    const [isActiveBackgroundBoard, setIsActiveBckgroundBoard] = useState(false);
    const OpenColorBackgroundBoard = () => {
        setIsActiveBckgroundBoard(current => !current);
    }

    const [isActiveGradOneBoard, setIsActiveGradOneBoard] = useState(false);
    const OpenColorGradOneBoard = () => {
        setIsActiveGradOneBoard(current => !current);
    }

    const [isActiveGradTwoBoard, setIsActiveGradTwoBoard] = useState(false);
    const OpenColorGradTwoBoard = () => {
        setIsActiveGradTwoBoard(current => !current);
    }

    const [isActiveColorTitleBoard, setIsActiveColorTitleBoard] = useState(false);
    const OpenColorTitleBoard = () => {
        setIsActiveColorTitleBoard(current => !current);
    }


    //SAVE TO LOCALSTORE
    useEffect(() => {
        localStorage.setItem("BackgroundSave", JSON.stringify(selectedBackgroundColor))
    }, [selectedBackgroundColor])

    useEffect(() => {
        localStorage.setItem("BackgroundPlane", JSON.stringify(boardPlaneColor))
    }, [boardPlaneColor])

    useEffect(() => {
        localStorage.setItem("BackgroundGrdOne", JSON.stringify(boardGradOneColor))
    }, [boardGradOneColor])

    useEffect(() => {
        localStorage.setItem("BackgroundGradTwo", JSON.stringify(boardGradTwoColor))
    }, [boardGradTwoColor])

    useEffect(() => {
        localStorage.setItem("BackgroundTitleSize", JSON.stringify(boardTitleSize))
    }, [boardTitleSize])

    useEffect(() => {
        localStorage.setItem("BackgroundTitleColor", JSON.stringify(boardTitleColor))
    }, [boardTitleColor])

    useEffect(() => {
        localStorage.setItem("BoardFontStyle", JSON.stringify(boardFontStyle))
    }, [boardFontStyle])



    //GET COLORS FROM COLORPICKER
    const PickerChangePlane = (e) => {
        setSelectedBackgroundColor(`linear-gradient(90deg, ${e.hex}, ${e.hex})`)
        setBoardPlaneColor(e.hex)
    }

    const PickerChangeGradOne = (e) => {
        setSelectedBackgroundColor(`linear-gradient(90deg, ${e.hex}, ${boardGradTwoColor})`)
        setBoardGradOneColor(e.hex)
    }

    const PickerChangeGradTwo = (e) => {
        setSelectedBackgroundColor(`linear-gradient(90deg, ${boardGradOneColor}, ${e.hex})`)
        setBoardGradTwoColor(e.hex)
    }


    return (

        <div>



            <div className={`SettingsContainer ${activeBoardSettings ? "On" : "Off"}`}>
                <button className="CloseSettingNoteBtn" onClick={BoardSettingsWindow}>X</button>

                <div className="SettingsSectionsContainer">

                    <div className="SettingsSectionsTitle">Board Background Color</div>

                    <div className="SettingsSectionsContent">

                        <div className='ColorContainer'>
                            <div className="ColorTitle">Plane</div>
                            <button className="ColorBtn" onClick={OpenColorBackgroundBoard} style={{ backgroundColor: boardPlaneColor }}> </button>
                        </div>


                        <div className={`ColorPicker ${isActiveBackgroundBoard ? "On" : "Off"}`}>
                            <ChromePicker
                                disableAlpha
                                color={boardPlaneColor}
                                onChange={PickerChangePlane}
                            />
                        </div>


                        <div className='ColorContainer'>
                            <div className="ColorTitle">Gradient</div>
                            <button className="ColorBtn" onClick={OpenColorGradOneBoard} style={{ backgroundColor: boardGradOneColor }}> </button>
                            <button className="ColorBtn" onClick={OpenColorGradTwoBoard} style={{ backgroundColor: boardGradTwoColor }}> </button>
                        </div>


                        <div className={`ColorPicker ${isActiveGradOneBoard ? "On" : "Off"}`}>
                            <ChromePicker
                                disableAlpha
                                color={boardGradOneColor}
                                onChange={PickerChangeGradOne} />

                        </div>
                        <div className={`ColorPicker ${isActiveGradTwoBoard ? "On" : "Off"}`}>
                            <ChromePicker
                                disableAlpha
                                color={boardGradTwoColor}
                                onChange={PickerChangeGradTwo} />
                        </div>

                    </div>

                </div>

                <div className="SettingsSectionsContainer">

                    <div className="SettingsSectionsTitle">Board Title Color</div>

                    <div className="SettingsSectionsContent">

                        <div className='ColorContainer'>
                            <div className="ColorTitle">Color</div>
                            <button className="ColorBtn" onClick={OpenColorTitleBoard} style={{ backgroundColor: boardTitleColor }}> </button>
                        </div>


                        <div className={`ColorPicker ${isActiveColorTitleBoard ? "On" : "Off"}`}>
                            <ChromePicker
                                disableAlpha
                                color={boardTitleColor}
                                onChange={(e) => setBoardTitleColor(e.hex)} />
                        </div>


                    </div>
                </div>

                <div className="SettingsSectionsContainer">
                    <div className="SettingsSectionsTitle">Board Title Size</div>

                    <div className="SettingsSectionsContent">

                        <div className="DimentionContainer">
                            <div className='HorizontalSettings'>
                                TitleSize
                                <input
                                    className='HorizontalSlider'
                                    type="range"
                                    min="5"
                                    step="1"
                                    max={100}
                                    value={boardTitleSize}
                                    onChange={(e) => setBoardTitleSize(e.target.value)}
                                />
                                <input
                                    className='HorizontalInput'
                                    type="number"
                                    value={boardTitleSize}
                                    onChange={(e) => setBoardTitleSize(e.target.value)}
                                />
                            </div>

                        </div>
                    </div>


                </div>

                <div className="SettingsSectionsContainer">

                    <div className="SettingsSectionsTitle">Title Font Style</div>

                    <div className="SettingsSectionsContent">
                        <select className="DropSelection" onChange={(e) => setBoardFontStyle(e.target.value)} style={{ fontFamily: boardFontStyle }}>
                            <option value="Arial, Helvetica, sans-serif" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Your Font</option>
                            <option value="Shantell Sans, cursive" style={{ fontFamily: "Shantell Sans, cursive" }}>Your Font</option>
                            <option value="Quintessential, cursive" style={{ fontFamily: "Quintessential, cursive" }}>Your Font</option>
                            <option value="Spline Sans Mono, monospace" style={{ fontFamily: "Spline Sans Mono, monospace" }}>Your Font</option>
                        </select>
                    </div>

                </div>


            </div>

        </div>
    );
}

export default BoardSettings;
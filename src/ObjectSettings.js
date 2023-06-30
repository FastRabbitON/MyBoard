import { useState } from 'react';
import { ChromePicker, } from 'react-color';

import "./ObjectSettingsStyle.css"


const ObjectSettings = ({
    nowActiveObjectID,
    setNowActiveObjectID,

    nowActiveObjectType,
    setNowActiveObjectType,

    activeObjectSettings,
    setActiveObjectSettings,

    backgroundColor,
    setBackgroundColor,

    fontColor,
    setFontColor,

    accentColor,
    setAccentColor,

    isShadow,
    setIsShadow,

    positionFromLeft,
    setPositionFromLeft,

    positionFromTop,
    setPositionFromTop,

    sizeX,
    setSizeX,

    sizeY,
    setSizeY,

    titleSize,
    setTitleSize,

    contentSize,
    setContentSize,

    layer,
    setLayer,

    fontStyle,
    setNoteFontStyle,

    angle,
    setAngle,

    //Unique for Note
    contentNote,
    setContentNote,

    nowActiveTitle,
    setNowActiveTitle,

    //Unique For Clock

    clockForm,
    setClockForm,

    //Unique For Weather
    sizeWeatherIco,
    setSizeWeatherIco,

    //Functions
    GeneralAttributeChanger
}) => {



    const [isActiveBckground, setIsActiveBckground] = useState(false);
    const OpenColorBackground = () => {
        setIsActiveBckground(current => !current);
    }

    const [isActiveFont, setIsActiveFont] = useState(false);
    const OpenColorFont = () => {
        setIsActiveFont(current => !current);
    }

    const [isActiveAcccent, setIsActiveAccent] = useState(false);
    const OpenColorAccent = () => {
        setIsActiveAccent(current => !current);
    }




    const BackgroundColorChanger = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setBackgroundColor(newColor);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeColor', newColor);
    };

    const FontColorChanger = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setFontColor(newColor);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeFontColor', newColor);
    }

    const AccentColorChanger = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setAccentColor(newColor);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeAccentColor', newColor);
    }

    const ShadowChanger = () => {
        const shadow = !isShadow
        setIsShadow(shadow)
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeShadow', shadow);
        console.log(shadow)
    }

    const TitleSizeChanger = (event) => {
        const newSize = event.target.value;
        setTitleSize(newSize);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeTitleSize', newSize);
    }

    const ContentSizeChanger = (event) => {
        const newSize = event.target.value;
        setContentSize(newSize);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeContentSize', newSize);
    }

    const FontStyleChanger = (event) => {
        const newStyle = event.target.value;
        setNoteFontStyle(newStyle);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeFontStyle', newStyle);
    }

    const LayerChanger = (event) => {
        const newLayer = event.target.value;
        setLayer(newLayer);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeLayer', newLayer);
    }

    const LayerUp = () => {
        if (layer < 49) {
            const newLayer = Number(layer + 1);
            setLayer(newLayer);
            GeneralAttributeChanger(nowActiveObjectID, "AttributeLayer", newLayer);
        }
    }

    const LayerDown = () => {
        if (layer > 0) {
            const newLayer = Number(layer - 1);
            setLayer(newLayer);
            GeneralAttributeChanger(nowActiveObjectID, "AttributeLayer", newLayer)
        }
    }

    const PositionLeftChanger = (event) => {
        const newPosition = event.target.value;
        setPositionFromLeft(newPosition);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributePositionLeft', newPosition);
    }

    const PositionTopChanger = (event) => {
        const newPosition = event.target.value;
        setPositionFromTop(newPosition);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributePositionTop', newPosition);

    }

    const SizeXChanger = (event) => {
        const newSize = event.target.value;
        setSizeX(newSize);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeWidth', newSize);
    }

    const SizeYChanger = (event) => {
        const newSize = event.target.value;
        setSizeY(newSize);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeHeight', newSize);
    }

    const AngleChanger = (event) => {
        const newAngle = event.target.value
        setAngle(newAngle)
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeAngle', newAngle)
    }


    // Unique For Clock

    const ClockFormChanger = (event) => {
        const newForm = event.target.value
        setClockForm(newForm)
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeClockForm', newForm);
    }


    //Unique For Weather
    const WeatherIcoSizeChanger = (event) => {
        const newSize = event.target.value;
        setSizeWeatherIco(newSize);
        GeneralAttributeChanger(nowActiveObjectID, 'AttributeIcoSize', newSize);
    }


    const CloseSettingsWindow = () => {
        setActiveObjectSettings(current => !current);
    }


    return (

        <div>


            <div className={`SettingsContainer ${activeObjectSettings ? "On" : "Off"}`}>


                <button className="CloseSettingNoteBtn" onClick={CloseSettingsWindow}>X</button>
                <div className="SettingsSectionsContainer">

                    <div className="NowEditInfo"> {nowActiveTitle}</div>
                </div>


                {/* For Note Display */}
                <div className={`${nowActiveObjectType === "Note" ? "DisplayContainer" : "EmptyContainer"}`}>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle" >Colors Settings</div>

                        <div className="SettingsSectionsContent">

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Background Color</div>
                                <button className="ColorBtn" onClick={OpenColorBackground} style={{ backgroundColor: backgroundColor }}> </button>
                            </div>


                            <div className={`ColorPicker ${isActiveBckground ? "On" : "Off"}`}>
                                <ChromePicker

                                    color={backgroundColor}
                                    onChange={BackgroundColorChanger} />
                            </div>

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Font Color</div>
                                <button className="ColorBtn" onClick={OpenColorFont} style={{ backgroundColor: fontColor }}> </button>
                            </div>

                            <div className={`ColorPicker ${isActiveFont ? "On" : "Off"}`}>
                                <ChromePicker
                                    color={fontColor}
                                    onChange={FontColorChanger} />
                            </div>

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Accents Color</div>
                                <button className="ColorBtn" onClick={OpenColorAccent} style={{ backgroundColor: accentColor }}> </button>
                            </div>

                            <div className={`ColorPicker ${isActiveAcccent ? "On" : "Off"}`}>
                                <ChromePicker
                                    color={accentColor}
                                    onChange={AccentColorChanger} />
                            </div>

                            <div className="CheckBoxContainer">
                                <label for="shadow">Shadow</label>
                                <input type="checkbox"
                                    checked={isShadow}
                                    onChange={ShadowChanger}
                                />
                            </div>

                        </div>

                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Font Size Settings</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Title Size
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="5"
                                        step="1"
                                        max={100}
                                        value={titleSize}
                                        onChange={TitleSizeChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={titleSize}
                                        onChange={TitleSizeChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Content Size
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="5"
                                        step="1"
                                        max={100}
                                        value={contentSize}
                                        onChange={ContentSizeChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={contentSize}
                                        onChange={ContentSizeChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Note Rotation</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Angle
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min={-180}
                                        step="0.1"
                                        max={180}
                                        value={angle}
                                        onChange={AngleChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={angle}
                                        onChange={AngleChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Note Font Style</div>

                        <div className="SettingsSectionsContent">
                            <select className="DropSelection" onChange={FontStyleChanger} style={{ fontFamily: fontStyle }}>
                                <option value="Shantell Sans, cursive" style={{ fontFamily: "Shantell Sans, cursive" }}>Your Font</option>
                                <option value="Arial, Helvetica, sans-serif" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Your Font</option>
                                <option value="Quintessential, cursive" style={{ fontFamily: "Quintessential, cursive" }}>Your Font</option>
                                <option value="Spline Sans Mono, monospace" style={{ fontFamily: "Spline Sans Mono, monospace" }}>Your Font</option>
                            </select>
                        </div>

                    </div>


                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Note Layer</div>

                        <div className="SettingsSectionsContent">

                            <div className="LayerContainer">

                                <button className='LayerBtn' onClick={LayerDown}>-</button>

                                <input
                                    type="number"
                                    className="HorizontalInput"
                                    min={0}
                                    max={50}
                                    value={layer}
                                    onChange={LayerChanger} />

                                <button className='LayerBtn' onClick={LayerUp}>+</button>


                            </div>

                        </div>

                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Touch screens move</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Move X axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="0"
                                        step="1"
                                        max={window.innerWidth - sizeX + 50}
                                        value={positionFromLeft}
                                        onChange={PositionLeftChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={positionFromLeft}
                                        onChange={PositionLeftChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Move Y axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="0"
                                        step="1"
                                        max={window.innerHeight - sizeY + 25}
                                        value={positionFromTop}
                                        onChange={PositionTopChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={positionFromTop}
                                        onChange={PositionTopChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Touch screens size</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Size X axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="150"
                                        step="1"
                                        max={window.innerWidth - positionFromLeft + 50}
                                        value={sizeX}
                                        onChange={SizeXChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={sizeX}
                                        onChange={SizeXChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Size Y axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="200"
                                        step="1"
                                        max={window.innerHeight - positionFromTop + 25}
                                        value={sizeY}
                                        onChange={SizeYChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={sizeY}
                                        onChange={SizeYChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>


                </div >


                {/* For Clock Display */}
                <div className={`${nowActiveObjectType === "Clock" ? "DisplayContainer" : "EmptyContainer"}`}>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle" >Colors Settings</div>

                        <div className="SettingsSectionsContent">

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Background Color</div>
                                <button className="ColorBtn" onClick={OpenColorBackground} style={{ backgroundColor: backgroundColor }}> </button>
                            </div>


                            <div className={`ColorPicker ${isActiveBckground ? "On" : "Off"}`}>
                                <ChromePicker

                                    color={backgroundColor}
                                    onChange={BackgroundColorChanger} />
                            </div>

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Font Color</div>
                                <button className="ColorBtn" onClick={OpenColorFont} style={{ backgroundColor: fontColor }}> </button>
                            </div>

                            <div className={`ColorPicker ${isActiveFont ? "On" : "Off"}`}>
                                <ChromePicker
                                    color={fontColor}
                                    onChange={FontColorChanger} />
                            </div>

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Accents Color</div>
                                <button className="ColorBtn" onClick={OpenColorAccent} style={{ backgroundColor: accentColor }}> </button>
                            </div>

                            <div className={`ColorPicker ${isActiveAcccent ? "On" : "Off"}`}>
                                <ChromePicker
                                    color={accentColor}
                                    onChange={AccentColorChanger} />
                            </div>

                            <div className="CheckBoxContainer">
                                <label for="shadow">Shadow</label>
                                <input type="checkbox"
                                    checked={isShadow}
                                    onChange={ShadowChanger}
                                />
                            </div>

                        </div>

                    </div>



                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Font Size Settings</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Hours Size
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="5"
                                        step="1"
                                        max={100}
                                        value={titleSize}
                                        onChange={TitleSizeChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={titleSize}
                                        onChange={TitleSizeChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Dates Size
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="5"
                                        step="1"
                                        max={100}
                                        value={contentSize}
                                        onChange={ContentSizeChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={contentSize}
                                        onChange={ContentSizeChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Clock Rotation</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Angle
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min={-180}
                                        step="0.1"
                                        max={180}
                                        value={angle}
                                        onChange={AngleChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={angle}
                                        onChange={AngleChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Clock Form</div>

                        <div className="SettingsSectionsContent">

                            <form className='FormSelection' onChange={ClockFormChanger}>

                                <div>
                                    <input type="radio" id="HH:MM:SS/DD.MM.YYYY" name="fav_language" value="HH:MM:SS/DD.MM.YYYY" checked={clockForm === "HH:MM:SS/DD.MM.YYYY"} />
                                    <label htmlFor="HH:MM:SS/DD.MM.YYYY"><div>HH:MM:SS</div>  <div>DD.MM.YYYY</div></label>
                                </div>


                                <div>
                                    <input type="radio" id="HH:MM/DD.MM.YYYY" name="fav_language" value="HH:MM/DD.MM.YYYY" checked={clockForm === "HH:MM/DD.MM.YYYY"} />
                                    <label htmlFor="HH:MM/DD.MM.YYYY"><div>HH:MM</div>  <div>DD.MM.YYYY</div></label>
                                </div>

                                <div>
                                    <input type="radio" id="HH:MM:SS" name="fav_language" value="HH:MM:SS" checked={clockForm === "HH:MM:SS"} />
                                    <label htmlFor="HH:MM:SS">HH:MM:SS</label>
                                </div>

                                <div>
                                    <input type="radio" id="HH:MM" name="fav_language" value="HH:MM" checked={clockForm === "HH:MM"} />
                                    <label htmlFor="HH:MM">HH:MM</label>
                                </div>

                                <div>
                                    <input type="radio" id="DD.MM.YYYY" name="fav_language" value="DD.MM.YYYY" checked={clockForm === "DD.MM.YYYY"} />
                                    <label htmlFor="DD.MM.YYYY">DD.MM.YYYY</label>
                                </div>

                            </form>

                        </div>

                    </div>


                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Clock Font Style</div>

                        <div className="SettingsSectionsContent">
                            <select className="DropSelection" onChange={FontStyleChanger} style={{ fontFamily: fontStyle }}>
                                <option value="Shantell Sans, cursive" style={{ fontFamily: "Shantell Sans, cursive" }}>Your Font</option>
                                <option value="Arial, Helvetica, sans-serif" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Your Font</option>
                                <option value="Quintessential, cursive" style={{ fontFamily: "Quintessential, cursive" }}>Your Font</option>
                                <option value="Spline Sans Mono, monospace" style={{ fontFamily: "Spline Sans Mono, monospace" }}>Your Font</option>
                            </select>
                        </div>

                    </div>


                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Clock Layer</div>

                        <div className="SettingsSectionsContent">

                            <div className="LayerContainer">

                                <button className='LayerBtn' onClick={LayerDown}>-</button>

                                <input
                                    type="number"
                                    className="HorizontalInput"
                                    min={0}
                                    max={50}
                                    value={layer}
                                    onChange={LayerChanger} />

                                <button className='LayerBtn' onClick={LayerUp}>+</button>


                            </div>

                        </div>

                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Touch screens move</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Move X axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="0"
                                        step="1"
                                        max={window.innerWidth - sizeX + 50}
                                        value={positionFromLeft}
                                        onChange={PositionLeftChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={positionFromLeft}
                                        onChange={PositionLeftChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Move Y axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="0"
                                        step="1"
                                        max={window.innerHeight - sizeY + 25}
                                        value={positionFromTop}
                                        onChange={PositionTopChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={positionFromTop}
                                        onChange={PositionTopChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Touch screens size</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Size X axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="150"
                                        step="1"
                                        max={window.innerWidth - positionFromLeft + 50}
                                        value={sizeX}
                                        onChange={SizeXChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={sizeX}
                                        onChange={SizeXChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Size Y axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="200"
                                        step="1"
                                        max={window.innerHeight - positionFromTop + 25}
                                        value={sizeY}
                                        onChange={SizeYChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={sizeY}
                                        onChange={SizeYChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>


                </div >


                {/* For Calendar Display */}
                <div className={`${nowActiveObjectType === "Calendar" ? "DisplayContainer" : "EmptyContainer"}`}>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle" >Colors Settings</div>

                        <div className="SettingsSectionsContent">

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Background Color</div>
                                <button className="ColorBtn" onClick={OpenColorBackground} style={{ backgroundColor: backgroundColor }}> </button>
                            </div>


                            <div className={`ColorPicker ${isActiveBckground ? "On" : "Off"}`}>
                                <ChromePicker

                                    color={backgroundColor}
                                    onChange={BackgroundColorChanger} />
                            </div>

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Font Color</div>
                                <button className="ColorBtn" onClick={OpenColorFont} style={{ backgroundColor: fontColor }}> </button>
                            </div>

                            <div className={`ColorPicker ${isActiveFont ? "On" : "Off"}`}>
                                <ChromePicker
                                    color={fontColor}
                                    onChange={FontColorChanger} />
                            </div>

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Accents Color</div>
                                <button className="ColorBtn" onClick={OpenColorAccent} style={{ backgroundColor: accentColor }}> </button>
                            </div>

                            <div className={`ColorPicker ${isActiveAcccent ? "On" : "Off"}`}>
                                <ChromePicker
                                    color={accentColor}
                                    onChange={AccentColorChanger} />
                            </div>

                            <div className="CheckBoxContainer">
                                <label for="shadow">Shadow</label>
                                <input type="checkbox"
                                    checked={isShadow}
                                    onChange={ShadowChanger}
                                />
                            </div>

                        </div>

                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Font Size Settings</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Title Size
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="5"
                                        step="1"
                                        max={100}
                                        value={titleSize}
                                        onChange={TitleSizeChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={titleSize}
                                        onChange={TitleSizeChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Days Size
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="5"
                                        step="1"
                                        max={100}
                                        value={contentSize}
                                        onChange={ContentSizeChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={contentSize}
                                        onChange={ContentSizeChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Calendar Rotation</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Angle
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min={-180}
                                        step="0.1"
                                        max={180}
                                        value={angle}
                                        onChange={AngleChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={angle}
                                        onChange={AngleChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Calendar Font Style</div>

                        <div className="SettingsSectionsContent">
                            <select className="DropSelection" onChange={FontStyleChanger} style={{ fontFamily: fontStyle }}>
                                <option value="Shantell Sans, cursive" style={{ fontFamily: "Shantell Sans, cursive" }}>Your Font</option>

                                <option value="Arial, Helvetica, sans-serif" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Your Font</option>
                                <option value="Quintessential, cursive" style={{ fontFamily: "Quintessential, cursive" }}>Your Font</option>
                                <option value="Spline Sans Mono, monospace" style={{ fontFamily: "Spline Sans Mono, monospace" }}>Your Font</option>
                            </select>
                        </div>

                    </div>


                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Calendar Layer </div>

                        <div className="SettingsSectionsContent">

                            <div className="LayerContainer">

                                <button className='LayerBtn' onClick={LayerDown}>-</button>

                                <input
                                    type="number"
                                    className="HorizontalInput"
                                    min={0}
                                    max={50}
                                    value={layer}
                                    onChange={LayerChanger} />

                                <button className='LayerBtn' onClick={LayerUp}>+</button>


                            </div>

                        </div>

                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Touch screens move</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Move X axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="0"
                                        step="1"
                                        max={window.innerWidth - sizeX + 50}
                                        value={positionFromLeft}
                                        onChange={PositionLeftChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={positionFromLeft}
                                        onChange={PositionLeftChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Move Y axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="0"
                                        step="1"
                                        max={window.innerHeight - sizeY + 25}
                                        value={positionFromTop}
                                        onChange={PositionTopChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={positionFromTop}
                                        onChange={PositionTopChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Touch screens size</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Size X axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="150"
                                        step="1"
                                        max={window.innerWidth - positionFromLeft + 50}
                                        value={sizeX}
                                        onChange={SizeXChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={sizeX}
                                        onChange={SizeXChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Size Y axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="200"
                                        step="1"
                                        max={window.innerHeight - positionFromTop + 25}
                                        value={sizeY}
                                        onChange={SizeYChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={sizeY}
                                        onChange={SizeYChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>


                </div >


                {/* For Weather Display */}
                <div className={`${nowActiveObjectType === "Weather" ? "DisplayContainer" : "EmptyContainer"}`}>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle" >Colors Settings</div>

                        <div className="SettingsSectionsContent">

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Background Color</div>
                                <button className="ColorBtn" onClick={OpenColorBackground} style={{ backgroundColor: backgroundColor }}> </button>
                            </div>


                            <div className={`ColorPicker ${isActiveBckground ? "On" : "Off"}`}>
                                <ChromePicker

                                    color={backgroundColor}
                                    onChange={BackgroundColorChanger} />
                            </div>

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Font Color</div>
                                <button className="ColorBtn" onClick={OpenColorFont} style={{ backgroundColor: fontColor }}> </button>
                            </div>

                            <div className={`ColorPicker ${isActiveFont ? "On" : "Off"}`}>
                                <ChromePicker
                                    color={fontColor}
                                    onChange={FontColorChanger} />
                            </div>

                            <div className='ColorContainer'>
                                <div className="ColorTitle">Accents Color</div>
                                <button className="ColorBtn" onClick={OpenColorAccent} style={{ backgroundColor: accentColor }}> </button>
                            </div>

                            <div className={`ColorPicker ${isActiveAcccent ? "On" : "Off"}`}>
                                <ChromePicker
                                    color={accentColor}
                                    onChange={AccentColorChanger} />
                            </div>

                            <div className="CheckBoxContainer">
                                <label for="shadow">Shadow</label>
                                <input type="checkbox"
                                    checked={isShadow}
                                    onChange={ShadowChanger}
                                />
                            </div>

                        </div>

                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Font Size Settings</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Main Size
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="5"
                                        step="1"
                                        max={100}
                                        value={titleSize}
                                        onChange={TitleSizeChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={titleSize}
                                        onChange={TitleSizeChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Accent Size
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="5"
                                        step="1"
                                        max={100}
                                        value={contentSize}
                                        onChange={ContentSizeChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={contentSize}
                                        onChange={ContentSizeChanger}
                                    />
                                </div>

                            </div>

                            <div className="DimentionContainer">

                                <div className='HorizontalSettings'>
                                    Icon Size
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="0"
                                        step="1"
                                        max={100}
                                        value={sizeWeatherIco}
                                        onChange={WeatherIcoSizeChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={sizeWeatherIco}
                                        onChange={WeatherIcoSizeChanger}
                                    />
                                </div>

                            </div>


                        </div>
                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Weather Rotation</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Angle
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min={-180}
                                        step="0.1"
                                        max={180}
                                        value={angle}
                                        onChange={AngleChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={angle}
                                        onChange={AngleChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Weather Font Style</div>

                        <div className="SettingsSectionsContent">
                            <select className="DropSelection" onChange={FontStyleChanger} style={{ fontFamily: fontStyle }}>
                                <option value="Shantell Sans, cursive" style={{ fontFamily: "Shantell Sans, cursive" }}>Your Font</option>
                                <option value="Arial, Helvetica, sans-serif" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Your Font</option>
                                <option value="Quintessential, cursive" style={{ fontFamily: "Quintessential, cursive" }}>Your Font</option>
                                <option value="Spline Sans Mono, monospace" style={{ fontFamily: "Spline Sans Mono, monospace" }}>Your Font</option>
                            </select>
                        </div>

                    </div>


                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Weather Layer </div>

                        <div className="SettingsSectionsContent">

                            <div className="LayerContainer">

                                <button className='LayerBtn' onClick={LayerDown}>-</button>

                                <input
                                    type="number"
                                    className="HorizontalInput"
                                    min={0}
                                    max={50}
                                    value={layer}
                                    onChange={LayerChanger} />

                                <button className='LayerBtn' onClick={LayerUp}>+</button>


                            </div>

                        </div>

                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Touch screens move</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Move X axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="0"
                                        step="1"
                                        max={window.innerWidth - sizeX + 50}
                                        value={positionFromLeft}
                                        onChange={PositionLeftChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={positionFromLeft}
                                        onChange={PositionLeftChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Move Y axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="0"
                                        step="1"
                                        max={window.innerHeight - sizeY + 25}
                                        value={positionFromTop}
                                        onChange={PositionTopChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={positionFromTop}
                                        onChange={PositionTopChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="SettingsSectionsContainer">

                        <div className="SettingsSectionsTitle">Touch screens size</div>

                        <div className="SettingsSectionsContent">
                            <div className="DimentionContainer">
                                <div className='HorizontalSettings'>
                                    Size X axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="150"
                                        step="1"
                                        max={window.innerWidth - positionFromLeft + 50}
                                        value={sizeX}
                                        onChange={SizeXChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={sizeX}
                                        onChange={SizeXChanger}
                                    />
                                </div>


                                <div className='HorizontalSettings'>
                                    Size Y axis
                                    <input
                                        className='HorizontalSlider'
                                        type="range"
                                        min="200"
                                        step="1"
                                        max={window.innerHeight - positionFromTop + 25}
                                        value={sizeY}
                                        onChange={SizeYChanger}
                                    />
                                    <input
                                        className='HorizontalInput'
                                        type="number"
                                        value={sizeY}
                                        onChange={SizeYChanger}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>


                </div >


            </div>
        </div>
    );
}

export default ObjectSettings;
import { useState } from 'react';
import { ChromePicker, } from 'react-color';


const CalendarSettings = ({
    calendarColor,
    setCalendarColor,
    calendarFontColor,
    setCalendarFontColor,
    calendarAccentColor,
    setCalendarAccentColor,
    calendarTitleSize,
    setCalendarTitleSize,
    calendarContentSize,
    setCalendarContentSize,
    calendarLayer,
    setCalendarLayer,
    calendarFontStyle,
    setCalendarFontStyle,
    nowActiveCalendarId,
    setNowActiveCalendarId,
    activeCalendarSettings,
    setActiveCalendarSettings,
    renderCalendar,
    setRenderCalendar
}) => {



    const CloseSettingsWindow = () => {
        setActiveCalendarSettings(current => !current);
    }


    // UPDATE ATTRIBUTE FOR PARTICULARLY NOTE
    const changeNoteAttribute = (id, attribute, value) => {   // Do funkcji są przekazane parametry id,attr,vlue
        const updatedAttribute = renderCalendar.map((calendar) => {      // Tablica jest mapowana, i sprawdzana który z jej elementów ma id=id z parametrów przekazanych do funkcji (linia wyżej)
            if (calendar.id === id) {
                return { ...calendar, [attribute]: value }; // Ustawienie dla konkretnego atrybutu nowej wartości 
            }
            return calendar
        })

        setRenderCalendar(updatedAttribute);
        localStorage.setItem('RenderCalendar', JSON.stringify(updatedAttribute)); //Aktualizacja LocalStore
    };


    // OPEN WINDOWS
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


    // CHANGE NOTE COLOR
    const CalendarColorChange = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setCalendarColor(newColor);
        changeNoteAttribute(nowActiveCalendarId, 'CalendarColor', newColor);
    };

    // CHANGE FONT COLOR
    const FontColorChange = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setCalendarFontColor(newColor);
        changeNoteAttribute(nowActiveCalendarId, 'fontcolor', newColor);
    }

    // CHANGE FONT COLOR
    const AccentColorChange = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setCalendarAccentColor(newColor);
        changeNoteAttribute(nowActiveCalendarId, 'accentcolor', newColor);
    }


    // CHANGE SIZE NOTE TITLE
    const TitleNoteSizeChange = (event) => {
        const newSize = event.target.value;
        setCalendarTitleSize(newSize);
        changeNoteAttribute(nowActiveCalendarId, 'titlesize', newSize);
    }

    // CHANGE SIZE NOTE CONTENT
    const ContentNoteSizeChange = (event) => {
        const newSize = event.target.value;
        setCalendarContentSize(newSize);
        changeNoteAttribute(nowActiveCalendarId, 'contentsize', newSize);
    }

    //CHANGE NOTE FONT STYLE
    const NoteFontStyleChange = (event) => {
        const newStyle = event.target.value;
        setCalendarFontStyle(newStyle);
        changeNoteAttribute(nowActiveCalendarId, 'fontstyle', newStyle);
    }

    return (

        <div>

            <div className={`SettingsContainer ${activeCalendarSettings ? "On" : "Off"}`}>


                <button className="CloseSettingNoteBtn" onClick={CloseSettingsWindow}>X</button>


                <div className="SettingsSectionsContainer">

                    <div className="SettingsSectionsTitle" >Colors Settings</div>

                    <div className="SettingsSectionsContent">

                        <div className='ColorContainer'>
                            <div className="ColorTitle">Calendar Color</div>
                            <button className="ColorBtn" onClick={OpenColorBackground} style={{ backgroundColor: calendarColor }}> </button>
                        </div>


                        <div className={`ColorPicker ${isActiveBckground ? "On" : "Off"}`}>
                            <ChromePicker

                                color={calendarColor}
                                onChange={CalendarColorChange} />
                        </div>

                        <div className='ColorContainer'>
                            <div className="ColorTitle">Font Color</div>
                            <button className="ColorBtn" onClick={OpenColorFont} style={{ backgroundColor: calendarFontColor }}> </button>
                        </div>

                        <div className={`ColorPicker ${isActiveFont ? "On" : "Off"}`}>
                            <ChromePicker
                                color={calendarFontColor}
                                onChange={FontColorChange} />
                        </div>

                        <div className='ColorContainer'>
                            <div className="ColorTitle">Accents Color</div>
                            <button className="ColorBtn" onClick={OpenColorAccent} style={{ backgroundColor: calendarAccentColor }}> </button>
                        </div>

                        <div className={`ColorPicker ${isActiveAcccent ? "On" : "Off"}`}>
                            <ChromePicker
                                color={calendarAccentColor}
                                onChange={AccentColorChange} />
                        </div>

                    </div>

                </div>

                <div className="SettingsSectionsContainer">

                    <div className="SettingsSectionsTitle">Font Size Settings</div>

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
                                    value={calendarTitleSize}
                                    onChange={TitleNoteSizeChange}
                                />
                                <input
                                    className='HorizontalInput'
                                    type="number"
                                    value={calendarTitleSize}
                                    onChange={TitleNoteSizeChange}
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
                                    value={calendarContentSize}
                                    onChange={ContentNoteSizeChange}
                                />
                                <input
                                    className='HorizontalInput'
                                    type="number"
                                    value={calendarContentSize}
                                    onChange={ContentNoteSizeChange}
                                />
                            </div>

                        </div>
                    </div>
                </div>


                <div className="SettingsSectionsContainer">

                    <div className="SettingsSectionsTitle">Note Font Style</div>

                    <div className="SettingsSectionsContent">
                        <select className="DropSelection" onChange={NoteFontStyleChange} style={{ fontFamily: calendarFontStyle }}>
                            <option value="Arial, Helvetica, sans-serif" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Your Font</option>
                            <option value="Shantell Sans, cursive" style={{ fontFamily: "Shantell Sans, cursive" }}>Your Font</option>
                            <option value="Quintessential, cursive" style={{ fontFamily: "Quintessential, cursive" }}>Your Font</option>
                            <option value="Spline Sans Mono, monospace" style={{ fontFamily: "Spline Sans Mono, monospace" }}>Your Font</option>
                        </select>
                    </div>

                </div>


                {/* <div className="SettingsSectionsContainer">

                    <div className="SettingsSectionsTitle">Note Layer Settings</div>

                    <div className="SettingsSectionsContent">

                        <div className="LayerContainer">

                            <button className='LayerBtn' onClick={LayerDown}>-</button>

                            <input
                                type="number"
                                className="HorizontalInput"
                                min={0}
                                max={50}
                                value={layer}
                                onChange={LayerChange} />

                            <button className='LayerBtn' onClick={LayerUp}>+</button>


                        </div>

                    </div>

                </div> */}

            </div >


        </div>
    );
}

export default CalendarSettings;
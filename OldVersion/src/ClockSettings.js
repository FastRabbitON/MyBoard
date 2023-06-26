
import { ChromePicker } from 'react-color';
import { useState } from 'react';

const ClockSettings = ({
    setActiveClockSettings,
    activeClockSettings,
    setRenderClock,
    renderClock,
    clockColor,
    setClockColor,
    fontColor,
    setFontColor,
    accentColor,
    setAccentColor,
    nowActiveClockId,
    setNowActiveClockId,
    clockForm,
    setClockForm,
    hoursFontSize,
    setHoursFontSize,
    datesFontSize,
    setDatesFontSize
}) => {

    const CloseSettingsWindow = () => {
        setActiveClockSettings(current => !current);
    }



    // UPDATE ATTRIBUTE FOR PARTICULARLY Clock
    const changeClockAttribute = (id, attribute, value) => {   // Do funkcji są przekazane parametry id,attr,vlue
        const updatedAttribute = renderClock.map((clock) => {      // Tablica jest mapowana, i sprawdzana który z jej elementów ma id=id z parametrów przekazanych do funkcji (linia wyżej)
            if (clock.id === id) {
                return { ...clock, [attribute]: value }; // Ustawienie dla konkretnego atrybutu nowej wartości 
            }
            return clock
        })

        setRenderClock(updatedAttribute);
        localStorage.setItem('RenderClock', JSON.stringify(updatedAttribute)); //Aktualizacja LocalStore
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


    // CHANGE CLOCK COLOR
    const ClockColorChange = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setClockColor(newColor);
        changeClockAttribute(nowActiveClockId, 'clockcolor', newColor);
    }

    // CHANGE FONT COLOR
    const FontColorChange = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setFontColor(newColor);
        changeClockAttribute(nowActiveClockId, 'fontcolor', newColor);
    }

    // CHANGE FONT COLOR
    const AccentColorChange = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setAccentColor(newColor);
        changeClockAttribute(nowActiveClockId, 'accentcolor', newColor);
    }


    //CHANGE CLOCK FORM
    const ClockFormChange = (event) => {
        const newForm = event.target.value
        setClockForm(newForm)
        changeClockAttribute(nowActiveClockId, 'clockform', newForm);
    }

    // CHANGE SIZE TIME
    const ClockTimeChange = (event) => {
        const newSize = event.target.value;
        setHoursFontSize(newSize);
        changeClockAttribute(nowActiveClockId, 'hoursize', newSize);
    }

    // CHANGE SIZE DATE
    const ClockDateChange = (event) => {
        const newSize = event.target.value;
        setDatesFontSize(newSize);
        changeClockAttribute(nowActiveClockId, 'datesize', newSize);
    }

    //CHANGE CLOCK FONT STYLE
    // const ClockFontStyleChange = (event) => {
    //     const newStyle = event.target.value;
    //     setNoteFontStyle(newStyle);
    //     changeClockAttribute(nowActiveClockId, 'fontstyle', newStyle);
    // }




    return (


        <div>

            <div className={`SettingsContainer ${activeClockSettings ? "On" : "Off"}`}>
                <button className="CloseSettingNoteBtn" onClick={CloseSettingsWindow}>X</button>

                <div className="SettingsSectionsContainer">

                    <div className="SettingsSectionsTitle" >Colors Settings</div>

                    <div className="SettingsSectionsContent">

                        <div className='ColorContainer'>
                            <div className="ColorTitle">Clock Color</div>
                            <button className="ColorBtn" onClick={OpenColorBackground} style={{ backgroundColor: clockColor }}> </button>
                        </div>


                        <div className={`ColorPicker ${isActiveBckground ? "On" : "Off"}`}>
                            <ChromePicker
                                color={clockColor}
                                onChange={ClockColorChange}
                            />
                        </div>

                        <div className='ColorContainer'>
                            <div className="ColorTitle">Font Color</div>
                            <button className="ColorBtn" onClick={OpenColorFont} style={{ backgroundColor: fontColor }}> </button>
                        </div>

                        <div className={`ColorPicker ${isActiveFont ? "On" : "Off"}`}>
                            <ChromePicker
                                color={fontColor}
                                onChange={FontColorChange}
                            />
                        </div>

                        <div className='ColorContainer'>
                            <div className="ColorTitle">Accents Color</div>
                            <button className="ColorBtn" onClick={OpenColorAccent} style={{ backgroundColor: accentColor }}> </button>
                        </div>

                        <div className={`ColorPicker ${isActiveAcccent ? "On" : "Off"}`}>
                            <ChromePicker
                                color={accentColor}
                                onChange={AccentColorChange}
                            />
                        </div>

                    </div>


                </div>


                <div className="SettingsSectionsContainer">

                    <div className="SettingsSectionsTitle">Clock Form</div>

                    <div className="SettingsSectionsContent">

                        <form className='FormSelection' onChange={ClockFormChange}>

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

                    <div className="SettingsSectionsTitle">Font Size Settings</div>

                    <div className="SettingsSectionsContent">
                        <div className="DimentionContainer">
                            <div className='HorizontalSettings'>
                                Hours
                                <input
                                    className='HorizontalSlider'
                                    type="range"
                                    min="5"
                                    step="1"
                                    max={100}
                                    value={hoursFontSize}
                                    onChange={ClockTimeChange}
                                />
                                <input
                                    className='HorizontalInput'
                                    type="number"
                                    value={hoursFontSize}
                                    onChange={ClockTimeChange}
                                />
                            </div>


                            <div className='HorizontalSettings'>
                                Dates
                                <input
                                    className='HorizontalSlider'
                                    type="range"
                                    min="5"
                                    step="1"
                                    max={100}
                                    value={datesFontSize}
                                    onChange={ClockDateChange}
                                />
                                <input
                                    className='HorizontalInput'
                                    type="number"
                                    value={datesFontSize}
                                    onChange={ClockDateChange}
                                />
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default ClockSettings;
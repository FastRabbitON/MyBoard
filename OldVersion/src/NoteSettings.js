import { useState } from 'react';
import { ChromePicker, } from 'react-color';



const NoteSettings = ({
    renderNote,
    setRenderNote,
    nowActiveNoteId,
    activeNoteSettings,
    setActiveNoteSettings,
    noteColor,
    setNoteColor,
    fontColor,
    setFontColor,
    accentColor,
    setAccentColor,
    noteTitleSize,
    setNoteTitleSize,
    noteContentSize,
    setNoteContentSize,
    layer,
    setLayer,
    noteFontStyle,
    setNoteFontStyle,
    nowActiveTitle
}) => {

    const CloseSettingsWindow = () => {
        setActiveNoteSettings(current => !current);
    }


    // UPDATE ATTRIBUTE FOR PARTICULARLY NOTE
    const changeNoteAttribute = (id, attribute, value) => {   // Do funkcji są przekazane parametry id,attr,vlue
        const updatedAttribute = renderNote.map((note) => {      // Tablica jest mapowana, i sprawdzana który z jej elementów ma id=id z parametrów przekazanych do funkcji (linia wyżej)
            if (note.id === id) {
                return { ...note, [attribute]: value }; // Ustawienie dla konkretnego atrybutu nowej wartości 
            }
            return note
        })

        setRenderNote(updatedAttribute);
        localStorage.setItem('RenderNotes', JSON.stringify(updatedAttribute)); //Aktualizacja LocalStore
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
    const NoteColorChange = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setNoteColor(newColor);
        changeNoteAttribute(nowActiveNoteId, 'noteColor', newColor);
    };

    // CHANGE FONT COLOR
    const FontColorChange = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setFontColor(newColor);
        changeNoteAttribute(nowActiveNoteId, 'fontcolor', newColor);
    }

    // CHANGE FONT COLOR
    const AccentColorChange = (color) => {
        const { r, g, b, a } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        setAccentColor(newColor);
        changeNoteAttribute(nowActiveNoteId, 'accentcolor', newColor);
    }


    // CHANGE SIZE NOTE TITLE
    const TitleNoteSizeChange = (event) => {
        const newSize = event.target.value;
        setNoteTitleSize(newSize);
        changeNoteAttribute(nowActiveNoteId, 'titlesize', newSize);
    }

    // CHANGE SIZE NOTE CONTENT
    const ContentNoteSizeChange = (event) => {
        const newSize = event.target.value;
        setNoteContentSize(newSize);
        changeNoteAttribute(nowActiveNoteId, 'contentsize', newSize);
    }

    //CHANGE NOTE FONT STYLE
    const NoteFontStyleChange = (event) => {
        const newStyle = event.target.value;
        setNoteFontStyle(newStyle);
        changeNoteAttribute(nowActiveNoteId, 'fontstyle', newStyle);
    }

    //CHANGE LAYER
    const LayerChange = (event) => {
        const newLayer = event.target.value;
        setLayer(newLayer);
        changeNoteAttribute(nowActiveNoteId, 'layer', layer);
    }

    //LAYER UP
    const LayerUp = () => {
        if (layer < 49) {
            const newLayer = Number(layer + 1);
            setLayer(newLayer);
            changeNoteAttribute(nowActiveNoteId, "layer", newLayer);
        }
    }

    //LAYER DOWN
    const LayerDown = () => {
        if (layer > 0) {
            const newLayer = Number(layer - 1);
            setLayer(newLayer);
            changeNoteAttribute(nowActiveNoteId, "layer", newLayer)
        }
    }


    return (

        <div>
            <div className={`SettingsContainer ${activeNoteSettings ? "On" : "Off"}`}>


                <button className="CloseSettingNoteBtn" onClick={CloseSettingsWindow}>X</button>
                <div className="SettingsSectionsContainer">

                    <div className="NowEditInfo"> {nowActiveTitle}</div>
                </div>

                <div className="SettingsSectionsContainer">

                    <div className="SettingsSectionsTitle" >Colors Settings</div>

                    <div className="SettingsSectionsContent">

                        <div className='ColorContainer'>
                            <div className="ColorTitle">Note Color</div>
                            <button className="ColorBtn" onClick={OpenColorBackground} style={{ backgroundColor: noteColor }}> </button>
                        </div>


                        <div className={`ColorPicker ${isActiveBckground ? "On" : "Off"}`}>
                            <ChromePicker

                                color={noteColor}
                                onChange={NoteColorChange} />
                        </div>

                        <div className='ColorContainer'>
                            <div className="ColorTitle">Font Color</div>
                            <button className="ColorBtn" onClick={OpenColorFont} style={{ backgroundColor: fontColor }}> </button>
                        </div>

                        <div className={`ColorPicker ${isActiveFont ? "On" : "Off"}`}>
                            <ChromePicker
                                color={fontColor}
                                onChange={FontColorChange} />
                        </div>

                        <div className='ColorContainer'>
                            <div className="ColorTitle">Accents Color</div>
                            <button className="ColorBtn" onClick={OpenColorAccent} style={{ backgroundColor: accentColor }}> </button>
                        </div>

                        <div className={`ColorPicker ${isActiveAcccent ? "On" : "Off"}`}>
                            <ChromePicker
                                color={accentColor}
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
                                    value={noteTitleSize}
                                    onChange={TitleNoteSizeChange}
                                />
                                <input
                                    className='HorizontalInput'
                                    type="number"
                                    value={noteTitleSize}
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
                                    value={noteContentSize}
                                    onChange={ContentNoteSizeChange}
                                />
                                <input
                                    className='HorizontalInput'
                                    type="number"
                                    value={noteContentSize}
                                    onChange={ContentNoteSizeChange}
                                />
                            </div>

                        </div>
                    </div>
                </div>


                <div className="SettingsSectionsContainer">

                    <div className="SettingsSectionsTitle">Note Font Style</div>

                    <div className="SettingsSectionsContent">
                        <select className="DropSelection" onChange={NoteFontStyleChange} style={{ fontFamily: noteFontStyle }}>
                            <option value="Arial, Helvetica, sans-serif" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Your Font</option>
                            <option value="Shantell Sans, cursive" style={{ fontFamily: "Shantell Sans, cursive" }}>Your Font</option>
                            <option value="Quintessential, cursive" style={{ fontFamily: "Quintessential, cursive" }}>Your Font</option>
                            <option value="Spline Sans Mono, monospace" style={{ fontFamily: "Spline Sans Mono, monospace" }}>Your Font</option>
                        </select>
                    </div>

                </div>


                <div className="SettingsSectionsContainer">

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

                </div>

            </div >

        </div>

    );

}

export default NoteSettings;
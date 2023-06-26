import { useState, useEffect } from 'react';
import BoardSettings from './BoardSettings';

import NoteContainer from "./NoteContainer"
import ClockContainer from "./ClockContainer"
import CalendarContainer from './CalendarContainer';

import "./BoardStyle.css"


const BoardContainer = () => {

    //VARIABLES
    const [boardTitle, setBoardTitle] = useState(() => {
        const localDataTitle = localStorage.getItem("BackgroundTitle");
        return localDataTitle ? JSON.parse(localDataTitle) : "myBOARD";
    })

    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(() => {
        const localDataTitle = localStorage.getItem("BackgroundSave");
        return localDataTitle ? JSON.parse(localDataTitle) : "#b7b6bb";
    })

    const [boardTitleSize, setBoardTitleSize] = useState(() => {
        const localDataTitle = localStorage.getItem("BackgroundTitleSize");
        return localDataTitle ? JSON.parse(localDataTitle) : 40;
    })

    const [boardTitleColor, setBoardTitleColor] = useState(() => {
        const localDataTitle = localStorage.getItem("BackgroundTitleColor");
        return localDataTitle ? JSON.parse(localDataTitle) : "#0d0d0d";
    })

    const [boardFontStyle, setBoardFontStyle] = useState(() => {
        const localDataTitle = localStorage.getItem("BoardFontStyle");
        return localDataTitle ? JSON.parse(localDataTitle) : "Shantell Sans, cursive";
    })


    const [activeNoteSettings, setActiveNoteSettings] = useState(false);
    const [activeBoardSettings, setActiveBoardSettings] = useState(false);
    const [activeClockSettings, setActiveClockSettings] = useState(false);
    const [activeCalendarSettings, setActiveCalendarSettings] = useState(false);


    // SAVE TO LOCALSTORE  BOARD TITLE
    useEffect(() => {
        localStorage.setItem("BackgroundTitle", JSON.stringify(boardTitle))
    }, [boardTitle])



    const AllWindowsClose = () => {

        if (activeNoteSettings === true) {
            setActiveNoteSettings(false)
        }

        if (activeClockSettings === true) {
            setActiveClockSettings(false)
        }

        if (activeBoardSettings === true) {
            setActiveBoardSettings(false)
        }
        if (activeCalendarSettings === true) {
            setActiveCalendarSettings(false)
        }

    }

    const BoardSettingsWindow = () => {

        setActiveBoardSettings(current => !current)

        if (activeNoteSettings === true) {
            setActiveNoteSettings(false)
        }

        if (activeClockSettings === true) {
            setActiveClockSettings(false)
        }
    }


    return (

        <div>

            <BoardSettings
                selectedBackgroundColor={selectedBackgroundColor}
                setSelectedBackgroundColor={setSelectedBackgroundColor}

                boardTitleSize={boardTitleSize}
                setBoardTitleSize={setBoardTitleSize}

                boardTitleColor={boardTitleColor}
                setBoardTitleColor={setBoardTitleColor}

                boardFontStyle={boardFontStyle}
                setBoardFontStyle={setBoardFontStyle}

                activeBoardSettings={activeBoardSettings}
                setActiveBoardSettings={setActiveBoardSettings}

                activeNoteSettings={activeNoteSettings}
                setActiveNoteSettings={setActiveNoteSettings}

                activeClockSettings={activeClockSettings}
                setActiveClockSettings={setActiveClockSettings}

                BoardSettingsWindow={BoardSettingsWindow}
            />

            <button className='SettingsBoardBtn' onClick={BoardSettingsWindow}>⚙</button>

            {/* <button className='AddGeneralBtn' onClick> + </button> */}

            <div className="AddAllContainerBtn">


            </div>

            <div className='BoardContainer'
                style={{ backgroundImage: selectedBackgroundColor }}
                onClick={() => AllWindowsClose()} >


                <input type="text"
                    spellCheck="false"
                    className='BoardTitle'
                    style={{
                        fontSize: `${boardTitleSize}px`,
                        color: boardTitleColor,
                        fontFamily: boardFontStyle
                    }}
                    value={boardTitle}
                    onChange={(e) => setBoardTitle(e.target.value)}
                />


            </div>

            <NoteContainer
                activeNoteSettings={activeNoteSettings}
                setActiveNoteSettings={setActiveNoteSettings}

                activeClockSettings={activeClockSettings}
                setActiveClockSettings={setActiveClockSettings}

                activeBoardSettings={activeBoardSettings}
                setActiveBoardSettings={setActiveBoardSettings}
            />

            <ClockContainer
                activeClockSettings={activeClockSettings}
                setActiveClockSettings={setActiveClockSettings}

                activeNoteSettings={activeNoteSettings}
                setActiveNoteSettings={setActiveNoteSettings}

                activeBoardSettings={activeBoardSettings}
                setActiveBoardSettings={setActiveBoardSettings}

            />

            <CalendarContainer

                activeCalendarSettings={activeCalendarSettings}
                setActiveCalendarSettings={setActiveCalendarSettings}


            />

        </div>

    );
}

export default BoardContainer;
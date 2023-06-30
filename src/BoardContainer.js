import { useState, useEffect } from 'react';
import BoardSettings from './BoardSettings';
import { Tooltip } from 'react-tooltip';

import "./App.css"

import "./BoardStyle.css"
import ObjectRender from './ObjectRender';


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

    const [renderObject, setRenderObject] = useState([]);

    const [isTutorial, setIsTutorial] = useState(false);
    const [activeBoardSettings, setActiveBoardSettings] = useState(false);
    const [activeObjectSettings, setActiveObjectSettings] = useState(false);

    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false)


    // SAVE TO LOCALSTORE  BOARD TITLE
    useEffect(() => {
        localStorage.setItem("BackgroundTitle", JSON.stringify(boardTitle))
    }, [boardTitle])



    const AllWindowsClose = () => {

        if (activeBoardSettings === true) {
            setActiveBoardSettings(false)
        }

        if (activeObjectSettings === true) {
            setActiveObjectSettings(false)
        }

        if (isAddMenuOpen === true) {
            setIsAddMenuOpen(false)
        }

    }

    const BoardSettingsWindow = () => {

        setActiveBoardSettings(current => !current)

        if (activeObjectSettings === true) {
            setActiveObjectSettings(false)
        }

        if (isAddMenuOpen === true) {
            setIsAddMenuOpen(false)
        }

    }

    const TutorialWindow = () => {
        setIsTutorial(current => !current);

        if (activeBoardSettings === true) {
            setActiveBoardSettings(false)
        }

        if (activeObjectSettings === true) {
            setActiveObjectSettings(false)
        }

        if (isAddMenuOpen === true) {
            setIsAddMenuOpen(false)
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


                BoardSettingsWindow={BoardSettingsWindow}
            />

            <button
                className='SettingsBoardBtn'
                onClick={BoardSettingsWindow}
                data-tooltip-id="TT-BottomBtn"
                data-tooltip-content="Board Settings"
                data-tooltip-place="top">
                ⚙
            </button>

            <button
                className='TutorialBtn'
                onClick={TutorialWindow}
                style={{
                    fontFamily: "Spline Sans Mono, monospace"
                }}
                data-tooltip-id="TT-BottomBtn"
                data-tooltip-content="How it works?"
                data-tooltip-place="top">
                i
            </button>

            {/* <button className='ClearAllBtn'>X</button> */}

            <Tooltip id="TT-BottomBtn" />

            <div className={`TutorialContainer ${isTutorial ? "On" : "Off"}`}>
                <div className="TutorialBlur" onClick={TutorialWindow}></div>
                <div className="TutorialWindow"
                // style={{ backgroundImage: selectedBackgroundColor }}
                >

                    <div className="TutorialCloseBtn" onClick={TutorialWindow}>X</div>
                    <video className="TutorialVideo" controls>
                        <source src={require("./TutorialVideo.mp4")} type="video/mp4" />
                    </video>


                </div>
            </div>


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


            <ObjectRender

                isAddMenuOpen={isAddMenuOpen}
                setIsAddMenuOpen={setIsAddMenuOpen}

                activeObjectSettings={activeObjectSettings}
                setActiveObjectSettings={setActiveObjectSettings}

                activeBoardSettings={activeBoardSettings}
                setActiveBoardSettings={setActiveBoardSettings}

                renderObject={renderObject}
                setRenderObject={setRenderObject}


            />


        </div>

    );
}

export default BoardContainer;
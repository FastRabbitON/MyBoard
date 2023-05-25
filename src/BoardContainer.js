import { useState, useEffect } from 'react';
import BoardSettings from './BoardSettings';

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


    // SAVE TO LOCALSTORE  BOARD TITLE
    useEffect(() => {
        localStorage.setItem("BackgroundTitle", JSON.stringify(boardTitle))
    }, [boardTitle])


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
            />

            <div className='BoardContainer'
                style={{ backgroundImage: selectedBackgroundColor }}>

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


        </div>

    );
}

export default BoardContainer;
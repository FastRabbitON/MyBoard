import { useState, useEffect } from 'react';
import BoardSettings from './BoardSettings';
import { Tooltip } from 'react-tooltip';

import "./App.css"

import "./BoardStyle.css"
import ObjectRender from './ObjectRender';


const BoardContainer = () => {

    //VARIABLES

    const [boardTitle, setBoardTitle] = useState()
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState()
    const [boardTitleSize, setBoardTitleSize] = useState()
    const [boardTitleColor, setBoardTitleColor] = useState()
    const [boardFontStyle, setBoardFontStyle] = useState()

    const [boardPlaneColor, setBoardPlaneColor] = useState("#b7b6bb")
    const [boardGradOneColor, setBoardGradOneColor] = useState("#3f5efb")
    const [boardGradTwoColor, setBoardGradTwoColor] = useState("#fc466b")
    const [boardImage, setBoardImage] = useState(null)

    const [gradientAngle, setGradientAngle] = useState(0)
    const [gradientType, setGradientType] = useState("linear")

    const [isImageOn, setIsImageOn] = useState(false)
    const [imageFitType, setImageFitType] = useState("scale-down")


    const [renderObject, setRenderObject] = useState([])
    const [isTutorial, setIsTutorial] = useState(false);
    const [activeBoardSettings, setActiveBoardSettings] = useState(false);
    const [activeObjectSettings, setActiveObjectSettings] = useState(false);
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false)

    const [radioBackCheck, setRadioBackCheck] = useState("Plane")


    const [BoardAttributes, setBoardAttributes] = useState(() => {
        const localData = localStorage.getItem("BoardLocalAttribute");
        return localData
            ? JSON.parse(localData)
            : {
                AttributeBoardTitle: "myBoard",
                AttributeBoardTitleSize: 40,
                AttributeBoardTitleColor: "#0d0d0d",
                AttributeBoardTitleStyle: "Shantell Sans, cursive",
                AttributeBackPlane: "#b7b6bb",
                AttributeBackGradColorOne: "#3f5efb",
                AttributeBackGradColorTwo: "#fc466b",
                AttributeAngleGradient: 90,
                AttributeRadioChecked: "Plane",
                AttributeGradientType: "linear",
                AttributeImageUrl: null,
                AttributeIsImageOn: false,
                AttrbuteImageFitType: "scale-down"
            };
    });

    useEffect(() => {
        if (!localStorage.getItem("BoardLocalAttribute")) {
            localStorage.setItem(
                "BoardLocalAttribute",
                JSON.stringify(BoardAttributes)
            );
        }
    }, []);


    const BoardAttributeChanger = (AttributeToChange, Value) => {

        const updateAttribute = { ...BoardAttributes, [AttributeToChange]: Value };
        setBoardAttributes(updateAttribute);
        localStorage.setItem('BoardLocalAttribute', JSON.stringify(updateAttribute));

    }


    const BoardBackgroundChanger = (ColorOneValue, ColorTwoValue) => {
        const updateAttribute = { ...BoardAttributes, AttributeBackGradColorOne: ColorOneValue, AttributeBackGradColorTwo: ColorTwoValue }
        setBoardAttributes(updateAttribute);
        localStorage.setItem('BoardLocalAttribute', JSON.stringify(updateAttribute));
    }


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


        const {
            AttributeBoardTitleSize,
            AttributeBoardTitleColor,
            AttributeBoardTitleStyle,
            AttributeBackPlane,
            AttributeBackGradColorOne,
            AttributeBackGradColorTwo,
            AttributeAngleGradient,
            AttributeRadioChecked,
            AttributeGradientType,
            AttributeIsImageOn,
            AttrbuteImageFitType
        } = BoardAttributes;

        setBoardTitleSize(AttributeBoardTitleSize)
        setBoardTitleColor(AttributeBoardTitleColor)
        setBoardFontStyle(AttributeBoardTitleStyle)
        setBoardPlaneColor(AttributeBackPlane)
        setBoardGradOneColor(AttributeBackGradColorOne)
        setBoardGradTwoColor(AttributeBackGradColorTwo)
        setRadioBackCheck(AttributeRadioChecked)
        setGradientAngle(AttributeAngleGradient)
        setGradientType(AttributeGradientType)
        setIsImageOn(AttributeIsImageOn)
        setImageFitType(AttrbuteImageFitType)

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

                boardPlaneColor={boardPlaneColor}
                setBoardPlaneColor={setBoardPlaneColor}

                boardGradOneColor={boardGradOneColor}
                setBoardGradOneColor={setBoardGradOneColor}

                boardGradTwoColor={boardGradTwoColor}
                setBoardGradTwoColor={setBoardGradTwoColor}

                radioBackCheck={radioBackCheck}
                setRadioBackCheck={setRadioBackCheck}

                BoardAttributeChanger={BoardAttributeChanger}
                BoardBackgroundChanger={BoardBackgroundChanger}


                boardImage={boardImage}
                setBoardImage={setBoardImage}



                gradientAngle={gradientAngle}
                setGradientAngle={setGradientAngle}

                gradientType={gradientType}
                setGradientType={setGradientType}

                BoardSettingsWindow={BoardSettingsWindow}

                isImageOn={isImageOn}
                setIsImageOn={setIsImageOn}

                imageFitType={imageFitType}
                setImageFitType={setImageFitType}
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



            <Tooltip id="TT-BottomBtn" />

            <div className={`TutorialContainer ${isTutorial ? "On" : "Off"}`}>
                <div className="TutorialBlur" onClick={TutorialWindow}></div>
                <div className="TutorialWindow"
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
                style={{
                    backgroundImage: `${BoardAttributes.AttributeRadioChecked === "Plane"
                        ? `linear-gradient(0deg, ${BoardAttributes.AttributeBackPlane}, ${BoardAttributes.AttributeBackPlane})`
                        : BoardAttributes.AttributeGradientType === "linear"
                            ? `linear-gradient(${BoardAttributes.AttributeAngleGradient}deg, ${BoardAttributes.AttributeBackGradColorOne}, ${BoardAttributes.AttributeBackGradColorTwo})`
                            : `radial-gradient(circle, ${BoardAttributes.AttributeBackGradColorOne}, ${BoardAttributes.AttributeBackGradColorTwo})`
                        }`
                }}
                onClick={() => AllWindowsClose()} >



                {(BoardAttributes.AttributeImageUrl && BoardAttributes.AttributeIsImageOn === true) ?
                    (<img className='SelectedImage'
                        style={{
                            objectFit: BoardAttributes.AttrbuteImageFitType
                        }}
                        src={BoardAttributes.AttributeImageUrl}
                        alt="UPLOAD PHOTO" />)
                    : null}



                <input type="text"
                    spellCheck="false"
                    className='BoardTitle'
                    style={{
                        fontSize: `${BoardAttributes.AttributeBoardTitleSize}px`,
                        color: BoardAttributes.AttributeBoardTitleColor,
                        fontFamily: BoardAttributes.AttributeBoardTitleStyle
                    }}
                    value={BoardAttributes.AttributeBoardTitle}
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
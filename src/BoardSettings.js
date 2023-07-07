import { useState } from 'react';
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
  setActiveClockSettings,

  radioBackCheck,
  setRadioBackCheck,

  boardPlaneColor,
  setBoardPlaneColor,

  boardGradOneColor,
  setBoardGradOneColor,

  boardGradTwoColor,
  setBoardGradTwoColor,

  boardImage,
  setBoardImage,

  gradientAngle,
  setGradientAngle,

  gradientType,
  setGradientType,

  BoardAttributeChanger,
  BoardBackgroundChanger,

  isImageOn,
  setIsImageOn,

  imageFitType,
  setImageFitType,

}) => {

  //VARIABLES


  const [isActiveBackgroundBoard, setIsActiveBckgroundBoard] = useState(false);
  const OpenColorBackgroundBoard = (event) => {
    setIsActiveBckgroundBoard(current => !current);
    event.preventDefault();
  }

  const [isActiveGradOneBoard, setIsActiveGradOneBoard] = useState(false);
  const OpenColorGradOneBoard = (event) => {
    setIsActiveGradOneBoard(current => !current);
    event.preventDefault();
  }

  const [isActiveGradTwoBoard, setIsActiveGradTwoBoard] = useState(false);
  const OpenColorGradTwoBoard = (event) => {
    setIsActiveGradTwoBoard(current => !current);
    event.preventDefault();
  }

  const [isActiveColorTitleBoard, setIsActiveColorTitleBoard] = useState(false);
  const OpenColorTitleBoard = (event) => {
    setIsActiveColorTitleBoard(current => !current);
    event.preventDefault();
  }


  const BoardBackgroundChooser = (event) => {
    const value = event.target.value;
    setRadioBackCheck(value);

    if (value === "Plane") {
      BoardAttributeChanger("AttributeBackPlane", boardPlaneColor);
      BoardAttributeChanger("AttributeRadioChecked", value);
    }

    if (value === "Gradient") {
      BoardBackgroundChanger(boardGradOneColor, boardGradTwoColor);
      BoardAttributeChanger("AttributeRadioChecked", value);
    }

    if (value === "Image") {
      BoardAttributeChanger("AttributeRadioChecked", value);

    }
  };


  //GET COLORS FROM COLORPICKER
  const PickerChangePlane = (e) => {
    setBoardPlaneColor(e.hex)
    BoardAttributeChanger("AttributeBackPlane", boardPlaneColor);
  }

  const PickerChangeGradOne = (e) => {
    setBoardGradOneColor(e.hex)
    BoardBackgroundChanger(boardGradOneColor, boardGradTwoColor);
  }

  const PickerChangeGradTwo = (e) => {
    setBoardGradTwoColor(e.hex)
    BoardBackgroundChanger(boardGradOneColor, boardGradTwoColor);
  }

  const TitleColorChanger = (e) => {
    setBoardTitleColor(e.hex)
    BoardAttributeChanger("AttributeBoardTitleColor", boardTitleColor)
  }

  const TitleSizeChanger = (e) => {
    const value = e.target.value
    setBoardTitleSize(value)
    BoardAttributeChanger("AttributeBoardTitleSize", value)

  }

  const TitleFontChanger = (e) => {
    const value = e.target.value
    setBoardFontStyle(value)
    BoardAttributeChanger("AttributeBoardTitleStyle", value)
  }

  const GradientAngleChanger = (e) => {
    const value = e.target.value
    setGradientAngle(value)
    BoardAttributeChanger("AttributeAngleGradient", value)
  }


  const GradientTypeChanger = (e) => {
    const value = e.target.value
    BoardAttributeChanger("AttributeGradientType", value)
  }


  const ImageOnChanger = (e) => {
    const state = e.target.checked
    setIsImageOn(state)
    BoardAttributeChanger("AttributeIsImageOn", state)

  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;
      setBoardImage(imageData);
      BoardAttributeChanger("AttributeImageUrl", imageData)
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }


  const ImageFitTypeChanger = (e) => {
    const value = e.target.value
    setImageFitType(value)
    BoardAttributeChanger("AttrbuteImageFitType", value)
  }



  return (

    <div>



      <div className={`SettingsContainer ${activeBoardSettings ? "On" : "Off"}`}>
        <button className="CloseSettingNoteBtn" onClick={BoardSettingsWindow}>X</button>


        <div className="SettingsSectionsContainer">

          <div className="SettingsSectionsTitle">Board Background Color</div>

          <div className="SettingsSectionsContent">

            <form className='FormColorContainer' onChange={BoardBackgroundChooser}>

              <div className='FormColorSection'>

                <input type="radio" id="PlaneColor" name="colores" value="Plane" checked={radioBackCheck === "Plane"} />
                <div className='ColorContainer'>
                  <div className="ColorTitle">Plane</div>
                  <button className="ColorBtn" onClick={OpenColorBackgroundBoard} style={{ backgroundColor: boardPlaneColor }}> </button>
                </div>

              </div>

              <div className={`ColorPicker ${isActiveBackgroundBoard ? "On" : "Off"}`}>
                <ChromePicker
                  disableAlpha
                  color={boardPlaneColor}
                  onChange={PickerChangePlane}
                />
              </div>

              <div className='FormColorSection'>

                <input type="radio" id="GradientColor" name="colores" value="Gradient" checked={radioBackCheck === "Gradient"} />
                <div className='ColorContainer'>
                  <div className="ColorTitle">Gradient</div>
                  <button className="ColorBtn" onClick={OpenColorGradOneBoard} style={{ backgroundColor: boardGradOneColor }}> </button>
                  <button className="ColorBtn" onClick={OpenColorGradTwoBoard} style={{ backgroundColor: boardGradTwoColor }}> </button>
                </div>

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

            </form>

          </div>


        </div>

        <div className="SettingsSectionsContainer"
          style={{
            display: `${radioBackCheck === "Gradient" ? "flex" : "none"}`
          }}
        >

          <div className="SettingsSectionsTitle">Gradient Settings</div>

          <div className="SettingsSectionsContent">

            <div className="FormGradientTypeTitle"> Gradient Type</div>

            <div className="FormGradientType"
              style={{
                display: `${radioBackCheck === "Gradient" ? "flex" : "none"}`
              }}
            >
              <form onChange={GradientTypeChanger}>
                <div className='GradientTypeRadio'>
                  <div>
                    <input type="radio" id="GradRadial" name="gradtype" value="radial" checked={gradientType === "radial"} />
                    <label for="GradRadial">Radial </label>
                  </div>
                  <div>
                    <input type="radio" id="GradLinear" name="gradtype" value="linear" checked={gradientType === "linear"} />
                    <label for="GradLinear">Linear</label>
                  </div>
                </div>
              </form>

            </div>


            <div className="DimentionContainer"
              style={{
                display: `${radioBackCheck === "Gradient" && gradientType === "linear" ? "flex" : "none"}`
              }}
            >
              <div className='HorizontalSettings'>
                Gradient Angle
                <input
                  className='HorizontalSlider'
                  type="range"
                  min="0"
                  step="1"
                  max={360}
                  value={gradientAngle}
                  onChange={GradientAngleChanger}
                />
                <input
                  className='HorizontalInput'
                  type="number"
                  value={gradientAngle}
                  onChange={GradientAngleChanger}
                />
              </div>

            </div>


          </div>
        </div>


        <div className="SettingsSectionsContainer">

          <div className="SettingsSectionsTitle">Background Image</div>

          <div className="SettingsSectionsContent">

            <div className="ImageSettingsContainer">
              <input type="checkbox" id="ImageOn" onChange={ImageOnChanger} checked={isImageOn} />
              <label for="ImageOn"> Display Image </label>
            </div>

            <input id='ImageUpdate' type="file" onChange={handleImageUpload} accept="image/*" hidden />
            <label className="ImageUpdate" htmlFor="ImageUpdate">Upload Image</label>
          </div>

          <div className="FormGradientType">

            <form onChange={ImageFitTypeChanger}>
              <div className='GradientTypeRadio'>
                <div>
                  <input type="radio" id="ScaledownType" name="fittype" value="scale-down" checked={imageFitType === "scale-down"} />
                  <label for="ScaledownType">Keep Ratio</label>
                </div>
                <div>
                  <input type="radio" id="FillType" name="fittype" value="fill" checked={imageFitType === "fill"} />
                  <label for="FillType">Full Screen</label>
                </div>
              </div>
            </form>
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
                onChange={TitleColorChanger} />
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
                  onChange={TitleSizeChanger}
                />
                <input
                  className='HorizontalInput'
                  type="number"
                  value={boardTitleSize}
                  onChange={TitleSizeChanger}
                />
              </div>

            </div>
          </div>


        </div>

        <div className="SettingsSectionsContainer">

          <div className="SettingsSectionsTitle">Title Font Style</div>

          <div className="SettingsSectionsContent">
            <select className="DropSelection" onChange={TitleFontChanger} style={{ fontFamily: boardFontStyle }}>
              <option value="Shantell Sans, cursive" style={{ fontFamily: "Shantell Sans, cursive" }}>Your Font</option>
              <option value="Arial, Helvetica, sans-serif" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>Your Font</option>
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
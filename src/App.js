import './App.css';
import { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';



function App() {

  //  VARIABLES
  const [renderNote, setRenderNote] = useState([]);
  const [contentInput, setContentInput] = useState([]);


  const [nowActiveNoteId, setNowActiveNoteId] = useState("");


  const [activeNoteSettings, setActiveNoteSettings] = useState(false);
  const [activeBoardSettings, setActiveBoardSettings] = useState(false);

  const [newNoteColor, setNewNoteColor] = useState("#ffb100");
  const [newFontColor, setNewFontColor] = useState("#000000");
  const [newAccentColor, setNewAccentColor] = useState('#4b4d4f');

  const [newSizeX, setNewSizeX] = useState(400);
  const [newSizeY, setNewSizeY] = useState(500);

  const [positionFromLeft, setPositionFromLeft] = useState(500);
  const [positionFromTop, setPositionFromTop] = useState(100)

  const [noteTitleSize, setNoteTitleSize] = useState(25);
  const [noteContentSize, setNoteContentSize] = useState(15);

  const [layer, setLayer] = useState(1);

  const [noteFontStyle, setNoteFontStyle] = useState("Shantell Sans, cursive")

  // const [clickCount, setClickCount] = useState(2);
  // const [isCrossed, setIsCrossed] = useState(false)


  const [boardTitle, setBoardTitle] = useState(() => {
    const localDataTitle = localStorage.getItem("BackgroundTitle");
    return localDataTitle ? JSON.parse(localDataTitle) : "myBOARD";
  })

  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(() => {
    const localDataTitle = localStorage.getItem("BackgroundSave");
    return localDataTitle ? JSON.parse(localDataTitle) : "#b7b6bb";
  })


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



  // SAVE TO LOALSTORAGE
  useEffect(() => {
    const renderFromLocalStorage = JSON.parse(localStorage.getItem('RenderNotes')) || [];
    setRenderNote(renderFromLocalStorage);
  }, []);


  // ADD NEW NOTE
  const addNewNote = () => { //Funkcja dodająca do starej tablicę nową tablicę z nowym obiektem zawierającym atrybuty

    const newNote = {
      id: Date.now(),
      notecolor: '#ffb100',
      fontcolor: '#000000',
      accentcolor: newAccentColor,
      width: newSizeX,
      height: newSizeY,
      titlesize: noteTitleSize,
      contentsize: noteContentSize,
      positionleft: positionFromLeft,
      positiontop: positionFromTop,
      title: 'MyNote',
      content: [],
      layer: layer,
      fontstyle: noteFontStyle
    }

    setRenderNote([...renderNote, newNote])   //Rozpakowuje dotychzasową tablicę i dodaje do niej nowy obiekt a atrybutami
    localStorage.setItem('RenderNotes', JSON.stringify([...renderNote, newNote])); //Aktualizacja w LocalStore
  };




  // REMOVE PARTICULARLY NOTE
  const removeNote = (id) => { //Funkcja usuwająca z aktualnej tablicy obiekt przez filtrowanie po id
    const updatedNote = renderNote.filter((note) => note.id !== id);
    setRenderNote(updatedNote);
    localStorage.setItem('RenderNotes', JSON.stringify([updatedNote])); //Aktualizacja w LocalStore
  };


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


  // UPDATE CONTENT IN PARTICULARLY NOTE
  const changeNoteContent = (id, content) => {
    if (content.trim() === '') { // add a check for empty string
      return;
    }
    const updatedContent = renderNote.map((note) => {
      if (note.id === id) {
        return { ...note, content: [...note.content, content] };
      }
      return note;
    });

    setRenderNote(updatedContent);
    setContentInput({ ...contentInput, [id]: '' }); // set the value to an empty string
    localStorage.setItem('RenderNotes', JSON.stringify(updatedContent));
  };


  //Enter key FUNCTIONALITY
  const handleKeyDown = (event, id, contentInput) => {
    if (event.key === 'Enter') {
      changeNoteContent(id, contentInput);
    }
  };


  //REMOVE CONTENT IN PRATICULARLY NOTE
  const removeContent = (id, contentIndex) => { // Deklaracja funkcji removeContent, która przyjmuje dwa parametry noteId i contentIndex.

    const updatedContent = renderNote.map((note) => { // Mapowanie tablicy renderNote i przypisanie wyniku do nowej zmiennej updatedNotes.
      if (note.id === id) { // Jeśli id aktualnej notatki jest równe noteId, wykonaj poniższe instrukcje.
        const updatedContent = note.content.filter((_, index) => index !== contentIndex); // Stwórz nową tablicę zawierającą elementy notatki, bez elementu o indexie równym contentIndex. Wynik zostanie przypisany do zmiennej updatedContent.
        return { ...note, content: updatedContent }; // Zwróć nowy obiekt notatki z zaktualizowaną tablicą content.
      }
      return note; // Jeśli id aktualnej notatki nie jest równe noteId, zwróć notatkę bez zmian.
    });



    setRenderNote(updatedContent); // Ustawienie stanu renderNote na zaktualizowaną tablicę notatek.
    localStorage.setItem('RenderNotes', JSON.stringify(updatedContent)); // Zaktualizuj dane w LocalStorage z zaktualizowaną tablicą notatek.

  };


  // OPEN SETTINGS WINDOW, ACTIVE NOTE TO CHANGE SETTINGS, INPORT SETTINGS FROM ACTIVE NOTE
  const NoteSettingsWindow = (id) => {
    setActiveNoteSettings(current => !current)
    setNowActiveNoteId(id)

    const InputNoteColor = document.getElementById(id);
    if (InputNoteColor) {
      const bgColor = window.getComputedStyle(InputNoteColor).getPropertyValue("background-color");
      const rgbColor = bgColor.match(/\d+/g); // extracts the rgb values as an array of strings
      const hexColor = "#" + rgbColor.map(c => parseInt(c).toString(16).padStart(2, '0')).join(''); // converts the rgb values to a hex color code
      setNewNoteColor(hexColor);
    }

    const InputFontColor = document.getElementById(id);
    if (InputFontColor) {
      const bgColor = window.getComputedStyle(InputFontColor).getPropertyValue("color");
      const rgbColor = bgColor.match(/\d+/g); // extracts the rgb values as an array of strings
      const hexColor = "#" + rgbColor.map(c => parseInt(c).toString(16).padStart(2, '0')).join(''); // converts the rgb values to a hex color code
      setNewFontColor(hexColor);
    }

    const InputSizeX = document.getElementById(id);
    if (document.getElementById(id)) {
      const change = parseFloat(window.getComputedStyle(InputSizeX).getPropertyValue("width").replace(/[^\d.-]/g, ''));
      setNewSizeX(change);
    }

    const InputSizeY = document.getElementById(id);
    if (document.getElementById(id)) {
      const change = parseFloat(window.getComputedStyle(InputSizeY).getPropertyValue("height").replace(/[^\d.-]/g, ''));
      setNewSizeY(change);
    }

    const InputPositionX = document.getElementById(id);
    if (document.getElementById(id)) {
      const change = parseFloat(window.getComputedStyle(InputPositionX).getPropertyValue("left").replace(/[^\d.-]/g, ''));
      setPositionFromLeft(change);
    }

    const InputPositionY = document.getElementById(id);
    if (document.getElementById(id)) {
      const change = parseFloat(window.getComputedStyle(InputPositionY).getPropertyValue("top").replace(/[^\d.-]/g, ''));
      setPositionFromLeft(change);
    }

    if (document.getElementById(id)) {
      const change = document.getElementById(id).style.zIndex;
      setLayer(change);
    }

  }


  const BoardSettingsWindow = () => {
    setActiveBoardSettings(current => !current)

  }


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


  ////// SETTINGS CHANGE//////

  // CHANGE NOTE COLOR
  const NoteColorChange = (e) => {
    const newColor = e.hex;
    setNewNoteColor(newColor);
    changeNoteAttribute(nowActiveNoteId, 'notecolor', newColor);
  }

  // CHANGE FONT COLOR
  const FontColorChange = (e) => {
    const newColor = e.hex;
    setNewFontColor(newColor);
    changeNoteAttribute(nowActiveNoteId, 'fontcolor', newColor);
  }

  // CHANGE FONT COLOR
  const AccentColorChange = (e) => {
    const newColor = e.hex;
    setNewAccentColor(newColor);
    changeNoteAttribute(nowActiveNoteId, 'accentcolor', newColor);
  }

  // CHANGE POSITION X
  const PositionLeftChange = (event) => {
    const newPosition = event.target.value;
    setPositionFromLeft(newPosition);
    changeNoteAttribute(nowActiveNoteId, 'positionleft', newPosition);
  }

  // CHANGE POSITION X
  const PositionTopChange = (event) => {
    const newPosition = event.target.value;
    setPositionFromTop(newPosition);
    changeNoteAttribute(nowActiveNoteId, 'positiontop', newPosition);
  }

  // CHANGE SIZE X
  const SizeXChange = (event) => {
    const newSize = event.target.value;
    setNewSizeX(newSize);
    changeNoteAttribute(nowActiveNoteId, 'width', newSize);
  }


  // CHANGE SIZE Y
  const SizeYChange = (event) => {
    const newSize = event.target.value;
    setNewSizeY(newSize);
    changeNoteAttribute(nowActiveNoteId, 'height', newSize);
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

  const NoteFontStyleChange = (event) => {
    const newStyle = event.target.value;
    setNoteFontStyle(newStyle);
    changeNoteAttribute(nowActiveNoteId, 'fontstyle', newStyle);
  }


  const LayerChange = (event) => {
    const newLayer = event.target.value;
    setLayer(newLayer);
    changeNoteAttribute(nowActiveNoteId, 'layer', layer);
  }

  const LayerUp = () => {
    if (layer < 49) {
      const newLayer = Number(layer + 1);
      setLayer(newLayer);
      changeNoteAttribute(nowActiveNoteId, "layer", newLayer);
    }
  }

  const LayerDown = () => {
    if (layer > 0) {
      const newLayer = Number(layer - 1);
      setLayer(newLayer);
      changeNoteAttribute(nowActiveNoteId, "layer", newLayer)
    }
  }

  useEffect(() => {
    localStorage.setItem("BackgroundTitle", JSON.stringify(boardTitle))
  }, [boardTitle])


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

    <div className='BoardContainer'
      style={{ backgroundImage: selectedBackgroundColor }}>

      {renderNote.map((note) => (

        <div
          className='NoteContainer'
          id={note.id}
          key={note.id}
          style={{
            left: `${note.positionleft}px`,
            top: `${note.positiontop}px`,
            backgroundColor: note.notecolor,
            width: `${note.width}px`,
            height: `${note.height}px`,
            boxShadow: `8px 8px 24px 0px ${note.accentcolor}`,
            zIndex: note.layer
          }}>

          <div className="TitleContainer">

            <button className='RemoveNoteBtn' onClick={() => removeNote(note.id)} style={{ color: note.accentcolor }}>X</button>
            <input
              className='TitleInput'
              spellCheck="false"
              type="text"
              style={{
                color: note.fontcolor,
                fontSize: `${note.titlesize}px`,
                borderBottom: `0.1rem solid ${note.accentcolor}`,
                fontFamily: note.fontstyle
              }}
              value={note.title}
              onChange={(e) => changeNoteAttribute(note.id, 'title', e.target.value)}
            />

            <button className='NoteSettingsBtn' onClick={() => NoteSettingsWindow(note.id)} style={{ color: note.accentcolor }}>⚙</button>

          </div>



          <div className="AddNewContainer" style={{ borderBottom: `0.1rem solid ${note.accentcolor}` }}>

            <textarea
              className='NewInput'
              spellCheck="false"
              type="text"
              style={{
                color: note.fontcolor,
                fontSize: `${note.contentsize}px`,
                fontFamily: note.fontstyle
              }}
              value={contentInput[note.id]}
              onChange={(e) => setContentInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, note.id, contentInput)}
            />

            {/* <button
              className="NewButton"
              style={{ color: note.accentcolor }}
              onClick={() => { changeNoteContent(note.id, contentInput) }}
            >+</button> */}

          </div>

          <div className="ListContainer">

            <ul>
              {note.content.map((content, index) => (

                <li
                  key={index}
                  style={{
                    color: note.fontcolor,
                    fontSize: `${note.contentsize}px`,
                    borderBottom: `0.1rem solid ${note.accentcolor}`,
                    fontFamily: note.fontstyle,
                    // textDecoration: `${isCrossed ? "line-through" : "none"}`
                  }}

                  onClick={() => removeContent(note.id, index)}>

                  {content}
                </li>

              ))}
            </ul>

          </div>

        </div>

      ))}

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

      <button className='SettingsBoardBtn' onClick={BoardSettingsWindow}>⚙</button>
      <button className='AddNewNoteBtn' onClick={addNewNote}>Add New</button>

      <div className={`SettingsNoteContainer ${activeBoardSettings ? "On" : "Off"}`}>
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


      <div className={`SettingsNoteContainer ${activeNoteSettings ? "On" : "Off"}`}>

        <button className="CloseSettingNoteBtn" onClick={NoteSettingsWindow}>X</button>

        <div className="SettingsSectionsContainer">

          <div className="SettingsSectionsTitle">Colors Settings</div>

          <div className="SettingsSectionsContent">

            <div className='ColorContainer'>
              <div className="ColorTitle">Note Color</div>
              <button className="ColorBtn" onClick={OpenColorBackground} style={{ backgroundColor: newNoteColor }}> </button>
            </div>


            <div className={`ColorPicker ${isActiveBckground ? "On" : "Off"}`}>
              <ChromePicker
                disableAlpha
                color={newNoteColor}
                onChange={NoteColorChange} />
            </div>

            <div className='ColorContainer'>
              <div className="ColorTitle">Font Color</div>
              <button className="ColorBtn" onClick={OpenColorFont} style={{ backgroundColor: newFontColor }}> </button>
            </div>

            <div className={`ColorPicker ${isActiveFont ? "On" : "Off"}`}>
              <ChromePicker
                disableAlpha
                color={newFontColor}
                onChange={FontColorChange} />
            </div>

            <div className='ColorContainer'>
              <div className="ColorTitle">Accents Color</div>
              <button className="ColorBtn" onClick={OpenColorAccent} style={{ backgroundColor: newAccentColor }}> </button>
            </div>

            <div className={`ColorPicker ${isActiveAcccent ? "On" : "Off"}`}>
              <ChromePicker
                disableAlpha
                color={newAccentColor}
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

          <div className="SettingsSectionsTitle">Note Size Settings</div>

          <div className="SettingsSectionsContent">

            <div className="DimentionContainer">

              <div className='HorizontalSettings'>
                Size X
                <input
                  className='HorizontalSlider'
                  type="range"
                  min={100}
                  step="1"
                  max={window.innerWidth - positionFromLeft - 5}
                  value={newSizeX}
                  onChange={SizeXChange}
                />
                <input
                  className='HorizontalInput'
                  type="number"
                  value={newSizeX}
                  onChange={SizeXChange}
                />
              </div>

              <div className='HorizontalSettings'>
                Size Y
                <input
                  className='HorizontalSlider'
                  type="range"
                  min={100}
                  step="1"
                  max={window.innerHeight - positionFromTop - 5}
                  value={newSizeY}
                  onChange={SizeYChange}
                />
                <input
                  className='HorizontalInput'
                  type="number"
                  value={newSizeY}
                  onChange={SizeYChange}
                />
              </div>

            </div>

          </div>


        </div>


        <div className="SettingsSectionsContainer">

          <div className="SettingsSectionsTitle">Note Positions Settings</div>

          <div className="SettingsSectionsContent">

            <div className="DimentionContainer">

              <div className='HorizontalSettings'>
                Position X
                <input
                  type="range"
                  min="5"
                  step="1"
                  max={window.innerWidth - newSizeX - 5}
                  value={positionFromLeft}
                  onChange={PositionLeftChange}
                />
                <input
                  className='HorizontalInput'
                  type="number"
                  value={positionFromLeft}
                  onChange={PositionLeftChange}
                />
              </div>

              <div className='HorizontalSettings'>
                Position Y
                <input
                  className='HorizontalSlider'
                  type="range"
                  min="5"
                  step="1"
                  max={window.innerHeight - newSizeY - 5}
                  value={positionFromTop}
                  onChange={PositionTopChange}
                />
                <input
                  className='HorizontalInput'
                  type="number"
                  value={positionFromTop}
                  onChange={PositionTopChange}
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

    </div >

  );


}

export default App;

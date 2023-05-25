import { useState, useEffect } from 'react';
import NoteSettings from './NoteSettings';


const NoteContainer = () => {



    //VARIABLES
    const [renderNote, setRenderNote] = useState([]);
    const [contentInput, setContentInput] = useState([]);
    const [nowActiveNoteId, setNowActiveNoteId] = useState(null);

    const [nowActiveTitle, setNowActiveTitle] = useState("MYNOTE")

    const [activeNoteSettings, setActiveNoteSettings] = useState(false);

    const [newNoteColor, setNewNoteColor] = useState("#ffb100");
    const [newFontColor, setNewFontColor] = useState("#000000");
    const [newAccentColor, setNewAccentColor] = useState('#4b4d4f');

    const [newSizeX, setNewSizeX] = useState(400);
    const [newSizeY, setNewSizeY] = useState(500);

    const [positionFromLeft, setPositionFromLeft] = useState(0);
    const [positionFromTop, setPositionFromTop] = useState(0)

    const [noteTitleSize, setNoteTitleSize] = useState(25);
    const [noteContentSize, setNoteContentSize] = useState(15);

    const [layer, setLayer] = useState(1);

    const [noteFontStyle, setNoteFontStyle] = useState("Shantell Sans, cursive")

    const [isCrossed, setIsCrossed] = useState(true)


    // SAVE TO LOALSTORAGE
    useEffect(() => {
        const renderFromLocalStorage = JSON.parse(localStorage.getItem('RenderNotes')) || [];
        setRenderNote(renderFromLocalStorage);
    }, []);


    // ADD NEW NOTE
    const addNewNote = () => { //Funkcja dodająca do starej tablicę nową tablicę z nowym obiektem zawierającym atrybuty

        const newNote = {
            id: Date.now(),
            notecolor: newNoteColor,
            fontcolor: newFontColor,
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

        setRenderNote([...renderNote, newNote])   //Rozpakowuje dotychzasową tablicę i dodaje do niej nowy obiekt z atrybutami

        localStorage.setItem('RenderNotes', JSON.stringify([...renderNote, newNote])); //Aktualizacja w LocalStore
    };

    // REMOVE PARTICULARLY NOTE
    const removeNote = (id) => { //Funkcja usuwająca z aktualnej tablicy obiekt przez filtrowanie po id
        const updatedNote = renderNote.filter((note) => note.id !== id);
        setRenderNote(updatedNote);
        localStorage.setItem('RenderNotes', JSON.stringify([updatedNote])); //Aktualizacja w LocalStore
    };


    // UPDATE CONTENT IN PARTICULARLY NOTE (wycięte)
    // if (content.trim() === '') { // add a check for empty string
    //     return;
    // }

    // UPDATE CONTENT IN PARTICULARLY NOTE
    const changeNoteContent = (id, content) => {
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


    // OPEN SETTINGS WINDOW, ACTIVE NOTE TO CHANGE SETTINGS, INPORT SETTINGS FROM ACTIVE NOTE, GET TITLE OF EDIT NOTE
    const NoteSettingsWindow = (id, title) => {
        setActiveNoteSettings(current => !current)
        setNowActiveNoteId(id)
        setNowActiveTitle(title)

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

        if (document.getElementById(id)) {
            const change = document.getElementById(id).style.zIndex;
            setLayer(change);
        }

    }



    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });




    // UPDATE POSITION ATTRIBUTES FOR PARTICULAR NOTE
    const changePositionAttribute = (id, newPosition) => {
        const { x, y } = newPosition;

        const updatedAttributes = renderNote.map((note) => {
            if (note.id === id) {
                return { ...note, positionleft: x, positiontop: y };
            }
            return note;
        });

        setRenderNote(updatedAttributes);
        localStorage.setItem('RenderNotes', JSON.stringify(updatedAttributes));
    };


    const [initialPositions, setInitialPositions] = useState({});

    //Zmienić, żeby pobierało ID tylko po kliknięciu na diva nic poza tym
    const handleMouseDown = (event, id) => {
        setNowActiveNoteId(id);
        setIsDragging(true);

        const { clientX, clientY } = event;
        const left = positionFromLeft;
        const top = positionFromTop;
        const x = clientX - left;
        const y = clientY - top;
        setOffset({ x, y });

        console.log(`Nacisnąłeś notatkę o id ${id}`);

        // Zaktualizuj pozycję startową dla klikniętej notatki
        setInitialPositions((prevState) => ({
            ...prevState,
            [id]: { x: positionFromLeft, y: positionFromTop },
        }));

        console.log(`${initialPositions.x}, ${initialPositions.y}`)
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!isDragging) return;
            const { clientX, clientY } = event;
            const { x, y } = offset;
            const newPosition = {
                x: clientX - x,
                y: clientY - y,
            };
            setPositionFromLeft(newPosition.x);
            setPositionFromTop(newPosition.y);
            console.log(`Ruszasz notatką w ${newPosition.x} i ${newPosition.y}`);
            changePositionAttribute(nowActiveNoteId, newPosition);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setOffset({ x: 0, y: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, offset, nowActiveNoteId, setPositionFromTop, setPositionFromLeft]);



    // UPDATE SIZE ATTRIBUTES FOR PARTICULAR NOTE
    const changeSizeAttribute = (id, newWidth, newHeight) => {
        const updatedAttributes = renderNote.map((note) => {
            if (note.id === id) {
                return { ...note, width: newWidth, height: newHeight };
            }
            return note;
        });

        setRenderNote(updatedAttributes);
        localStorage.setItem("RenderNotes", JSON.stringify(updatedAttributes));
    };

    const [isResizing, setIsResizing] = useState(false);
    const [resizeStartX, setResizeStartX] = useState(0);
    const [resizeStartY, setResizeStartY] = useState(0);

    const handleResizeMouseDown = (event, id) => {
        setNowActiveNoteId(id);
        event.preventDefault();
        setIsResizing(true);
        setResizeStartX(event.clientX);
        setResizeStartY(event.clientY);
        console.log(`Div Down`);
    };

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", handleResizeMouseMove);
            document.addEventListener("mouseup", handleResizeMouseUp);
        } else {
            document.removeEventListener("mousemove", handleResizeMouseMove);
            document.removeEventListener("mouseup", handleResizeMouseUp);
        }
        return () => {
            document.removeEventListener("mousemove", handleResizeMouseMove);
            document.removeEventListener("mouseup", handleResizeMouseUp);
        };
    }, [isResizing]);

    const handleResizeMouseMove = (event) => {
        const offsetX = event.clientX - resizeStartX;
        const offsetY = event.clientY - resizeStartY;
        const newWidth = newSizeX + offsetX;
        const newHeight = newSizeY + offsetY;
        setNewSizeX(newWidth);
        setNewSizeY(newHeight);
        changeSizeAttribute(nowActiveNoteId, newWidth, newHeight);
        console.log(`Div resize`);
    };

    const handleResizeMouseUp = () => {
        setIsResizing(false);
        console.log(`Div Up`);
    };


    const moveContentUp = (noteId, index) => {
        const updatedRenderNote = renderNote.map((note) => {
            if (note.id === noteId) {
                if (index > 0) {
                    const updatedContent = [...note.content];
                    const temp = updatedContent[index];
                    updatedContent[index] = updatedContent[index - 1];
                    updatedContent[index - 1] = temp;
                    return { ...note, content: updatedContent };
                }
            }
            return note;
        });

        setRenderNote(updatedRenderNote);
        localStorage.setItem('RenderNotes', JSON.stringify(updatedRenderNote));
    };

    const moveContentDown = (noteId, index) => {
        const updatedRenderNote = renderNote.map((note) => {
            if (note.id === noteId) {
                if (index < note.content.length - 1) {
                    const updatedContent = [...note.content];
                    const temp = updatedContent[index];
                    updatedContent[index] = updatedContent[index + 1];
                    updatedContent[index + 1] = temp;
                    return { ...note, content: updatedContent };
                }
            }
            return note;
        });

        setRenderNote(updatedRenderNote);
        localStorage.setItem('RenderNotes', JSON.stringify(updatedRenderNote));
    };


    const toggleTextDecoration = (noteId, index) => {
        const updatedRenderNote = renderNote.map((note) => {
            if (note.id === noteId) {
                const updatedContent = [...note.content];
                const content = updatedContent[index];
                content.isCrossed = !content.isCrossed;
                return { ...note, content: updatedContent };
            }
            return note;
        });

        setRenderNote(updatedRenderNote);
        // ...
    };


    return (

        <div>
            <NoteSettings
                newNoteColor={newNoteColor}
                setNewNoteColor={setNewNoteColor}

                newFontColor={newFontColor}
                setNewFontColor={setNewFontColor}

                newAccentColor={newAccentColor}
                setNewAccentColor={setNewAccentColor}


                noteTitleSize={noteTitleSize}
                setNoteTitleSize={setNoteTitleSize}

                noteContentSize={noteContentSize}
                setNoteContentSize={setNoteContentSize}

                layer={layer}
                setLayer={setLayer}

                noteFontStyle={noteFontStyle}
                setNoteFontStyle={setNoteFontStyle}

                nowActiveNoteId={nowActiveNoteId}
                setNowActiveNoteId={setNowActiveNoteId}

                activeNoteSettings={activeNoteSettings}
                setActiveNoteSettings={setActiveNoteSettings}

                renderNote={renderNote}
                setRenderNote={setRenderNote}

                NoteSettingsWindow={NoteSettingsWindow}

                nowActiveTitle={nowActiveTitle}

            />

            <button className='AddNewNoteBtn' onClick={addNewNote}>Add New</button>

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
                        zIndex: note.layer,
                        position: 'absolute'
                    }}>

                    <div className="TopSection"

                    >

                        <button className='RemoveNoteBtn' onClick={() => removeNote(note.id)} style={{ borderBottom: `0.1rem solid ${note.accentcolor}`, }}>
                            <div style={{ color: note.accentcolor }}>X</div>
                        </button>

                        <div className="MoveContainer"
                            onMouseDown={(event) => handleMouseDown(event, note.id)}
                            style={{
                                borderLeft: `0.1rem solid ${note.accentcolor}`,
                                borderRight: `0.1rem solid ${note.accentcolor}`,
                                borderBottom: `0.1rem solid ${note.accentcolor}`,

                            }}>
                            <div style={{ color: note.accentcolor, fontFamily: note.fontstyle, userSelect: 'none', }}>Move Me</div>
                        </div>

                        <button className='NoteSettingsBtn' onClick={() => NoteSettingsWindow(note.id, note.title)} style={{ borderBottom: `0.1rem solid ${note.accentcolor}`, }}>
                            <div style={{ color: note.accentcolor }}>⚙</div>
                        </button>

                    </div>

                    <div className="EmptySpaceContainer"></div>

                    <div className="TitleContainer">

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

                    </div>

                    <div className="AddNewContainer" style={{ borderBottom: `0.1rem solid ${note.accentcolor}`, height: `${note.contentsize}px` }}>

                        <textarea
                            className='NewInput'
                            spellCheck="false"
                            type="text"
                            style={{
                                color: note.fontcolor,
                                fontSize: `${note.contentsize}px`,
                                fontFamily: note.fontstyle,

                            }}
                            value={contentInput[note.id]}
                            onChange={(e) => setContentInput(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, note.id, contentInput)}
                        />



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
                                    }}>

                                    {content}


                                    <div>
                                        <button
                                            onClick={() => moveContentUp(note.id, index)}
                                            style={{
                                                display: `${index === 0 ? "none" : ""}`,
                                                fontSize: `${note.contentsize}px`,
                                                color: note.accentcolor,
                                                fontFamily: note.fontstyle
                                            }}>
                                            ⇧</button>

                                        <button onClick={() => removeContent(note.id, index)}
                                            style={{
                                                fontSize: `${note.contentsize}px`,
                                                color: note.accentcolor,
                                                fontFamily: note.fontstyle
                                            }}>
                                            X</button>

                                        <button onClick={() => moveContentDown(note.id, index)}
                                            style={{
                                                display: `${index === note.content.length - 1 ? "none" : ""}`,
                                                fontSize: `${note.contentsize}px`,
                                                color: note.accentcolor,
                                                fontFamily: note.fontstyle
                                            }}>
                                            ⇩</button>

                                        {/* <button onClick={() => toggleTextDecoration(note.id, index)}
                                            style={{
                                                fontSize: `${note.contentsize}px`,
                                                color: note.accentcolor,
                                                fontFamily: note.fontstyle

                                            }}>ST</button> */}
                                    </div>
                                </li>
                            ))}

                        </ul>

                    </div>

                    <div className="ResizeContainer"
                        onMouseDown={(event) => handleResizeMouseDown(event, note.id)}
                        style={{
                            borderLeft: `0.1rem solid ${note.accentcolor}`,
                            borderTop: `0.1rem solid ${note.accentcolor}`
                        }}>
                        <div style={{ color: note.accentcolor, fontFamily: note.fontstyle, userSelect: 'none' }}>Resie Me</div>
                    </div>

                </div>

            ))}
        </div>

    );
}

export default NoteContainer;
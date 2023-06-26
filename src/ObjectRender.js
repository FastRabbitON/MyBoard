import { useState, useEffect } from 'react';


import ObjectSettings from './ObjectSettings';

import "./ObjectRenderStyle.css"

const ObjectRender = ({
    isAddMenuOpen,
    setIsAddMenuOpen,
    activeObjectSettings,
    setActiveObjectSettings,
    activeBoardSettings,
    setActiveBoardSettings
}) => {


    const [renderObject, setRenderObject] = useState([]);
    const [nowActiveObjectID, setNowActiveObjectID] = useState(null);
    const [nowActiveObjectType, setNowActiveObjectType] = useState(null);

    const [backgroundColor, setBackgroundColor] = useState("#ffb100");
    const [fontColor, setFontColor] = useState("#000000");
    const [accentColor, setAccentColor] = useState('#4b4d4f');

    const [positionFromLeft, setPositionFromLeft] = useState(10);
    const [positionFromTop, setPositionFromTop] = useState(10)

    const [sizeX, setSizeX] = useState(400);
    const [sizeY, setSizeY] = useState(500);

    const [titleSize, setTitleSize] = useState(25);
    const [contentSize, setContentSize] = useState(15);

    const [layer, setLayer] = useState(1);
    const [fontStyle, setNoteFontStyle] = useState("Shantell Sans, cursive")

    const [isShadow, setIsShadow] = useState(true)

    //Unique for Note
    const [contentNote, setContentNote] = useState([]);
    const [nowActiveTitle, setNowActiveTitle] = useState("myNote")


    //Unique for Clock
    const [clockForm, setClockForm] = useState("HH:MM:SS/DD.MM.YYYY")


    //Unique for Calendar
    const [currentDate, setCurrentDate] = useState(new Date());

    //Unique for Weather
    const api = "cd95b4162ff6765cbe3dbd2169ae2b1b"

    const [nowDate, setNowDate] = useState(new Date())
    const [placeName, setPlaceName] = useState('');
    const [weatherApiInfo, setWeatherApiInfo] = useState('');


    // SAVE TO LOALSTORAGE
    useEffect(() => {
        const renderFromLocalStorage = JSON.parse(localStorage.getItem('RenderObject')) || [];
        setRenderObject(renderFromLocalStorage);
    }, []);


    // ADD NEW NOTE
    const AddNewObject = (ObjectType) => { //Funkcja dodająca do starej tablicę nową tablicę z nowym obiektem zawierającym atrybuty


        if (ObjectType === "Note") {
            const NewObject = {
                AttributeID: `Note(${Date.now()})`,
                AttributeObjectType: "Note",
                AttributeColor: "#ffb100",
                AttributeFontColor: "#000000",
                AttributeAccentColor: '#4b4d4f',
                AttributeShadow: true,
                AttributeWidth: 350,
                AttributeHeight: 400,
                AttributeTitleSize: 20,
                AttributeContentSize: 15,
                AttributePositionLeft: 10,
                AttributePositionTop: 10,
                AttributeFontStyle: "Shantell Sans, cursive",
                AttributeLayer: 1,
                //Unique Attributes for Note
                AttributeTitle: 'myNote',
                AttributeNoteContent: [],
            }
            console.log("Added Note");
            setRenderObject([...renderObject, NewObject])   //Rozpakowuje dotychzasową tablicę i dodaje do niej nowy obiekt z atrybutami
            localStorage.setItem('RenderObject', JSON.stringify([...renderObject, NewObject])); //Aktualizacja w LocalStore    
        }


        if (ObjectType === "Clock") {
            const NewObject = {
                AttributeID: `Clock(${Date.now()})`,
                AttributeObjectType: "Clock",
                AttributeColor: "#ffb100",
                AttributeFontColor: "#000000",
                AttributeAccentColor: '#4b4d4f',
                AttributeShadow: true,
                AttributeWidth: 115,
                AttributeHeight: 110,
                AttributeTitleSize: 20,
                AttributeContentSize: 20,
                AttributePositionLeft: 10,
                AttributePositionTop: 10,
                AttributeFontStyle: "Shantell Sans, cursive",
                AttributeLayer: 1,
                //Unique Attributes for Note
                AttributeClockForm: "HH:MM:SS/DD.MM.YYYY",
            }
            console.log("Added Clock");
            setRenderObject([...renderObject, NewObject])   //Rozpakowuje dotychzasową tablicę i dodaje do niej nowy obiekt z atrybutami
            localStorage.setItem('RenderObject', JSON.stringify([...renderObject, NewObject])); //Aktualizacja w LocalStore    
        }

        if (ObjectType === "Calendar") {
            const NewObject = {
                AttributeID: `Calendar(${Date.now()})`,
                AttributeObjectType: "Calendar",
                AttributeColor: "#ffb100",
                AttributeFontColor: "#000000",
                AttributeAccentColor: '#4b4d4f',
                AttributeShadow: true,
                AttributeWidth: 350,
                AttributeHeight: 300,
                AttributeTitleSize: 20,
                AttributeContentSize: 20,
                AttributePositionLeft: 10,
                AttributePositionTop: 10,
                AttributeFontStyle: "Shantell Sans, cursive",
                AttributeLayer: 1,

            }
            console.log("Added Calendar");
            setRenderObject([...renderObject, NewObject])   //Rozpakowuje dotychzasową tablicę i dodaje do niej nowy obiekt z atrybutami
            localStorage.setItem('RenderObject', JSON.stringify([...renderObject, NewObject])); //Aktualizacja w LocalStore    
        }

        if (ObjectType === "Weather") {
            const NewObject = {
                AttributeID: `Weather(${Date.now()})`,
                AttributeObjectType: "Weather",
                AttributeColor: "#ffb100",
                AttributeFontColor: "#000000",
                AttributeAccentColor: '#4b4d4f',
                AttributeShadow: true,
                AttributeWidth: 240,
                AttributeHeight: 125,
                AttributeTitleSize: 20,
                AttributeContentSize: 20,
                AttributePositionLeft: 10,
                AttributePositionTop: 10,
                AttributeFontStyle: "Shantell Sans, cursive",
                AttributeLayer: 1,
                //Unique Attribute for Weather
                AttributeLocation: ""

            }
            console.log("Added Weather");
            setRenderObject([...renderObject, NewObject])   //Rozpakowuje dotychzasową tablicę i dodaje do niej nowy obiekt z atrybutami
            localStorage.setItem('RenderObject', JSON.stringify([...renderObject, NewObject])); //Aktualizacja w LocalStore    
        }
    };

    const RemoveObject = (ID) => {

        const updatedRender = renderObject.filter((object) => object.AttributeID !== ID);
        setRenderObject(updatedRender);
        localStorage.setItem('RenderObject', JSON.stringify(updatedRender)); //Aktualizacja w LocalStore

        if (activeObjectSettings === true) {
            setActiveObjectSettings(false)
        }

    };

    const GeneralAttributeChanger = (ID, AttributeToChange, Value) => {   // Do funkcji są przekazane parametry AttributeID,attr,vlue

        console.log(ID, AttributeToChange, Value);

        const updatedAttribute = renderObject.map((object) => {      // Tablica jest mapowana, i sprawdzana który z jej elementów ma AttributeID=AttributeID z parametrów przekazanych do funkcji (linia wyżej)
            if (object.AttributeID === ID) {
                return { ...object, [AttributeToChange]: Value }; // Ustawienie dla konkretnego atrybutu nowej wartości 
            }
            return object
        })
        setRenderObject(updatedAttribute);
        localStorage.setItem('RenderObject', JSON.stringify(updatedAttribute)); //Aktualizacja LocalStore

    };


    const SettingsWindow = (ID, ObjectType, Title) => {

        if (activeObjectSettings === true && nowActiveObjectID === ID) {
            setActiveObjectSettings(false)
        }

        else if (activeObjectSettings === true && nowActiveObjectID !== ID) {
            setActiveObjectSettings(false)
            setActiveObjectSettings(true)
        }

        else if (activeObjectSettings === false && nowActiveObjectID === ID) {
            setActiveObjectSettings(true)
        }

        else if (activeObjectSettings === false && nowActiveObjectID !== ID) {
            setActiveObjectSettings(true)
        }

        if (activeBoardSettings === true) {
            setActiveBoardSettings(false)
        }

        if (isAddMenuOpen === true) {
            setIsAddMenuOpen(false)
        }

        setNowActiveObjectType(ObjectType)
        setNowActiveTitle(Title)
        setNowActiveObjectID(ID)


        const GetAttribute = renderObject.find(object => object.AttributeID === ID);
        if (GetAttribute) {
            const { AttributeColor, AttributeFontColor, AttributeAccentColor, AttributeTitleSize, AttributeContentSize, AttributeFontStyle, AttributeLayer, AttributeShadow, AttributeClockForm } = GetAttribute;
            setBackgroundColor(AttributeColor);
            setFontColor(AttributeFontColor);
            setAccentColor(AttributeAccentColor);
            setIsShadow(AttributeShadow);
            setTitleSize(AttributeTitleSize);
            setContentSize(AttributeContentSize);
            setNoteFontStyle(AttributeFontStyle);
            setLayer(AttributeLayer);

            //Unique For Clock
            setClockForm(AttributeClockForm)
        }

    }


    const MenuOpener = () => {
        setIsAddMenuOpen(current => !current)

        if (activeObjectSettings === true) {
            setActiveObjectSettings(false)
        }

        if (activeBoardSettings === true) {
            setActiveBoardSettings(false)
        }
    }


    //Move Object

    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const PositionAttributeChanger = (ID, newPosition) => {
        const { x, y } = newPosition;

        const updatedAttributes = renderObject.map((object) => {
            if (object.AttributeID === ID) {
                return { ...object, AttributePositionLeft: x, AttributePositionTop: y };
            }
            return object;
        });

        setRenderObject(updatedAttributes);
        localStorage.setItem('RenderObject', JSON.stringify(updatedAttributes));
    };

    const MouseDownForMove = (event, ID) => {
        setNowActiveObjectID(ID);
        setIsDragging(true);

        const { clientX, clientY } = event;
        const object = renderObject.find(object => object.AttributeID === ID);
        const x = clientX - object.AttributePositionLeft;
        const y = clientY - object.AttributePositionTop;
        setOffset({ x, y });
    };

    useEffect(() => {
        const MouseMoveForMove = (event) => {
            if (!isDragging) return;
            const { clientX, clientY } = event;
            const { x, y } = offset;
            const newPosition = {
                x: clientX - x,
                y: clientY - y,
            };
            setPositionFromLeft(newPosition.x);
            setPositionFromTop(newPosition.y);
            PositionAttributeChanger(nowActiveObjectID, newPosition);
        };

        const MouseUpForMove = () => {
            setIsDragging(false);
            setOffset({ x: 0, y: 0 });
        };


        window.addEventListener('mousemove', MouseMoveForMove);
        window.addEventListener('mouseup', MouseUpForMove);

        return () => {
            window.removeEventListener('mousemove', MouseMoveForMove);
            window.removeEventListener('mouseup', MouseUpForMove);
        };
    }, [isDragging, offset, nowActiveObjectID, setPositionFromTop, setPositionFromLeft]);




    //Resize Object
    const [isResizing, setIsResizing] = useState(false);
    const [resizeStartX, setResizeStartX] = useState(0);
    const [resizeStartY, setResizeStartY] = useState(0);

    const SizeAttributeChanger = (ID, newWidth, newHeight) => {
        const updatedAttributes = renderObject.map((object) => {
            if (object.AttributeID === ID) {
                return { ...object, AttributeWidth: newWidth, AttributeHeight: newHeight };
            }
            return object;
        });

        setRenderObject(updatedAttributes);
        localStorage.setItem("RenderObject", JSON.stringify(updatedAttributes));
    };

    const MouseDownForResize = (event, ID) => {
        setNowActiveObjectID(ID);
        event.preventDefault();
        setIsResizing(true);

        const object = renderObject.find((object) => object.AttributeID === ID);
        setResizeStartX(event.clientX);
        setResizeStartY(event.clientY);
        setSizeX(object.AttributeWidth);
        setSizeY(object.AttributeHeight);

    };

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", MouseMoveForResize);
            document.addEventListener("mouseup", MouseUpForResize);
        } else {
            document.removeEventListener("mousemove", MouseMoveForResize);
            document.removeEventListener("mouseup", MouseUpForResize);
        }
        return () => {
            document.removeEventListener("mousemove", MouseMoveForResize);
            document.removeEventListener("mouseup", MouseUpForResize);
        };
    }, [isResizing]);

    const MouseMoveForResize = (event) => {
        const offsetX = event.clientX - resizeStartX;
        const offsetY = event.clientY - resizeStartY;
        const newWidth = sizeX + offsetX;
        const newHeight = sizeY + offsetY;
        setSizeX(newWidth);
        setSizeY(newHeight);
        SizeAttributeChanger(nowActiveObjectID, newWidth, newHeight);
    };

    const MouseUpForResize = () => {
        setIsResizing(false);
    };



    //Unique For Note

    // UPDATE AttributeNoteContent IN PARTICULARLY NOTE
    const changeNoteContent = (AttributeID, Content) => {
        const updatedContent = renderObject.map((note) => {
            if (note.AttributeID === AttributeID) {
                return { ...note, AttributeNoteContent: [...note.AttributeNoteContent, Content] };
            }
            return note;
        });

        setRenderObject(updatedContent);
        setContentNote({ ...contentNote, [AttributeID]: '' }); // set the value to an empty string
        localStorage.setItem('RenderObject', JSON.stringify(updatedContent));
    };


    //Enter key FUNCTIONALITY
    const handleKeyDown = (event, id, contentNote) => {
        if (event.key === 'Enter') {
            changeNoteContent(id, contentNote);
        }
    };




    // //REMOVE AttributeNoteContent IN PRATICULARLY NOTE
    const removeContent = (id, contentIndex) => { // Deklaracja funkcji removeContent, która przyjmuje dwa parametry noteId i contentIndex.

        const updatedContent = renderObject.map((note) => { // Mapowanie tablicy renderNote i przypisanie wyniku do nowej zmiennej updatedNotes.
            if (note.AttributeID === id) { // Jeśli AttributeID aktualnej notatki jest równe noteId, wykonaj poniższe instrukcje.
                const updatedContent = note.AttributeNoteContent.filter((_, index) => index !== contentIndex); // Stwórz nową tablicę zawierającą elementy notatki, bez elementu o indexie równym contentIndex. Wynik zostanie przypisany do zmiennej updatedContent.
                return { ...note, AttributeNoteContent: updatedContent }; // Zwróć nowy obiekt notatki z zaktualizowaną tablicą AttributeNoteContent.
            }
            return note; // Jeśli AttributeID aktualnej notatki nie jest równe noteId, zwróć notatkę bez zmian.
        });

        setRenderObject(updatedContent); // Ustawienie stanu renderNote na zaktualizowaną tablicę notatek.
        localStorage.setItem('RenderObject', JSON.stringify(updatedContent)); // Zaktualizuj dane w LocalStorage z zaktualizowaną tablicą notatek.
    };


    //MOVE LI UP
    const moveContentUp = (id, index) => {
        const updatedRenderNote = renderObject.map((note) => {
            if (note.AttributeID === id) {
                if (index > 0) {
                    const updatedContent = [...note.AttributeNoteContent];
                    const temp = updatedContent[index];
                    updatedContent[index] = updatedContent[index - 1];
                    updatedContent[index - 1] = temp;
                    return { ...note, AttributeNoteContent: updatedContent };
                }
            }
            return note;
        });

        setRenderObject(updatedRenderNote);
        localStorage.setItem('RenderObject', JSON.stringify(updatedRenderNote));
    };


    // MOVE LI DOWN
    const moveContentDown = (id, index) => {
        const updatedRenderNote = renderObject.map((note) => {
            if (note.AttributeID === id) {
                if (index < note.AttributeNoteContent.length - 1) {
                    const updatedContent = [...note.AttributeNoteContent];
                    const temp = updatedContent[index];
                    updatedContent[index] = updatedContent[index + 1];
                    updatedContent[index + 1] = temp;
                    return { ...note, AttributeNoteContent: updatedContent };
                }
            }
            return note;
        });

        setRenderObject(updatedRenderNote);
        localStorage.setItem('RenderObject', JSON.stringify(updatedRenderNote));
    };




    // Unique For Clock
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const tick = () => {
        setDate(new Date());
    };



    //Unique For Calendar

    const prevMonth = () => {
        setCurrentDate(prevDate => {
            const prevYear = prevDate.getFullYear();
            const prevMonth = prevDate.getMonth();
            return new Date(prevYear, prevMonth - 1, 1);
        });
    };

    const nextMonth = () => {
        setCurrentDate(prevDate => {
            const nextYear = prevDate.getFullYear();
            const nextMonth = prevDate.getMonth();
            return new Date(nextYear, nextMonth + 1, 1);
        });
    };

    const prevYear = () => {
        setCurrentDate(prevDate => {
            const prevYear = prevDate.getFullYear() - 1;
            const prevMonth = prevDate.getMonth();
            return new Date(prevYear, prevMonth, 1);
        });
    };

    const nextYear = () => {
        setCurrentDate(prevDate => {
            const nextYear = prevDate.getFullYear() + 1;
            const nextMonth = prevDate.getMonth();
            return new Date(nextYear, nextMonth, 1);
        });
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const getMonthData = (year, month) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startOffset = firstDay.getDay();
        const totalDays = lastDay.getDate();
        const weeks = Math.ceil((totalDays + startOffset) / 7);

        const monthData = [];
        let dayCounter = 1;

        for (let i = 0; i < weeks; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startOffset) {
                    week.push(null);
                } else if (dayCounter > totalDays) {
                    week.push(null);
                } else {
                    week.push(dayCounter);
                    dayCounter++;
                }
            }
            monthData.push(week);
        }

        return monthData;
    };

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const monthData = getMonthData(currentYear, currentMonth);

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();


    // Unique for Weather

    const Search = (event, ID) => {

        if (event.key === 'Enter') {

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${placeName}&appid=${api}&units=metric`)
                .then(apiInformation => {
                    if (apiInformation.ok) {
                        return apiInformation
                    }
                    else {
                        throw Error('Location was not found')
                    }
                })

                .then(apiInformation => apiInformation.json())
                .then(weatherApiInfo => { setWeatherApiInfo(weatherApiInfo) })
                .catch(errThree => alert(errThree));

            console.log(weatherApiInfo)

            GeneralAttributeChanger(ID, "AttributeLocation", weatherApiInfo);

        }

    }



    const ContentChanger = (AttributeID, AttributeNoteContent) => {

        const updatedContent = renderObject.map((note) => {
            if (note.AttributeID === AttributeID) {
                return { ...note, AttributeNoteContent: [...note.AttributeNoteContent, AttributeNoteContent] };
            }
            return note;
        });

        setRenderObject(updatedContent);
        setContentNote({ ...contentNote, [AttributeID]: '' }); // set the value to an empty string
        localStorage.setItem('RenderObject', JSON.stringify(updatedContent));
    }




    return (
        <div>

            <ObjectSettings
                nowActiveObjectID={nowActiveObjectID}
                setNowActiveObjectID={setNowActiveObjectID}

                nowActiveObjectType={nowActiveObjectType}
                setNowActiveObjectType={setNowActiveObjectType}

                activeObjectSettings={activeObjectSettings}
                setActiveObjectSettings={setActiveObjectSettings}

                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}

                fontColor={fontColor}
                setFontColor={setFontColor}

                accentColor={accentColor}
                setAccentColor={setAccentColor}

                isShadow={isShadow}
                setIsShadow={setIsShadow}


                positionFromLeft={positionFromLeft}
                setPositionFromLeft={setPositionFromLeft}

                positionFromTop={positionFromTop}
                setPositionFromTop={setPositionFromTop}

                sizeX={sizeX}
                setSizeX={setSizeX}

                sizeY={sizeY}
                setSizeY={setSizeY}

                titleSize={titleSize}
                setTitleSize={setTitleSize}

                contentSize={contentSize}
                setContentSize={setContentSize}

                layer={layer}
                setLayer={setLayer}

                fontStyle={fontStyle}
                setNoteFontStyle={setNoteFontStyle}

                //Unique for Note
                contentNote={contentNote}
                setContentNote={setContentNote}

                nowActiveTitle={nowActiveTitle}
                setNowActiveTitle={setNowActiveTitle}

                // Unique For Clock

                clockForm={clockForm}
                setClockForm={setClockForm}

                //Functions

                GeneralAttributeChanger={GeneralAttributeChanger}
            />


            <div className={`AddMenuContainer ${isAddMenuOpen ? "On" : "Off"}`}>
                <button className='AddObjectBtn' onClick={() => AddNewObject("Note")} >Note</button>
                <button className='AddObjectBtn' onClick={() => AddNewObject("Clock")} >Clock</button>
                <button className='AddObjectBtn' onClick={() => AddNewObject("Calendar")} >Calendar <sup>(Beta)</sup> </button>
                <button className='AddObjectBtn' onClick={() => AddNewObject("Weather")} >Weather <sup>(Beta)</sup></button>

            </div>

            <button className='AddMenuBtn' onClick={MenuOpener}> + </button>


            {/* NOTE RENDER */}
            {renderObject.filter((object) => object.AttributeObjectType === "Note").map((note) => (
                <div>
                    <div
                        className='NoteContainer'
                        id={note.AttributeID}
                        key={note.AttributeID}

                        style={{
                            left: `${note.AttributePositionLeft}px`,
                            top: `${note.AttributePositionTop}px`,

                            backgroundColor: note.AttributeColor,
                            width: `${note.AttributeWidth}px`,
                            height: `${note.AttributeHeight}px`,
                            border: `1px solid ${note.AttributeAccentColor}`,
                            boxShadow: `${note.AttributeShadow ? `8px 8px 24px 0px ${note.AttributeAccentColor}` : "0px 0px 0px 0px black"} `,
                            zIndex: note.AttributeLayer,
                            position: 'absolute'
                        }}>


                        <div className="TopSectionNote">

                            <button className='RemoveNoteBtn' onClick={() => RemoveObject(note.AttributeID)} >
                                <div style={{ color: note.AttributeAccentColor }}>X</div>
                            </button>

                            <div className="MoveNote"
                                onMouseDown={(event) => MouseDownForMove(event, note.AttributeID)}
                                style={{
                                    borderLeft: `0.1rem solid ${note.AttributeAccentColor}`,
                                    borderRight: `0.1rem solid ${note.AttributeAccentColor}`,
                                    borderBottom: `0.1rem solid ${note.AttributeAccentColor}`,

                                }}>
                                <div style={{ color: note.AttributeAccentColor, fontFamily: note.AttributeFontStyle, userSelect: 'none', }}>Move Me</div>
                            </div>

                            <button className='SettingsNoteBtn' onClick={() => SettingsWindow(note.AttributeID, note.AttributeObjectType, note.AttributeTitle)} >
                                <div style={{ color: note.AttributeAccentColor }}>⚙</div>
                            </button>

                        </div>


                        <div className="TitleContainer">

                            <input
                                className='TitleInput'
                                spellCheck="false"
                                type="text"
                                style={{
                                    color: note.AttributeFontColor,
                                    fontSize: `${note.AttributeTitleSize}px`,
                                    borderBottom: `0.1rem solid ${note.AttributeAccentColor}`,
                                    fontFamily: note.AttributeFontStyle
                                }}
                                value={note.AttributeTitle}
                                onChange={(e) => GeneralAttributeChanger(note.AttributeID, 'AttributeTitle', e.target.value)}
                            />

                        </div>

                        <div className="AddNewContainer" style={{ borderBottom: `0.1rem solid ${note.AttributeAccentColor}`, height: `${note.AttributeContentSize}px` }}>

                            <textarea
                                placeholder='Enter something...'
                                className='NewInput'
                                spellCheck="false"
                                type="text"
                                style={{
                                    color: note.AttributeFontColor,
                                    fontSize: `${note.AttributeContentSize}px`,
                                    fontFamily: note.AttributeFontStyle,

                                }}
                                value={contentNote[note.AttributeID]}
                                onChange={(e) => setContentNote(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, note.AttributeID, contentNote)}
                            />



                        </div>


                        <div className="ListContainer">

                            <ul>
                                {note.AttributeNoteContent.map((content, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            color: note.AttributeFontColor,
                                            fontSize: `${note.AttributeContentSize}px`,
                                            borderBottom: `0.1rem solid ${note.AttributeAccentColor}`,
                                            fontFamily: note.AttributeFontStyle,
                                        }}>

                                        {content}


                                        <div>
                                            <button
                                                onClick={() => moveContentUp(note.AttributeID, index)}
                                                style={{
                                                    display: `${index === 0 ? "none" : ""}`,
                                                    fontSize: `${note.AttributeContentSize}px`,
                                                    color: note.AttributeAccentColor,
                                                    fontFamily: note.AttributeFontStyle
                                                }}>
                                                ⇧</button>

                                            <button
                                                onClick={() => removeContent(note.AttributeID, index)}
                                                style={{
                                                    fontSize: `${note.AttributeContentSize}px`,
                                                    color: note.AttributeAccentColor,
                                                    fontFamily: note.AttributeFontStyle
                                                }}>
                                                X</button>

                                            <button
                                                onClick={() => moveContentDown(note.AttributeID, index)}
                                                style={{
                                                    display: `${index === note.content.length - 1 ? "none" : ""}`,
                                                    fontSize: `${note.AttributeContentSize}px`,
                                                    color: note.AttributeAccentColor,
                                                    fontFamily: note.AttributeFontStyle
                                                }}>
                                                ⇩</button>

                                        </div>
                                    </li>
                                ))}

                            </ul>

                        </div>

                        <div className="ResizeNote"
                            onMouseDown={(event) => MouseDownForResize(event, note.AttributeID)}
                            style={{
                                borderLeft: `0.1rem solid ${note.AttributeAccentColor}`,
                                borderTop: `0.1rem solid ${note.AttributeAccentColor}`
                            }}>
                            <div style={{ color: note.AttributeAccentColor, fontFamily: note.AttributeFontStyle, userSelect: 'none' }}>⤡</div>
                        </div>

                    </div>
                </div>
            ))}


            {/* CLOCK RENDER */}
            {renderObject.filter((object) => object.AttributeObjectType === "Clock").map((clock) => (
                <div>

                    <div
                        className="ClockContainer"
                        id={clock.AttributeID}
                        key={clock.AttributeID}
                        style={{
                            left: `${clock.AttributePositionLeft}px`,
                            top: `${clock.AttributePositionTop}px`,
                            width: `${clock.AttributeWidth}px`,
                            height: `${clock.AttributeHeight}px`,
                            backgroundColor: clock.AttributeColor,
                            border: `1px solid ${clock.AttributeAccentColor}`,
                            boxShadow: `${clock.AttributeShadow ? `8px 8px 24px 0px ${clock.AttributeAccentColor}` : "0px 0px 0px 0px black"} `,
                            zIndex: clock.AttributeLayer,
                            position: 'absolute'
                        }}

                    >

                        <div className="TopSectionClock">

                            <button className="RemoveClockBtn"
                                onClick={() => RemoveObject(clock.AttributeID)}
                            >
                                <div style={{
                                    color: clock.AttributeAccentColor
                                }}>X</div></button>

                            <div className="MoveClock"
                                onMouseDown={(event) => MouseDownForMove(event, clock.AttributeID)}
                                style={{
                                    borderLeft: `0.1rem solid ${clock.AttributeAccentColor}`,
                                    borderRight: `0.1rem solid ${clock.AttributeAccentColor}`,
                                    borderBottom: `0.1rem solid ${clock.AttributeAccentColor}`,
                                }}
                            >
                                <div style={{
                                    color: clock.AttributeAccentColor
                                }}>Move Me</div></div>

                            <button className="SettingsClockBtn"
                                onClick={() => SettingsWindow(clock.AttributeID, clock.AttributeObjectType, "Clock")}
                            >
                                <div style={{
                                    color: clock.AttributeAccentColor
                                }}>⚙</div></button>

                        </div>


                        <div className="DateContainer">

                            <div className={`HHMMSS-DDMMYYYY ${clock.AttributeClockForm === "HH:MM:SS/DD.MM.YYYY" ? "On" : "Off"}`}
                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeTitleSize}px`,
                                }}>
                                {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:{date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}
                            </div>

                            <div className={`HHMMSS-DDMMYYYY ${clock.AttributeClockForm === "HH:MM:SS/DD.MM.YYYY" ? "On" : "Off"}`}

                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeContentSize}px`
                                }}
                            >
                                {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}.{date.getFullYear()}
                            </div>


                            <div className={`HHMM-DDMMYYYY ${clock.AttributeClockForm === "HH:MM/DD.MM.YYYY" ? "On" : "Off"}`}
                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeTitleSize}px`
                                }}>
                                {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}
                            </div>

                            <div className={`HHMM-DDMMYYYY ${clock.AttributeClockForm === "HH:MM/DD.MM.YYYY" ? "On" : "Off"}`}

                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeContentSize}px`
                                }}
                            >
                                {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}.{date.getFullYear()}

                            </div>


                            <div className={`HHMMSS ${clock.AttributeClockForm === "HH:MM:SS" ? "On" : "Off"}`}
                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeTitleSize}px`
                                }}>
                                {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:{date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}

                            </div>


                            <div className={`HHMM ${clock.AttributeClockForm === "HH:MM" ? "On" : "Off"}`}
                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeTitleSize}px`
                                }}>
                                {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}

                            </div>


                            <div className={`DDMMYYYY ${clock.AttributeClockForm === "DD.MM.YYYY" ? "On" : "Off"}`}

                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeContentSize}px`
                                }}
                            >
                                {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}.{date.getFullYear()}
                            </div>


                        </div>



                        <div className="ResizeClock"
                            onMouseDown={(event) => MouseDownForResize(event, clock.AttributeID)}
                            style={{
                                borderLeft: `0.1rem solid ${clock.AttributeAccentColor}`,
                                borderTop: `0.1rem solid ${clock.AttributeAccentColor}`
                            }}
                        >
                            <div style={{
                                color: clock.AttributeAccentColor
                            }}>⤡</div>

                        </div>

                    </div>




                </div>
            ))}


            {/* CALENDAR RENDER */}
            {renderObject.filter((object) => object.AttributeObjectType === "Calendar").map((calendar) => (
                <div>

                    <div className="CalendarContainer"
                        id={calendar.AttributeID}
                        key={calendar.AttributeID}
                        style={{
                            left: `${calendar.AttributePositionLeft}px`,
                            top: `${calendar.AttributePositionTop}px`,
                            width: `${calendar.AttributeWidth}px`,
                            height: `${calendar.AttributeHeight}px`,
                            backgroundColor: calendar.AttributeColor,
                            zIndex: calendar.AttributeLayer,
                            border: `1px solid ${calendar.AttributeAccentColor}`,
                            boxShadow: `${calendar.AttributeShadow ? `8px 8px 24px 0px ${calendar.AttributeAccentColor}` : "0px 0px 0px 0px black"} `,
                            position: 'absolute'
                        }}>


                        <div className="TopSectionCalendar">

                            <button className='RemoveCalendarBtn' onClick={() => RemoveObject(calendar.AttributeID)} >
                                <div style={{ color: calendar.AttributeAccentColor }}>X</div>
                            </button>

                            <div className="MoveCalendar"
                                onMouseDown={(event) => MouseDownForMove(event, calendar.AttributeID)}
                                style={{
                                    borderLeft: `0.1rem solid ${calendar.AttributeAccentColor}`,
                                    borderRight: `0.1rem solid ${calendar.AttributeAccentColor}`,
                                    borderBottom: `0.1rem solid ${calendar.AttributeAccentColor}`
                                }}

                            >
                                <div style={{ color: calendar.AttributeAccentColor }} >Move Me</div>

                            </div>

                            <button className='SettingsCalendarBtn' onClick={() => SettingsWindow(calendar.AttributeID, calendar.AttributeObjectType, "Calendar")} >
                                <div style={{ color: calendar.AttributeAccentColor }}>⚙</div>
                            </button>

                        </div>

                        <div className="CalendarContent">

                            <div className="CalendarHeader">

                                <div className="CalendarTitle"

                                    style={{
                                        color: calendar.AttributeFontColor,
                                        fontSize: `${calendar.AttributeTitleSize}px`,
                                        fontFamily: calendar.AttributeFontStyle
                                    }}>

                                    {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}

                                </div>

                                <div className="CalendarButtons">
                                    <button onClick={prevYear} style={{ color: calendar.AttributeFontColor, fontSize: `${calendar.AttributeContentSize}px`, fontFamily: calendar.AttributeFontStyle }}>&lt;&lt;</button>
                                    <button onClick={prevMonth} style={{ color: calendar.AttributeFontColor, fontSize: `${calendar.AttributeContentSize}px`, fontFamily: calendar.AttributeFontStyle }}>&lt;</button>
                                    <button onClick={goToToday} style={{ color: calendar.AttributeFontColor, fontSize: `${calendar.AttributeContentSize}px`, fontFamily: calendar.AttributeFontStyle }}>Now</button>
                                    <button onClick={nextMonth} style={{ color: calendar.AttributeFontColor, fontSize: `${calendar.AttributeContentSize}px`, fontFamily: calendar.AttributeFontStyle }}>&gt;</button>
                                    <button onClick={nextYear} style={{ color: calendar.AttributeFontColor, fontSize: `${calendar.AttributeContentSize}px`, fontFamily: calendar.AttributeFontStyle }}>&gt;&gt;</button>
                                </div>

                            </div>

                            <table className="calendar-table"
                                style={{
                                    border: ` 0.1rem solid ${calendar.AttributeAccentColor}`
                                }}>
                                <tbody>
                                    <tr className='GridMonths'
                                    >
                                        <td style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}>
                                            Sun</td>
                                        <td style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}>
                                            Mon</td>
                                        <td style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}>
                                            Tue</td>
                                        <td style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}>
                                            Wed</td>
                                        <td style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}>
                                            Thu</td>
                                        <td style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}>
                                            Fri</td>
                                        <td style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}>
                                            Sat</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    {monthData.map((week, index) => (
                                        <tr key={index}>
                                            {week.map((day, index) => (
                                                <td
                                                    key={index}
                                                    className={currentYear === todayYear && currentMonth === todayMonth && day === todayDate ? 'GridToday' : 'GridGeneral'}
                                                    style={{ color: calendar.AttributeAccentColor }}
                                                >
                                                    <div style={{
                                                        color: calendar.AttributeFontColor,
                                                        fontSize: `${calendar.AttributeContentSize}px`,
                                                        fontFamily: calendar.AttributeFontStyle
                                                    }}>{day}</div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="ResizeCalendar"
                            onMouseDown={(event) => MouseDownForResize(event, calendar.AttributeID)}
                            style={{
                                borderLeft: `0.1rem solid ${calendar.AttributeAccentColor}`,
                                borderTop: `0.1rem solid ${calendar.AttributeAccentColor}`
                            }}>
                            <div style={{ color: calendar.AttributeAccentColor }}>⤡</div>
                        </div>

                    </div>



                </div>
            ))}


            {/* WEATHER RENDER */}
            {renderObject.filter((object) => object.AttributeObjectType === "Weather").map((weather) => (
                <div>
                    <div
                        className='WeatherContainer'
                        id={weather.AttributeID}
                        key={weather.AttributeID}

                        style={{
                            left: `${weather.AttributePositionLeft}px`,
                            top: `${weather.AttributePositionTop}px`,

                            backgroundColor: weather.AttributeColor,
                            width: `${weather.AttributeWidth}px`,
                            height: `${weather.AttributeHeight}px`,
                            border: `1px solid ${weather.AttributeAccentColor}`,
                            boxShadow: `${weather.AttributeShadow ? `8px 8px 24px 0px ${weather.AttributeAccentColor}` : "0px 0px 0px 0px black"} `,
                            zIndex: weather.AttributeLayer,
                            position: 'absolute'
                        }}>


                        <div className="TopSectionWeather">

                            <button className='RemoveWeatherBtn' onClick={() => RemoveObject(weather.AttributeID)} >
                                <div style={{ color: weather.AttributeAccentColor }}>X</div>
                            </button>

                            <div className="MoveWeather"
                                onMouseDown={(event) => MouseDownForMove(event, weather.AttributeID)}
                                style={{
                                    borderLeft: `0.1rem solid ${weather.AttributeAccentColor}`,
                                    borderRight: `0.1rem solid ${weather.AttributeAccentColor}`,
                                    borderBottom: `0.1rem solid ${weather.AttributeAccentColor}`,

                                }}>
                                <div style={{ color: weather.AttributeAccentColor, fontFamily: weather.AttributeFontStyle, userSelect: 'none', }}>Move Me</div>
                            </div>

                            <button className='SettingsWeatherBtn' onClick={() => SettingsWindow(weather.AttributeID, weather.AttributeObjectType, "Weather")} >
                                <div style={{ color: weather.AttributeAccentColor }}>⚙</div>
                            </button>

                        </div>

                        <div className="WeatherSearchContainer">
                            <input
                                type="text"
                                placeholder="Search Location..."
                                value={placeName[weather.AttributeID]}
                                onChange={e => setPlaceName(e.target.value)}
                                onKeyPress={(e) => Search(e, weather.AttributeID, placeName)}
                                style={{
                                    color: weather.AttributeFontColor,
                                    fontFamily: weather.AttributeFontStyle,
                                    fontSize: `${weather.AttributeContentSize}px`,
                                    borderBottom: `0.1rem solid ${weather.AttributeAccentColor}`,
                                }}

                            >
                            </input>
                        </div>

                        {weatherApiInfo ? <div className="WeatherInfoContainer">


                            {/* <div className="WeatherInfoLocation">
                                <div className="location">{weatherApiInfo.name}, {weatherApiInfo.sys.country}</div>
                                {nowDate.toLocaleString('en-US', { dateStyle: "full" })}
                            </div> */}

                            <div className="WeatherTemp"
                                style={{
                                    color: weather.AttributeFontColor,
                                    fontFamily: weather.AttributeFontStyle,
                                    fontSize: `${weather.AttributeTitleSize}px`
                                }}
                            >
                                {(weatherApiInfo.main.temp).toFixed(1)}°C

                            </div>

                            <div className="WeatherMoreContainer">

                                <div className="WeatherMore">

                                    <div className="Title"
                                        style={{
                                            color: weather.AttributeFontColor,
                                            fontFamily: weather.AttributeFontStyle,
                                            fontSize: `${weather.AttributeContentSize}px`
                                        }}
                                    >
                                        Wind
                                    </div>

                                    <div className="Information"
                                        style={{
                                            color: weather.AttributeFontColor,
                                            fontFamily: weather.AttributeFontStyle,
                                            fontSize: `${weather.AttributeContentSize}px`
                                        }}
                                    >
                                        {Math.round(weatherApiInfo.wind.speed)} km/h
                                    </div>

                                </div>

                                <div className="WeatherMore">
                                    <div className="Title"
                                        style={{
                                            color: weather.AttributeFontColor,
                                            fontFamily: weather.AttributeFontStyle,
                                            fontSize: `${weather.AttributeContentSize}px`
                                        }}
                                    >
                                        Humidity
                                    </div>
                                    <div className="Information"
                                        style={{
                                            color: weather.AttributeFontColor,
                                            fontFamily: weather.AttributeFontStyle,
                                            fontSize: `${weather.AttributeContentSize}px`
                                        }}
                                    >
                                        {Math.round(weatherApiInfo.main.humidity)} %
                                    </div>
                                </div>


                                <div className="WeatherMore">
                                    <div className="Title"
                                        style={{
                                            color: weather.AttributeFontColor,
                                            fontFamily: weather.AttributeFontStyle,
                                            fontSize: `${weather.AttributeContentSize}px`
                                        }}
                                    >
                                        Pressure
                                    </div>
                                    <div className="Information"
                                        style={{
                                            color: weather.AttributeFontColor,
                                            fontFamily: weather.AttributeFontStyle,
                                            fontSize: `${weather.AttributeContentSize}px`
                                        }}
                                    >
                                        {Math.round(weatherApiInfo.main.pressure)} hPa
                                    </div>
                                </div>

                            </div>

                        </div> : null}


                        <div className="ResizeWeather"
                            onMouseDown={(event) => MouseDownForResize(event, weather.AttributeID)}
                            style={{
                                borderLeft: `0.1rem solid ${weather.AttributeAccentColor}`,
                                borderTop: `0.1rem solid ${weather.AttributeAccentColor}`
                            }}>
                            <div style={{ color: weather.AttributeAccentColor, fontFamily: weather.AttributeFontStyle, userSelect: 'none' }}>⤡</div>
                        </div>

                    </div>
                </div>
            ))}

        </div>
    );
}

export default ObjectRender;
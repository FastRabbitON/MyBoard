import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import TextareaAutosize from 'react-textarea-autosize';


import ObjectSettings from './ObjectSettings';

import "./ObjectRenderStyle.css"
import "./App.css"

const ObjectRender = ({

    renderObject,
    setRenderObject,

    isAddMenuOpen,
    setIsAddMenuOpen,
    activeObjectSettings,
    setActiveObjectSettings,
    activeBoardSettings,
    setActiveBoardSettings
}) => {


    const [nowActiveObjectID, setNowActiveObjectID] = useState(null);
    const [nowActiveObjectType, setNowActiveObjectType] = useState(null);

    const [backgroundColor, setBackgroundColor] = useState("#ffb100");
    const [fontColor, setFontColor] = useState("#000000");
    const [accentColor, setAccentColor] = useState('#4b4d4f');

    const [positionFromLeft, setPositionFromLeft] = useState(10);
    const [positionFromTop, setPositionFromTop] = useState(10)

    const [sizeX, setSizeX] = useState(400);
    const [sizeY, setSizeY] = useState(500);

    const [angle, setAngle] = useState(0);

    const [titleSize, setTitleSize] = useState(25);
    const [contentSize, setContentSize] = useState(15);

    const [layer, setLayer] = useState(1);
    const [fontStyle, setNoteFontStyle] = useState("Shantell Sans, cursive")

    const [isShadow, setIsShadow] = useState(true)

    //Unique for Note
    const [previousWidth, setPreviousWidth] = useState()
    const [previousHeight, setPreviousHeight] = useState()

    const [isMinimal, setIsMinimal] = useState(false)
    const [contentNote, setContentNote] = useState([]);
    const [nowActiveTitle, setNowActiveTitle] = useState("myNote")


    //Unique for Clock
    const [clockForm, setClockForm] = useState("HH:MM:SS/DD.MM.YYYY")


    //Unique for Calendar
    const [currentDate, setCurrentDate] = useState(new Date());

    //Unique for Weather
    const apiKey = "cd95b4162ff6765cbe3dbd2169ae2b1b"

    const [placeName, setPlaceName] = useState('');
    const [weatherApiInfo, setWeatherApiInfo] = useState('');
    const [weatherLocation, setWeatherLocation] = useState("");

    const [sizeWeatherIco, setSizeWeatherIco] = useState(10);


    // SAVE TO LOALSTORAGE
    useEffect(() => {
        const renderFromLocalStorage = JSON.parse(localStorage.getItem('RenderObject')) || [];
        setRenderObject(renderFromLocalStorage);
    }, []);


    // ADD NEW NOTE
    const AddNewObject = (ObjectType) => { //Funkcja dodająca do starej tablicę nową tablicę z nowym obiektem zawierającym atrybuty

        if (isAddMenuOpen === true) {
            setIsAddMenuOpen(false)
        }

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
                AttributeAngle: 0,
                AttributeTitleSize: 20,
                AttributeContentSize: 15,
                AttributePositionLeft: 10,
                AttributePositionTop: 10,
                AttributeFontStyle: "Shantell Sans, cursive",
                AttributeLayer: 1,
                //Unique Attributes for Note
                AttributeTitle: 'myNote',
                AttributeNoteContent: [],
                AttributeIsMinimal: false,
                AttributePrevWidth: 350,
                AttributePrevHeight: 400,
                AttributePrevTitleSize: 20
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
                AttributeAngle: 0,
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
                AttributeAngle: 0,
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
                AttributeHeight: 140,
                AttributeTitleSize: 20,
                AttributeAngle: 0,
                AttributeContentSize: 15,
                AttributePositionLeft: 10,
                AttributePositionTop: 10,
                AttributeFontStyle: "Shantell Sans, cursive",
                AttributeLayer: 1,
                //Unique Attribute for Weather
                AttributeLocation: "",
                AttributeTemp: 0,
                AttributeWind: 0,
                AttributeHumidity: 0,
                AttributePressure: 0,
                AttributeIcoSize: 50,
                AttributeIcoCode: "",

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

        console.log(ID, AttributeToChange, Value)

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
        setNowActiveObjectID(ID)
        setNowActiveTitle(Title)


        const GetAttribute = renderObject.find(object => object.AttributeID === ID);
        if (GetAttribute) {
            const {
                AttributeColor, AttributeFontColor, AttributeAccentColor, AttributeTitleSize,
                AttributeContentSize, AttributeFontStyle, AttributeLayer, AttributeShadow,
                AttributeClockForm, AttributePositionLeft, AttributePositionTop, AttributeWidth,
                AttributeHeight, AttributeIcoSize, AttributeAngle } = GetAttribute;
            setBackgroundColor(AttributeColor);
            setFontColor(AttributeFontColor);
            setAccentColor(AttributeAccentColor);
            setIsShadow(AttributeShadow);
            setTitleSize(AttributeTitleSize);
            setContentSize(AttributeContentSize);
            setNoteFontStyle(AttributeFontStyle);
            setLayer(AttributeLayer);
            setPositionFromLeft(AttributePositionLeft);
            setPositionFromTop(AttributePositionTop);
            setSizeX(AttributeWidth);
            setSizeY(AttributeHeight);
            setAngle(AttributeAngle);


            //Unique For Clock
            setClockForm(AttributeClockForm)

            //Unique For Weather
            setSizeWeatherIco(AttributeIcoSize)
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

        if (activeObjectSettings === true && nowActiveObjectID !== ID) {
            setActiveObjectSettings(false);
        }
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

        if (activeObjectSettings === true && nowActiveObjectID !== ID) {
            setActiveObjectSettings(false);
        }

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
            event.preventDefault();

            if (typeof contentNote !== "object") {
                changeNoteContent(id, contentNote);
            }
        }
    };


    const NoteContentEditor = (e, id, contentIndex) => {
        const updatedContent = renderObject.map((note) => {
            if (note.AttributeID === id) {
                const updatedNoteContent = note.AttributeNoteContent.map((content, index) => {
                    if (index === contentIndex) {
                        return e.target.value; // Aktualizacja zawartości notatki na podstawie wprowadzonej wartości w polu tekstowym
                    }
                    return content;
                });
                return { ...note, AttributeNoteContent: updatedNoteContent };
            }
            return note;
        });

        setRenderObject(updatedContent);
        localStorage.setItem('RenderObject', JSON.stringify(updatedContent));
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



    const Search = (event, ID, Place) => {
        if (event.key === 'Enter') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Place}&appid=${apiKey}&units=metric`)
                .then(apiInformation => {
                    if (apiInformation.ok) {
                        return apiInformation;
                    } else {
                        throw Error('Location was not found');
                    }
                })
                .then(apiInformation => apiInformation.json())
                .then(weatherApiInfo => {
                    setWeatherApiInfo(weatherApiInfo);

                    const TemperatureInfo = weatherApiInfo.main.temp;
                    const WindInfo = weatherApiInfo.wind.speed;
                    const HumidityInfo = weatherApiInfo.main.humidity;
                    const PressureInfo = weatherApiInfo.main.pressure;
                    const IcoInfo = weatherApiInfo.weather[0].icon;

                    WeatherChanger(ID, TemperatureInfo, WindInfo, HumidityInfo, PressureInfo, Place, IcoInfo);
                })
                .catch(errThree => alert(errThree));
        }
    };

    const WeatherChanger = (ID, newTemp, newWind, newHumidity, newPressure, newPlace, newIco) => {
        const updatedAttributes = renderObject.map((object) => {
            if (object.AttributeID === ID) {
                return { ...object, AttributeTemp: newTemp, AttributeWind: newWind, AttributeHumidity: newHumidity, AttributePressure: newPressure, AttributeLocation: newPlace, AttributeIcoCode: newIco };
            }
            return object;
        });
        setRenderObject(updatedAttributes);
        localStorage.setItem("RenderObject", JSON.stringify(updatedAttributes));
    }








    const SaveDate = () => {
        const json = JSON.stringify(renderObject, null, 2);
        const element = document.createElement('a');
        const fileContent = new Blob([json], { type: `application/json` });
        element.download = `myBoardSave(${currentDate.toLocaleString('en-US', { dateStyle: 'short' })}).json`;
        element.href = URL.createObjectURL(fileContent);
        element.click();
    }

    const UploadDate = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                setRenderObject(jsonData);
            } catch (error) {
                alert('Error with JSON file update:', error);
            }
        };

        reader.readAsText(file);
    };


    const Minimalizer = (ID, Minimall, PrevWidth, PrevHeight, PrevTitleSize) => {

        if (activeObjectSettings === true) {
            setActiveObjectSettings(false)
        }

        if (Minimall === false) {

            const updatedAttribute = renderObject.map((object) => {

                if (object.AttributeID === ID) {

                    return {
                        ...object,
                        ["AttributeIsMinimal"]: true,
                        ["AttributePrevWidth"]: PrevWidth,
                        ["AttributePrevHeight"]: PrevHeight,
                        ["AttributePrevTitleSize"]: PrevTitleSize,

                        ["AttributeHeight"]: 50,
                        ["AttributeWidth"]: 200,
                        ["AttributeTitleSize"]: 15
                    };

                }

                return object
            })

            setRenderObject(updatedAttribute);
            localStorage.setItem('RenderObject', JSON.stringify(updatedAttribute)); //Aktualizacja LocalStore

        }

        if (Minimall === true) {


            const GetAttributes = renderObject.find(object => object.AttributeID === ID);
            if (GetAttributes) {

                const { AttributePrevWidth, AttributePrevHeight, AttributePrevTitleSize } = GetAttributes;

                const updatedAttribute = renderObject.map((object) => {

                    if (object.AttributeID === ID) {

                        return {
                            ...object,
                            ["AttributeIsMinimal"]: false,
                            ["AttributeHeight"]: AttributePrevHeight,
                            ["AttributeWidth"]: AttributePrevWidth,
                            ["AttributeTitleSize"]: AttributePrevTitleSize
                        };

                    }

                    return object
                })

                setRenderObject(updatedAttribute);
                localStorage.setItem('RenderObject', JSON.stringify(updatedAttribute)); //Aktualizacja LocalStore


            }

        }

    };



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

                angle={angle}
                setAngle={setAngle}



                //Unique for Note
                contentNote={contentNote}
                setContentNote={setContentNote}

                nowActiveTitle={nowActiveTitle}
                setNowActiveTitle={setNowActiveTitle}

                // Unique For Clock

                clockForm={clockForm}
                setClockForm={setClockForm}

                //Unique For Weather
                sizeWeatherIco={sizeWeatherIco}
                setSizeWeatherIco={setSizeWeatherIco}


                //Functions

                GeneralAttributeChanger={GeneralAttributeChanger}
            />


            <Tooltip id="TT-BottomBtn" />
            <Tooltip id="TT-SettingsObjectBtn" />
            <Tooltip id="TT-CloseObjectBtn" />
            <Tooltip id="TT-ListNote" />
            <Tooltip id="TT-Calendar" />




            <div className={`AddMenuContainer ${isAddMenuOpen ? "On" : "Off"}`}>

                <div> Add Objects</div>

                <button className='AddObjectBtn' onClick={() => AddNewObject("Note")} >Note</button>
                <button className='AddObjectBtn' onClick={() => AddNewObject("Clock")} >Clock</button>
                <button className='AddObjectBtn' onClick={() => AddNewObject("Weather")} >Weather </button>
                <button className='AddObjectBtn' onClick={() => AddNewObject("Calendar")} >Calendar <sup>(Beta)</sup> </button>

            </div>

            <button
                className='AddMenuBtn'
                onClick={MenuOpener}
                data-tooltip-id="TT-BottomBtn"
                data-tooltip-content="Add Objects"
                data-tooltip-place="top">
                +
            </button>

            <button className='DownloadBtn'
                onClick={SaveDate}
                data-tooltip-id="TT-BottomBtn"
                data-tooltip-content="Download Data"
                data-tooltip-place="top">
                ↧
            </button>


            <input type="file" onChange={UploadDate} id="actual-btn" hidden />
            <label
                className='UploadBtn'
                for="actual-btn"
                data-tooltip-id="TT-BottomBtn"
                data-tooltip-content="Upload Data"
                data-tooltip-place="top">
                ↥
            </label>



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
                            position: 'absolute',
                            rotate: `${note.AttributeAngle}deg`,
                            minHeight: `${note.AttributeIsMinimal === false ? "200px" : "50px"}`,

                        }}>


                        <div className="TopSectionNote">

                            <button className='RemoveNoteBtn' onClick={() => RemoveObject(note.AttributeID)} >
                                <div style={{
                                    color: note.AttributeAccentColor,
                                    fontFamily: note.AttributeFontStyle
                                }}
                                    data-tooltip-id="TT-CloseObjectBtn"
                                    data-tooltip-content="Close"
                                    data-tooltip-place="top"
                                >X
                                </div>
                            </button>

                            <div className='RemoveNoteBtn'
                                style={{
                                    cursor: "default",
                                    display: `${note.AttributeIsMinimal === false ? "flex" : "none"}`,
                                }}></div>


                            <div className="MoveNote"
                                onMouseDown={(event) => MouseDownForMove(event, note.AttributeID)}
                                style={{
                                    borderLeft: `0.1rem solid ${note.AttributeAccentColor}`,
                                    borderRight: `0.1rem solid ${note.AttributeAccentColor}`,
                                    borderBottom: `0.1rem solid ${note.AttributeAccentColor}`,
                                    height: `${note.AttributeIsMinimal === false ? "100%" : "75%"}`,

                                }}>
                                <div
                                    style={{
                                        color: note.AttributeAccentColor,
                                        fontFamily: note.AttributeFontStyle,
                                        userSelect: 'none',
                                        fontSize: `${note.AttributeIsMinimal === false ? "16px" : "10px"}`,
                                    }}>Move Me
                                </div>
                            </div>

                            <button className='SettingsNoteBtn'
                                onClick={() => Minimalizer(note.AttributeID, note.AttributeIsMinimal, note.AttributeWidth, note.AttributeHeight, note.AttributeTitleSize)}
                                data-tooltip-id="TT-CloseObjectBtn"
                                data-tooltip-content="Minimalize"
                                data-tooltip-place="top"
                            >
                                <div
                                    style={{ color: note.AttributeAccentColor, fontFamily: note.AttributeFontStyle, userSelect: 'none', }}
                                >-</div>


                            </button>


                            <button className='SettingsNoteBtn'
                                onClick={() => SettingsWindow(note.AttributeID, note.AttributeObjectType, note.AttributeTitle)}
                                style={{
                                    display: `${note.AttributeIsMinimal === false ? "block" : "none"}`,
                                }} >
                                <div
                                    style={{
                                        color: note.AttributeAccentColor,
                                        fontFamily: note.AttributeFontStyle
                                    }}
                                    data-tooltip-id="TT-SettingsObjectBtn"
                                    data-tooltip-content="Settings"
                                    data-tooltip-place="top"
                                >⚙</div>
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
                                    borderBottom: `${note.AttributeIsMinimal === false ? `0.1rem solid ${note.AttributeAccentColor}` : "none"}`,
                                    fontFamily: note.AttributeFontStyle
                                }}
                                value={note.AttributeTitle}
                                onChange={(e) => GeneralAttributeChanger(note.AttributeID, 'AttributeTitle', e.target.value)}
                            />

                        </div>

                        <div className="AddNewContainer"
                            style={{
                                display: `${note.AttributeIsMinimal === false ? "flex" : "none"}`,
                                borderBottom: `0.1rem solid ${note.AttributeAccentColor}`,
                                height: `${note.AttributeContentSize}px`
                            }}
                        >

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


                        <div className="ListContainer"
                            style={{
                                display: `${note.AttributeIsMinimal === false ? "flex" : "none"}`,
                            }}

                        >

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



                                        <TextareaAutosize
                                            className='NoteContentListArea'
                                            type="text"
                                            value={content}
                                            onChange={(e) => NoteContentEditor(e, note.AttributeID, index)}
                                            spellCheck="false"
                                            minRows={1}
                                            style={{
                                                color: note.AttributeFontColor,
                                                fontSize: `${note.AttributeContentSize}px`,
                                                fontFamily: note.AttributeFontStyle,

                                            }}
                                            data-tooltip-id="TT-CloseObjectBtn"
                                            data-tooltip-content="Edit"
                                            data-tooltip-place="top-start"

                                        />

                                        {/* {content} */}


                                        <div>
                                            <button
                                                onClick={() => moveContentUp(note.AttributeID, index)}
                                                style={{
                                                    display: `${index === 0 ? "none" : ""}`,
                                                    fontSize: `${note.AttributeContentSize}px`,
                                                    color: note.AttributeAccentColor,
                                                    fontFamily: note.AttributeFontStyle
                                                }}
                                                data-tooltip-id="TT-ListNote"
                                                data-tooltip-content="Move Up"
                                                data-tooltip-place="top">
                                                ⇧</button>

                                            <button
                                                onClick={() => removeContent(note.AttributeID, index)}
                                                style={{
                                                    fontSize: `${note.AttributeContentSize}px`,
                                                    color: note.AttributeAccentColor,
                                                    fontFamily: note.AttributeFontStyle
                                                }}
                                                data-tooltip-id="TT-ListNote"
                                                data-tooltip-content="Delete"
                                                data-tooltip-place="top">
                                                X</button>

                                            <button
                                                onClick={() => moveContentDown(note.AttributeID, index)}
                                                style={{
                                                    display: `${index === note.AttributeNoteContent.length - 1 ? "none" : ""}`,
                                                    fontSize: `${note.AttributeContentSize}px`,
                                                    color: note.AttributeAccentColor,
                                                    fontFamily: note.AttributeFontStyle
                                                }}
                                                data-tooltip-id="TT-ListNote"
                                                data-tooltip-content="Move Down"
                                                data-tooltip-place="top">

                                                ⇩</button>

                                        </div>
                                    </li>
                                ))}

                            </ul>

                        </div>

                        <div className="ResizeNote"
                            onMouseDown={(event) => MouseDownForResize(event, note.AttributeID)}
                            style={{
                                display: `${note.AttributeIsMinimal === false ? "flex" : "none"}`,
                                borderLeft: `0.1rem solid ${note.AttributeAccentColor}`,
                                borderTop: `0.1rem solid ${note.AttributeAccentColor}`
                            }}>
                            <div
                                style={{
                                    color: note.AttributeAccentColor,
                                    fontFamily: note.AttributeFontStyle,
                                    userSelect: 'none'
                                }}>⤡</div>

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
                            position: 'absolute',
                            rotate: `${clock.AttributeAngle}deg`

                        }}

                    >

                        <div className="TopSectionClock">

                            <button className="RemoveClockBtn"
                                onClick={() => RemoveObject(clock.AttributeID)}
                            >
                                <div style={{
                                    color: clock.AttributeAccentColor,
                                    fontFamily: clock.AttributeFontStyle
                                }}
                                    data-tooltip-id="TT-CloseObjectBtn"
                                    data-tooltip-content="Close"
                                    data-tooltip-place="top"
                                >X
                                </div>
                            </button>

                            <div className="MoveClock"
                                onMouseDown={(event) => MouseDownForMove(event, clock.AttributeID)}
                                style={{
                                    borderLeft: `0.1rem solid ${clock.AttributeAccentColor}`,
                                    borderRight: `0.1rem solid ${clock.AttributeAccentColor}`,
                                    borderBottom: `0.1rem solid ${clock.AttributeAccentColor}`,
                                }}
                            >
                                <div style={{
                                    color: clock.AttributeAccentColor,
                                    fontFamily: clock.AttributeFontStyle

                                }}>Move Me</div></div>

                            <button className="SettingsClockBtn"
                                onClick={() => SettingsWindow(clock.AttributeID, clock.AttributeObjectType, "Clock")}
                            >
                                <div style={{
                                    color: clock.AttributeAccentColor,
                                    fontFamily: clock.AttributeFontStyle
                                }}
                                    data-tooltip-id="TT-SettingsObjectBtn"
                                    data-tooltip-content="Settings"
                                    data-tooltip-place="top"
                                >⚙</div></button>

                        </div>


                        <div className="DateContainer">

                            <div className={`HHMMSS-DDMMYYYY ${clock.AttributeClockForm === "HH:MM:SS/DD.MM.YYYY" ? "On" : "Off"}`}
                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeTitleSize}px`,
                                    fontFamily: clock.AttributeFontStyle


                                }}>
                                {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:{date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}
                            </div>

                            <div className={`HHMMSS-DDMMYYYY ${clock.AttributeClockForm === "HH:MM:SS/DD.MM.YYYY" ? "On" : "Off"}`}

                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeContentSize}px`,
                                    fontFamily: clock.AttributeFontStyle

                                }}
                            >
                                {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}.{date.getFullYear()}
                            </div>


                            <div className={`HHMM-DDMMYYYY ${clock.AttributeClockForm === "HH:MM/DD.MM.YYYY" ? "On" : "Off"}`}
                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeTitleSize}px`,
                                    fontFamily: clock.AttributeFontStyle

                                }}>
                                {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}
                            </div>

                            <div className={`HHMM-DDMMYYYY ${clock.AttributeClockForm === "HH:MM/DD.MM.YYYY" ? "On" : "Off"}`}

                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeContentSize}px`,
                                    fontFamily: clock.AttributeFontStyle

                                }}
                            >
                                {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}.{date.getFullYear()}

                            </div>


                            <div className={`HHMMSS ${clock.AttributeClockForm === "HH:MM:SS" ? "On" : "Off"}`}
                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeTitleSize}px`,
                                    fontFamily: clock.AttributeFontStyle

                                }}>
                                {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:{date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}

                            </div>


                            <div className={`HHMM ${clock.AttributeClockForm === "HH:MM" ? "On" : "Off"}`}
                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeTitleSize}px`,
                                    fontFamily: clock.AttributeFontStyle

                                }}>
                                {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}

                            </div>


                            <div className={`DDMMYYYY ${clock.AttributeClockForm === "DD.MM.YYYY" ? "On" : "Off"}`}

                                style={{
                                    color: clock.AttributeFontColor,
                                    fontSize: `${clock.AttributeContentSize}px`,
                                    fontFamily: clock.AttributeFontStyle

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
                                color: clock.AttributeAccentColor,
                                fontFamily: clock.AttributeFontStyle

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
                            position: 'absolute',
                            rotate: `${calendar.AttributeAngle}deg`

                        }}>


                        <div className="TopSectionCalendar">

                            <button className='RemoveCalendarBtn' onClick={() => RemoveObject(calendar.AttributeID)} >
                                <div style={{
                                    color: calendar.AttributeAccentColor,
                                    fontFamily: calendar.AttributeFontStyle
                                }}
                                    data-tooltip-id="TT-CloseObjectBtn"
                                    data-tooltip-content="Close"
                                    data-tooltip-place="top"
                                >
                                    X
                                </div>
                            </button>

                            <div className="MoveCalendar"
                                onMouseDown={(event) => MouseDownForMove(event, calendar.AttributeID)}
                                style={{
                                    borderLeft: `0.1rem solid ${calendar.AttributeAccentColor}`,
                                    borderRight: `0.1rem solid ${calendar.AttributeAccentColor}`,
                                    borderBottom: `0.1rem solid ${calendar.AttributeAccentColor}`
                                }}

                            >
                                <div style={{ color: calendar.AttributeAccentColor, fontFamily: calendar.AttributeFontStyle }} >Move Me</div>

                            </div>

                            <button className='SettingsCalendarBtn' onClick={() => SettingsWindow(calendar.AttributeID, calendar.AttributeObjectType, "Calendar")} >
                                <div
                                    style={{
                                        color: calendar.AttributeAccentColor,
                                        fontFamily: calendar.AttributeFontStyle
                                    }}
                                    data-tooltip-id="TT-SettingsObjectBtn"
                                    data-tooltip-content="Settings"
                                    data-tooltip-place="top"
                                >⚙</div>
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
                                    <button
                                        onClick={prevYear}
                                        style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}
                                        data-tooltip-id="TT-Calendar"
                                        data-tooltip-content="Prev Year"
                                        data-tooltip-place="top"
                                    >
                                        &lt;&lt;
                                    </button>

                                    <button
                                        onClick={prevMonth}
                                        style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}
                                        data-tooltip-id="TT-Calendar"
                                        data-tooltip-content="Prev Month"
                                        data-tooltip-place="top"
                                    >
                                        &lt;
                                    </button>

                                    <button
                                        onClick={goToToday}
                                        style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}>
                                        Now
                                    </button>

                                    <button
                                        onClick={nextMonth}
                                        style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}
                                        data-tooltip-id="TT-Calendar"
                                        data-tooltip-content="Next Month"
                                        data-tooltip-place="top"
                                    >
                                        &gt;
                                    </button>

                                    <button
                                        onClick={nextYear}
                                        style={{
                                            color: calendar.AttributeFontColor,
                                            fontSize: `${calendar.AttributeContentSize}px`,
                                            fontFamily: calendar.AttributeFontStyle
                                        }}
                                        data-tooltip-id="TT-Calendar"
                                        data-tooltip-content="Next Year"
                                        data-tooltip-place="top"
                                    >
                                        &gt;&gt;
                                    </button>
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
                            <div style={{ color: calendar.AttributeAccentColor, fontFamily: calendar.AttributeFontStyle }}>⤡</div>
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
                            position: 'absolute',
                            rotate: `${weather.AttributeAngle}deg`

                        }}>


                        <div className="TopSectionWeather">

                            <button className='RemoveWeatherBtn' onClick={() => RemoveObject(weather.AttributeID)} >
                                <div style={{
                                    color: weather.AttributeAccentColor,
                                    fontFamily: weather.AttributeFontStyle
                                }}
                                    data-tooltip-id="TT-CloseObjectBtn"
                                    data-tooltip-content="Close"
                                    data-tooltip-place="top"
                                >X
                                </div>
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
                                <div
                                    style={{
                                        color: weather.AttributeAccentColor,
                                        fontFamily: weather.AttributeFontStyle
                                    }}
                                    data-tooltip-id="TT-SettingsObjectBtn"
                                    data-tooltip-content="Settings"
                                    data-tooltip-place="top">⚙</div>
                            </button>

                        </div>

                        <div className="WeatherSearchContainer">
                            <input
                                type="text"
                                placeholder="Search Location..."
                                value={weather.AttributeLocation}
                                onChange={(e) => GeneralAttributeChanger(weather.AttributeID, "AttributeLocation", e.target.value)}
                                onKeyDown={(e) => Search(e, weather.AttributeID, e.target.value)}
                                style={{
                                    color: weather.AttributeFontColor,
                                    fontFamily: weather.AttributeFontStyle,
                                    fontSize: `${weather.AttributeContentSize}px`,
                                    borderBottom: `0.1rem solid ${weather.AttributeAccentColor}`,
                                }}

                            >
                            </input>
                        </div>


                        <div className="WeatherInfoContainer">

                            <div className='WeatherMainContainer'>

                                <img src={`https://openweathermap.org/img/wn/${weather.AttributeIcoCode}@2x.png`} alt="weather-ico"
                                    style={{
                                        display: `${(weather.AttributeIcoCode).length > 0 ? "flex" : "none"}`,
                                        width: `${weather.AttributeIcoSize}px`
                                    }} />


                                <div className="WeatherTemp"
                                    style={{
                                        color: weather.AttributeFontColor,
                                        fontFamily: weather.AttributeFontStyle,
                                        fontSize: `${weather.AttributeTitleSize}px`
                                    }}
                                >
                                    {Math.round(weather.AttributeTemp)}°C

                                </div>

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
                                        {Math.round(weather.AttributeWind)} km/h
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
                                        {Math.round(weather.AttributeHumidity)} %
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
                                        {Math.round(weather.AttributePressure)} hPa
                                    </div>
                                </div>

                            </div>

                        </div>


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
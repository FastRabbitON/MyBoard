import { useState, useEffect } from 'react';


import './CalendarStyle.css';
import CalendarSettings from './CalendarSettings';


const CalendarContainer = ({
    activeCalendarSettings,
    setActiveCalendarSettings
}) => {

    const [currentDate, setCurrentDate] = useState(new Date());

    //VARIABLES
    const [renderCalendar, setRenderCalendar] = useState([]);
    const [nowActiveCalendarId, setNowActiveCalendarId] = useState(null);

    const [calendarColor, setCalendarColor] = useState("#ffb100");
    const [calendarFontColor, setCalendarFontColor] = useState("#000000");
    const [calendarAccentColor, setCalendarAccentColor] = useState('#4b4d4f');

    const [calendarSizeX, setCalendarSizeX] = useState(250);
    const [calendarSizeY, setCalendarSizeY] = useState(270);

    const [calendarPositionFromLeft, setCalendarPositionFromLeft] = useState(10);
    const [calendarPositionFromTop, setCalendarPositionFromTop] = useState(10)

    const [calendarTitleSize, setCalendarTitleSize] = useState(25);
    const [calendarContentSize, setCalendarContentSize] = useState(15);

    const [calendarLayer, setCalendarLayer] = useState(1);

    const [calendarFontStyle, setCalendarFontStyle] = useState("Shantell Sans, cursive")



    useEffect(() => {
        const renderFromLocalStorage = JSON.parse(localStorage.getItem('RenderCalendar')) || [];
        setRenderCalendar(renderFromLocalStorage);
    }, []);



    const addNewCalendar = () => {

        const newCalendar = {
            id: Date.now(),
            CalendarColor: "#ffb100",
            fontcolor: "#000000",
            accentcolor: '#4b4d4f',
            width: 350,
            height: 300,
            titlesize: 20,
            contentsize: 15,
            positionleft: 10,
            positiontop: 10,
            layer: 1,
            fontstyle: "Shantell Sans, cursive"
        }

        setRenderCalendar([...renderCalendar, newCalendar])

        localStorage.setItem('RenderCalendar', JSON.stringify([...renderCalendar, newCalendar])); //Aktualizacja w LocalStore

    }


    const removeCalendar = (id) => {

        const updatedRenderCalendar = renderCalendar.filter((calendar) => calendar.id !== id);
        setRenderCalendar(updatedRenderCalendar);
        localStorage.setItem('RenderCalendar', JSON.stringify(updatedRenderCalendar)); //Aktualizacja w LocalStore

    }


    const CalendarSettingsWindow = (id) => {
        setActiveCalendarSettings(current => !current)
        setNowActiveCalendarId(id)




        // if (nowActiveNoteId !== id) {
        //     setActiveNoteSettings(current => !current);
        //     setActiveNoteSettings(current => !current)
        //     setNowActiveNoteId(id)
        // }

        // if (nowActiveNoteId === id) {
        //     setActiveNoteSettings(current => !current)
        //     setNowActiveNoteId(id)
        // }

        // if (activeClockSettings === true) {
        //     setActiveClockSettings(false)
        // }

        // if (activeBoardSettings === true) {
        //     setActiveBoardSettings(false)
        // }

        // const Note = renderNote.find(note => note.id === id);
        // if (Note) {
        //     const { noteColor, fontcolor, accentcolor, titlesize, contentsize, fontstyle, layer } = Note;
        //     setNoteColor(noteColor);
        //     setFontColor(fontcolor);
        //     setAccentColor(accentcolor);
        //     setNoteTitleSize(titlesize);
        //     setNoteContentSize(contentsize);
        //     setNoteFontStyle(fontstyle)
        //     setLayer(layer);
        // }
    }




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





    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // UPDATE POSITION ATTRIBUTES FOR PARTICULAR NOTE
    const changePositionAttribute = (id, newPosition) => {
        const { x, y } = newPosition;

        const updatedAttributes = renderCalendar.map((calendar) => {
            if (calendar.id === id) {
                return { ...calendar, positionleft: x, positiontop: y };
            }
            return calendar;
        });

        setRenderCalendar(updatedAttributes);
        localStorage.setItem('RenderCalendar', JSON.stringify(updatedAttributes));
    };


    const handleMouseDown = (event, id) => {
        setNowActiveCalendarId(id);
        setIsDragging(true);

        const { clientX, clientY } = event;
        const calendar = renderCalendar.find(calendar => calendar.id === id);
        const x = clientX - calendar.positionleft;
        const y = clientY - calendar.positiontop;
        setOffset({ x, y });

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
            setCalendarPositionFromLeft(newPosition.x);
            setCalendarPositionFromTop(newPosition.y);
            changePositionAttribute(nowActiveCalendarId, newPosition);
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
    }, [isDragging, offset, nowActiveCalendarId, setCalendarPositionFromTop, setCalendarPositionFromLeft]);



    const changeSizeAttribute = (id, newWidth, newHeight) => {
        const updatedAttributes = renderCalendar.map((calendar) => {
            if (calendar.id === id) {
                return { ...calendar, width: newWidth, height: newHeight };
            }
            return calendar;
        });

        setRenderCalendar(updatedAttributes);
        localStorage.setItem("RenderCalendar", JSON.stringify(updatedAttributes));
    };



    const [isResizing, setIsResizing] = useState(false);
    const [resizeStartX, setResizeStartX] = useState(0);
    const [resizeStartY, setResizeStartY] = useState(0);

    //RESIZE NOTE
    const handleResizeMouseDown = (event, id) => {
        setNowActiveCalendarId(id);
        event.preventDefault();
        setIsResizing(true);

        const calendar = renderCalendar.find(calendar => calendar.id === id);
        setResizeStartX(event.clientX);
        setResizeStartY(event.clientY);
        setCalendarSizeX(calendar.width);
        setCalendarSizeY(calendar.height)
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
        const newWidth = calendarSizeX + offsetX;
        const newHeight = calendarSizeY + offsetY;
        setCalendarSizeX(newWidth);
        setCalendarSizeY(newHeight);
        changeSizeAttribute(nowActiveCalendarId, newWidth, newHeight);
    };

    const handleResizeMouseUp = () => {
        setIsResizing(false);
    };




    return (

        <div>

            <CalendarSettings

                calendarColor={calendarColor}
                setCalendarColor={setCalendarColor}

                calendarFontColor={calendarFontColor}
                setCalendarFontColor={setCalendarFontColor}

                calendarAccentColor={calendarAccentColor}
                setCalendarAccentColor={setCalendarAccentColor}


                calendarTitleSize={calendarTitleSize}
                setCalendarTitleSize={setCalendarTitleSize}

                calendarContentSize={calendarContentSize}
                setCalendarContentSize={setCalendarContentSize}

                calendarLayer={calendarLayer}
                setCalendarLayer={setCalendarLayer}

                calendarFontStyle={calendarFontStyle}
                setCalendarFontStyle={setCalendarFontStyle}

                nowActiveCalendarId={nowActiveCalendarId}
                setNowActiveCalendarId={setNowActiveCalendarId}

                activeCalendarSettings={activeCalendarSettings}
                setActiveCalendarSettings={setActiveCalendarSettings}

                renderCalendar={renderCalendar}
                setRenderCalendar={setRenderCalendar}

            />





            <button className='AddNewCalendarBtn' onClick={addNewCalendar}>Add Calendar</button>

            {renderCalendar.map((calendar) => (


                <div className="CalendarContainer"
                    id={calendar.id}
                    key={calendar.id}
                    style={{
                        left: `${calendar.positionleft}px`,
                        top: `${calendar.positiontop}px`,
                        width: `${calendar.width}px`,
                        height: `${calendar.height}px`,
                        backgroundColor: calendar.CalendarColor,
                    }}>


                    <div className="TopSectionCalendar">

                        <button className='RemoveCalendarBtn' onClick={() => removeCalendar(calendar.id)} >
                            <div style={{ color: calendar.accentcolor }}>X</div>
                        </button>

                        <div className="MoveCalendar"
                            onMouseDown={(event) => handleMouseDown(event, calendar.id)}
                            style={{
                                borderLeft: `0.1rem solid ${calendar.accentcolor}`,
                                borderRight: `0.1rem solid ${calendar.accentcolor}`,
                                borderBottom: `0.1rem solid ${calendar.accentcolor}`
                            }}

                        >
                            <div style={{ color: calendar.accentcolor }} >Move Me</div>

                        </div>

                        <button className='SettingsCalendarBtn' onClick={() => CalendarSettingsWindow(calendar.id)} >
                            <div style={{ color: calendar.accentcolor }}>⚙</div>
                        </button>

                    </div>

                    <div className="CalendarContent">

                        <div className="CalendarHeader">

                            <div className="CalendarTitle"
                                style={{
                                    color: calendar.fontcolor,
                                    fontSize: `${calendar.titlesize}px`,
                                    fontFamily: calendar.fontstyle

                                }}>
                                {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                            </div>

                            <div className="CalendarButtons">
                                <button onClick={prevYear} style={{ color: calendar.fontcolor, fontSize: `${calendar.contentsize}px`, fontFamily: calendar.fontstyle }}>&lt;&lt;</button>
                                <button onClick={prevMonth} style={{ color: calendar.fontcolor, fontSize: `${calendar.contentsize}px`, fontFamily: calendar.fontstyle }}>&lt;</button>
                                <button onClick={goToToday} style={{ color: calendar.fontcolor, fontSize: `${calendar.contentsize}px`, fontFamily: calendar.fontstyle }}>Now</button>
                                <button onClick={nextMonth} style={{ color: calendar.fontcolor, fontSize: `${calendar.contentsize}px`, fontFamily: calendar.fontstyle }}>&gt;</button>
                                <button onClick={nextYear} style={{ color: calendar.fontcolor, fontSize: `${calendar.contentsize}px`, fontFamily: calendar.fontstyle }}>&gt;&gt;</button>
                            </div>

                        </div>

                        <table className="calendar-table"
                            style={{
                                border: ` 0.1rem solid ${calendar.accentcolor}`
                            }}>
                            <tbody>
                                <tr className='GridMonths'
                                >
                                    <td style={{
                                        color: calendar.fontcolor,
                                        fontSize: `${calendar.contentsize}px`,
                                        fontFamily: calendar.fontstyle
                                    }}>
                                        Sun</td>
                                    <td style={{
                                        color: calendar.fontcolor,
                                        fontSize: `${calendar.contentsize}px`,
                                        fontFamily: calendar.fontstyle
                                    }}>
                                        Mon</td>
                                    <td style={{
                                        color: calendar.fontcolor,
                                        fontSize: `${calendar.contentsize}px`,
                                        fontFamily: calendar.fontstyle
                                    }}>
                                        Tue</td>
                                    <td style={{
                                        color: calendar.fontcolor,
                                        fontSize: `${calendar.contentsize}px`,
                                        fontFamily: calendar.fontstyle
                                    }}>
                                        Wed</td>
                                    <td style={{
                                        color: calendar.fontcolor,
                                        fontSize: `${calendar.contentsize}px`,
                                        fontFamily: calendar.fontstyle
                                    }}>
                                        Thu</td>
                                    <td style={{
                                        color: calendar.fontcolor,
                                        fontSize: `${calendar.contentsize}px`,
                                        fontFamily: calendar.fontstyle
                                    }}>
                                        Fri</td>
                                    <td style={{
                                        color: calendar.fontcolor,
                                        fontSize: `${calendar.contentsize}px`,
                                        fontFamily: calendar.fontstyle
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
                                                style={{ color: calendar.accentcolor }}
                                            >
                                                <div style={{
                                                    color: calendar.fontcolor,
                                                    fontSize: `${calendar.contentsize}px`,
                                                    fontFamily: calendar.fontstyle
                                                }}>{day}</div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="ResizeCalendar"
                        onMouseDown={(event) => handleResizeMouseDown(event, calendar.id)}
                        style={{
                            borderLeft: `0.1rem solid ${calendar.accentcolor}`,
                            borderTop: `0.1rem solid ${calendar.accentcolor}`
                        }}>
                        <div style={{ color: calendar.accentcolor }}>⤡</div>
                    </div>

                </div>
            ))}

        </div>
    );
};

export default CalendarContainer;
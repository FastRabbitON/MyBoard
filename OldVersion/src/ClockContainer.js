import { useState, useEffect } from "react";

import ClockSettings from "./ClockSettings";

import "./ClockStyle.css"

const ClockContainer = ({
    activeClockSettings,
    setActiveClockSettings,
    setActiveNoteSettings,
    activeNoteSettings,
    activeBoardSettings,
    setActiveBoardSettings
}) => {

    const [renderClock, setRenderClock] = useState([]);

    const [clockColor, setClockColor] = useState("#ffb100");
    const [fontColor, setFontColor] = useState("#000000");
    const [accentColor, setAccentColor] = useState('#4b4d4f');

    const [sizeX, setSizeX] = useState(200);
    const [sizeY, setSizeY] = useState(150);

    const [positionFromLeft, setPositionFromLeft] = useState(10);
    const [positionFromTop, setPositionFromTop] = useState(10)

    const [hoursFontSize, setHoursFontSize] = useState(20)
    const [datesFontSize, setDatesFontSize] = useState(20)

    const [nowActiveClockId, setNowActiveClockId] = useState(null);

    const [clockForm, setClockForm] = useState("HH:MM:SS/DD.MM.YYYY")


    const [isShadow, setIShadow] = useState(false); //Do ogarnięcia


    // SAVE TO LOALSTORAGE
    useEffect(() => {
        const renderFromLocalStorage = JSON.parse(localStorage.getItem('RenderClock')) || [];
        setRenderClock(renderFromLocalStorage);
    }, []);


    const AddNewClock = () => {

        const newClock = {
            id: Date.now(),
            clockcolor: "#ffb100",
            fontcolor: "#000000",
            accentcolor: '#4b4d4f',
            width: 115,
            height: 100,
            positionleft: 10,
            positiontop: 10,
            clockform: "HH:MM:SS/DD.MM.YYYY",
            hoursize: 20,
            datesize: 20
        }

        setRenderClock([...renderClock, newClock])

        localStorage.setItem('RenderClock', JSON.stringify([...renderClock, newClock]));

        if (activeClockSettings === true) {
            setActiveClockSettings(false)
        }
    }



    const RemoveClock = (id) => {
        const updatedClock = renderClock.filter((clock) => clock.id !== id);
        setRenderClock(updatedClock);
        localStorage.setItem('RenderClock', JSON.stringify(updatedClock));

        if (activeClockSettings === true) {
            setActiveClockSettings(false)
        }
    }




    const ClockSettingsWindow = (id) => {

        if (nowActiveClockId !== id) {
            setActiveClockSettings(current => !current)
            setActiveClockSettings(current => !current)
            setNowActiveClockId(id)
        }

        if (nowActiveClockId === id) {
            setActiveClockSettings(current => !current)
            setNowActiveClockId(id)
        }

        if (activeNoteSettings === true) {
            setActiveNoteSettings(false)
        }

        if (activeBoardSettings === true) {
            setActiveBoardSettings(false)
        }

        const Clock = renderClock.find(clock => clock.id === id);
        if (Clock) {
            const { clockcolor, fontcolor, accentcolor, hoursize, datesize, clockform } = Clock;
            setClockColor(clockcolor);
            setFontColor(fontcolor);
            setAccentColor(accentcolor);
            setHoursFontSize(hoursize);
            setDatesFontSize(datesize);
            setClockForm(clockform);

        }
    }



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



    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });


    // UPDATE POSITION ATTRIBUTES FOR PARTICULAR CLOCK
    const changePositionAttribute = (id, newPosition) => {
        const { x, y } = newPosition;

        const updatedAttributes = renderClock.map((clock) => {
            if (clock.id === id) {
                return { ...clock, positionleft: x, positiontop: y };
            }
            return clock;
        });

        setRenderClock(updatedAttributes);
        localStorage.setItem('RenderClock', JSON.stringify(updatedAttributes));
    };


    //
    const handleMouseDown = (event, id) => {
        setNowActiveClockId(id);
        setIsDragging(true);

        const { clientX, clientY } = event;
        const clock = renderClock.find(clock => clock.id === id);
        const x = clientX - clock.positionleft;
        const y = clientY - clock.positiontop;
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
            setPositionFromLeft(newPosition.x);
            setPositionFromTop(newPosition.y);
            changePositionAttribute(nowActiveClockId, newPosition);
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
    }, [isDragging, offset, nowActiveClockId, setPositionFromTop, setPositionFromLeft]);







    // UPDATE SIZE ATTRIBUTES FOR PARTICULAR NOTE
    const changeSizeAttribute = (id, newWidth, newHeight) => {
        const updatedAttributes = renderClock.map((clock) => {
            if (clock.id === id) {
                return { ...clock, width: newWidth, height: newHeight };
            }
            return clock;
        });

        setRenderClock(updatedAttributes);
        localStorage.setItem("RenderClock", JSON.stringify(updatedAttributes));
    };



    const [isResizing, setIsResizing] = useState(false);
    const [resizeStartX, setResizeStartX] = useState(0);
    const [resizeStartY, setResizeStartY] = useState(0);

    //RESIZE NOTE
    const handleResizeMouseDown = (event, id) => {
        setNowActiveClockId(id);
        event.preventDefault();
        setIsResizing(true);

        const clock = renderClock.find(clock => clock.id === id);
        setResizeStartX(event.clientX);
        setResizeStartY(event.clientY);
        setSizeX(clock.width);
        setSizeY(clock.height)
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
        const newWidth = sizeX + offsetX;
        const newHeight = sizeY + offsetY;
        setSizeX(newWidth);
        setSizeY(newHeight);
        changeSizeAttribute(nowActiveClockId, newWidth, newHeight);
    };

    const handleResizeMouseUp = () => {
        setIsResizing(false);
    };




    return (
        <div>

            <ClockSettings
                ClockSettingsWindow={ClockSettingsWindow}
                activeClockSettings={activeClockSettings}
                setActiveClockSettings={setActiveClockSettings}
                renderClock={renderClock}
                setRenderClock={setRenderClock}
                clockColor={clockColor}
                setClockColor={setClockColor}
                fontColor={fontColor}
                setFontColor={setFontColor}
                accentColor={accentColor}
                setAccentColor={setAccentColor}
                nowActiveClockId={nowActiveClockId}
                setNowActiveClockId={setNowActiveClockId}
                clockForm={clockForm}
                setClockForm={setClockForm}
                date={date}
                hoursFontSize={hoursFontSize}
                setHoursFontSize={setHoursFontSize}
                datesFontSize={datesFontSize}
                setDatesFontSize={setDatesFontSize}
            />


            <button className="AddNewClockBtn" onClick={AddNewClock}>Add Clock</button>


            {renderClock.map((clock) => (

                <div
                    className="Clock"
                    id={clock.id}
                    key={clock.id}
                    style={{
                        left: `${clock.positionleft}px`,
                        top: `${clock.positiontop}px`,
                        width: `${clock.width}px`,
                        height: `${clock.height}px`,
                        backgroundColor: clock.clockcolor,
                        border: `1px solid ${clock.accentcolor}`,
                        boxShadow: isShadow ? `8px 8px 24px 0px ${clock.accentcolor}` : "none"
                    }}

                >

                    <div className="TopSectionClock">

                        <button className="RemoveClockBtn"
                            onClick={() => RemoveClock(clock.id)}
                        >
                            <div style={{
                                color: clock.accentcolor
                            }}>X</div></button>

                        <div className="MoveClock"
                            onMouseDown={(event) => handleMouseDown(event, clock.id)}
                            style={{
                                borderLeft: `0.1rem solid ${clock.accentcolor}`,
                                borderRight: `0.1rem solid ${clock.accentcolor}`,
                                borderBottom: `0.1rem solid ${clock.accentcolor}`,
                            }}
                        >
                            <div style={{
                                color: clock.accentcolor
                            }}>Move Me</div></div>

                        <button className="SettingsClockBtn"
                            onClick={() => ClockSettingsWindow(clock.id)}
                        >
                            <div style={{
                                color: clock.accentcolor
                            }}>⚙</div></button>

                    </div>


                    <div className="DateContainer">

                        <div className={`HHMMSS-DDMMYYYY ${clock.clockform === "HH:MM:SS/DD.MM.YYYY" ? "On" : "Off"}`}
                            style={{
                                color: clock.fontcolor,
                                fontSize: `${clock.hoursize}px`,
                            }}>
                            {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:{date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}
                        </div>

                        <div className={`HHMMSS-DDMMYYYY ${clock.clockform === "HH:MM:SS/DD.MM.YYYY" ? "On" : "Off"}`}

                            style={{
                                color: clock.fontcolor,
                                fontSize: `${clock.datesize}px`
                            }}
                        >
                            {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}.{date.getFullYear()}
                        </div>


                        <div className={`HHMM-DDMMYYYY ${clock.clockform === "HH:MM/DD.MM.YYYY" ? "On" : "Off"}`}
                            style={{
                                color: clock.fontcolor,
                                fontSize: `${clock.hoursize}px`
                            }}>
                            {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}
                        </div>

                        <div className={`HHMM-DDMMYYYY ${clock.clockform === "HH:MM/DD.MM.YYYY" ? "On" : "Off"}`}

                            style={{
                                color: clock.fontcolor,
                                fontSize: `${clock.datesize}px`
                            }}
                        >
                            {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}.{date.getFullYear()}

                        </div>


                        <div className={`HHMMSS ${clock.clockform === "HH:MM:SS" ? "On" : "Off"}`}
                            style={{
                                color: clock.fontcolor,
                                fontSize: `${clock.hoursize}px`
                            }}>
                            {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:{date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}

                        </div>


                        <div className={`HHMM ${clock.clockform === "HH:MM" ? "On" : "Off"}`}
                            style={{
                                color: clock.fontcolor,
                                fontSize: `${clock.hoursize}px`
                            }}>
                            {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}

                        </div>


                        <div className={`DDMMYYYY ${clock.clockform === "DD.MM.YYYY" ? "On" : "Off"}`}

                            style={{
                                color: clock.fontcolor,
                                fontSize: `${clock.datesize}px`
                            }}
                        >
                            {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}.{date.getFullYear()}
                        </div>


                    </div>



                    <div className="ResizeClock"
                        onMouseDown={(event) => handleResizeMouseDown(event, clock.id)}
                        style={{
                            borderLeft: `0.1rem solid ${clock.accentcolor}`,
                            borderTop: `0.1rem solid ${clock.accentcolor}`
                        }}
                    >
                        <div style={{
                            color: clock.accentcolor
                        }}>⤡</div>

                    </div>

                </div>

            ))}


        </div>
    );



}

export default ClockContainer;
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface TimePickerProps {
    pickMeridian?: boolean,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
}

export default function TimePicker({ pickMeridian = false, inputValue = "12:0AM", setInputValue }: TimePickerProps) {
    const [t] = useTranslation();
    
    const [isAm, setIsAm] = useState(true);
    const [hour, setHour] = useState(1);
    const [minute, setMinute] = useState(0);

    const [amPmOpen, setAmPmOpen] = useState(false);
    const [hourOpen, setHourOpen] = useState(false);
    const [minuteOpen, setMinuteOpen] = useState(false);

    const amPmRef = useRef<HTMLDivElement>(null);
    const hourRef = useRef<HTMLDivElement>(null);
    const minuteRef = useRef<HTMLDivElement>(null);

    const toggleAmPm = () => {
        setAmPmOpen(!amPmOpen);
        setHourOpen(false);
        setMinuteOpen(false);
    };

    const toggleHour = () => {
        setHourOpen(!hourOpen);
        setAmPmOpen(false);
        setMinuteOpen(false);
    };

    const toggleMinute = () => {
        setMinuteOpen(!minuteOpen);
        setAmPmOpen(false);
        setHourOpen(false);
    };

    const handleAmPmSelect = (value: boolean) => {
        setIsAm(value);
        setAmPmOpen(false);
        updateInputValue();
    };

    const handleHourSelect = (value: number) => {
        setHour(value);
        setHourOpen(false);
        updateInputValue();
    };

    const handleMinuteSelect = (value: number) => {
        setMinute(value);
        setMinuteOpen(false);
        updateInputValue();
    };

    const updateInputValue = () => {
        setInputValue(`${hour}:${minute}${pickMeridian ? isAm ? "AM" : "PM" : ""}`);
        console.log(inputValue)
    }

    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

    const buttonStyle = "border-2 rounded-2xl p-6 text-2xl bg-white hover:bg-blue-500 text-black hover:text-white w-64";
    const dropdownMenuStyle = "absolute z-1 bg-white border rounded-xl shadow mt-1 max-h-64 overflow-y-auto w-64 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent hover:scrollbar-thumb-gray-300 hover:scrollbar-track-gray-100";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (amPmOpen && amPmRef.current && !amPmRef.current.contains(event.target as Node)) {
            setAmPmOpen(false);
        }
        if (hourOpen && hourRef.current && !hourRef.current.contains(event.target as Node)) {
            setHourOpen(false);
        }
        if (minuteOpen && minuteRef.current && !minuteRef.current.contains(event.target as Node)) {
            setMinuteOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [amPmOpen, hourOpen, minuteOpen]);

    return (
        <div className="flex flex-col items-center p-6">
        <div className="flex gap-4">
            <div className="relative" ref={hourRef}>
            <button onClick={toggleHour} className={buttonStyle}>
                {hour}
            </button>
            {hourOpen && (
                <div className={dropdownMenuStyle}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                    <button
                    key={h}
                    onClick={() => handleHourSelect(h)}
                    className="block w-full text-left p-4 text-xl hover:bg-gray-100"
                    >
                    {h}
                    </button>
                ))}
                </div>
            )}
            </div>

            <p className="py-6 text-2xl">
                { pickMeridian ?
                    t("oClockUnit")
                :
                    t("hoursUnit")
                }
            </p>

            <div className="relative" ref={minuteRef}>
            <button onClick={toggleMinute} className={buttonStyle}>
                {minute.toString().padStart(2, '0')}
            </button>
            {minuteOpen && (
                <div className={dropdownMenuStyle}>
                {minutes.map((m) => (
                    <button
                    key={m}
                    onClick={() => handleMinuteSelect(m)}
                    className="block w-full text-left p-4 text-xl hover:bg-gray-100"
                    >
                    {m.toString().padStart(2, '0')}
                    </button>
                ))}
                </div>
            )}
            </div>

            <p className="py-6 text-2xl">{t("minutesUnit")}</p>

            { pickMeridian && 
                <>
                    <div className="w-1"/>

                    <div className="relative" ref={amPmRef}>
                    <button onClick={toggleAmPm} className={buttonStyle}>
                        {isAm ? 'AM' : 'PM'}
                    </button>
                    {amPmOpen && (
                        <div className={dropdownMenuStyle}>
                        <button
                            onClick={() => handleAmPmSelect(true)}
                            className="block w-full text-left p-4 text-xl hover:bg-gray-100"
                        >
                            AM
                        </button>
                        <button
                            onClick={() => handleAmPmSelect(false)}
                            className="block w-full text-left p-4 text-xl hover:bg-gray-100"
                        >
                            PM
                        </button>
                        </div>
                    )}
                    </div>
                
                </>
            }
            </div>
        </div>
    );
}
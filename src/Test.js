//Test.js

import React, { useEffect, useState } from "react";

function Test({ question, options, image, onAnswer}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [yesText, setYesText] = useState('');
    const [noText, setNoText] = useState('');
    const [initials, setInitials] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [formTouched, setFormTouched] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setSelectedOption(null); // Resets the selected option when question changes
        setYesText(''); // Clears text field for Yes
        setNoText(''); // Clears text field for No
    }, [question]);

    useEffect(() => {
        if (initials && day && month && year) {
          console.log(`${initials}, ${year}-${month}-${day}`);
        }
      }, [initials, day, month, year]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        if (option !== "Yes" && option !== "No") {
            onAnswer(option);  // Immediate submit for questions without text fields
        }
    };
    
    const handleYesTextChange = (e) => {
        setYesText(e.target.value);
    };

    const handleNoTextChange = (e) => {
        setNoText(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedOption === "Yes") {
          onAnswer({ option: selectedOption, text: yesText });
        } else if (selectedOption === "No") {
          onAnswer({ option: selectedOption, text: noText });
        }
    };

    const handleProceed = () => {
        setFormTouched(true);
        if (!isFormValid) {
            setShowError(true);
        } else {
            const dob = `${year}-${month}-${day}`;
            onAnswer({ initials, dob });
            setShowError(false);
        }
    };

    const isFormValid = initials.trim() !== '' && day.trim() !== '' && month.trim() !== '' && year.trim() !== '';

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 100;
        const years = [];
        for (let i = startYear; i <= currentYear; i++) {
          years.push(i);
        }
        return years;
    };

    return (
        <div className="question-section">
            {question === "Welcome to the cybersecurity awareness pretest. Thank you for participating in this assessment. The purpose of this pretest is to gauge your current knowledge and awareness of cybersecurity threats. Your responses will help us understand your starting point before you engage with our educational game designed to improve threat detection skills. There will be a total of 6 questions." ? (
                <div className="form">
                    <div className="question-text">{question}</div>
                    <label>
                        Enter your initials, e.g., JD for John Doe:
                        <input
                            type="text"
                            value={initials}
                            onChange={(e) => setInitials(e.target.value)}
                        />
                    </label>
                    <label>
                        Enter your date of birth:
                        <div className="dob-container">
                            <select value={day} onChange={(e) => setDay(e.target.value)}>
                                <option value="" disabled>DD</option>
                                {[...Array(31).keys()].map(d => (
                                    <option key={d + 1} value={d + 1}>{d + 1}</option>
                                ))}
                            </select>
                            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                                <option value="" disabled>MM</option>
                                {[...Array(12).keys()].map(m => (
                                <option key={m + 1} value={m + 1}>{m + 1}</option>
                                ))}
                            </select>
                            <select value={year} onChange={(e) => setYear(e.target.value)}>
                                <option value="" disabled>YYYY</option>
                                {generateYearOptions().map(y => (
                                <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <button onClick={handleProceed}>Proceed</button>
                    {showError && <p className="error-message">Please enter information to proceed</p>}
                </div>
            ) : (
            <>
                <div className="question-text">{question}</div>
                {image && <img src={image} alt="Question related visual" className="question-image" />}
                <div className="answer-section">
                    {options.map((option, index) => (
                    <button key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </button>
                    ))}
                </div>
                {selectedOption === "Yes" && (
                    <div>
                        <label>
                            Please explain why you answered yes:
                            <input
                                type="text"
                                value={yesText}
                                onChange={handleYesTextChange}
                                />
                        </label>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                )}
                {selectedOption === "No" && (
                    <div>
                        <label>
                            Please explain why you answered no:
                            <input
                                type="text"
                                value={noText}
                                onChange={handleNoTextChange}
                            />
                        </label>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                )}
            </>
        )}   
    </div>
    );
}

export default Test;
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import axios from 'axios';
import Calendar from "../Calendar/Calendar";
import "./Camera.scss";
import CameraIcon from "../../assets/images/icons/rxscan_1.png";
import LabelsIcon from "../../assets/images/icons/rxscan_4.png";
import RxTermsIcon from "../../assets/images/icons/rxscan_5.png";

const Camera = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [mirrored, setMirrored] = useState(false);
    const [detectedLabels, setDetectedLabels] = useState([]);
    const [rxTermsResults, setRxTermsResults] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reminderDetails, setReminderDetails] = useState({
        medications: '',
        date: null,
        time: '',
        frequency: '',
      });
    
    
    // function to check if detected labels matches the rxterms
    const isLabelMatch = (labelText) => {
        const lowerCaseLabelText = labelText ? labelText.toLowerCase() : '';
    
        return rxTermsResults.some((rxTerm) => {
            const lowerCaseRxTerm = rxTerm[1][0] ? rxTerm[1][0].toLowerCase() : '';
            const labelWords = lowerCaseLabelText.split(/\s+/);
            return labelWords.some(word => lowerCaseRxTerm.includes(word));
        });
    };

    // Function to generate days to take medicine based on frequency
    const generateDays = (frequency, selectedDate) => {
        const days = [];
    
        if (frequency === 'Daily') {
        // Add all days of the week
        for (let i = 0; i < 7; i++) {
            const date = new Date(selectedDate);
            date.setDate(selectedDate.getDate() + i);
            days.push(date.toLocaleDateString('en-US', { weekday: 'long' }));
        }
        } else if (frequency === 'Every Other Day') {
        // Add every other day
        for (let i = 0; i < 7; i += 2) {
            const date = new Date(selectedDate);
            date.setDate(selectedDate.getDate() + i);
            days.push(date.toLocaleDateString('en-US', { weekday: 'long' }));
        }
        } else if (frequency === 'Weekly') {
        // Add only selected day
        days.push(selectedDate.toLocaleDateString('en-US', { weekday: 'long' }));
        }
    
        return days;
    };

    const onDateChange = (date) => {
        setSelectedDate(date);
    };
    
    const onTimeChange = (field, value) => {
        setReminderDetails((prevDetails) => ({
            ...prevDetails,
            time: { ...prevDetails.time, [field]: value },
        }));
    };
    
    const onFrequencyChange = (frequency) => {
        const days = generateDays(frequency, selectedDate);
      
        setReminderDetails((prevDetails) => ({
            ...prevDetails,
            frequency,
            days,
        }));
    };
  
    // image capture function
    async function capture () {
        const imageSrc = webcamRef.current.getScreenshot();
    
        try {
            const response = await axios.post('http://localhost:4000/image-captured', { image: imageSrc });
          console.log('Image sent to server.');
          setImgSrc(imageSrc);

            // Detected labels
            const labels = response.data.labels;
            setDetectedLabels(labels);

            // Medicine names showing in Reminders Component
            const medicineName = labels.length > 0 ? labels[0].description.trim() : '';

            // Setting Reminders
            const newReminderDetails = {
                medications: medicineName,
                date: selectedDate,
                time: reminderDetails.time,
                frequency: reminderDetails.frequency,
                days: generateDays(reminderDetails.frequency, selectedDate),
            };

            console.log('New Reminder Details:', newReminderDetails);

            // Storing the Reminders in local storage
            const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
            storedReminders.push(newReminderDetails);
            localStorage.setItem('reminders', JSON.stringify(storedReminders));


            // Setting the Reminder details state
            setReminderDetails(newReminderDetails);
            // RxTerms Results
            setRxTermsResults(response.data.rxTermsResults);
          
        } catch (error) {
          console.error('Error sending image to server:', error);
        }
      };

    // image retake function
    const retake = () => {
        setImgSrc(null);
        setDetectedLabels([]);
        setRxTermsResults([]);
    };

  
    return (
        <div className="camera__container">
            <div className="camera__border"></div>
            <div className="camera__calendar">
            <Calendar
                selectedDate={selectedDate}
                onDateChange={onDateChange}
                reminderDetails={reminderDetails}
                onTimeChange={onTimeChange}
                onFrequencyChange={onFrequencyChange}
                />
            </div>
            <div className="camera__border"></div>
            <div className="camera__title-cont">
                <h1 className="camera__title">Prescription, meet scanner from the future</h1>
            </div>
            <div className="camera__border"></div>
            <div className="camera__scan-cont">
                <h1 className="camera__scan">Scan</h1>
                <img
                    className="camera__icon"
                    src={CameraIcon}
                    alt="camera-icon"
                    />
            </div>
        {imgSrc ? (
          <img src={imgSrc} alt="webcam" />
        ) : (
          <Webcam 
            height={240}
            width={300}
            ref={webcamRef}
            mirrored={mirrored}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            />
        )}
        <div className="camera__mirror">
            <p className="camera__caption">Mirror</p>
            <div className="camera__controls">
                <div className="camera__block">
                    <input
                        data-index="0"
                        type="checkbox"
                        id="scan"
                        checked={mirrored}
                        onChange={(e) => setMirrored(e.target.checked)}
                    />
                    <label for="scan"></label>
                </div>
            </div>
        </div>
        <div className="camera__btn-container">
          {imgSrc ? (
            <button className="camera__btn" onClick={retake}>Retake photo</button>
          ) : (
            <button className="camera__btn" onClick={capture}>Capture photo</button>
          )}
        </div>
            {/* Detected Labels */}
            <div className="camera__border"></div>
            <div className="camera__detect-cont">
                <div className="camera__detect-wrap">
                    <h2 className="camera__detect">Detected Labels</h2>
                    <img
                        className="camera__small-icon"
                        src={LabelsIcon}
                        alt="labels-icon"
                        />
                </div>
                <ul className="camera__detect-para">
                    {detectedLabels.length > 0 && (
                        <li
                            className={`camera__detect-li ${isLabelMatch(detectedLabels[0].description) ? 'highlight' : ''}`}
                        >
                            {detectedLabels[0].description}
                        </li>
                    )}
                    {detectedLabels.length === 0 && (
                        <li className="camera__detect-li">No labels detected</li>
                    )}
                </ul>
            </div>
            {/* RxTerms Results */}
            <div className="camera__border"></div>
            <div className="camera__rx-terms-cont">
                <div className="camera__rx-terms-wrap">
                    <h2 className="camera__rx-terms">RxTerms Results</h2>
                    <img
                        className="camera__small-icon"
                        src={RxTermsIcon}
                        alt="Rxterms-icon"
                        />
                </div>
                <ul className="camera__rx-terms-para">
                    {rxTermsResults.length > 0 ? (
                    rxTermsResults.map((result, index) => (
                        <li className="camera__rx-terms-li" key={index}>
                        {result[1]}: {result[2][0]}
                        </li>
                    ))
                    ) : (
                    <li className="camera__rx-terms-li">No RxTerms results available</li>
                    )}
                </ul>
            </div>
            <div className="camera__border"></div>
        </div>
    );
};

export default Camera;


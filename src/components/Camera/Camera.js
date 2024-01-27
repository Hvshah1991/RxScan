import Webcam from "react-webcam";
import { useRef, useState } from "react";
import axios from 'axios';
import Calendar from "../Calendar/Calendar";
import "./Camera.scss";

const Camera = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [mirrored, setMirrored] = useState(false);
    const [detectedLabels, setDetectedLabels] = useState([]);
    const [rxTermsResults, setRxTermsResults] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reminderDetails, setReminderDetails] = useState({
        medication: '',
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
        setReminderDetails((prevDetails) => ({ ...prevDetails, frequency }));
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
            <div className="camera__title-cont">
                <h1 className="camera__title">Prescription, meet scanner from the future</h1>
            </div>
            <div className="camera__border"></div>
        {imgSrc ? (
          <img src={imgSrc} alt="webcam" />
        ) : (
          <Webcam 
            height={300}
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
            <div className="camera__border"></div>
                <div className="camera__detect-cont">
                <h2 className="camera__detect">Detected Labels</h2>
                <ul className="camera__detect-para">
                    {detectedLabels.length > 0 && (
                        <li
                            className={`camera__detect-li ${isLabelMatch(detectedLabels[0]?.description) ? 'highlight' : ''}`}
                            key={0}
                        >
                            {detectedLabels[0]?.description}
                        </li>
                    )}
                </ul>
            </div>
            <div className="camera__border"></div>
            <div className="camera__rx-terms-cont">
                <h2 className="camera__rx-terms">RxTerms Results</h2>
                <ul className="camera__rx-terms-para">
                    {rxTermsResults.map((result, index) => (
                        <li className="camera__rx-terms-li" key={index}>
                            {/* Display the relevant information from RxTerms response to get clean response*/}
                            {result[1]}: {result[2][0]}
                        </li>
                    ))}
                </ul>
            </div>
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
        </div>
    );
};

export default Camera;


import React, { useState } from 'react';
import "./Contact.scss";

import ContactIcon from "../../assets/images/icons/rxscan_13.png";

const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', { name, email, message });
        // Reset form fields after submission
        setName('');
        setEmail('');
        setMessage('');
        alert('Form submitted successfully!');
    };

    return (
        <div className="contact">
            <div className="contact__border"></div>
            <div className='contact__cont'>
            <h2 className='contact__title'>Contact Us</h2>
            <img
                className="contact__icon"
                src={ContactIcon}
                alt="contact-icon"
            />
            </div>
            <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="contact__form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="contact__form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className='contact__but-cont'>
                <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Contact;
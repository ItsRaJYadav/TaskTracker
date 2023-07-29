import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineUser, HiOutlinePencilAlt, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FiSend } from 'react-icons/fi';
import contact from '../../assets/contactform.jpg'
import axios from 'axios';
import toast from 'react-hot-toast'
const ContactForm = () => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/v1/auth/contactform', {
                name,
                subject,
                email,
                message,
            });
            if (response.status === 200) {
                console.log('Form submitted successfully:', response.data);
                toast.success('Form submitted successfully!');
                setName('');
                setSubject('');
                setEmail('');
                setMessage('');
            }
        } catch (error) {
            // Handle error
            console.error('Error submitting form:', error.response);

            if (error.response && error.response.status === 400) {
                toast.error('Validation error. Please check your form data.');
            } else if (error.response && error.response.status === 500) {
                toast.error('Internal server error. Please try again later.');
            } else {
                toast.error('Error submitting form. Please try again.');
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 bg-white p-6 ml-24 mt-7">
                <div className="flex justify-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Company Info</h2>
                        <div className="flex items-start mb-4">
                            <HiOutlineLocationMarker className="mr-2 mt-1 text-blue-500" />
                            <div>
                                <p className="font-bold">Address:</p>
                                <p>Faridabad Haryana 121006</p>
                            </div>
                        </div>
                        <div className="flex items-start mb-4">
                            <HiOutlinePhone className="mr-2 mt-1 text-blue-500" />
                            <div>
                                <p className="font-bold">Phone:</p>
                                <p>(+91) 9472040607</p>
                            </div>
                        </div>
                        <div className="flex items-start mb-4">
                            <HiOutlineMail className="mr-2 mt-1 text-blue-500" />
                            <div>
                                <p className="font-bold">Email:</p>
                                <p>info@tasktrackerapp.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <img
                    src={contact}
                    alt="Company Logo"
                    className="w-50 h-50 object-cover mb-4 mr-10"
                />
            </div>

            {/* contact form */}
            <div className="w-full md:w-1/2 bg-white p-6">
                <h2 className="text-2xl font-bold mb-4 mt-7">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="flex items-center">
                            <HiOutlineUser className="mr-2" />
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            placeholder="Your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subject" className="flex items-center">
                            <HiOutlinePencilAlt className="mr-2" />
                            Subject:
                        </label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            placeholder="Subject"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="flex items-center">
                            <HiOutlineMail className="mr-2" />
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            placeholder="Your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="flex items-center">
                            <HiOutlinePencilAlt className="mr-2" />
                            Message:
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="border rounded-md px-3 py-2 w-full h-32 resize-none focus:outline-none"
                            placeholder="Your message"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="flex items-center bg-blue-500 text-white rounded-md px-4 py-2"
                    >
                        <FiSend className="mr-2" />
                        Send Message
                    </button>
                </form>
            </div>

        </div>
    );
};

export default ContactForm;

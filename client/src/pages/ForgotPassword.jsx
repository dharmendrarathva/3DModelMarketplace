import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data, setData] = useState({ email: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const isValid = data.email.trim() !== "";

    const handleSubmit = (e) => {
        e.preventDefault();

        // Navigate to the verification page with email state
        navigate("/verification-otp", {
            state: data
        });

        // Clear input field after navigation
        setData({ email: "" });
    };

    return (
        <section className='w-full container mx-auto px-2'>
        dd
        </section>
    );
};

export default ForgotPassword;

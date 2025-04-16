import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const OtpVerification = () => {
    const location = useLocation();
    const email = location.state?.email || "";
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const { value } = e.target;

        // Move to next input if a digit is entered
        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to previous input if Backspace is pressed on an empty field
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold text-lg'>Enter OTP</p>
                <p className='text-sm text-gray-600'>OTP sent to: {email}</p>
                <form className='grid gap-4 py-4'>
                    <div className='grid gap-1'>
                        <label htmlFor='otp'>Enter Your OTP :</label>
                        <div className='flex items-center gap-2 justify-between mt-3'>
                            {[...Array(6)].map((_, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type='tel' // Ensures numeric keypad on mobile
                                    maxLength={1}
                                    pattern="[0-9]" // Allows only numbers
                                    className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold'
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} // Prevents non-numeric input
                                />
                            ))}
                        </div>
                    </div>
                    <button className='bg-green-800 hover:bg-green-700 text-white py-2 rounded font-semibold my-3 tracking-wide'>
                        Verify OTP
                    </button>
                </form>
                <p>
                    Already have an account? <Link to={'/login'} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
                </p>
            </div>
        </section>
    );
};

export default OtpVerification;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Image, Mail, Phone, User, Shield } from 'lucide-react';
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
    const user = useSelector(state => state.user);
    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setUserData({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
        });
    }, [user]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data: userData,
            });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                const updatedUserData = await fetchUserDetails();
                dispatch(setUserDetails(updatedUserData.data));
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const firstName = userData.name ? userData.name.split(' ')[0] : '';
    const lastName = userData.name ? userData.name.split(' ').slice(1).join(' ') : '';

    return (
        <div className='space-y-6'>
            <h1 className="text-2xl font-semibold">My Profile</h1>
            <div className='bg-white shadow-sm rounded-lg overflow-hidden'>
                <div className='p-6 flex items-start'>
                    <div className='mr-6'>
                        <div className='w-24 h-24 bg-black p-1 rounded-full overflow-hidden shadow-md border-2 border-white-500 flex items-center justify-center'>
                            {user.avatar ? (
                                <img alt={user.name} src={user.avatar} className='w-full h-full object-cover rounded-full' />
                            ) : (
                                <User size={60} className='text-orange-500' />
                            )}
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl font-semibold'>{firstName} {lastName}</h2>
                        <motion.button
                            onClick={() => setProfileAvatarEdit(true)}
                            className='mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-900 flex items-center gap-2 transition'
                            whileHover={{ scale: 1.05 }}>
                            <Image size={16} /> Edit Profile
                        </motion.button>
                    </div>
                </div>
            </div>
            {openProfileAvatarEdit && <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />}
            <div className='bg-white shadow-sm rounded-lg overflow-hidden'>
                <div className='p-4 border-b'>
                    <h3 className='text-lg font-medium'>Personal Information</h3>
                </div>
                <form className='p-6' onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='grid gap-1'>
                            <label className='text-gray-700 font-medium'>First Name</label>
                            <motion.input
                                type='text'
                                className='p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition shadow-sm'
                                value={firstName}
                                name='firstName'
                                onChange={(e) => {
                                    const newName = `${e.target.value} ${lastName}`;
                                    setUserData(prev => ({ ...prev, name: newName }));
                                }}
                                required
                                whileFocus={{ scale: 1.02 }}
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label className='text-gray-700 font-medium'>Last Name</label>
                            <motion.input
                                type='text'
                                className='p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition shadow-sm'
                                value={lastName}
                                name='lastName'
                                onChange={(e) => {
                                    const newName = `${firstName} ${e.target.value}`;
                                    setUserData(prev => ({ ...prev, name: newName }));
                                }}
                                required
                                whileFocus={{ scale: 1.02 }}
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label className='text-gray-700 font-medium flex items-center gap-2'><Mail size={16} /> Email</label>
                            <motion.input
                                type='email'
                                className='p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none transition shadow-sm'
                                value={userData.email}
                                name='email'
                                readOnly
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label className='text-gray-700 font-medium flex items-center gap-2'><Phone size={16} /> Mobile</label>
                            <motion.input
                                type='text'
                                className='p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition shadow-sm'
                                value={userData.mobile}
                                name='mobile'
                                onChange={handleOnChange}
                                required
                                whileFocus={{ scale: 1.02 }}
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label className='text-gray-700 font-medium flex items-center gap-2'><Shield size={16} />Role</label>
                            <motion.input
                                type='text'
                                className='p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none transition shadow-sm'
                                value={userData.role || 'N/A'}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <motion.button
                            className='w-full bg-blue-600 text-white px-4 py-3 font-semibold rounded-md transition hover:bg-blue-900 shadow-sm text-center'
                            whileHover={{ scale: 1.02 }}>
                            {loading ? 'Loading...' : 'Save Changes'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;

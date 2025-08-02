import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { updatedAvatar } from '../store/userSlice'
import { IoClose } from "react-icons/io5";
import '../componentcss/UserProfileAvatarEdit.css'

const UserProfileAvatarEdit = ({ close }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [imageSelected, setImageSelected] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")

    const handleUploadAvatarImage = async (e) => {
        const file = e.target.files[0]

        if (!file) return

        // Set preview image
        setPreviewImage(URL.createObjectURL(file))
        setImageSelected(true)
    }

    const handleSetProfile = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('avatar', document.getElementById('uploadProfile').files[0])

            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData
            })

            const { data: responseData } = response
            dispatch(updatedAvatar(responseData.data.avatar))

            // Show success message
            setSuccessMessage("Profile updated successfully!")

            // Close the modal after 2 seconds
            setTimeout(() => {
                close()
            }, 2000)

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='user-profile-avatar-edit-modal'>
            <div className='user-profile-avatar-edit-container'>
                <button onClick={close} className='user-profile-avatar-edit-close-btn'>
                    <IoClose size={20} />
                </button>

                {/* Profile Image Preview */}
                <div className='user-profile-avatar-preview'>
                    {previewImage ? (
                        <img 
                            alt="Preview"
                            src={previewImage}
                        />
                    ) : user.avatar ? (
                        <img 
                            alt={user.name}
                            src={user.avatar}
                        />
                    ) : (
                        <FaRegUserCircle size={65} />
                    )}
                </div>

                {/* File Upload */}
                <label htmlFor='uploadProfile' className='user-profile-upload-label'>
                    {loading ? "Loading..." : imageSelected ? "Choose Another" : "Upload"}
                    <input 
                        onChange={handleUploadAvatarImage} 
                        type='file' 
                        id='uploadProfile' 
                        className='user-profile-upload-input' 
                    />
                </label>

                {/* Set as Profile Button */}
                {imageSelected && (
                    <button
                        onClick={handleSetProfile}
                        className='user-profile-submit-btn'
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Set as Profile"}
                    </button>
                )}

                {/* Success Message */}
                {successMessage && (
                    <p className="user-profile-success-message">{successMessage}</p>
                )}
            </div>
        </section>
    )
}

export default UserProfileAvatarEdit
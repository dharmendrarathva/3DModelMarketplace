import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { updatedAvatar } from '../store/userSlice'
import { IoClose } from "react-icons/io5";

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
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
            <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
                <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
                    <IoClose size={20} />
                </button>

                {/* Profile Image Preview */}
                <div className='w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                    {previewImage ? (
                        <img 
                            alt="Preview"
                            src={previewImage}
                            className='w-full h-full object-cover'
                        />
                    ) : user.avatar ? (
                        <img 
                            alt={user.name}
                            src={user.avatar}
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <FaRegUserCircle size={65} />
                    )}
                </div>

                {/* File Upload */}
                <label htmlFor='uploadProfile'>
                    <div className='border border-primary-200 cursor-pointer hover:bg-primary-200 px-4 py-1 rounded text-sm my-3'>
                        {loading ? "Loading..." : imageSelected ? "Choose Another" : "Upload"}
                    </div>
                    <input onChange={handleUploadAvatarImage} type='file' id='uploadProfile' className='hidden' />
                </label>

                {/* Set as Profile Button */}
                {imageSelected && (
                    <button
                        onClick={handleSetProfile}
                        className='bg-green-500 text-white px-4 py-1 rounded text-sm my-2 hover:bg-green-600'
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Set as Profile"}
                    </button>
                )}

                {/* Success Message */}
                {successMessage && (
                    <p className="text-green-500 text-sm mt-2">{successMessage}</p>
                )}
            </div>
        </section>
    )
}

export default UserProfileAvatarEdit

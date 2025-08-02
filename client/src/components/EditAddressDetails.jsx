import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5"
import { useGlobalContext } from '../provider/GlobalProvider'
import '../componentcss/EditAddressDetails.css'

const EditAddressDetails = ({ close, data }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            _id: data._id,
            userId: data.userId,
            address_line: data.address_line,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,
            mobile: data.mobile
        }
    })
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (formData) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateAddress,
                data: {
                    ...formData,
                    address_line: formData.address_line,
                    city: formData.city,
                    state: formData.state,
                    country: formData.country,
                    pincode: formData.pincode,
                    mobile: formData.mobile
                }
            })

            const { data: responseData } = response
            
            if (responseData.success) {
                toast.success(responseData.message)
                if (close) {
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <div className="EditAddressDetails-overlay">
            <div className="EditAddressDetails-container">
                <div className="EditAddressDetails-header">
                    <h2 className="EditAddressDetails-title">Edit Address</h2>
                    <button 
                        onClick={close} 
                        className="EditAddressDetails-closeButton"
                        aria-label="Close edit address"
                    >
                        <IoClose size={25} />
                    </button>
                </div>
                <form 
                    className="EditAddressDetails-form" 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="EditAddressDetails-formGrid">
                        <div className="EditAddressDetails-formGroup EditAddressDetails-fullWidth">
                            <label className="EditAddressDetails-label">Address Line</label>
                            <input
                                type="text"
                                className="EditAddressDetails-input"
                                {...register("address_line", { required: true })}
                            />
                        </div>
                        
                        <div className="EditAddressDetails-formGroup">
                            <label className="EditAddressDetails-label">City</label>
                            <input
                                type="text"
                                className="EditAddressDetails-input"
                                {...register("city", { required: true })}
                            />
                        </div>
                        
                        <div className="EditAddressDetails-formGroup">
                            <label className="EditAddressDetails-label">State</label>
                            <input
                                type="text"
                                className="EditAddressDetails-input"
                                {...register("state", { required: true })}
                            />
                        </div>
                        
                        <div className="EditAddressDetails-formGroup">
                            <label className="EditAddressDetails-label">Pincode</label>
                            <input
                                type="text"
                                className="EditAddressDetails-input"
                                {...register("pincode", { required: true })}
                            />
                        </div>
                        
                        <div className="EditAddressDetails-formGroup">
                            <label className="EditAddressDetails-label">Country</label>
                            <input
                                type="text"
                                className="EditAddressDetails-input"
                                {...register("country", { required: true })}
                            />
                        </div>
                        
                        <div className="EditAddressDetails-formGroup">
                            <label className="EditAddressDetails-label">Mobile No.</label>
                            <input
                                type="text"
                                className="EditAddressDetails-input"
                                {...register("mobile", { required: true })}
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="EditAddressDetails-submitButton"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditAddressDetails
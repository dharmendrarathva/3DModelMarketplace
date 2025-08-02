import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5"
import { useGlobalContext } from '../provider/GlobalProvider'
import  '../componentcss/AddAddress.css'

const AddAddress = ({ close }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (data) => {
        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data: {
                    address_line: data.addressline,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    pincode: data.pincode,
                    mobile: data.mobile
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
        <div className="AddAddress-overlay">
            <div className="AddAddress-container">
                <div className="AddAddress-header">
                    <h2 className="AddAddress-title">Add New Address</h2>
                    <button 
                        onClick={close} 
                        className="AddAddress-closeButton"
                        aria-label="Close address form"
                    >
                        <IoClose size={24} />
                    </button>
                </div>
                
                <form className="AddAddress-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="AddAddress-formGroup">
                        <label htmlFor="addressline" className="AddAddress-label">
                            Address Line <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="addressline"
                            className={`AddAddress-input ${errors.addressline ? 'AddAddress-inputError' : ''}`}
                            {...register("addressline", { required: "Address line is required" })}
                        />
                        {errors.addressline && (
                            <p className="AddAddress-errorMessage">{errors.addressline.message}</p>
                        )}
                    </div>

                    <div className="AddAddress-grid">
                        <div className="AddAddress-formGroup">
                            <label htmlFor="city" className="AddAddress-label">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="city"
                                className={`AddAddress-input ${errors.city ? 'AddAddress-inputError' : ''}`}
                                {...register("city", { required: "City is required" })}
                            />
                            {errors.city && (
                                <p className="AddAddress-errorMessage">{errors.city.message}</p>
                            )}
                        </div>

                        <div className="AddAddress-formGroup">
                            <label htmlFor="state" className="AddAddress-label">
                                State <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="state"
                                className={`AddAddress-input ${errors.state ? 'AddAddress-inputError' : ''}`}
                                {...register("state", { required: "State is required" })}
                            />
                            {errors.state && (
                                <p className="AddAddress-errorMessage">{errors.state.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="AddAddress-grid">
                        <div className="AddAddress-formGroup">
                            <label htmlFor="pincode" className="AddAddress-label">
                                Pincode <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="pincode"
                                className={`AddAddress-input ${errors.pincode ? 'AddAddress-inputError' : ''}`}
                                {...register("pincode", { 
                                    required: "Pincode is required",
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Pincode must be numeric"
                                    }
                                })}
                            />
                            {errors.pincode && (
                                <p className="AddAddress-errorMessage">{errors.pincode.message}</p>
                            )}
                        </div>

                        <div className="AddAddress-formGroup">
                            <label htmlFor="mobile" className="AddAddress-label">
                                Mobile No. <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                className={`AddAddress-input ${errors.mobile ? 'AddAddress-inputError' : ''}`}
                                {...register("mobile", { 
                                    required: "Mobile number is required",
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Mobile number must be numeric"
                                    }
                                })}
                            />
                            {errors.mobile && (
                                <p className="AddAddress-errorMessage">{errors.mobile.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="AddAddress-formGroup">
                        <label htmlFor="country" className="AddAddress-label">
                            Country <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="country"
                            className={`AddAddress-input ${errors.country ? 'AddAddress-inputError' : ''}`}
                            {...register("country", { required: "Country is required" })}
                        />
                        {errors.country && (
                            <p className="AddAddress-errorMessage">{errors.country.message}</p>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="AddAddress-submitButton"
                    >
                        Save Address
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddAddress
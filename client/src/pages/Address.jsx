import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete, MdEdit } from "react-icons/md"
import EditAddressDetails from '../components/EditAddressDetails'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useEffect } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import '../pagescss/Address.css'

const Address = () => {
    const addressList = useSelector(state => state.addresses.addressList)
    const [openAddress, setOpenAddress] = useState(false)
    const [OpenEdit, setOpenEdit] = useState(false)
    const [editData, setEditData] = useState({})
    const { fetchAddress } = useGlobalContext()

    const handleDisableAddress = async (id) => {
        try {
            const response = await Axios({
                ...SummaryApi.disableAddress,
                data: {
                    _id: id
                }
            })
            if (response.data.success) {
                toast.success("Address Removed")
                if (fetchAddress) {
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    useEffect(() => {
    if (fetchAddress) {
        fetchAddress()
    }
}, [])


    return (
        <div className="Address-container">
            <div className="Address-header">
                <h2 className="Address-title">Address</h2>
                <button 
                    onClick={() => setOpenAddress(true)} 
                    className="Address-addButton"
                >
                    Add Address
                </button>
            </div>
            
            <div className="Address-list">
                {addressList.map((address, index) => (
                    !address.status ? null : (
                        <div key={index} className="Address-card">
                            <div className="Address-details">
                                <p>{address.address_line}</p>
                                <p>{address.city}, {address.state}</p>
                                <p>{address.country} - {address.pincode}</p>
                                <p>Phone: {address.mobile}</p>
                            </div>
                            <div className="Address-actions">
                                <button 
                                    onClick={() => {
                                        setOpenEdit(true)
                                        setEditData(address)
                                    }} 
                                    className="Address-editButton"
                                    aria-label="Edit address"
                                >
                                    <MdEdit size={20} />
                                </button>
                                <button 
                                    onClick={() => handleDisableAddress(address._id)}
                                    className="Address-deleteButton"
                                    aria-label="Delete address"
                                >
                                    <MdDelete size={20} />  
                                </button>
                            </div>
                        </div>
                    )
                ))}
                
                <div 
                    onClick={() => setOpenAddress(true)} 
                    className="Address-addNewCard"
                >
                    Add New Address
                </div>
            </div>

            {openAddress && (
                <AddAddress close={() => setOpenAddress(false)} />
            )}

            {OpenEdit && (
                <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
            )}
        </div>
    )
}

export default Address
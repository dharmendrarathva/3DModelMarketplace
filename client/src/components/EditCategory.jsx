import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import '../componentcss/EditCategory.css';

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
    const [data, setData] = useState({
        _id: CategoryData._id,
        name: CategoryData.name,
        image: CategoryData.image
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => ({
            ...preve,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data: data
            });
            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        setLoading(true);
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        setLoading(false);
        
        setData((preve) => ({
            ...preve,
            image: ImageResponse.data.url
        }));
    };

    return (
        <section className="EditCategory-modal">
            <div className="EditCategory-container">
                <div className="EditCategory-header">
                    <h1 className="EditCategory-title">Update Category</h1>
                    <button onClick={close} className="EditCategory-close-btn" aria-label="Close">
                        <IoClose size={32} />
                    </button>
                </div>
                <form className="EditCategory-form" onSubmit={handleSubmit}>
                    <div className="EditCategory-formGroup">
                        <label htmlFor="categoryName">Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder="Enter category name"
                            value={data.name}
                            name="name"
                            onChange={handleOnChange}
                            className="EditCategory-formInput"
                        />
                    </div>
                    <div className="EditCategory-formGroup">
                        <p>Image</p>
                        <div className="EditCategory-imageUploadContainer">
                            <div className="EditCategory-imagePreview">
                                {data.image ? (
                                    <img
                                        alt="category"
                                        src={data.image}
                                        className="EditCategory-previewImage"
                                    />
                                ) : (
                                    <p className="EditCategory-noImageText">No Image</p>
                                )}
                            </div>
                            <label htmlFor="uploadCategoryImage">
                                <div className={`EditCategory-uploadBtn ${!data.name ? "EditCategory-disabled" : ""}`}>
                                    {loading ? "Loading..." : "Upload Image"}
                                </div>
                                <input 
                                    disabled={!data.name} 
                                    onChange={handleUploadCategoryImage} 
                                    type="file" 
                                    id="uploadCategoryImage" 
                                    className="EditCategory-hiddenInput"
                                />
                            </label>
                        </div>
                    </div>
                    <button
                        className={`EditCategory-submitBtn ${data.name && data.image ? "EditCategory-active" : "EditCategory-disabled"}`}
                        disabled={!data.name || !data.image}
                    >
                        Update Category
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditCategory;
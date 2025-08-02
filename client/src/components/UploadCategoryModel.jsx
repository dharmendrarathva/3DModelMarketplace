import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import '../componentcss/UploadCategoryModel.css';

const UploadCategoryModel = ({ close, fetchData }) => {
    const [data, setData] = useState({ name: "", image: "" });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({ ...SummaryApi.addCategory, data });
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
        setData(prev => ({ ...prev, image: ImageResponse.data.url }));
    };

    return (
        <section className="UploadCategoryModel-overlay">
            <div className="UploadCategoryModel-container">
                <div className="UploadCategoryModel-header">
                    <h1 className="UploadCategoryModel-title">Category</h1>
                    <button onClick={close} className="UploadCategoryModel-closeButton">
                        <IoClose size={25} />
                    </button>
                </div>
                <form className="UploadCategoryModel-form" onSubmit={handleSubmit}>
                    <div className="UploadCategoryModel-formGroup">
                        <label htmlFor="categoryName">Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder="Enter category name"
                            value={data.name}
                            name="name"
                            onChange={handleOnChange}
                            className="UploadCategoryModel-input"
                        />
                    </div>
                    <div className="UploadCategoryModel-formGroup">
                        <p className="UploadCategoryModel-imageLabel">Image</p>
                        <div className="UploadCategoryModel-imageUploadContainer">
                            <div className="UploadCategoryModel-imagePreview">
                                {data.image ? (
                                    <img 
                                        alt="category" 
                                        src={data.image} 
                                        className="UploadCategoryModel-previewImage" 
                                    />
                                ) : (
                                    <p className="UploadCategoryModel-noImageText">No Image</p>
                                )}
                            </div>
                            <label htmlFor="uploadCategoryImage">
                                <div className={`UploadCategoryModel-uploadButton ${!data.name ? "UploadCategoryModel-disabled" : ""}`}>
                                    {loading ? "Uploading..." : "Upload Image"}
                                </div>
                                <input 
                                    disabled={!data.name || loading} 
                                    onChange={handleUploadCategoryImage} 
                                    type="file" 
                                    id="uploadCategoryImage" 
                                    className="UploadCategoryModel-fileInput" 
                                />
                            </label>
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className={`UploadCategoryModel-submitButton ${data.name && data.image ? "UploadCategoryModel-active" : "UploadCategoryModel-disabled"}`}
                        disabled={!data.name || !data.image || loading}
                    >
                        {loading ? "Processing..." : "Add Category"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UploadCategoryModel;
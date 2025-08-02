import React, { useEffect, useState } from 'react';
import UploadCategoryModel from '../components/UploadCategoryModel';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import EditCategory from '../components/EditCategory';
import CofirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { Plus } from "lucide-react";
import { FaEdit } from 'react-icons/fa';
import { FaTrashAlt } from "react-icons/fa";
import '../pagescss/CategoryPage.css'; // Assuming you have a CSS file for styling

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({ name: "", image: "" });
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({ _id: "" });

    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await Axios({ ...SummaryApi.getCategory });
            const { data: responseData } = response;
            if (responseData.success) {
                setCategoryData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                fetchCategory();
                setOpenConfirmBoxDelete(false);
                setDeleteCategory({ _id: "" });
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="CategoryPage-page">
            {/* Header Section */}
            <div className="CategoryPage-header">
                <h2>Categories</h2>
                <button
                    onClick={() => setOpenUploadCategory(true)}
                    className="CategoryPage-add-category-btn"
                >
                    <Plus className="CategoryPage-icon" />
                    Add Category
                </button>
            </div>

            {loading ? (
                <Loading />
            ) : categoryData.length === 0 ? (
                <NoData />
            ) : (
                <div className="CategoryPage-grid">
                    {categoryData.map((category) => (
                        <div
                            key={category._id}
                            className="CategoryPage-card"
                        >
                            <img
                                alt={category.name}
                                src={category.image}
                                className="CategoryPage-image"
                            />
                            <p className="CategoryPage-name">{category.name}</p>
                            <div className="CategoryPage-actions">
                                <button
                                    onClick={() => {
                                        setOpenEdit(true);
                                        setEditData(category);
                                    }}
                                    className="CategoryPage-edit-btn"
                                >
                                    <FaEdit className="CategoryPage-action-icon" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setOpenConfirmBoxDelete(true);
                                        setDeleteCategory(category);
                                    }}
                                    className="CategoryPage-delete-btn"
                                >
                                    <FaTrashAlt className="CategoryPage-action-icon" />
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {openUploadCategory && (
                <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
            )}

            {openEdit && (
                <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
            )}

            {openConfirmBoxDelete && (
                <CofirmBox close={() => setOpenConfirmBoxDelete(false)} cancel={() => setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory} />
            )}
        </section>
    );
};

export default CategoryPage;
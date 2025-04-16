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
import { FaEdit } from 'react-icons/fa';  // Importing FaEdit icon
import { FaTrashAlt } from "react-icons/fa";


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
        <section className="p-4 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="bg-white shadow-lg p-4 flex items-center justify-between rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                <button
                    onClick={() => setOpenUploadCategory(true)}
                    className="flex items-center gap-2 text-white font-bold bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 px-6 py-3 rounded-lg text-sm shadow-md hover:shadow-lg active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Category
                </button>
            </div>

            {loading ? (
                <Loading />
            ) : categoryData.length === 0 ? (
                <NoData />
            ) : (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-3 gap-4">
                    {categoryData.map((category) => (
                        <div
                            key={category._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-6 hover:shadow-xl transition-shadow duration-300 w-[280px] h-[270px]"    >
                            <img
                                alt={category.name}
                                src={category.image}
                                className="w-full h-32 object-contain mb-4"
                            />
                            <p className="text-center font-medium mt-2 text-gray-700">{category.name}</p>
                            <div className="flex gap-4 w-full mt-4">
                                <button
                                    onClick={() => {
                                        setOpenEdit(true);
                                        setEditData(category);
                                    }}
                                    className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <FaEdit size={16} className="mr-2" />
                                    <span className="font-semibold text-sm">Edit</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setOpenConfirmBoxDelete(true);
                                        setDeleteCategory(category);
                                    }}
                                    className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <FaTrashAlt size={16} className="mr-2" />
                                    <span className="font-semibold text-sm">Remove</span>
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

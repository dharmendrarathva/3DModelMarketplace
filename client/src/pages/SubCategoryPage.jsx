import React, { useEffect, useState } from 'react';
import UploadSubCategoryModel from '../components/UploadSubCategoryModel';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import EditSubCategory from '../components/EditSubCategory';
import CofirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { Plus } from "lucide-react";
import { FaEdit } from 'react-icons/fa';  // Importing FaEdit icon
import { FaTrashAlt } from "react-icons/fa";

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ _id: "" });
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);
  const [deleteSubCategory, setDeleteSubCategory] = useState({ _id: "" });

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getSubCategory });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenDeleteConfirmBox(false);
        setDeleteSubCategory({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="p-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-white shadow-lg p-4 flex items-center justify-between rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">Sub Categories</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="flex items-center gap-2 text-white font-bold bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 px-6 py-3 rounded-lg text-sm shadow-md hover:shadow-lg active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Sub Category
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : data.length === 0 ? (
        <NoData />
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
        {data.map((subCategory) => (
          <div
            key={subCategory._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-6 hover:shadow-xl transition-shadow duration-300 w-[280px] h-[270px]"    >
            <img
              alt={subCategory.name}
              src={subCategory.image}
              className="w-full h-32 object-contain mb-4"  // Reduced image height
            />
            <p className="text-center font-medium mt-2 text-gray-700">{subCategory.name}</p>
            <div className="flex gap-4 w-full mt-4">
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(subCategory);
                }}
                className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <FaEdit size={16} className="mr-2" />
                <span className="font-semibold text-sm">Edit</span>
              </button>
              <button
                onClick={() => {
                  setOpenDeleteConfirmBox(true);
                  setDeleteSubCategory(subCategory);
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

      {openAddSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenAddSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {openDeleteConfirmBox && (
        <CofirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;

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
import { FaEdit } from 'react-icons/fa';
import { FaTrashAlt } from "react-icons/fa";
import '../pagescss/SubCategoryPage.css';

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
    <section className="SubCategoryPage-page">
      {/* Header Section */}
      <div className="SubCategoryPage-header">
        <h2>Sub Categories</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="SubCategoryPage-add-sub-category-btn"
        >
          <Plus className="SubCategoryPage-icon" />
          Add Sub Category
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : data.length === 0 ? (
        <NoData />
      ) : (
        <div className="SubCategoryPage-grid">
          {data.map((subCategory) => (
            <div
              key={subCategory._id}
              className="SubCategoryPage-card"
            >
              <div className="SubCategoryPage-image-container">
                <img
                  alt={subCategory.name}
                  src={subCategory.image}
                  className="SubCategoryPage-image"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.png';
                  }}
                />
              </div>
              <div className="SubCategoryPage-content">
                <p className="SubCategoryPage-name">{subCategory.name}</p>
                <div className="SubCategoryPage-actions">
                  <button
                    onClick={() => {
                      setOpenEdit(true);
                      setEditData(subCategory);
                    }}
                    className="SubCategoryPage-edit-btn"
                  >
                    <FaEdit className="SubCategoryPage-action-icon" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      setOpenDeleteConfirmBox(true);
                      setDeleteSubCategory(subCategory);
                    }}
                    className="SubCategoryPage-delete-btn"
                  >
                    <FaTrashAlt className="SubCategoryPage-action-icon" />
                    <span>Remove</span>
                  </button>
                </div>
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
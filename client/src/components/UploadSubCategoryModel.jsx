import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import '../componentcss/UploadSubCategoryModel.css';

const UploadSubCategoryModel = ({ close, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: '',
    image: '',
    category: []
  });

  const allCategory = useSelector(state => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file);
      setSubCategoryData(prev => ({
        ...prev,
        image: response.data.data.url
      }));
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleRemoveCategorySelected = (categoryId) => {
    setSubCategoryData(prev => ({
      ...prev,
      category: prev.category.filter(cat => cat._id !== categoryId)
    }));
  };

  const handleAddCategory = (e) => {
    const categoryId = e.target.value;
    if (!categoryId) return;

    const categoryDetails = allCategory.find(cat => cat._id === categoryId);
    if (!categoryDetails) return;

    setSubCategoryData(prev => ({
      ...prev,
      category: [...prev.category, categoryDetails]
    }));
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();

    if (!subCategoryData.name || !subCategoryData.image || subCategoryData.category.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData
      });

      if (response.data.success) {
        toast.success(response.data.message);
        if (close) close();
        if (fetchData) fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const isFormValid = subCategoryData.name && 
                     subCategoryData.image && 
                     subCategoryData.category.length > 0;

  return (
    <div className="UploadSubCategoryModel-overlay">
      <div className="UploadSubCategoryModel-container">
        <div className="UploadSubCategoryModel-header">
          <h1 className="UploadSubCategoryModel-title">Add Sub Category</h1>
          <button className="UploadSubCategoryModel-closeButton" onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        <form className="UploadSubCategoryModel-form" onSubmit={handleSubmitSubCategory}>
          <div className="UploadSubCategoryModel-formGroup">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              className="UploadSubCategoryModel-input"
              required
            />
          </div>

          <div className="UploadSubCategoryModel-formGroup">
            <p className="UploadSubCategoryModel-imageLabel">Image</p>
            <div className="UploadSubCategoryModel-imageContainer">
              <div className="UploadSubCategoryModel-imagePreview">
                {subCategoryData.image ? (
                  <img
                    alt="subCategory"
                    src={subCategoryData.image}
                    className="UploadSubCategoryModel-previewImage"
                  />
                ) : (
                  <p className="UploadSubCategoryModel-placeholderText">No Image</p>
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div className="UploadSubCategoryModel-uploadButton">
                  Upload Image
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="UploadSubCategoryModel-fileInput"
                  onChange={handleUploadSubCategoryImage}
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <div className="UploadSubCategoryModel-formGroup">
            <label className="UploadSubCategoryModel-categoryLabel">Select Category</label>
            <div className="UploadSubCategoryModel-categorySelector">
              <div className="UploadSubCategoryModel-selectedCategories">
                {subCategoryData.category.map((cat) => (
                  <div key={cat._id} className="UploadSubCategoryModel-categoryTag">
                    {cat.name}
                    <span 
                      className="UploadSubCategoryModel-removeCategory"
                      onClick={() => handleRemoveCategorySelected(cat._id)}
                    >
                      <IoClose size={20} />
                    </span>
                  </div>
                ))}
              </div>
              <select
                className="UploadSubCategoryModel-selectInput"
                onChange={handleAddCategory}
                value=""
              >
                <option value="">Select Category</option>
                {allCategory.map((category) => (
                  <option 
                    value={category._id} 
                    key={category._id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={`UploadSubCategoryModel-submitButton ${
              isFormValid ? 'UploadSubCategoryModel-enabled' : 'UploadSubCategoryModel-disabled'
            }`}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadSubCategoryModel;
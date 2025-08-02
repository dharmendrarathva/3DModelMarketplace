// import React, { useState } from 'react'
// import { IoClose } from "react-icons/io5";
// import uploadImage from '../utils/UploadImage';
// import { useSelector } from 'react-redux';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import toast from 'react-hot-toast';
// import AxiosToastError from '../utils/AxiosToastError';
// import '../componentcss/EditSubCategory.css'

// const EditSubCategory = ({ close, data, fetchData }) => {
//   const [subCategoryData, setSubCategoryData] = useState({
//     _id: data._id,
//     name: data.name,
//     image: data.image,
//     category: data.category || []
//   });

//   const allCategory = useSelector(state => state.product.allCategory);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSubCategoryData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleUploadSubCategoryImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const { data: ImageResponse } = await uploadImage(file);
//     setSubCategoryData(prev => ({ ...prev, image: ImageResponse.data.url }));
//   };

//   const handleRemoveCategorySelected = (categoryId) => {
//     const updatedCategory = subCategoryData.category.filter(el => el._id !== categoryId);
//     setSubCategoryData(prev => ({ ...prev, category: updatedCategory }));
//   };

//   const handleSubmitSubCategory = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await Axios({
//         ...SummaryApi.updateSubCategory,
//         data: subCategoryData
//       });
//       const { data: responseData } = response;
//       if (responseData.success) {
//         toast.success(responseData.message);
//         close?.();
//         fetchData?.();
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   return (
//     <section className='EditSubCategory-overlay'>
//       <div className='EditSubCategory-container'>
//         <div className='EditSubCategory-header'>
//           <h1 className='EditSubCategory-title'>Edit Sub Category</h1>
//           <button onClick={close} className='EditSubCategory-closeButton'>
//             <IoClose size={25} />
//           </button>
//         </div>

//         <form className='EditSubCategory-form' onSubmit={handleSubmitSubCategory}>
//           <div className='EditSubCategory-formGroup'>
//             <label htmlFor='name'>Name</label>
//             <input 
//               id='name'
//               name='name'
//               value={subCategoryData.name}
//               onChange={handleChange}
//               className='EditSubCategory-input'
//             />
//           </div>

//           <div className='EditSubCategory-formGroup'>
//             <p>Image</p>
//             <div className='EditSubCategory-imageUploadWrapper'>
//               <div className='EditSubCategory-imagePreview'>
//                 {
//                   !subCategoryData.image ? (
//                     <p className='EditSubCategory-placeholderText'>No Image</p>
//                   ) : (
//                     <img src={subCategoryData.image} alt='subCategory' className='EditSubCategory-uploadedImage' />
//                   )
//                 }
//               </div>
//               <label htmlFor='uploadSubCategoryImage' className='EditSubCategory-uploadButton'>
//                 Upload Image
//                 <input 
//                   type='file'
//                   id='uploadSubCategoryImage'
//                   className='EditSubCategory-fileInput'
//                   onChange={handleUploadSubCategoryImage}
//                 />
//               </label>
//             </div>
//           </div>

//           <div className='EditSubCategory-formGroup'>
//             <label>Select Category</label>
//             <div className='EditSubCategory-categoryWrapper'>
//               <div className='EditSubCategory-selectedCategories'>
//                 {
//                   subCategoryData.category.map((cat) => (
//                     <p key={cat._id} className='EditSubCategory-categoryTag'>
//                       {cat.name}
//                       <IoClose size={20} onClick={() => handleRemoveCategorySelected(cat._id)} className='EditSubCategory-removeIcon' />
//                     </p>
//                   ))
//                 }
//               </div>
//               <select
//                 className='EditSubCategory-input'
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   const categoryDetails = allCategory.find(el => el._id === value);
//                   if (categoryDetails) {
//                     setSubCategoryData(prev => ({
//                       ...prev,
//                       category: [...prev.category, categoryDetails]
//                     }));
//                   }
//                 }}
//               >
//                 <option value={""}>Select Category</option>
//                 {
//                   allCategory.map(category => (
//                     <option value={category._id} key={category._id}>{category.name}</option>
//                   ))
//                 }
//               </select>
//             </div>
//           </div>

//           <button
//             type='submit'
//             className={`EditSubCategory-submitButton ${subCategoryData.name && subCategoryData.image && subCategoryData.category.length ? 'EditSubCategory-active' : 'EditSubCategory-inactive'}`}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </section>
//   )
// }

// export default EditSubCategory;


import React, { useState } from 'react'
import { IoClose, IoChevronForward } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import '../componentcss/EditSubCategory.css'

const EditSubCategory = ({ close, data, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category || []
  });

  const allCategory = useSelector(state => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const { data: ImageResponse } = await uploadImage(file);
    setSubCategoryData(prev => ({ ...prev, image: ImageResponse.data.url }));
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const updatedCategory = subCategoryData.category.filter(el => el._id !== categoryId);
    setSubCategoryData(prev => ({ ...prev, category: updatedCategory }));
  };

  const handleAddCategory = (e) => {
    const value = e.target.value;
    if (!value) return;
    
    const categoryDetails = allCategory.find(el => el._id === value);
    
    // Check if category already exists
    const isCategoryExists = subCategoryData.category.some(cat => cat._id === value);
    
    if (categoryDetails && !isCategoryExists) {
      setSubCategoryData(prev => ({
        ...prev,
        category: [...prev.category, categoryDetails]
      }));
    }
    
    // Reset select to default option
    e.target.value = "";
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subCategoryData
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        close?.();
        fetchData?.();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className='EditSubCategory-overlay'>
      <div className='EditSubCategory-container'>
        <div className='EditSubCategory-header'>
          <h1 className='EditSubCategory-title'>Edit Sub Category</h1>
          <button onClick={close} className='EditSubCategory-closeButton'>
            <IoClose size={25} />
          </button>
        </div>

        <form className='EditSubCategory-form' onSubmit={handleSubmitSubCategory}>
          <div className='EditSubCategory-formGroup'>
            <label htmlFor='name'>Name</label>
            <input 
              id='name'
              name='name'
              value={subCategoryData.name}
              onChange={handleChange}
              className='EditSubCategory-input'
            />
          </div>

          <div className='EditSubCategory-formGroup'>
            <p>Image</p>
            <div className='EditSubCategory-imageUploadWrapper'>
              <div className='EditSubCategory-imagePreview'>
                {
                  !subCategoryData.image ? (
                    <p className='EditSubCategory-placeholderText'>No Image</p>
                  ) : (
                    <img src={subCategoryData.image} alt='subCategory' className='EditSubCategory-uploadedImage' />
                  )
                }
              </div>
              <label htmlFor='uploadSubCategoryImage' className='EditSubCategory-uploadButton'>
                Upload Image
                <input 
                  type='file'
                  id='uploadSubCategoryImage'
                  className='EditSubCategory-fileInput'
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>

          <div className='EditSubCategory-formGroup'>
            <label>Select Category</label>
            <div className='EditSubCategory-categoryWrapper'>
              <div className='EditSubCategory-selectedCategories'>
                {
                  subCategoryData.category.map((cat) => (
                    <p key={cat._id} className='EditSubCategory-categoryTag'>
                      <IoChevronForward size={16} className='EditSubCategory-arrowIcon' />
                      {cat.name}
                      <IoClose 
                        size={20} 
                        onClick={() => handleRemoveCategorySelected(cat._id)} 
                        className='EditSubCategory-removeIcon' 
                      />
                    </p>
                  ))
                }
              </div>
              <select
                className='EditSubCategory-input'
                onChange={handleAddCategory}
              >
                <option value={""}>Select Category</option>
                {
                  allCategory
                    .filter(cat => !subCategoryData.category.some(selectedCat => selectedCat._id === cat._id))
                    .map(category => (
                      <option value={category._id} key={category._id}>{category.name}</option>
                    ))
                }
              </select>
            </div>
          </div>

          <button
            type='submit'
            className={`EditSubCategory-submitButton ${subCategoryData.name && subCategoryData.image && subCategoryData.category.length ? 'EditSubCategory-active' : 'EditSubCategory-inactive'}`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}

export default EditSubCategory;
// import React, { useState,useRef } from 'react'
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from '../utils/UploadImage';
// import uploadZip from '../utils/UploadZip';
// import Loading from '../components/Loading';
// import ViewImage from '../components/ViewImage';
// import { MdDelete } from "react-icons/md";
// import { useSelector } from 'react-redux'
// import { IoClose } from "react-icons/io5";
// import AddFieldComponent from '../components/AddFieldComponent';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import successAlert from '../utils/SuccessAlert';
// import { useEffect } from 'react';
// import { IoCheckmarkCircle } from 'react-icons/io5';
// import { FaExclamationCircle } from 'react-icons/fa';
// import '../pagescss/Seller3DModelPage.css';
// import { TbArrowsMaximize } from "react-icons/tb";



// const Seller3DModelPage = () => {
//   const [data, setData] = useState({
//     name: "",
//     image: [],
//     category: [],
//     subCategory: [],
//     unit: "",
//     extension: "",
//     price: "",
//     discount: "",
//     description: "",
//     more_details: {},
//     zipFile: ""
//   })

//   const [zipLoading, setZipLoading] = useState(false);
//   const [imageLoading, setImageLoading] = useState(false)
//   const [ViewImageURL, setViewImageURL] = useState("")
//   const allCategory = useSelector(state => state.product.allCategory)
//   const [selectCategory, setSelectCategory] = useState("")
//   const [selectSubCategory, setSelectSubCategory] = useState("")
//   const allSubCategory = useSelector(state => state.product.allSubCategory)
//   const [error, setError] = useState('');
//   const [discountError, setDiscountError] = useState('');

//   const [openAddField, setOpenAddField] = useState(false)
//   const [fieldName, setFieldName] = useState("")

//   const [activeGuide, setActiveGuide] = useState(null);

//   const fileExtensions = ['jpg', 'png', 'pdf', 'docx', 'xlsx', 'mp4', 'mp3', 'zip'];
//   const scrollContainerRef = useRef(null);
//   const cardRefs = useRef({});


//   const handleDeleteImage = async (index) => {
//     data.image.splice(index, 1)
//     setData((preve) => {
//       return {
//         ...preve
//       }
//     })
//   }

//   const handleUploadImage = async (e) => {
//     const file = e.target.files[0]

//     if (!file) {
//       return
//     }
//     setImageLoading(true)
//     const response = await uploadImage(file)
//     const { data: ImageResponse } = response
//     const imageUrl = ImageResponse.data.url

//     setData((preve) => {
//       return {
//         ...preve,
//         image: [...preve.image, imageUrl]
//       }
//     })
//     setImageLoading(false)

//   }

//   const handleUploadZip = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setZipLoading(true);
//     const response = await uploadZip(file);
//     const { data: zipResponse } = response;
//     const zipUrl = zipResponse.data.url;

//     setData((prev) => ({
//       ...prev,
//       zipFile: zipUrl,
//     }));

//     setZipLoading(false);
//   };
//   const handleDownload = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     try {
//       if (data.zipFile) {
//         // Modify the URL to force download
//         const downloadURL = data.zipFile.replace("/raw/", "/image/upload/fl_attachment/");

//         const link = document.createElement("a");
//         link.href = downloadURL;
//         link.download = data.name + ".zip"; // Set file name
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         toast.success("Download started!");
//       } else {
//         toast.error("No file available for download");
//       }
//     } catch (error) {
//       toast.error("Failed to download file");
//     }
//   };


//   const handleDeleteZip = () => {
//     setData((prev) => ({
//       ...prev,
//       zipFile: "", // Reset the ZIP file URL
//     }));
//     setTimeout(() => {
//       navigate(0);
//     }, 500);
//   };

//   const handleRemoveCategory = async (index) => {
//     data.category.splice(index, 1)
//     setData((preve) => {
//       return {
//         ...preve
//       }
//     })
//   }
//   const handleRemoveSubCategory = async (index) => {
//     data.subCategory.splice(index, 1)
//     setData((preve) => {
//       return {
//         ...preve
//       }
//     })
//   }

//   const handleAddField = () => {
//     setData((preve) => {
//       return {
//         ...preve,
//         more_details: {
//           ...preve.more_details,
//           [fieldName]: ""
//         }
//       }
//     })
//     setFieldName("")
//     setOpenAddField(false)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log("data", data)

//     try {
//       const response = await Axios({
//         ...SummaryApi.createProduct,
//         data: data
//       })
//       const { data: responseData } = response

//       if (responseData.success) {
//         successAlert(responseData.message)
//         setData({
//           name: "",
//           image: [],
//           category: [],
//           subCategory: [],
//           extension: "",
//           // stock: "",
//           price: "",
//           discount: "",
//           description: "",
//           more_details: {},
//           zipFile: ""
//         })

//       }
//     } catch (error) {
//       AxiosToastError(error)
//     }


//   }
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const scrollToSection = (id) => {
//     setActiveGuide(id === activeGuide ? null : id);
//     const targetCard = cardRefs.current[id];
//     if (targetCard) {
//       targetCard.scrollIntoView({
//         behavior: 'smooth',
//         inline: 'center',
//         block: 'nearest'
//       });
//     }
//   };
//   const guideCards = [
//     { 
//       id: 'name',
//       title: 'Name',
//       description: 'Enter the product’s name to help users easily identify it. Make it clear, concise, and relevant to the model.',
//       color: 'bg-purple-500',
//       icon: '📝'
//     },
//     {
//       id: 'description',
//       title: 'Description',
//       description: 'Highlight your product’s features and purpose with targeted keywords to boost search visibility and attract more customers.',
//       color: 'bg-blue-500',
//       icon: '📄'
//     },
//     {
//       id: 'image',
//       title: 'Image',
//       description: 'Upload a high-quality preview image for your 3D model. While all sizes are accepted, we recommend a 1920×1080 resolution for the best View.',
//       color: 'bg-green-500',
//       icon: '🖼️'
//     },
//     {
//       id: 'model',
//       title: '3D Model',
//       description: 'Attach a ZIP file containing your 3D model and its associated texture files. Ensure they are properly linked and formatted.',
//       color: 'bg-yellow-500',
//       icon: '📦'
//     },
//     {
//       id: 'category',
//       title: 'Category',
//       description: 'Choose the main category that accurately classifies the product.',
//       color: 'bg-red-500',
//       icon: '📂'
//     },
//     {
//       id: 'subcategory',
//       title: 'Sub Category',
//       description: 'Select the appropriate sub-category to better organize and filter the product.',
//       color: 'bg-indigo-500',
//       icon: '🗂️'
//     },
//     {
//       id: 'price',
//       title: 'Price',
//       description: 'Set the price.Use 0 if it’s free. Try to make an affordable price based on your efforts and results, For frequently selling Growth.',
//       color: 'bg-pink-500',
//       icon: '💰'
//     },
//     {
//       id: 'discount',
//       title: 'Discount',
//       description: 'Optionally apply a discount percentage to promote your product.',
//       color: 'bg-orange-500',
//       icon: '🏷️'
//     },
//     {
//       id: 'add-field-button',
//       title: 'Add Field',
//       description: 'Click this button to add custom fields for any additional model attributes.',
//       color: 'bg-blue-500',
//       icon: '✚'
//     },
//     ,
//     {
//       id: 'submit',
//       title: 'Thanks for Uploading',
//       description: 'After submission, your model is live. Thanks for uploading! 🌟 Ready to share more of your creations? Keep them coming and grow your sales!"',
//       color: 'bg-blue-500',
//       icon: '😊'
//     }
//   ];
  
  



//   return (
//     <section className='relative'>
     
//       <div className="product-upload-form-container">
//   <form className="product-upload-form">
//     <div className="form-field-group">
//       <label htmlFor="name-input" className="form-label">
//         <span className="label-text">Name</span>
//         <span className="required-badge">Required</span>
//       </label>
//       <input
//         id="name-input"
//         type="text"
//         placeholder="Enter product name"
//         name="name"
//         value={data.name}
//         onChange={handleChange}
//         className={`form-input ${activeGuide === 'name' ? 'active-input' : ''}`}
//       />
//     </div>


//           {/* Description Field */}
//       <div className="description-field-group" id="description">
//   <label htmlFor="description-input" className="description-label">
//     <span className="label-text">Description</span>
//     <span className="required-badge blue-badge">Required</span>
//   </label>
//   <textarea
//     id="description-input"
//     placeholder="Enter product description"
//     name="description"
//     value={data.description}
//     onChange={handleChange}
//     rows={4}
//     className={`description-input ${activeGuide === 'description' ? 'active-description' : ''}`}
//   />
// </div>

//       <div className="image-upload-section" id="image">
//   <div className="image-upload-header">
//     <span className="image-upload-label">Image</span>
//     <span className="required-badge green-badge">Required</span>
//   </div>

//   <div className="image-upload-container">
//     <label htmlFor="productImage" className="image-upload-dropzone">
//       {imageLoading ? (
//         <div className="loading-spinner">
//           {/* Replace this with your actual loading spinner component */}
//           <svg className="animate-spin h-8 w-8 text-green-500" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//         </div>
//       ) : (
//         <>
//           <div className="upload-icon">🖼️</div>
//           <p className="upload-primary-text">Upload Product Images</p>
//           <p className="upload-secondary-text">Drag & drop or click to browse</p>
//         </>
//       )}
//       <input
//         type="file"
//         id="productImage"
//         className="image-upload-input"
//         accept="image/*"
//         multiple
//         onChange={handleUploadImage}
//       />
//     </label>

//     {/* Uploaded images preview */}
//     {data.image.length > 0 && (
//       <div className="image-preview-grid">
//         {data.image.map((img, index) => (
//           <div key={`${img}-${index}`} className="image-preview-item">
//             <img
//               src={img}
//               alt={`Preview ${index + 1}`}
//               className="image-thumbnail"
//               onClick={() => setViewImageURL(img)}
//             />
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleDeleteImage(index);
//               }}
//               className="image-delete-button"
//               aria-label="Delete image"
//             >
//               <MdDelete className="delete-icon" />
//             </button>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// </div>

//           <div id="model">
//           <label className="font-medium flex items-center mb-2">
//               <span className="mr-2">3D Model</span>
//               <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Required</span>
//             </label>
//             <div>
//             <label
//     htmlFor="product3dmodel"
//     className={`bg-yellow-50 h-48 w-full border-2 border-dashed border-yellow-300 rounded-lg flex justify-center items-center text-center cursor-pointer transition-all duration-200 hover:bg-yellow-100
//       ${activeGuide === 'model' ? 'ring-2 ring-yellow-500' : ''}
//       ${zipLoading || data.zipFile ? 'opacity-50 cursor-not-allowed' : ''}
//     `}
//   >
//     <div className="flex flex-col items-center justify-center">
//       {zipLoading ? (
//         <Loading />
//       ) : (
//         <>
//           <div className="text-yellow-500 mb-2 text-5xl">📦</div>
//           <p className="text-gray-800 font-semibold mb-1">Upload 3D Model ZIP</p>
//           <p className="text-sm text-gray-500">Click to browse files</p>
//         </>
//       )}
//     </div>

//     <input
//       type="file"
//       id="product3dmodel"
//       className="hidden"
//       accept=".zip"
//       onChange={handleUploadZip}
//       disabled={!!data.zipFile}
//     />
//   </label>

//               {/* Show uploaded ZIP file */}
//               {data.zipFile && (
//                 <div className='mt-2 flex items-center justify-between bg-gray-100 p-2 rounded'>
//                   <a href={data.zipFile} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
//                     ZIP Attached
//                   </a>
//                   <button onClick={handleDeleteZip} className='text-red-500 hover:text-red-700'>
//                     <MdDelete size={20} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="grid gap-2" id="category">
//             <label htmlFor="category-input" className="font-medium flex items-center">
//               <span className="mr-2">Category</span>
//               <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Required</span>
//             </label>
//             <div>
//               <select
//                              id="category-input"
//                              className={`bg-blue-100 p-3 outline-none border border-gray-300 focus:border-red-500 rounded-lg transition-all duration-200 ${activeGuide === 'category' ? 'ring-2 ring-red-500' : ''}`}
               
//                 value={selectCategory}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   const category = allCategory.find(el => el._id === value);

//                   // Check if already exists
//                   if (category && !data.category.some(c => c._id === category._id)) {
//                     setData(prev => ({
//                       ...prev,
//                       category: [...prev.category, category]
//                     }));
//                   }

//                   setSelectCategory("");
//                 }}
//               >
//                 <option value={""} className='text-neutral-600'>Select Category</option>
//                 {
//                   allCategory.map((c) => {
//                     const isSelected = data.category.some(cat => cat._id === c._id); // Check if category is selected
//                     return (
//                       <option key={c._id} value={c._id}>
//                         {c.name} {isSelected && <span className="text-green-500 ml-2">✔</span>}
//                       </option>
//                     );
//                   })
//                 }
//               </select>
//               <div className='flex flex-wrap gap-3'>
//                 {
//                   data.category.map((c, index) => {
//                     return (
//                       <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//                         <p>{c.name}</p>
//                         <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveCategory(index)}>
//                           <IoClose size={20} />
//                         </div>
//                       </div>
//                     )
//                   })
//                 }
//               </div>
//             </div>
//           </div>


//           <div className="grid gap-2" id="subcategory">
//           <label htmlFor="subcategory-input" className="font-medium flex items-center">
//               <span className="mr-2">Sub Category</span>
//               <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Required</span>
//             </label>
//             <div>
//               <select
//                 id="subcategory-input"
//                 className={`bg-blue-100 p-3 outline-none border border-gray-300 focus:border-indigo-500 rounded-lg transition-all duration-200 ${activeGuide === 'subcategory' ? 'ring-2 ring-indigo-500' : ''}`}
               
//                 value={selectSubCategory}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   const subCategory = allSubCategory.find(el => el._id === value);

//                   // Prevent duplicates in selection
//                   if (subCategory && !data.subCategory.some(sc => sc._id === subCategory._id)) {
//                     setData(prev => ({
//                       ...prev,
//                       subCategory: [...prev.subCategory, subCategory]
//                     }));
//                   }

//                   setSelectSubCategory("");
//                 }}
//               >
//                 <option value={""} className='text-neutral-600'>Select Sub Category</option>
//                 {
//                   allSubCategory.map((c) => {
//                     const isSelected = data.subCategory.some(sc => sc._id === c._id); // Check if selected
//                     return (
//                       <option key={c._id} value={c._id}>
//                         {c.name} {isSelected && <span className="text-green-500 ml-2">✔</span>}
//                       </option>
//                     );
//                   })
//                 }
//               </select>
//               <div className='flex flex-wrap gap-3'>
//                 {
//                   data.subCategory.map((c, index) => {
//                     return (
//                       <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//                         <p>{c.name}</p>
//                         <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveSubCategory(index)}>
//                           <IoClose size={20} />
//                         </div>
//                       </div>
//                     )
//                   })
//                 }
//               </div>
//             </div>
//           </div>


//           <div className="grid gap-2" id="extension">
//           <label htmlFor="price-input" className="font-medium flex items-center">
//               <span className="mr-2">Supported Extension</span>
//               <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">Required</span>
//             </label>
//             <select
//               id='extension'
//               name='extension'
//               value={data.extension}
//               onChange={handleChange}
//               required
//               className={`bg-blue-100 p-3 outline-none border border-gray-300 focus:border-orange-500 rounded-lg transition-all duration-200 ${activeGuide === 'extension' ? 'ring-2 ring-orange-500' : ''}`}
//             >
//               <option value="" disabled>Select a model extension</option>
//               <option value=".obj">.obj (Wavefront OBJ)</option>
//               <option value=".fbx">.fbx (Autodesk FBX)</option>
//               <option value=".glb">.glb (Binary glTF)</option>
//               <option value=".gltf">.gltf (GL Transmission Format)</option>
//               <option value=".stl">.stl (Stereolithography)</option>
//               <option value=".blend">.blend (Blender)</option>
//               <option value=".dae">.dae (Collada - Digital Asset Exchange)</option>
//               <option value=".3ds">.3ds (3D Studio)</option>
//               <option value=".max">.max (Autodesk 3ds Max)</option>
//               <option value=".c4d">.c4d (Cinema 4D)</option>
//               <option value=".lwo">.lwo (LightWave Object)</option>
//               <option value=".ply">.ply (Polygon File Format)</option>
//               <option value=".usdz">.usdz (Apple Universal Scene Description - AR format)</option>
//               <option value=".x3d">.x3d (Extensible 3D Graphics)</option>
           
//             </select>
//           </div>


//           <div className="grid gap-2" id="price">
//             <label htmlFor="price-input" className="font-medium flex items-center">
//               <span className="mr-2">Price</span>
//               <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">Required</span>
//             </label>
//             <input
//               id='price'
//               type='number'
//               placeholder='Enter product price'
//               name='price'
//               value={data.price}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (value < 0) {
//                   // Prevent negative value and show the error
//                   setError('Invalid price'); // Assuming you have an error state
//                 } else {
//                   setError(''); // Clear error when value is valid
//                   handleChange(e);
//                 }
//               }}
//               required
//               className={`bg-blue-100 p-3 outline-none border border-gray-300 focus:border-pink-500 rounded-lg transition-all duration-200 ${activeGuide === 'price' ? 'ring-2 ring-pink-500' : ''}`}
          
//             />
//             {error && <p className="text-red-500 text-sm">{error}</p>} {/* Show error message */}
//           </div>


//           <div className="grid gap-2" id="discount">
//             <label htmlFor="discount-input" className="font-medium flex items-center">
//               <span className="mr-2">Discount</span>
//               <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Required</span>
//             </label>
//             <input
//               id='discount'
//               type='number'
//               placeholder='Enter Percentage of discount'
//               name='discount'
//               value={data.discount}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (value < 0 || value > 100) {
//                   // Prevent negative or over 100 value and show the error
//                   setDiscountError('Discount should be between 0 and 100'); // Assuming you have a discount error state
//                 } else {
//                   setDiscountError(''); // Clear error when value is valid
//                   handleChange(e);
//                 }
//               }}
//               required
//               className={`bg-blue-100 p-3 outline-none border border-gray-300 focus:border-orange-500 rounded-lg transition-all duration-200 ${activeGuide === 'discount' ? 'ring-2 ring-orange-500' : ''}`}
          
//             />
//             {discountError && <p className="text-red-500 text-sm">{discountError}</p>} {/* Show error message */}
//           </div>



//           {/**add more field**/}
//           {
//             Object?.keys(data?.more_details)?.map((k, index) => {
//               return (
//                 <div className='grid gap-1'>
//                   <label htmlFor={k} className='font-medium'>{k}</label>
//                   <input
//                     id={k}
//                     type='text'
//                     value={data?.more_details[k]}
//                     onChange={(e) => {
//                       const value = e.target.value
//                       setData((preve) => {
//                         return {
//                           ...preve,
//                           more_details: {
//                             ...preve.more_details,
//                             [k]: value
//                           }
//                         }
//                       })
//                     }}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>
//               )
//             })
//           }

// <button
// id='add-field-button'
//   type="button"
//   onClick={() => setOpenAddField(true)}
//   className="flex items-center justify-center gap-2 bg-white text-blue-700 border border-blue-300 hover:bg-blue-100 hover:text-blue-900 px-4 py-2 w-36 rounded-lg font-semibold transition-all duration-200"
// >
//   <span className="text-lg">＋</span>
//   <span>Add Field</span>
// </button>




//           <button
//           id='submit'
//             onClick={handleSubmit}
//             className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
//           >
//             Submit Product
//           </button>
//         </form>
//       </div>

//       {
//         ViewImageURL && (
//           <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
//         )
//       }

//       {
//         openAddField && (
//           <AddFieldComponent
//             value={fieldName}
//             onChange={(e) => setFieldName(e.target.value)}
//             submit={handleAddField}
//             close={() => setOpenAddField(false)}
//           />
//         )
//       }
//         <div className="mb-8 py-6 bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg shadow-lg overflow-hidden">
//         <h2 className="text-white text-center text-2xl font-bold mb-6">Upload Guide</h2>
//         <div className="flex overflow-x-auto pb-4 px-4 snap-x gap-6 hide-scrollbar"
//           ref={scrollContainerRef}
//         >
//           {guideCards.map((card) => (
//             <div
//               key={card.id}
//               ref={(el) => (cardRefs.current[card.id] = el)}
//               className={`snap-center flex-shrink-0 w-64 h-100 rounded-xl p-4 cursor-pointer transform transition-all duration-300 ${
//                 activeGuide === card.id ? 'scale-105 ring-2 ring-white' : 'hover:scale-105'
//               } ${card.color} text-white shadow-xl`}
//               onClick={() => scrollToSection(card.id)}
//             >
//               <div className="flex flex-col h-full">
//                 <div className="text-4xl mb-4">{card.icon}</div>
//                 <h3 className="text-xl font-bold mb-2">{card.title}</h3>
//                 <div className="bg-white/20 h-px w-full mb-4"></div>
//                 <p className="text-white/90">{card.description}</p>
//                 <div className="mt-auto pt-4 flex justify-end">
//                   <span className="text-xs font-light bg-white/20 px-2 py-1 rounded-full">
//                     Guide
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//       </div>
//     </section>
//   )
// }

// export default Seller3DModelPage;



import React, { useState,useRef } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import uploadZip from '../utils/UploadZip';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';
import { useEffect } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { FaExclamationCircle } from 'react-icons/fa';
import '../pagescss/Seller3DModelPage.css';
import { TbArrowsMaximize } from "react-icons/tb";
import Divider from '../components/Divider';



const Seller3DModelPage = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    extension: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
    zipFile: ""
  })

  const [zipLoading, setZipLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false)
  const [ViewImageURL, setViewImageURL] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const [error, setError] = useState('');
  const [discountError, setDiscountError] = useState('');

  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")

  const [activeGuide, setActiveGuide] = useState(null);

  const fileExtensions = ['jpg', 'png', 'pdf', 'docx', 'xlsx', 'mp4', 'mp3', 'zip'];
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef({});


  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    setImageLoading(true)
    const response = await uploadImage(file)
    const { data: ImageResponse } = response
    const imageUrl = ImageResponse.data.url

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)

  }

  const handleUploadZip = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setZipLoading(true);
    const response = await uploadZip(file);
    const { data: zipResponse } = response;
    const zipUrl = zipResponse.data.url;

    setData((prev) => ({
      ...prev,
      zipFile: zipUrl,
    }));

    setZipLoading(false);
  };
  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (data.zipFile) {
        // Modify the URL to force download
        const downloadURL = data.zipFile.replace("/raw/", "/image/upload/fl_attachment/");

        const link = document.createElement("a");
        link.href = downloadURL;
        link.download = data.name + ".zip"; // Set file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download started!");
      } else {
        toast.error("No file available for download");
      }
    } catch (error) {
      toast.error("Failed to download file");
    }
  };


  const handleDeleteZip = () => {
    setData((prev) => ({
      ...prev,
      zipFile: "", // Reset the ZIP file URL
    }));
    setTimeout(() => {
      navigate(0);
    }, 500);
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }
  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("data", data)

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data
      })
      const { data: responseData } = response

      if (responseData.success) {
        successAlert(responseData.message)
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          extension: "",
          // stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
          zipFile: ""
        })

      }
    } catch (error) {
      AxiosToastError(error)
    }


  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };





  return (
   <section className='relative'>
  <div className="product-upload-form-container">
    <form className="product-upload-form">
      <div className="name-field-group">
        <label htmlFor="name-input" className="form-label">
          <span className="label-text">Name</span>
        </label>
        <input
          id="name-input"
          type="text"
          placeholder="Enter product name"
          name="name"
          value={data.name}
          onChange={handleChange}
          className={`form-input ${activeGuide === 'name' ? 'active-input' : ''}`}
        />
      </div>

      <div className="description-field-group" id="description">
        <label htmlFor="description-input" className="description-label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          id="description-input"
          placeholder="Enter product description"
          name="description"
          value={data.description}
          onChange={handleChange}
          rows={4}
          className={`description-input ${activeGuide === 'description' ? 'active-description' : ''}`}
        />
      </div>

      <div className="image-upload-section" id="image">
        <div className="image-upload-header">
          <span className="image-upload-label">Image</span>
        </div>

        <div className="image-upload-container">
          <label htmlFor="productImage" className="image-upload-dropzone">
            {imageLoading ? (
              <div className="loading-spinner">
                <svg className="animate-spin h-8 w-8 text-green-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <>
                <div className="upload-icon">🖼️</div>
                <p className="upload-primary-text">Upload Product Images</p>
                <p className="upload-secondary-text">Drag & drop or click to browse</p>
              </>
            )}
            <input
              type="file"
              id="productImage"
              className="image-upload-input"
              accept="image/*"
              multiple
              onChange={handleUploadImage}
            />
          </label>

          {data.image.length > 0 && (
            <div className="image-preview-grid">
              {data.image.map((img, index) => (
              <div key={`${img}-${index}`} className="image-preview-item" onClick={() => setViewImageURL(img)}>
  <img
    src={img}
    alt={`Preview ${index + 1}`}
    className="image-thumbnail"
  />
  <span className="image-preview-label">View</span>
  <button 
    onClick={(e) => {
      e.stopPropagation();
      handleDeleteImage(index);
    }}
    className="image-delete-button"
    aria-label="Delete image"
  >
    <MdDelete className="delete-icon" />
  </button>
</div>

              ))}
            </div>
          )}
        </div>
      </div>

      <div id="model">
        <label className="model-label">
          <span className="model-label-text">3D Model</span>
        </label>
        <div>
          <label
            htmlFor="product3dmodel"
            className={`model-upload-dropzone ${activeGuide === 'model' ? 'model-active-guide' : ''} ${zipLoading || data.zipFile ? 'model-upload-disabled' : ''}`}
          >
            <div className="model-upload-content">
              {zipLoading ? (
                <Loading />
              ) : (
                <>
                  <div className="model-upload-icon">📦</div>
                  <p className="model-upload-primary-text">Upload 3D Model ZIP</p>
                  <p className="model-upload-secondary-text">Click to browse files</p>
                </>
              )}
            </div>

            <input
              type="file"
              id="product3dmodel"
              className="model-upload-input"
              accept=".zip"
              onChange={handleUploadZip}
              disabled={!!data.zipFile}
            />
          </label>

          {data.zipFile && (
            <div className="model-uploaded-file">
              <a href={data.zipFile} target="_blank" rel="noopener noreferrer" className="model-file-link">
                ZIP Attached
              </a>
              <button onClick={handleDeleteZip} className="model-delete-button">
                <MdDelete size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="category-field-group" id="category">
        <label htmlFor="category-input" className="category-label">
          <span className="category-label-text">Category</span>
        </label>
        <div>
          <select
            id="category-input"
            className={`category-select ${activeGuide === 'category' ? 'category-active-guide' : ''}`}
            value={selectCategory}
            onChange={(e) => {
              const value = e.target.value;
              const category = allCategory.find(el => el._id === value);

              if (category && !data.category.some(c => c._id === category._id)) {
                setData(prev => ({
                  ...prev,
                  category: [...prev.category, category]
                }));
              }

              setSelectCategory("");
            }}
          >
            <option value={""} className="category-option-default">Select Category</option>
            {allCategory.map((c) => {
              const isSelected = data.category.some(cat => cat._id === c._id);
              return (
                <option key={c._id} value={c._id} className="category-option">
                  {c.name} {isSelected && <span className="category-selected-indicator">✔</span>}
                </option>
              );
            })}
          </select>
          <div className="category-tags-container">
            {data.category.map((c, index) => {
              return (
                <div key={c._id + index + "productsection"} className="category-tag">
                  <p>{c.name}</p>
                  <div className="category-remove-button" onClick={() => handleRemoveCategory(index)}>
                    <IoClose size={20} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="subcategory-field-group" id="subcategory">
        <label htmlFor="subcategory-input" className="subcategory-label">
          <span className="subcategory-label-text">Sub Category</span>
        </label>
        <div>
          <select
            id="subcategory-input"
            className={`subcategory-select ${activeGuide === 'subcategory' ? 'subcategory-active-guide' : ''}`}
            value={selectSubCategory}
            onChange={(e) => {
              const value = e.target.value;
              const subCategory = allSubCategory.find(el => el._id === value);

              if (subCategory && !data.subCategory.some(sc => sc._id === subCategory._id)) {
                setData(prev => ({
                  ...prev,
                  subCategory: [...prev.subCategory, subCategory]
                }));
              }

              setSelectSubCategory("");
            }}
          >
            <option value={""} className="subcategory-option-default">Select Sub Category</option>
            {allSubCategory.map((c) => {
              const isSelected = data.subCategory.some(sc => sc._id === c._id);
              return (
                <option key={c._id} value={c._id} className="subcategory-option">
                  {c.name} {isSelected && <span className="subcategory-selected-indicator">✔</span>}
                </option>
              );
            })}
          </select>
          <div className="subcategory-tags-container">
            {data.subCategory.map((c, index) => {
              return (
                <div key={c._id + index + "productsection"} className="subcategory-tag">
                  <p>{c.name}</p>
                  <div className="subcategory-remove-button" onClick={() => handleRemoveSubCategory(index)}>
                    <IoClose size={20} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="extension-field-group" id="extension">
        <label htmlFor="extension-input" className="extension-label">
          <span className="extension-label-text">Supported Extension</span>
        </label>
        <select
          id="extension"
          name="extension"
          value={data.extension}
          onChange={handleChange}
          required
          className={`extension-select ${activeGuide === 'extension' ? 'extension-active-guide' : ''}`}
        >
          <option value="" disabled className="extension-option-default">Select a model extension</option>
          <option value=".obj" className="extension-option">.obj (Wavefront OBJ)</option>
          <option value=".fbx" className="extension-option">.fbx (Autodesk FBX)</option>
          <option value=".glb" className="extension-option">.glb (Binary glTF)</option>
          <option value=".gltf" className="extension-option">.gltf (GL Transmission Format)</option>
          <option value=".stl" className="extension-option">.stl (Stereolithography)</option>
          <option value=".blend" className="extension-option">.blend (Blender)</option>
          <option value=".dae" className="extension-option">.dae (Collada - Digital Asset Exchange)</option>
          <option value=".3ds" className="extension-option">.3ds (3D Studio)</option>
          <option value=".max" className="extension-option">.max (Autodesk 3ds Max)</option>
          <option value=".c4d" className="extension-option">.c4d (Cinema 4D)</option>
          <option value=".lwo" className="extension-option">.lwo (LightWave Object)</option>
          <option value=".ply" className="extension-option">.ply (Polygon File Format)</option>
          <option value=".usdz" className="extension-option">.usdz (Apple Universal Scene Description - AR format)</option>
          <option value=".x3d" className="extension-option">.x3d (Extensible 3D Graphics)</option>
        </select>
      </div>

      <div className="price-field-group" id="price">
        <label htmlFor="price-input" className="price-label">
          <span className="price-label-text">Price</span>
        </label>
        <input
          id="price"
          type="number"
          placeholder="Enter product price"
          name="price"
          value={data.price}
          onChange={(e) => {
            const value = e.target.value;
            if (value < 0) {
              setError('Invalid price');
            } else {
              setError('');
              handleChange(e);
            }
          }}
          required
          className={`price-input ${activeGuide === 'price' ? 'price-active-guide' : ''}`}
        />
        {error && <p className="price-error-message">{error}</p>}
      </div>

      <div className="discount-field-group" id="discount">
        <label htmlFor="discount-input" className="discount-label">
          <span className="discount-label-text">Discount</span>
        </label>
        <input
          id="discount"
          type="number"
          placeholder="Enter Percentage of discount"
          name="discount"
          value={data.discount}
          onChange={(e) => {
            const value = e.target.value;
            if (value < 0 || value > 100) {
              setDiscountError('Discount should be between 0 and 100');
            } else {
              setDiscountError('');
              handleChange(e);
            }
          }}
          required
          className={`discount-input ${activeGuide === 'discount' ? 'discount-active-guide' : ''}`}
        />
        {discountError && <p className="discount-error-message">{discountError}</p>}
      </div>

      {Object?.keys(data?.more_details)?.map((k, index) => {
        return (
          <div className="additional-field-group" key={index}>
            <label htmlFor={k} className="additional-field-label">{k}</label>
            <input
              id={k}
              type="text"
              value={data?.more_details[k]}
              onChange={(e) => {
                const value = e.target.value
                setData((preve) => {
                  return {
                    ...preve,
                    more_details: {
                      ...preve.more_details,
                      [k]: value
                    }
                  }
                })
              }}
              required
              className="additional-field-input"
            />
          </div>
        )
      })}

      <button
        id="add-field-button"
        type="button"
        onClick={() => setOpenAddField(true)}
        className="add-field-button"
      >
        <span className="add-field-icon">＋</span>
        <span className="add-field-text">Add Field</span>
      </button>

      <button
        id="submit"
        onClick={handleSubmit}
        className="submit-button"
      >
        Submit Product
      </button>
    </form>
  </div>




 <div className="divider" />


  {ViewImageURL && (
  <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
)}


  {openAddField && (
    <AddFieldComponent
      value={fieldName}
      onChange={(e) => setFieldName(e.target.value)}
      submit={handleAddField}
      close={() => setOpenAddField(false)}
    />
  )}

<div className="upload-guide">
  <h2 className="guide-title">Upload Guide</h2>
  
  <div className="guide-steps">
    {/* Name Section */}
    <div className="guide-step">
      <h3 className="step-header">
        <span className="step-number">1</span>
        Product Name
      </h3>
      <p className="step-description">
        Choose a <span className="highlight">clear, descriptive name</span> (50-70 characters) that includes the object type, style, and key features. 
        <span className="example">Example: "Modern Leather Office Chair - 3D Model"</span>
      </p>
    </div>

    {/* Description Section */}
    <div className="guide-step">
      <h3 className="step-header">
        <span className="step-number">2</span>
        Description
      </h3>
      <p className="step-description">
        Include <span className="highlight">detailed specifications</span>: dimensions, polygon count, textures/materials included, and real-world scale. 
        Mention if the model is animation-ready, has rigging, or special features.
      </p>
    </div>

    {/* Images Section */}
    <div className="guide-step">
      <h3 className="step-header">
        <span className="step-number">3</span>
        Images
      </h3>
      <p className="step-description">
        Provide <span className="highlight">3-5 high-quality renders</span> (minimum 1920px width). Show multiple angles, close-ups of details, 
        and wireframe views. <span >Use neutral lighting</span> to accurately display textures.
      </p>
    </div>

    {/* 3D Model Section */}
    <div className="guide-step">
      <h3 className="step-header">
        <span className="step-number">4</span>
        3D Model Files
      </h3>
      <p className="step-description">
        Upload a <span className="highlight">ZIP file</span> containing your model (under 500MB) with all textures and materials. 
        Include at least <span className="highlight" >two standard formats</span> (e.g., OBJ + FBX or GLB) for compatibility.
      </p>
    </div>

    {/* Categories Section */}
    <div className="guide-step">
      <h3 className="step-header">
        <span className="step-number">5</span>
        Categories
      </h3>
      <p className="step-description">
        Select <span className="highlight">1-3 relevant categories</span> and subcategories to help users find your model. 
        <span className="example">Example: Furniture → Office → Chairs</span>
      </p>
    </div>

    {/* Formats Section */}
    <div className="guide-step">
      <h3 className="step-header">
        <span className="step-number">6</span>
        Supported Formats
      </h3>
      <p className="step-description">
        Specify which <span className="highlight">3D file formats</span> you've included. Common options are:
        <span className="code">OBJ, FBX, GLB, STL, BLEND</span>
      </p>
    </div>

    {/* Pricing Section */}
    <div className="guide-step">
      <h3 className="step-header">
        <span className="step-number">7</span>
        Pricing
      </h3>
      <p className="step-description">
        Set a <span className="highlight">competitive price</span> based on model complexity, quality, and commercial use rights. 
        <span className="important">Premium models with textures/rigging can command higher prices.</span>
      </p>
    </div>

    {/* Optimization Section */}
    <div className="guide-step">
      <h3 className="step-header">
        <span className="step-number">8</span>
        Add Extra Things
       </h3>
      <p className="step-description">
        Ensure <span className="highlight">clean topology</span>, proper UV mapping, and optimized textures. 
        Document the <span className="underline">polygon count</span> and texture resolutions for users.
      </p>
    </div>
  </div>
</div>
</section>
  )
}

export default Seller3DModelPage;

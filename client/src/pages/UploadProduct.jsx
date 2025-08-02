// import React, { useState } from 'react'
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



// const UploadProduct = () => {
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
//   const [openGuide, setOpenGuide] = useState(false);

//   const toggleGuide = () => {
//     setOpenGuide(!openGuide);
//   };
//   const [openAddField, setOpenAddField] = useState(false)
//   const [fieldName, setFieldName] = useState("")

//   const fileExtensions = ['jpg', 'png', 'pdf', 'docx', 'xlsx', 'mp4', 'mp3', 'zip'];



//   const handleChange = (e) => {
//     const { name, value } = e.target

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value
//       }
//     })
//   }



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
//         if (data.zipFile) {
//             // Modify the URL to force download
//             const downloadURL = data.zipFile.replace("/raw/", "/image/upload/fl_attachment/");

//             const link = document.createElement("a");
//             link.href = downloadURL;
//             link.download = data.name + ".zip"; // Set file name
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//             toast.success("Download started!");
//         } else {
//             toast.error("No file available for download");
//         }
//     } catch (error) {
//         toast.error("Failed to download file");
//     }
// };


//   const handleDeleteZip = () => {
//     setData((prev) => ({
//       ...prev,
//       zipFile: "", // Reset the ZIP file URL
//     }));
//     setTimeout(() => {
//       navigate(0);
//   }, 500);
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

//   // useEffect(()=>{
//   //   successAlert("Upload successfully")
//   // },[])
//   return (
//     <section className=''>
//        <div className='p-2 bg-white shadow-md flex items-center justify-between'>
//         <h2 className='font-semibold'>Upload Model</h2>
//         {/* Guide Icon */}
//         <FaExclamationCircle
//           size={25}
//           className="cursor-pointer text-blue-600"
//           onClick={toggleGuide}
//         />
//       </div>

//       {/* Guide Popup */}
//       {openGuide && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-1/3">
//             <div className="flex justify-between items-center">
//               <h3 className="text-xl font-semibold">Upload
//                  Guide</h3>
//               <IoClose
//                 size={20}
//                 className="cursor-pointer"
//                 onClick={toggleGuide}
//               />
//             </div>
//             <div className="mt-4 text-sm">
//               <h4 className="font-medium">1. Name</h4>
//               <p>Enter the name of the product you are uploading.</p>

//               <h4 className="font-medium mt-2">2. Description</h4>
//               <p>Provide a detailed description of the product.</p>

//               <h4 className="font-medium mt-2">3. Image</h4>
//               <p>Upload a preview image for the product.</p>

//               <h4 className="font-medium mt-2">4. 3D Model</h4>
//               <p>Upload a ZIP file containing the 3D model for the product.</p>

//               <h4 className="font-medium mt-2">5. Category</h4>
//               <p>Select the category that best fits the product.</p>

//               <h4 className="font-medium mt-2">6. Sub Category</h4>
//               <p>Select the sub-category under which the product falls.</p>

//               <h4 className="font-medium mt-2">7. Price</h4>
//               <p>Enter the price of the product.</p>

//               <h4 className="font-medium mt-2">8. Discount</h4>
//               <p>Provide a discount percentage if applicable.</p>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className='grid p-3'>
//         <form className='grid gap-4' onSubmit={handleSubmit}>


//           <div className='grid gap-1'>
//             <label htmlFor='name' className='font-medium'>Name</label>
//             <input
//               id='name'
//               type='text'
//               placeholder='Enter product name'
//               name='name'
//               value={data.name}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div>
//           <div className='grid gap-1'>
//             <label htmlFor='description' className='font-medium'>Description</label>
//             <textarea
//               id='description'
//               type='text'
//               placeholder='Enter product description'
//               name='description'
//               value={data.description}
//               onChange={handleChange}
//               required
//               multiple
//               rows={3}
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
//             />
//           </div>
//           <div>
//             <p className='font-medium'>Image</p>
//             <div>
//               <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
//                 <div className='text-center flex justify-center items-center flex-col'>
//                   {
//                     imageLoading ? <Loading /> : (
//                       <>
//                         <FaCloudUploadAlt size={35} />
//                         <p>Upload Preview Images</p>
//                       </>
//                     )
//                   }
//                 </div>
//                 <input
//                   type='file'
//                   id='productImage'
//                   className='hidden'
//                   accept='image/*'
//                   onChange={handleUploadImage}
//                 />
//               </label>
//               {/**display uploded image*/}
//               <div className='flex flex-wrap gap-4'>
//                 {
//                   data.image.map((img, index) => {
//                     return (
//                       <div key={img + index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
//                         <img
//                           src={img}
//                           alt={img}
//                           className='w-full h-full object-scale-down cursor-pointer'
//                           onClick={() => setViewImageURL(img)}
//                         />
//                         <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
//                           <MdDelete />
//                         </div>
//                       </div>
//                     )
//                   })
//                 }
//               </div>
//             </div>

//           </div>
//           <div>
//     <p className='font-medium'>3D-Model</p>
//     <div>
//         <label 
//             htmlFor='product3dmodel' 
//             className={`bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer ${zipLoading || data.zipFile ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//             <div className='text-center flex justify-center items-center flex-col'>
//                 {zipLoading ? <Loading /> : (
//                     <>
//                         <FaCloudUploadAlt size={35} />
//                         <p>Upload 3D Model Zip</p>
//                     </>
//                 )}
//             </div>
//             <input
//                 type='file'
//                 id='product3dmodel'
//                 className='hidden'
//                 accept='.zip'
//                 onChange={handleUploadZip}
//                 disabled={!!data.zipFile} // Disable input if a file is already uploaded
//             />
//         </label>

//         {/* Show uploaded ZIP file */}
//         {data.zipFile && (
//             <div className='mt-2 flex items-center justify-between bg-gray-100 p-2 rounded'>
//                 <a href={data.zipFile} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
//                      ZIP Attached
//                 </a>
//                 <button onClick={handleDeleteZip} className='text-red-500 hover:text-red-700'>
//                     <MdDelete size={20} />
//                 </button>
//             </div>
//         )}
//     </div>
// </div>

// <div className='grid gap-1'>
//   <label className='font-medium'>Category</label>
//   <div>
//     <select
//       className='bg-blue-50 border w-full p-2 rounded'
//       value={selectCategory}
//       onChange={(e) => {
//         const value = e.target.value;
//         const category = allCategory.find(el => el._id === value);

//         // Check if already exists
//         if (category && !data.category.some(c => c._id === category._id)) {
//           setData(prev => ({
//             ...prev,
//             category: [...prev.category, category]
//           }));
//         }

//         setSelectCategory("");
//       }}
//     >
//       <option value={""} className='text-neutral-600'>Select Category</option>
//       {
//         allCategory.map((c) => {
//           const isSelected = data.category.some(cat => cat._id === c._id); // Check if category is selected
//           return (
//             <option key={c._id} value={c._id}>
//               {c.name} {isSelected && <span className="text-green-500 ml-2">✔</span>}
//             </option>
//           );
//         })
//       }
//     </select>
//     <div className='flex flex-wrap gap-3'>
//       {
//         data.category.map((c, index) => {
//           return (
//             <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//               <p>{c.name}</p>
//               <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveCategory(index)}>
//                 <IoClose size={20} />
//               </div>
//             </div>
//           )
//         })
//       }
//     </div>
//   </div>
// </div>


//           <div className='grid gap-1'>
//   <label className='font-medium'>Sub Category</label>
//   <div>
//     <select
//       className='bg-blue-50 border w-full p-2 rounded'
//       value={selectSubCategory}
//       onChange={(e) => {
//         const value = e.target.value;
//         const subCategory = allSubCategory.find(el => el._id === value);

//         // Prevent duplicates in selection
//         if (subCategory && !data.subCategory.some(sc => sc._id === subCategory._id)) {
//           setData(prev => ({
//             ...prev,
//             subCategory: [...prev.subCategory, subCategory]
//           }));
//         }

//         setSelectSubCategory("");
//       }}
//     >
//       <option value={""} className='text-neutral-600'>Select Sub Category</option>
//       {
//         allSubCategory.map((c) => {
//           const isSelected = data.subCategory.some(sc => sc._id === c._id); // Check if selected
//           return (
//             <option key={c._id} value={c._id}>
//               {c.name} {isSelected && <span className="text-green-500 ml-2">✔</span>}
//             </option>
//           );
//         })
//       }
//     </select>
//     <div className='flex flex-wrap gap-3'>
//       {
//         data.subCategory.map((c, index) => {
//           return (
//             <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//               <p>{c.name}</p>
//               <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveSubCategory(index)}>
//                 <IoClose size={20} />
//               </div>
//             </div>
//           )
//         })
//       }
//     </div>
//   </div>
// </div>


//           <div className='grid gap-1'>
//             <label htmlFor='Extensions' className='font-medium'>Supported Extension</label>
//             <select
//               id='extension'
//               name='extension'
//               value={data.extension}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             >
//               <option value="" disabled>Select a file extension</option>
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



//           <div className='grid gap-1'>
//   <label htmlFor='price' className='font-medium'>Price</label>
//   <input
//     id='price'
//     type='number'
//     placeholder='Enter product price'
//     name='price'
//     value={data.price}
//     onChange={(e) => {
//       const value = e.target.value;
//       if (value < 0) {
//         // Prevent negative value and show the error
//         setError('Invalid price'); // Assuming you have an error state
//       } else {
//         setError(''); // Clear error when value is valid
//         handleChange(e);
//       }
//     }}
//     required
//     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//   />
//   {error && <p className="text-red-500 text-sm">{error}</p>} {/* Show error message */}
// </div>


// <div className='grid gap-1'>
//   <label htmlFor='discount' className='font-medium'>Discount</label>
//   <input
//     id='discount'
//     type='number'
//     placeholder='Enter Percentage of discount'
//     name='discount'
//     value={data.discount}
//     onChange={(e) => {
//       const value = e.target.value;
//       if (value < 0 || value > 100) {
//         // Prevent negative or over 100 value and show the error
//         setDiscountError('Discount should be between 0 and 100'); // Assuming you have a discount error state
//       } else {
//         setDiscountError(''); // Clear error when value is valid
//         handleChange(e);
//       }
//     }}
//     required
//     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//   />
//   {discountError && <p className="text-red-500 text-sm">{discountError}</p>} {/* Show error message */}
// </div>



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

//           <div onClick={() => setOpenAddField(true)} className=' hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
//             Add Fields
//           </div>



//           <button
//             className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'
//           >
//             Submit
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
//     </section>
//   )
// }

// export default UploadProduct

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
import Division from '../components/Division';



const UploadProduct = () => {
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
              {/* <a href={data.zipFile} target="_blank" rel="noopener noreferrer" className="model-file-link">
                ZIP Attached
              </a> */}
          <div className="model-uploaded-file">
  <a 
    href={data.zipFile} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="model-file-link"
  >
    View ZIP
  </a>
  <a 
    href={data.zipFile} 
    download={`${data.name || '3d-model'}.zip`} 
    className="model-file-link"
  >
    Download ZIP
  </a>
</div>


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
  <br />
  <br />




 <Division />


 {ViewImageURL && (
  <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} label="view" />
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

export default UploadProduct
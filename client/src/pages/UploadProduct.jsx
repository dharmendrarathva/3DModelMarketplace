import React, { useState } from 'react'
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





const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    // stock: "",
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

  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")

  const fileExtensions = ['jpg', 'png', 'pdf', 'docx', 'xlsx', 'mp4', 'mp3', 'zip'];



  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

 

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

  // useEffect(()=>{
  //   successAlert("Upload successfully")
  // },[])
  return (
    <section className=''>
      <div className='p-2   bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Upload Product</h2>
      </div>
      <div className='grid p-3'>
        <form className='grid gap-4' onSubmit={handleSubmit}>


          <div className='grid gap-1'>
            <label htmlFor='name' className='font-medium'>Name</label>
            <input
              id='name'
              type='text'
              placeholder='Enter product name'
              name='name'
              value={data.name}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='description' className='font-medium'>Description</label>
            <textarea
              id='description'
              type='text'
              placeholder='Enter product description'
              name='description'
              value={data.description}
              onChange={handleChange}
              required
              multiple
              rows={3}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
            />
          </div>
          <div>
            <p className='font-medium'>Image</p>
            <div>
              <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
                <div className='text-center flex justify-center items-center flex-col'>
                  {
                    imageLoading ? <Loading /> : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p>Upload Preview Images</p>
                      </>
                    )
                  }
                </div>
                <input
                  type='file'
                  id='productImage'
                  className='hidden'
                  accept='image/*'
                  onChange={handleUploadImage}
                />
              </label>
              {/**display uploded image*/}
              <div className='flex flex-wrap gap-4'>
                {
                  data.image.map((img, index) => {
                    return (
                      <div key={img + index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                        <img
                          src={img}
                          alt={img}
                          className='w-full h-full object-scale-down cursor-pointer'
                          onClick={() => setViewImageURL(img)}
                        />
                        <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                          <MdDelete />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>
          <div>
    <p className='font-medium'>3D-Model</p>
    <div>
        <label 
            htmlFor='product3dmodel' 
            className={`bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer ${zipLoading || data.zipFile ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <div className='text-center flex justify-center items-center flex-col'>
                {zipLoading ? <Loading /> : (
                    <>
                        <FaCloudUploadAlt size={35} />
                        <p>Upload 3D Model Zip</p>
                    </>
                )}
            </div>
            <input
                type='file'
                id='product3dmodel'
                className='hidden'
                accept='.zip'
                onChange={handleUploadZip}
                disabled={!!data.zipFile} // Disable input if a file is already uploaded
            />
        </label>

        {/* Show uploaded ZIP file */}
        {data.zipFile && (
            <div className='mt-2 flex items-center justify-between bg-gray-100 p-2 rounded'>
                <a href={data.zipFile} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
                     ZIP Attached
                </a>
                <button onClick={handleDeleteZip} className='text-red-500 hover:text-red-700'>
                    <MdDelete size={20} />
                </button>
            </div>
        )}
    </div>
</div>

          <div className='grid gap-1'>
            <label className='font-medium'>Category</label>
            <div>
              <select
                className='bg-blue-50 border w-full p-2 rounded'
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el._id === value)

                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    }
                  })
                  setSelectCategory("")
                }}
              >
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.category.map((c, index) => {
                    return (
                      <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveCategory(index)}>
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label className='font-medium'>Sub Category</label>
            <div>
              <select
                className='bg-blue-50 border w-full p-2 rounded'
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const subCategory = allSubCategory.find(el => el._id === value)

                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory]
                    }
                  })
                  setSelectSubCategory("")
                }}
              >
                <option value={""} className='text-neutral-600'>Select Sub Category</option>
                {
                  allSubCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.subCategory.map((c, index) => {
                    return (
                      <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveSubCategory(index)}>
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor='Extensions' className='font-medium'>Supported Extension</label>
            <select
              id='extension'
              name='extension'
              value={data.extension}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            >
              <option value="" disabled>Select a file extension</option>
              <option value=".obj">.obj (Wavefront OBJ)</option>
              <option value=".fbx">.fbx (Autodesk FBX)</option>
              <option value=".glb">.glb (Binary glTF)</option>
              <option value=".gltf">.gltf (GL Transmission Format)</option>
              <option value=".stl">.stl (Stereolithography)</option>
              <option value=".blend">.blend (Blender)</option>
              <option value=".dae">.dae (Collada - Digital Asset Exchange)</option>
              <option value=".3ds">.3ds (3D Studio)</option>
              <option value=".max">.max (Autodesk 3ds Max)</option>
              <option value=".c4d">.c4d (Cinema 4D)</option>
              <option value=".lwo">.lwo (LightWave Object)</option>
              <option value=".ply">.ply (Polygon File Format)</option>
              <option value=".usdz">.usdz (Apple Universal Scene Description - AR format)</option>
              <option value=".x3d">.x3d (Extensible 3D Graphics)</option>

            </select>
          </div>


  

          <div className='grid gap-1'>
            <label htmlFor='price' className='font-medium'>Price</label>
            <input
              id='price'
              type='number'
              placeholder='Enter product price'
              name='price'
              value={data.price}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='discount' className='font-medium'>Discount</label>
            <input
              id='discount'
              type='number'
              placeholder='Enter Percantage Of discount'
              name='discount'
              value={data.discount}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>


          {/**add more field**/}
          {
            Object?.keys(data?.more_details)?.map((k, index) => {
              return (
                <div className='grid gap-1'>
                  <label htmlFor={k} className='font-medium'>{k}</label>
                  <input
                    id={k}
                    type='text'
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
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>
              )
            })
          }

          <div onClick={() => setOpenAddField(true)} className=' hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
            Add Fields
          </div>



          <button
            className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'
          >
            Submit
          </button>
        </form>
      </div>

      {
        ViewImageURL && (
          <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
        )
      }

      {
        openAddField && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => setOpenAddField(false)}
          />
        )
      }
    </section>
  )
}

export default UploadProduct
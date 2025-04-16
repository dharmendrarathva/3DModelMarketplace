import React, { useState } from 'react';
import EditProductAdmin from './EditProductAdmin';
import { IoClose } from 'react-icons/io5';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteCancel = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: { _id: data._id },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchProductData?.();
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-6 hover:shadow-xl transition-shadow duration-300 w-[280px] h-[290px]">
      <div className="w-full h-[130px] flex items-center justify-center">
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="h-full object-contain"
        />
      </div>
      <p className="text-ellipsis line-clamp-2 font-medium mt-4 text-center">
        {data?.name}
      </p>
      <p className="text-slate-400 text-sm">{data?.unit}</p>

      <div className="flex gap-4 w-full mt-4">
        <button
          onClick={() => setEditOpen(true)}
          className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <FaEdit size={16} className="mr-2" />
          <span className="font-semibold text-sm">Edit</span>
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FaTrashAlt size={16} className="mr-2" />
          <span className="font-semibold text-sm">Remove</span>
        </button>
      </div>

      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {openDelete && (
        <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 z-50 bg-opacity-70 p-4 flex justify-center items-center">
          <div className="bg-white p-4 w-full max-w-md rounded-md">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold">Permanent Delete</h3>
              <button onClick={() => setOpenDelete(false)}>
                <IoClose size={25} />
              </button>
            </div>
            <p className="my-2">Are you sure you want to delete this permanently?</p>
            <div className="flex justify-end gap-5 py-4">
              <button
                onClick={handleDeleteCancel}
                className="border px-3 py-1 rounded bg-red-100 border-red-500 text-red-500 hover:bg-red-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="border px-3 py-1 rounded bg-green-100 border-green-500 text-green-500 hover:bg-green-200"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductCardAdmin;

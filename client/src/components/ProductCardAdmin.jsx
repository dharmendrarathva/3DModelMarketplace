import React, { useState } from 'react';
import EditProductAdmin from './EditProductAdmin';
import { IoClose } from 'react-icons/io5';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await Axios({ ...SummaryApi.deleteProduct, data: { _id: data._id } });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchProductData?.();
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
    setOpenDelete(false);
  };

  return (
    <div className="bg-neutral-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-700 overflow-hidden">
      <div className="relative aspect-square bg-neutral-50 flex items-center justify-center p-5">
        <img src={data?.image[0] || '/placeholder-image.png'} alt={data?.name} className="w-full h-full object-contain mix-blend-multiply" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-white truncate">{data?.name}</h3>
        <p className="text-sm text-gray-400 mt-1">{data?.extension}</p>

        <div className="flex gap-3 mt-5">
          <button onClick={() => setEditOpen(true)} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-neutral-600 hover:bg-neutral-700 text-white transition-all duration-200">
            <FaEdit />
            <span>Edit</span>
          </button>
          <button onClick={() => setOpenDelete(true)} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-neutral-600 hover:bg-neutral-700 text-white transition-all duration-200">
            <FaTrashAlt />
            <span>Remove</span>
          </button>
        </div>
      </div>

      {openDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-30  flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <button onClick={() => setOpenDelete(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <IoClose size={24} />
            </button>
            <h3 className="text-xl font-bold text-white mb-2">Confirm Deletion</h3>
            <p className="text-neutral-400 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setOpenDelete(false)} className="py-2 px-4 rounded-lg border bg-black border-gray-300 text-white hover:bg-neutral-800 transition-all">
                Cancel
              </button>
              <button onClick={handleDelete} className="py-2 px-4 rounded-lg border border-white  bg-red-600   text-white hover:bg-red-800 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <EditProductAdmin data={data} close={() => setEditOpen(false)} fetchProductData={fetchProductData} />
        </div>
      )}
    </div>
  );
};

export default ProductCardAdmin;

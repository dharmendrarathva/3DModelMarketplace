import React, { useState } from 'react';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { Link } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/GlobalProvider';
import AddToCartButton from './AddToCartButton';
import { BsDownload } from 'react-icons/bs';


const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  const { fetchCartItem } = useGlobalContext();
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async (e) => {
      e.preventDefault();
      e.stopPropagation();
    
      try {
        setDownloading(true); 
    
        const zipFileUrl = data?.zipFile;
        if (!zipFileUrl) {
          toast.error('Download link not available');
          setDownloading(false);
          return;
        }
    
        const response = await fetch(zipFileUrl);
        const blob = await response.blob();
        const link = document.createElement('a');
    
        link.href = window.URL.createObjectURL(blob);
        link.download = `${data.name}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        toast.success('Download started');
    
        
        setTimeout(() => {
          setDownloading(false);
        }, 1000);
      } catch (error) {
        console.error('Download error:', error);
        toast.error('Failed to download file');
        setDownloading(false);
      }
    }

  return (
    <Link
      to={url}
      className="border py-2 lg:py-3 px-2 lg:px-4 grid gap-2 lg:gap-3 min-w-36 lg:min-w-52 rounded-lg shadow bg-white hover:shadow-lg transition duration-300"
    >
      {/* Product Image */}
      <div className="min-h-24 w-full max-h-28 lg:max-h-32 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={data.image[0]}
          alt={data.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-1">
        {/* Discount Badge */}
        {Boolean(data.discount) && (
          <div className="text-green-600 bg-green-100 px-2 py-0.5 w-fit text-xs rounded-full">
            {data.discount}% discount
          </div>
        )}

        {/* Product Name */}
        <div className="font-medium text-sm lg:text-base text-gray-800 line-clamp-2">
          {data.name}
        </div>

        {/* Extension */}
        <div className="text-gray-500 text-xs lg:text-sm">{data.extension}</div>

        {/* Price */}
<div className="text-sm lg:text-base font-semibold text-gray-900">
  {data.price === 0
    ? 'FREE'
    : DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
</div>


        {/* Conditional Button */}
        {data.price === 0 ? (
  <button
  onClick={handleDownload}
  disabled={downloading}
  className={`my-7 flex items-center justify-center px-4 py-2 rounded-md text-base transition ${
    downloading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
  }`}
>
  {
    downloading ? (
      <>
        <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        Downloading...
      </>
    ) : (
      <>
        <BsDownload size={20} className="mr-2" />
        Download
      </>
    )
  }
</button>

) : (
  <AddToCartButton data={data} />
)}

      </div>
    </Link>
  );
};

export default CardProduct;

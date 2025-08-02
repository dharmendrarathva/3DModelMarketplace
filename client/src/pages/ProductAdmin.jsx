import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import Loading from '../components/Loading';
import ProductCardAdmin from '../components/ProductCardAdmin';
import { IoSearchOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import '../pagescss/ProductAdmin.css';

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }

    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);

    return () => {
      clearTimeout(interval);
    };
  }, [search]);

  return (
    <section className="product-admin-page">
      <div className="product-admin-header">
        <h2>Products</h2>
        <div className="search-container">
          <IoSearchOutline className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>

      {loading && <Loading />}  

      <div className="product-content">
        <div className="product-grid-container">
          {productData.length > 0 ? (
            <div className="product-grid">
              {productData.map((p, index) => (
                <ProductCardAdmin 
                  key={p._id || index} 
                  data={p} 
                  fetchProductData={fetchProductData} 
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              {!loading && "No products found"}
            </div>
          )}
        </div>

        <div className="pagination-controls">
          <button 
            onClick={handlePrevious} 
            disabled={page === 1}
            className="pagination-btn"
          >
            <FiChevronLeft />
            Previous
          </button>
          <span className="page-indicator">
            {page}/{totalPageCount}
          </span>
          <button 
            onClick={handleNext} 
            disabled={page === totalPageCount}
            className="pagination-btn"
          >
            Next
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
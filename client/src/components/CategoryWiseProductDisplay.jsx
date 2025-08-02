import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import '../componentcss/CategoryWiseProductDisplay.css';

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector(state => state.product.allSubCategory);
  const loadingCardNumber = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id }
      });

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
    fetchCategoryWiseProduct();
  }, [id]);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const handleRedirectProductListpage = () => {
    const subcategory = subCategoryData.find(sub =>
      sub.category.some(c => c._id === id)
    );
    return `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`;
  };

  return (
    <section className="CategoryWiseProductDisplay">
      <div className="CategoryWiseProductDisplay-header">
        <h3 className="CategoryWiseProductDisplay-title">{name}</h3>
        <Link to={handleRedirectProductListpage()} className="CategoryWiseProductDisplay-see-all-link">
          See All
        </Link>
      </div>

      <div className="CategoryWiseProductDisplay-slider-container">
        <div 
          ref={containerRef}
          className="CategoryWiseProductDisplay-slider"
        >
          {loading
            ? loadingCardNumber.map((_, index) => (
                <CardLoading key={`loading-${index}`} />
              ))
            : data.map((p, index) => (
                <CardProduct
                  data={p}
                  key={`${p._id}-category-product-${index}`}
                />
              ))}
        </div>

        <div className="CategoryWiseProductDisplay-slider-navigation">
          <button
            onClick={handleScrollLeft}
            className="CategoryWiseProductDisplay-nav-button CategoryWiseProductDisplay-left-button"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="CategoryWiseProductDisplay-nav-button CategoryWiseProductDisplay-right-button"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryWiseProductDisplay;
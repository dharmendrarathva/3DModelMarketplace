import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import '../pagescss/ProductListPage.css';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const AllSubCategory = useSelector(state => state.product.allSubCategory);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];
  const subCategoryName = params.subCategory.split("-").slice(0, -1).join(" ");
  const CategoryName = params.category.split("-").slice(0, -1).join(" ");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId, 
          subCategoryId,
          page,
          limit: 5,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(prev => (page === 1 ? responseData.data : [...prev, ...responseData.data]));
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    const filteredSubCategories = AllSubCategory.filter(s =>
      s.category.some(el => el._id === categoryId)
    );
    setDisplaySubCategory(filteredSubCategories);
  }, [params, AllSubCategory]);

  return (
    <section className="ProductListPage-container">
      <div className="ProductListPage-subcategoryNav">
        {DisplaySubCategory.map((s) => {
          const link = `/${valideURLConvert(s.category[0]?.name)}-${s.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
          const isActive = subCategoryId === s._id;

          return (
            <Link
              key={s._id}
              to={link}
              className={`ProductListPage-subcategoryLink ${isActive ? 'ProductListPage-active' : ''}`}
            >
              {s.name}
            </Link>
          );
        })}
      </div>

      <div className="ProductListPage-productGrid">
        {data.map((p, i) => (
          <div
            key={p._id + "product" + i}
            className="ProductListPage-productItem"
          >
            <CardProduct data={p} />
          </div>
        ))}
      </div>

      {loading && <Loading />}
    </section>
  );
};

export default ProductListPage;
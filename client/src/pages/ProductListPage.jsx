import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const AllSubCategory = useSelector(state => state.product.allSubCategory);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);

  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ");

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 8,
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(prevData => (page === 1 ? responseData.data : [...prevData, ...responseData.data]));
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
    <section className='sticky top-24 lg:top-20'>
      <div className='container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
        
        {/* Sidebar - Subcategories */}
        <div className='min-h-[88vh] max-h-[88vh] overflow-y-scroll shadow-md scrollbarCustom bg-white py-2'>
          {DisplaySubCategory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
            return (
              <Link 
                key={s._id} 
                to={link} 
                className={`w-full flex items-center lg:w-full lg:h-16 box-border border-b hover:bg-green-100 cursor-pointer 
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
              >
                <div className='w-fit mx-auto lg:mx-0 bg-white rounded'>
                  <img src={s.image} alt='subCategory' className='w-12 h-12 object-contain' />
                </div>
                <p className='text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
              </Link>
            );
          })}
        </div>

        {/* Product List */}
        <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
              {data.map((p, index) => (
                <CardProduct key={p._id + "productSubCategory" + index} data={p} />
              ))}
            </div>
          </div>

          {loading && <Loading />}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
  
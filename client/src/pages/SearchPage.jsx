import React, { useEffect, useState } from 'react';
import CardLoading from '../components/CardLoading';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import CardProduct from '../components/CardProduct';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';
import { FaVolcano } from 'react-icons/fa6';
import { DiYeoman } from 'react-icons/di';
import '../pagescss/SearchPage.css';

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const location = useLocation();
  const searchText = location?.search?.slice(3); // slice ?q=

  const loadingArrayCard = new Array(10).fill(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData((prev) => [...prev, ...responseData.data]);
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText) {
      setPage(1);
      fetchData();
    } else {
      setData([]);
    }
  }, [searchText]);

  useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [page]);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="search-page-container">
      <div className="search-page-content">
        {searchText ? (
          <>
            <h3 className="search-results-title">
              Search Results: {data.length}
            </h3>

            <InfiniteScroll
              dataLength={data.length}
              hasMore={page < totalPage}
              next={handleFetchMore}
              className="infinite-scroll-container"
            >
              <div className="products-grid">
                {data.map((p, index) => (
                  <CardProduct data={p} key={p?._id + 'searchProduct' + index} />
                ))}

                {loading &&
                  loadingArrayCard.map((_, index) => (
                    <CardLoading key={'loadingsearchpage' + index} />
                  ))}
              </div>
            </InfiniteScroll>

            {!data.length && !loading && (
              <div className="no-results-container">
                <FaVolcano className="no-results-icon" />
                <p className="no-results-text">No Model Found</p>
              </div>
            )}
          </>
        ) : (
          <div className="search-prompt-container">
            <DiYeoman className="search-prompt-icon" />
            <p className="search-prompt-text">Type something to search ...</p>
            <p className="search-suggestions">
              Try <span className="suggestion-highlight">Planes</span>,{' '}
              <span className="suggestion-highlight">Characters</span>, or{' '}
              <span className="suggestion-highlight">Cars</span> for cool Models.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
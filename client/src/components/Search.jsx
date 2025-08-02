import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import '../componentcss/Search.css';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation();
  const searchText = params.search?.slice(3) || "";

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${encodeURIComponent(value)}`;
    navigate(url);
  };

  return (
    <div className="searchpage-container">
      {/* Left Icon/Button */}
      <div className="searchpage-icon-container">
        {isMobile && isSearchPage ? (
          <Link to={"/"} className="searchpage-back-button">
            <FaArrowLeft size={16} />
          </Link>
        ) : (
          <button className="searchpage-button">
            <IoSearch size={20} />
          </button>
        )}
      </div>

      {/* Input or Animation */}
      <div className="searchpage-input-container">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="searchpage-animation-wrapper"
          >
            <TypeAnimation
              sequence={[
                'Search "Characters"',
                1000,
                'Search "Vehicles"',
                1000,
                'Search "Architecture"',
                1000,
                'Search "Props"',
                1000,
                'Search "Weapons"',
                1000,
                'Search "Nature"',
                1000,
                'Search "Furniture"',
                1000,
                'Search "Electronics"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <input
            type="text"
            placeholder="Looking for 3D Cars and more..."
            autoFocus
            defaultValue={searchText}
            className="searchpage-input"
            onChange={handleOnChange}
          />
        )}
      </div>
    </div>
  );
};

export default Search;

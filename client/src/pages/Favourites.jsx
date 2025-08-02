import React, { useState, useEffect } from "react";
import CardProduct from "../components/CardProduct";
import "../pagescss/Favourites.css";

const Favourites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

        // Filter out only the favorite products
        const favoriteProducts = allProducts.filter(product => 
            storedFavorites.includes(product._id)
        );

        setFavorites(favoriteProducts);
    }, []);

    return (
        <div className="favourites-container">
            <h1 className="favourites-title">My Favorites ❤️</h1>
            {favorites.length > 0 ? (
                <div className="favourites-grid">
                    {favorites.map((product) => (
                        <CardProduct key={product._id} data={product} />
                    ))}
                </div>
            ) : (
                <p className="favourites-empty-message">
                    No favorite products yet.
                </p>
            )}
        </div>
    );
};

export default Favourites;
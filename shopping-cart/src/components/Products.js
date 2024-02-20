
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './css/Products.css';

const Products = ({ selectedCategory, selectedSortOption }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 30;
    const gridWrapperRef = useRef(null);

    

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products?limit=${productsPerPage}&page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                let filteredProducts = data;
                if (selectedCategory && selectedCategory !== "All") {
                    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
                }

                // Sorting logic based on selected sort option
                if (selectedSortOption === "Price low to high") {
                    filteredProducts.sort((a, b) => a.price - b.price);
                } else if (selectedSortOption === "Price high to low") {
                    filteredProducts.sort((a, b) => b.price - a.price);
                } else if (selectedSortOption === "Rating") {
                    filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
                }

                setProducts(filteredProducts);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [currentPage, selectedCategory, selectedSortOption]);

    useEffect(() => {
        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const gridWrapperHeight = gridWrapperRef.current.clientHeight;
                const containerHeight = gridWrapperHeight + 50;
                document.documentElement.style.setProperty('--products-container-height', `${containerHeight}px`);
            }, 0); // Adjust debounce time as needed
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    const totalPages = Math.ceil(products.length / productsPerPage) || 1;

    const handleNextPage = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };
    if (!products) return <div>Wait as we redirect you</div>;

    return (
        <div className="productsContainer" style={{ height: `var(--products-container-height)` }}>
            <div className="productsTitleContainer">
                <span>Products</span>
            </div>
            <div className="gridWrapper" ref={gridWrapperRef}>
                {products.map(product => (
                    <Link key={product.id} to={`/product/${product.id}`} className="product-link">
                        <div className="product">
                            <img src={product.image} alt={product.title} className="productImage" />
                            <span className="productTitle">{product.title}</span>
                            <span className="productRating">
                                {product.rating.rate} <span role="img" aria-label="star" className="star">⭐</span>
                            </span>
                            <span className="productPrice">${product.price}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Products;
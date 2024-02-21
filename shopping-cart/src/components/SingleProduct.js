import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/SingleProduct.css';
import TaskBar from './TaskBar';
import axios from 'axios';

const SingleProduct = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const [showDialog, setShowDialog] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedLocation, setSelectedLocation] = useState('Nairobi');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = () => {
        if (comment.trim() !== '') {
            setComments((prevComments) => [...prevComments, comment]);
            setComment('');
        }
    };

    const handleConfirmQuantity = () => {
        setShowDialog(false);
        setQuantity(1);
    };

    const cart = {
        productId: product.id,
        productTitle:product.title,
        productPrice: product.price,
        quantity: quantity,
    };

    const handleAddToCartClick = async () => {
        setShowDialog(true);
        try {
            axios
                .post("/api/cart/add", cart);
                .then((respnse))
        } catch (err) {
            console.error('Error adding product to cart:', err);
        }
    };

    
    if (!product) return <div>Loading ...</div>;
    return (        
        <div className='singleProduct'>
            {successMessage && <div className="successMessage">{successMessage}</div>}
            <div className='singleProduct-center'>
                <div className='image'>
                    <img src={product.image} alt={product.title} className='productImage'/>
                </div>
                <div className='details'>
                    <span className='singleProduct-title'>{product.title}</span>
                    <span className='singleProduct-category'>{product.category}</span>
                    <span className='singleProduct-price'>${product.price}</span>
                    <span className='singleProduct-description'>{product.description}</span>
                </div>
            </div>
            <div className='singleProduct-right'>
                <span className='rightTitle'>Order details</span>
                <div className='location'>                    
                    <span>Location:</span>
                    <div className='locationWrapper'>                    
                        <select value={selectedLocation} onChange={handleLocationChange} className='locationOptions'>
                            <option value='Nairobi'>Nairobi</option>
                            <option value='Kisumu'>Kisumu</option>
                            <option value='Mombasa'>Mombasa</option>
                            <option value='Eldoret'>Eldoret</option>
                            <option value='Nakuru'>Nakuru</option>
                            <option value='Kiambu'>Kiambu</option>
                            <option value='Malindi'>Malindi</option>
                        </select>
                    </div>
                </div>
                <button className='addToCartButton' onClick={handleAddToCartClick}>Add to Cart</button>
                {showDialog && (
                    <div className="dialog">
                        <span>Select quantity:</span>
                        <div className="quantity-control">
                            <div className="quantity-arrows">
                                <div className="arrow up" onClick={handleIncrement}></div>
                                <div className="arrow down" onClick={handleDecrement}></div>
                            </div>
                            <input type="number" value={quantity} onChange={handleQuantityChange} className="quantity-input" />
                        </div>
                        <button onClick={handleConfirmQuantity}>Add {quantity} to Cart</button>
                    </div>
                )}
                <div className="comments">
                    <span className='commentsTitle'>Comments</span>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Add your comment..."
                        className='commentArea'
                    />
                    
                    <div className="comment-list">
                        {comments.map((comment, index) => (
                            <div key={index} className="comment">{comment}</div>
                        ))}
                    </div>
                </div>
                <span onClick={handleAddComment} className='commentsButton'>Add Comment</span>
            </div>
        </div>
    );
};

export default SingleProduct;

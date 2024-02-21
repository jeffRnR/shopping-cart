import React, { useState } from 'react';
import productImage from '../assets/heels.jpg';
import './css/SingleProduct.css';

const SingleProduct = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedLocation, setSelectedLocation] = useState('Nairobi');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const handleAddToCartClick = () => {
        setShowDialog(true);
    };

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

    return (
        <div className='singleProduct'>
            <div className='singleProduct-center'>
                <div className='image'>
                    <img src={productImage} alt='productImage' className='productImage'/>
                </div>
                <div className='details'>
                    <span className='singleProduct-title'>Stylish High Heels</span>
                    <span className='singleProduct-category'>Footwear</span>
                    <span className='singleProduct-price'>$49.99</span>
                    <span className='singleProduct-description'>Elevate your style with these elegant high heels. Perfect for any occasion.</span>
                    <div className='specifications'>
                        <h3>Specifications</h3>
                        <ul>
                            <li>Material: Faux leather</li>
                            <li>Heel Height: 3 inches</li>
                            <li>Color: Black</li>
                        </ul>
                    </div>
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

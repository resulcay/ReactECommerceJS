import React from 'react'
import '../css/Product.css'
import { useNavigate } from 'react-router-dom'

export default function Product({ product }) {
    const { id, title, image, price } = product;
    const navigate = useNavigate();
    return (
        <div className='card'>
            <p style={{
                display: 'block',
                textOverflow: 'ellipsis',
                wordWrap: 'break-word',
                overflow: 'hidden',
                maxHeight: '3.6em',
                lineHeight: '1.8em'
            }}>{title}</p>
            <img className='image' src={image} />
            <div className='cartRow'>
                <h4>{price} $</h4>
                <button onClick={() => navigate(`/product-details/${id}`)} className='button addToCart'>View Details</button>
            </div>
        </div >
    )
}

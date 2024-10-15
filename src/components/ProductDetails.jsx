import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProduct } from '../redux/slices/productSlice';
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json';
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import '../css/ProductDetails.css';
import { addToBasket } from '../redux/slices/basketSlice';
import Swal from 'sweetalert2'

export default function ProductDetails() {

    const [amount, setAmount] = useState(0);
    const { id } = useParams();
    const { products, selectedProduct } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const { price = 0, title = '', image = '', description = '' } = selectedProduct || {};

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setCurrentProduct(product));
            }
        })
    }

    const addProductToBasket = () => {
        if (amount > 0 && selectedProduct) {
            const payload = { id, title, price, image, description, amount };
            dispatch(addToBasket(payload));
            setAmount(0);
            Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: 'Product added to cart',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                marginBottom: '500px'
            })
        }
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            {selectedProduct ? (
                <div style={{ display: 'flex', height: '95vh', marginTop: '60px' }}>
                    <div style={{ flex: 1, paddingLeft: '20px' }}>
                        <img src={image} alt={selectedProduct.name} style={{ width: '100%', height: 'auto', borderRadius: '15px' }} />
                    </div>
                    <div style={{ flex: 2, paddingLeft: '30px', alignItems: 'flex-start' }}>
                        <h2 style={{ margin: '0px' }}>{title}</h2>
                        <p>{description}</p>
                        <p style={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: 'grey'
                        }}>Price: ${price}</p>
                        <div className='amountSection'>
                            <FaMinusCircle size={28} onClick={
                                () => {
                                    if (amount > 0) {
                                        setAmount(amount - 1);
                                    }
                                }
                            } /><input className='amountInput' type="number" value={amount} min={0} max={20} maxLength={2}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    value = value.replace(/^0+(?=\d)/, '');
                                    if (value.length > 2) {
                                        value = value.slice(0, 2);
                                    }
                                    value = parseInt(value, 10);
                                    if (isNaN(value) || value < 0 || value.length > 2) {
                                        setAmount(0);
                                    } else if (value > 20) {
                                        setAmount(20);
                                    } else {
                                        setAmount(value);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === '-' || e.key === 'e') {
                                        e.preventDefault();
                                    }
                                }} /><FaPlusCircle size={28} onClick={
                                    () => {
                                        if (amount < 20) {
                                            setAmount(amount + 1);
                                        }
                                    }
                                }
                            />
                        </div>
                        <div style={{
                            width: '100%',
                        }}>
                            <button onClick={() => addProductToBasket()} style={{
                                width: '100%',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                backgroundColor: 'green',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignSelf: 'flex-end'
                            }}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}>
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                    />
                </div>
            )}
        </div>
    )
}

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json';
import Product from './Product';

export default function ProductList() {

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);
    const { loading } = useSelector((state) => state.product);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    return (
        <div className='flex-row' style={{
            flexWrap: 'wrap',
            marginTop: '20px',
        }}>
            {
                loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}>
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                    />
                </div>

                    : products && products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
            }

        </div>
    )
}

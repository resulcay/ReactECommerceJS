import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import ProductDetails from '../components/ProductDetails'

export default function RouterConfig() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

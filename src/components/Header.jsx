import React, { useState } from 'react'
import '../css/Header.css'
import Badge from '@mui/material/Badge';
import { FaShoppingCart } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from '../redux/slices/appSlice';

export default function Header() {
    const [theme, setTheme] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.basket);
    const toggleTheme = () => {
        const root = document.getElementById('root');
        setTheme(!theme);
        if (theme) {
            root.style.backgroundColor = 'black';
            root.style.color = '#fff';
            root.style.transition = 'all 1.0s';
        } else {
            root.style.backgroundColor = 'white';
            root.style.color = '#000';
            root.style.transition = 'all 1.0s';
        }
    }
    const showDrawer = () => {
        dispatch(toggleDrawer(true));
    }
    return (
        <div className='flex-row-reverse'>
            <div className='flex-row' onClick={() => navigate("/")}>
                <img className='logo' src={logo}></img>
            </div>
            <div className='flex-row'>
                <input className={theme ? 'searchInput' : 'searchInputDark'} type='text' placeholder='Search' />
                <div className='headerIcons'>
                    {
                        theme ? <FaSun size={28} onClick={toggleTheme} /> : <FaMoon size={28} onClick={toggleTheme} />
                    }
                    <Badge onClick={() => showDrawer()} badgeContent={products.length} color="primary">
                        <FaShoppingCart size={28} />
                    </Badge>
                </div>
            </div>
        </div>
    )
}
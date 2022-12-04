import { useEffect } from "react";
import { selectAllCategories, fetchCategories } from "../redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../redux/productsSlice";

import { Link } from "react-router-dom";
import {HiOutlineUser} from 'react-icons/hi';
import {BsCart} from 'react-icons/bs';

const Menu = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);
    
    const categories = useSelector(selectAllCategories);

    const cartLength = useSelector(selectCart).length;

    return (
        <ul className="menu">
            <div className="menu__links">
                <Link to="/" className="menu__link" >Home</Link>
                {
                    categories.map(category => (
                        <Link key={category} className="menu__link">{category}</Link>
                    ))
                }
            </div>
            <div className="menu__options">
                <Link to="/auth"><HiOutlineUser className="icon icon--account" /></Link>
                <Link style={{display: 'flex', alignItems: 'center', gap: '.5rem'}} to="/cart">
                    <BsCart className="icon icon--cart" /> 
                    <span style={{background: '#000', color: '#fff', padding: '0 .35rem', borderRadius: '50%'}} >{cartLength}</span>
                </Link>
            </div>
        </ul>
    )
}

export default Menu;
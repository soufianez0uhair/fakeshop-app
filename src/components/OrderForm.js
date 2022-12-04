import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, emptyCart } from "../redux/productsSlice";

import {BiShoppingBag} from 'react-icons/bi';
import { ORDERS_API } from "../api";
import axios from "axios";

const OrderForm = ({setIsOrder}) => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let newTotal = 0;
        for(let i = 0; i < cart.length; i++) {
            newTotal += cart[i].total;
        }
        setTotal(newTotal);
        setOrder({
            ...order,
            products: cart
        })
    }, [cart]);

    const countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

    const [order, setOrder] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        products: cart
    });

    function handleChange(e) {
        const {name, value} = e.target;

        setOrder({
            ...order,
            [name]: value
        })
    }

    const canSave = [order.firstName, order.lastName, order.email, order.phone, order.address, order.city, order.country].every(Boolean);

    const [error, setError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if(canSave) {
            if(order.products.length > 0) {
                axios.post(ORDERS_API, order)
                    .then(data => {
                        setIsOrder(data.data.success);
                    })
                    .catch(err => setError(err.response.data.message))
            } else {
                setError('Cart is empty. Please add more items!');
            }
        } else {
            setError('Please fill in all the fields!');
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="orderForm">
            <h3 className="orderForm__shipping">Free worldwide shipping(7 days max).</h3>
            <div className="orderForm__input">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" value={order.firstName} onChange={(e) => handleChange(e)} />
            </div>
            <div className="orderForm__input">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" value={order.lastName} onChange={(e) => handleChange(e)} />
            </div>
            <div className="orderForm__input">
               <label htmlFor="email">Email</label>
               <input type="text" name="email" value={order.email} onChange={(e) => handleChange(e)} /> 
            </div>
            <div className="orderForm__input">
               <label htmlFor="phone">Phone</label>
               <input type="text" name="phone" value={order.phone} onChange={(e) => handleChange(e)} /> 
            </div>
            <div className="orderForm__input">
               <label htmlFor="address">Address</label>
               <input type="text" name="address" value={order.address} onChange={(e) => handleChange(e)} /> 
            </div>
            <div className="orderForm__country-city">
                <div className="orderForm__input">
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" value={order.city} onChange={(e) => handleChange(e)} /> 
                </div>
                <div className="orderForm__input">
                    <label htmlFor="country">Country</label>
                    <select name="country" value={order.country} onChange={(e) => handleChange(e)} id="country" >
                        <option value="">Select</option>
                        {
                            countryList.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="orderForm__confirmOrder">
                <h3 className="orderForm__total">{total}$</h3>
                <button className="btn btn--orderConfirmation"><BiShoppingBag className="icon icon--shoppingBag" /> Confirm Order</button>
                {error && <span className="orderForm__error">{error}</span> }
            </div>
        </form>
    )
}

export default OrderForm;
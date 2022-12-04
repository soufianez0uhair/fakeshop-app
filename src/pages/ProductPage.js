import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/productsSlice";
import { BsCart } from "react-icons/bs";
import { useEffect, useState } from "react";
import { PRODUCTS_API } from "../api";

import Loader from "../components/Loader";

const ProductPage = () => {
    const dispatch = useDispatch();

    const {id} = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetch(`${PRODUCTS_API}/${id}`)
            .then(res => res.json())
            .then(data => {
                setOrder({
                    ...data,
                    quantity: 1,
                    total: data.price
                });
            });
    }, []);

    function handleChange(e) {
        if(e.target.value <= 100 && e.target.value > 0) {
            setOrder({
                        ...order,
                        quantity: Number(e.target.value),
                        total: order.price * Number(e.target.value)
            })
        }
    }

    function incrementQuantity() {
        if(order.quantity < 99) {
            setOrder({
                ...order,
                quantity: order.quantity + 1,
                total: order.price * (order.quantity + 1)
            })
        }
    }

    function decrementQuantity() {
        if(order.quantity > 1) {
            setOrder({
                ...order,
                quantity: order.quantity - 1,
                total: order.price * (order.quantity - 1)
            })
        }
    }

    
    return (
        order ? <div className="productPage">
            <div className="productPage__img">
                <img src={order.image} alt={order.title} />
            </div>
            <div className="productPage__details">
                <h1 className="productPage__title">{order.title}</h1>
                <span className="productPage__price">{order.price + '$'}</span>
                <div className="productPage__quantity">
                    <span onClick={decrementQuantity} className="productPage__quantity__operator">-</span>
                    <input type="text" value={order.quantity} onChange={(e) => handleChange(e)} className="productPage__quantity__input" />
                    <span onClick={incrementQuantity} className="productPage__quantity__operator">+</span>
                </div>
                <button onClick={() => dispatch(addToCart(order))} className="btn btn--addToCart"><BsCart className="icon icon--cart" />Add to cart</button>
                {order.total > order.price && <h3 className="productPage__total">
                    Total: {order.total.toFixed(2)}$
                </h3>}
            </div>
        </div> : <Loader />
    )
}

export default ProductPage;
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../redux/productsSlice";
import { useNavigate } from "react-router-dom";

import OrdersItem from "./OrdersItem";

const OrdersList = () => {
    const navigate = useNavigate();

    const cart = useSelector(selectCart);

    useEffect(() => {
        if(cart.length === 0) {
            navigate('/');
        }
    }, [cart]);
    
    return (
        <div className="ordersList">
            {
                cart.map(order => (
                    <OrdersItem key={order.id} order={order} />
                ))
            }
        </div>
    )
}

export default OrdersList;
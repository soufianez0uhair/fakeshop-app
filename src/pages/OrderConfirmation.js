import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../redux/productsSlice";

import OrdersList from "../components/OrdersList";
import OrderForm from "../components/OrderForm";
import OrderMessage from "../components/OrderMessage";

const OrderConfirmation = () => {
    const dispatch = useDispatch();
    const [isOrder, setIsOrder] = useState(false);

    useEffect(() => {
        if(isOrder) {
            dispatch(emptyCart());
        }
    }, [isOrder])
    return (
        !isOrder ? <div className="orderConfirmation">
            <div className="orderConfirmation__orders">
                <h2 className="orderConfirmation__orders__title">Orders</h2>
                <OrdersList />
            </div>
            <div className="orderConfirmation__form">
                <OrderForm setIsOrder={setIsOrder} />
            </div>
        </div> : <OrderMessage />
    )
}

export default OrderConfirmation;
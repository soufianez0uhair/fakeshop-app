import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/productsSlice";

import {MdDelete} from 'react-icons/md';

const OrdersItem = ({order}) => {
    const dispatch = useDispatch();

    return (
        <div className="orderItem">
            <div className="orderItem__img">
                <img src={order.image} alt={order.title} />
            </div>
            <div className="orderItem__price">{order.price}$</div>
            <MdDelete onClick={() => dispatch(removeFromCart({id: order.id}))} className="icon icon--delete icon--delete--orderItem" />
        </div>
    )
}

export default OrdersItem;
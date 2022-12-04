import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, handleQuantity, removeFromCart } from '../redux/productsSlice';

import {MdDelete} from 'react-icons/md';

const CartItem = ({product}) => {
    const dispatch = useDispatch();

    return (
        <div className="cartItem">
            <div className="cartItem__img">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="cartItem__details">
                <h3 className="cartItem__title">{product.title}</h3>
                <div className="productPage__quantity">
                    <span onClick={() => dispatch(decrementQuantity({id: product.id}))} className="productPage__quantity__operator">-</span>
                    <input onChange={(e) => dispatch(handleQuantity({id: product.id, number: e.target.value}))} value={product.quantity} className="productPage__quantity__input" />
                    <span onClick={() => dispatch(incrementQuantity({id: product.id}))} className="productPage__quantity__operator">+</span>
                </div>
                <span className="cartItem__total">{product.total.toFixed(2) + '$'}</span>
            </div>
            <div className="cartItem__options">
                <MdDelete onClick={() => dispatch(removeFromCart({id: product.id}))} className="icon icon--delete" />
            </div>
        </div>
    )
}

export default CartItem;
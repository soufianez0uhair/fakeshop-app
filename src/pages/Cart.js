import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { selectCart } from "../redux/productsSlice";

const Cart = () => {
    const products = useSelector(selectCart);

    const productsEl = products.map(product => (
        <CartItem product={product} key={product.id} />
    ))

    let total = 0;
    for(let i = 0; i < products.length; i++) {
        total += products[i].total;
    }

    return (
        products.length ? <div className="cart">
            <div className="cart__items">
                {
                    productsEl
                }
            </div>
            <div className="cart__details">
                <span className="cart__total">Total: {total.toFixed(2)}$</span>
                <Link to="/orderconfirmation" ><button className="btn btn--order">Order now</button></Link>
            </div>
        </div> : <div className="cart">
            <h2 className="cart__empty">Cart is empty.</h2>
        </div>
    )
}

export default Cart;
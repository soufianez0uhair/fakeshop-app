import { Link } from "react-router-dom";

const Product = ({product}) => {

    return (
        <Link className="product" to={`/products/${product.id}`} >
                <div className="product__img">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="product__details">
                    <h3 className="product__title">{product.title}</h3>
                    <span className="product__price">{product.price + '$'}</span>
                </div>
        </Link>
    )
}

export default Product;
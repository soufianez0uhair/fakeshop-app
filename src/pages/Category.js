import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import ProductsList from '../components/ProductsList';
import { PRODUCTS_API } from "../api";

const Category = () => {
    const {category} = useParams();

    const categoriesImgs = {
        electronics: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg',
        jewelery: 'https://wallpaperaccess.com/full/685275.jpg',
        "men's clothing": 'https://images8.alphacoders.com/672/672301.jpg',
        "women's clothing": 'https://wallpapercave.com/wp/wp6130531.jpg'
    }

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${PRODUCTS_API}/category/${category}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [category]);

    return (
        <div className="category">
            <Hero bgImgs={[categoriesImgs[category]]} text={category[0].toUpperCase() + category.slice(1)} />
            <div className="products">
                <ProductsList products={products} />
            </div>
        </div>
    )
}

export default Category;
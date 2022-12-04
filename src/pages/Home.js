import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllProducts, getStatusProducts, getErrorProducts, selectAllCategories, fetchProducts } from "../redux/productsSlice";

import Hero from "../components/Hero";
import ProductsList from "../components/ProductsList";
import Loader from "../components/Loader";

const Home = () => {
    const dispatch = useDispatch();

    const products = useSelector(selectAllProducts);
    const productsStatus = useSelector(getStatusProducts);
    const productsError = useSelector(getErrorProducts);

    useEffect(() => {
        if(productsStatus === 'idle') {
            dispatch(fetchProducts());
        } else if(productsStatus === 'succeeded') {
            setShowedProducts(products);
        }
    }, [dispatch, productsStatus]);

    const categories = useSelector(selectAllCategories);

    const [category, setCategory] = useState('');

    const [showedProducts, setShowedProducts] = useState(products);
    
    useEffect(() => {
        if(!category) {
            setShowedProducts(products);
        } else {
            setShowedProducts(products.filter(product => product.category === category));
        }
    }, [category]);

    return (
        <div className="home">
            <Hero bgImgs={['https://pbs.twimg.com/media/CzQc7C3XUAI2Adr?format=jpg&name=large', 'https://images.unsplash.com/photo-1494607239400-ff147da48308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80']} text="Stay Up-To-Date With Fashion Trends" />
            <div className="products">
                <h2 className="products__title">All Products</h2>
                <div className="products__filter">
                    <label htmlFor="category">Filter by category:</label>
                    <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} className="products__filter__select">
                        <option value="">All Products</option>
                        {
                            categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))
                        }
                    </select>
                </div>
                {productsStatus === 'loading' ? <Loader /> : productsStatus === 'succeeded' ? <ProductsList products={showedProducts} /> : <span className="products__error">{productsError}</span> }
            </div>
        </div>
    )
}

export default Home;
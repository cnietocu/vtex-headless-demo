import { useState } from 'react';
import SearchBox from '../components/SearchBox';
import Banner from '../components/Banner';
import styles from '../styles/ProductList.module.css';

export default function Home() {
    const [products, setProducts] = useState([]);

    const handleSearch = async (query) => {
        const res = await fetch(`/api/search?query=${query}`);
        const data = await res.json();
        setProducts(data.products);
    };

    return (
        <div>
            <div className={styles.container}>
            <h1 className={styles.title}>Welcome to VTEX Headless Demo</h1>
                <p className={styles.subtitle}>Search for products and explore our catalog</p>
                <SearchBox onSearch={handleSearch} />
            </div>
            {/* Render the product list */}
            <div className={styles.productList}>
            {products.map((product) => (
                <div key={product.productId} className={styles.productCard}>
                <img src={product.items[0].images[0].imageUrl} alt={product.productName} className={styles.productImage} />
                <h3 className={styles.productName}>{product.productName}</h3>
                <p className={styles.productSku}>SKU: {product.items[0].itemId}</p>
                <a className={styles.productLink} href={product.linkText}>View product</a>
                <p className={styles.productPrice}>${product.items[0].sellers[0].commertialOffer.Price.toLocaleString('es-CO')}</p>
                </div>
            ))}
            </div>
        </div>
    );
}
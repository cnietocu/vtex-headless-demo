import { useState } from 'react';
import SearchBox from '../components/SearchBox';
import styles from '../styles/ProductList.module.css';

export default function Home() {
    const [products, setProducts] = useState([]);

    const handleSearch = async (query) => {
        const res = await fetch(`/api/search?query=${query}`);
        const data = await res.json();
        setProducts(data.products);
    };

  // Function to format the price
  const formatPrice = (price) => {
    return price.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP', // Change to the appropriate currency if needed
    });
  };

    return (
        <div>
        <div className={styles.container}>
        <h1 className={styles.title}>Welcome to VTEX Headless Demo</h1>
            <p className={styles.subtitle}>Search for products and explore our catalog</p>
            <SearchBox onSearch={handleSearch} />
        </div>
            <div>
                {products.map(product => (
                    <div key={product.productId}>
                        <h2 className={styles.productName}>{product.productName}</h2>
                        <img className={styles.productImage} src={product.items[0].images[0].imageUrl} alt={product.productName} />
                        <p className={styles.productSku}>SKU: {product.items[0].itemId}</p>
                        <a className={styles.productLink}href="url">{product.link}</a>
                        <p className={styles.productDescription}>Description: {product.description}</p>
                        <p className={styles.productPrice}>Price: {formatPrice(product.items[0].sellers[0].commertialOffer.Price)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
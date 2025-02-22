import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css"; 

const Navbar = () => (
  <nav className="navbar">
    <h1>Fashion Shoppy</h1>
  </nav>
);

const Footer = () => (
  <footer className="footer">
    <p>© {new Date().getFullYear()} Fashion Shoppy. All rights reserved.</p>
  </footer>
);

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4 text-center w-full">Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="product-details-container">
      <h1 className="product-title">{product.title}</h1>
      <div className="product-content">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-image"
        />
        <div className="product-info">
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <Link to="/" className="back-link">Back to Products</Link>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
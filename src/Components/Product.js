import React, { useState } from 'react';
import './Product.css';
import { FaTh, FaList } from 'react-icons/fa';
import ProductDetails from './ProductDetails';

const Product = ({ updateCart }) => {
  const [products, setProducts] = useState(ProductDetails);
  const [view, setView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const addToCart = (item) => {
    if (selectedQuantity > item.quantityAvailable) {
      alert(`Quantity available is only ${item.quantityAvailable}`);
      return;
    }
    const updatedItem = {
      ...item,
      quantity: item.quantity + selectedQuantity,
    };
    updateCart(updatedItem);
    setSelectedProduct(null);
  };

  const removeFromCart = (item) => {
    if (item.quantity > 0) {
      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
      };
      updateCart(updatedItem);
    }
  };

  const toggleView = () => {
    setView(view === 'grid' ? 'list' : 'grid');
  };

  const changeItemsPerPage = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value));
  };

  return (
    <div>
      <div className="view-icons">
        <FaTh
          className={`view-icon ${view === 'grid' ? 'active' : ''}`}
          onClick={() => setView('grid')}
        />
        <FaList
          className={`view-icon ${view === 'list' ? 'active' : ''}`}
          onClick={() => setView('list')}
        />
      </div>
      <div className={view === 'grid' ? 'grid-view' : 'list-view'}>
        {currentItems.map((product) => (
          <div className={`product ${view === 'list' ? 'list-layout' : ''}`} key={product.id}>
            {view === 'list' && (
              <div className="product-image-container">
                <img className="product-image" src={product.imageUrl} alt={product.name} />
              </div>
            )}
            <div className="product-details">
              {view === 'grid' && (
                <div className="product-image-container">
                  <img className="product-image" src={product.imageUrl} alt={product.name} />
                </div>
              )}
              <div className="product-info">
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                {view === 'list' && <p>Quantity available: {product.quantityAvailable}</p>}
              </div>
              <div className="product-actions">
                {selectedProduct && selectedProduct.id === product.id ? (
                  <div className="quantity-container">
                    <input
                      type="number"
                      min="1"
                      value={selectedQuantity}
                      onChange={handleQuantityChange}
                    />
                    <button className="add-to-cart-button" onClick={() => addToCart(selectedProduct)}>
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <div className="page">
        <button onClick={() => changeItemsPerPage(10)}>10 per page</button>
        <button onClick={() => changeItemsPerPage(20)}>20 per page</button>
        </div>
        <div className='next'> 
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

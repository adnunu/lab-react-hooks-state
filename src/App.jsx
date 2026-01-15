import { useState } from 'react'
import './App.css'

function App() {
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // State for cart
  const [cart, setCart] = useState([])
  
  // State for category filter
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Products data
  const products = [
    { id: 1, name: 'Apple', category: 'Fruits' },
    { id: 2, name: 'Milk', category: 'Dairy' },
    { id: 3, name: 'Bread', category: 'Bakery' },
    { id: 4, name: 'Chicken', category: 'Meat' },
  ]
  
  // Categories
  const categories = ['All', 'Fruits', 'Dairy', 'Bakery', 'Meat', 'NonExistent']
  
  // Filter products
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory)
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  
  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product.name]) // Store just the name, not the whole object
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <header>
        <h1>Grocery Store</h1>
        <button 
          onClick={toggleDarkMode}
          data-testid="dark-mode-toggle"
          aria-label="toggle"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      
      <main>
        <div className="controls">
          <div className="filter">
            <label htmlFor="category">Filter by Category: </label>
            <select 
              id="category" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              data-testid="category-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="cart">
            <h2>Shopping Cart ({cart.length} items)</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    {item} is in your cart
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="shopping-list">
          <h2>Shopping Items</h2>
          <div className="items">
            {filteredProducts.length === 0 ? (
              <p>No products available</p>
            ) : (
              filteredProducts.map(product => (
                // KEY CHANGE: The entire product div is clickable
                <div 
                  key={product.id} 
                  className="item" 
                  data-testid={`product-${product.id}`}
                  onClick={() => addToCart(product)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{product.name}</h3>
                  <p>Category: {product.category}</p>
                  {/* This looks like a button but is just a div for styling */}
                  <div className="add-to-cart">Add to Cart</div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
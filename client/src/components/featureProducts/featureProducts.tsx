'use client';

import { useState, useEffect } from 'react';
import styles from './featureProducts.module.scss';
import { ProductCard } from './featureCard/card';
import { featuredProducts, Product } from './featureData/data';
import { QuickViewModal } from './QuickViewModal';

export const FeaturedProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(featuredProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('default');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Get all unique categories
  const categories = ['all', ...new Set(featuredProducts.map(product => product.category))];

  // Filter and sort products
  useEffect(() => {
    let products = [...featuredProducts];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      products = products.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming newer products have higher IDs for this demo
        products.sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
        break;
      default:
        // Default sorting (original order)
        break;
    }
    
    setFilteredProducts(products);
  }, [selectedCategory, sortOption]);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>Curated selection of our finest items</p>
        </div>

        {/* Filter and Sort Controls */}
        <div className={styles.controls}>
          <div className={styles.filterGroup}>
            <label htmlFor="category-filter" className={styles.filterLabel}>Filter:</label>
            <select
              id="category-filter"
              className={styles.filterSelect}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="sort-option" className={styles.filterLabel}>Sort by:</label>
            <select
              id="sort-option"
              className={styles.filterSelect}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className={styles.noResults}>
            <p>No products match your selected filters.</p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSortOption('default');
              }}
              className={styles.resetButton}
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className={styles.ctaContainer}>
          <button className={styles.viewAllButton}>View All Products</button>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={closeQuickView}
        />
      )}
    </section>
  );
};
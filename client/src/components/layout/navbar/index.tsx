"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Menu, User, X } from "lucide-react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import Typography from "@/components/typos";
import { useCartStore } from "../../../stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import LogoutButton from "@/components/logout-button";
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";
import { SearchIcon } from "@/components/icons/searchIcon";
import { CartIcon } from "@/components/icons/cartIcon";
import { generateSlug } from "@/helpers";
import { Logo } from "@/components/icons/logo";
import { toast } from "react-hot-toast";

// Category Skeleton Component
const CategorySkeleton = () => (
  <div className={styles.nav_link}>
    <div className={styles.skeleton_nav_link}>
      <div className={styles.skeleton_text}></div>
      <div className={styles.skeleton_icon}></div>
    </div>
  </div>
);

export const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const itemCount = useCartStore(
    (state) => state.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
  );
  const { user, isAuthenticated } = useAuthStore();

  const {
    fetchCategories,
    categories,
    isLoading: categoriesLoading,
  } = useCategoryStore();
  const {
    fetchProductsBrands,
    fetchProducts,
    products,
    productBrands,
    productsByCategory,
  } = useProductStore();

  const categorysListing =
    categories?.map((category) => ({
      label: category.name,
      href: `/${category.name.toLowerCase()}`,
    })) ?? [];

  useEffect(() => {
    const initializeData = async () => {
      try {
        if (!categories?.length) {
          await fetchCategories();
        }
        if (!productBrands?.length) {
          await fetchProductsBrands();
        }
        if (!products?.length) {
          await fetchProducts(1, 10);
        }
      } catch (error) {
        console.error("Failed to load initial data:", error);
        toast.error("Failed to load initial data.");
      }
    };

    initializeData();
  }, [
    categories,
    productBrands,
    products,
    fetchCategories,
    fetchProductsBrands,
    fetchProducts,
  ]);

  // Focus search input when expanded
  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchExpanded]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchExpanded && !searchContainerRef.current?.contains(event.target as Node)) {
        setSearchExpanded(false);
      }
    };

    if (searchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchExpanded]);

  const handleSearchClick = () => {
    setSearchExpanded(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = searchInputRef.current?.value.trim();
    if (searchTerm) {
      // Navigate to search results page or handle search
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
      setSearchExpanded(false);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchExpanded(false);
    }
  };

  const getDropdownContent = (label: string) => {
    // Dynamic dropdown for categories
    const categoryProducts = productsByCategory[label];
    if (categoryProducts) {
      // Capitalize category name
      const categoryTitle = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
      // Main column: first 12 products
      const mainProducts = categoryProducts.slice(0, 12);
      // Exclude main column from top picks if possible
      const remainingProducts = categoryProducts.slice(12);
      const topPicksSource = remainingProducts.length > 0 ? remainingProducts : categoryProducts;
      const topPicks = topPicksSource
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);
      return (
        <div className={styles.dropdownModalContentGrid}>
          <div className={styles.dropdownColGrid}>
            <div className={styles.dropdownColTitleGrid}>{categoryTitle}</div>
            {mainProducts.length > 0 ? (
              mainProducts.map((product: typeof categoryProducts[0]) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={styles.dropdownItemGrid}
                >
                  {product.name}
                </Link>
              ))
            ) : (
              <div className={styles.dropdownItemGrid} style={{ color: "#888" }}>
                No products
              </div>
            )}
          </div>
          <div className={styles.dropdownColGrid}>
            <div className={styles.dropdownColTitleGrid}>Top Picks</div>
            {topPicks.length > 0 ? (
              topPicks.map((product: typeof categoryProducts[0]) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={styles.dropdownItemGrid}
                >
                  {product.name}
                </Link>
              ))
            ) : (
              <div className={styles.dropdownItemGrid} style={{ color: "#888" }}>
                No products
              </div>
            )}
          </div>
        </div>
      );
    }
    // No static fallback, just return null
    return null;
  };

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredLabel(label);
    setIsHovering(true);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovering(false);
      setHoveredLabel(null);
      setOpenDropdown(null);
    }, 250);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.top_bar} wrapper`}>
        <div className={styles.logo_main_nav}>
          <div className={styles.logo_main_nav_mobile}>
            <div
              className={styles.menu_icon}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
            <Link href="/" className={styles.logo}>
              <Logo />
            </Link>
          </div>

          <div className={styles.main_nav}>
            {categoriesLoading
              ? // Show skeleton loaders while categories are loading
                Array.from({ length: 4 }).map((_, index) => (
                  <CategorySkeleton key={index} />
                ))
              : categorysListing.map((link) => {
                  const isMobileDropdownOpen =
                    mobileOpen && openDropdown === link.label;
                  const isDesktopDropdownOpen =
                    !mobileOpen &&
                    openDropdown === link.label &&
                    hoveredLabel === link.label &&
                    isHovering;
                  const isDropdownOpen =
                    isMobileDropdownOpen || isDesktopDropdownOpen;

                  return (
                    <div
                      key={link.href}
                      className={styles.nav_link}
                      onMouseEnter={() => {
                        if (!mobileOpen) {
                          handleMouseEnter(link.label);
                        }
                      }}
                      onMouseLeave={() => {
                        if (!mobileOpen) {
                          handleMouseLeave();
                        }
                      }}
                      tabIndex={0}
                    >
                      <Link
                        href={`/products/category/${generateSlug(link.label)}`}
                      >
                        <Typography
                          variant="span"
                          role="button"
                          aria-expanded={isDropdownOpen}
                          aria-controls={`dropdown-${link.label.toLowerCase()}`}
                          className={styles.nav_link_label}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                          onClick={() => {
                            if (mobileOpen) {
                              setOpenDropdown(
                                openDropdown === link.label ? null : link.label,
                              );
                            }
                          }}
                        >
                          {link.label}
                          <IoMdArrowDropdown
                            size={14}
                            className={styles.dropdown_icon}
                          />
                        </Typography>
                      </Link>
                      <>
                        {mobileOpen && openDropdown === link.label && (
                          <div className={styles.dropdownModal}>
                            {getDropdownContent(link.label)}
                          </div>
                        )}

                        {!mobileOpen &&
                          openDropdown === link.label &&
                          isHovering && (
                            <div
                              id={`dropdown-${link.label.toLowerCase()}`}
                              className={styles.dropdownModal}
                              onMouseEnter={() => handleMouseEnter(link.label)}
                              onMouseLeave={handleMouseLeave}
                            >
                              {getDropdownContent(link.label)}
                            </div>
                          )}
                      </>
                    </div>
                  );
                })}
          </div>
        </div>

        <div className={styles.account_cart}>
          <div
            ref={searchContainerRef}
            className={`${styles.search_container} ${searchExpanded ? styles.expanded : ''}`}
            onClick={!searchExpanded ? handleSearchClick : undefined}
            style={{ cursor: !searchExpanded ? 'pointer' : 'default' }}
          >
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%' }}>
              <input
                ref={searchInputRef}
                className={styles.search_input}
                type="text"
                placeholder="Search here"
                onKeyDown={handleSearchKeyDown}
                readOnly={!searchExpanded}
              />
              <Typography
                variant="span"
                className={`${styles.search_icon} ${styles.hideOnMobile}`}
                onClick={handleSearchClick}
              >
                <SearchIcon />
              </Typography>
            </form>
          </div>
          <div className={styles.nav_right}>
            {isAuthenticated && user ? (
              <Link
                href={user.role === "admin" ? "/admin/dashboard" : "/profile"}
                className={styles.profile}
              >
                <div className={styles.username}>
                  {mobileOpen ? (
                    <FiUser className={styles.Icon} />
                  ) : (
                    <> {user.name || <FiUser className={styles.Icon} />}</>
                  )}
                </div>
              </Link>
            ) : (
              <div className={styles.account}>
                <div className={styles.account_link}>
                  <Link href="/login">
                    <User color="#000" />
                    {/* <Typography variant="span" className={styles.login}>
                      LOG IN
                    </Typography> */}
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className={styles.cart}>
            <Link href="/add-carts" className={styles.cart_link}>
              <CartIcon />
              {itemCount > 0 && (
                <span className={styles.cartCount}>{itemCount}</span>
              )}
            </Link>
          </div>

          {isAuthenticated && <LogoutButton />}
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`${styles.mobileSidebar} ${mobileOpen ? styles.open : ""}`}
      >
        <div className={styles.sidebarContent}>
          <h3>Categories</h3>
          <ul>
            {categoriesLoading
              ? // Show skeleton loaders in mobile sidebar
                Array.from({ length: 6 }).map((_, index) => (
                  <li key={index} className={styles.skeleton_mobile_item}>
                    <div className={styles.skeleton_mobile_text}></div>
                  </li>
                ))
              : Object.entries(productsByCategory)
                  .slice(0, 4)
                  .map(([categoryName]) => (
                    <li key={categoryName}>
                      <Link
                        className={styles.mobileSidebarLink}
                        href={`/products/category/${generateSlug(
                          categoryName,
                        )}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {categoryName}
                      </Link>
                    </li>
                  ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

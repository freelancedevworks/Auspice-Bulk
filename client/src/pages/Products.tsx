import { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronRight, Package2, Search, Plus, Minus, X } from 'lucide-react';
import materialsData from '../data/materials.json';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/Products.css';

interface Subcategory {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface MaterialType {
  type: string;
  description: string;
  subcategories: Subcategory[];
}

interface FilteredSubcategory extends Subcategory {
  matches: boolean;
}

interface FilteredMaterial extends Omit<MaterialType, 'subcategories'> {
  subcategories: FilteredSubcategory[];
  hasMatches: boolean;
}

export default function Products() {
  const [sidebarSelectedType, setSidebarSelectedType] = useState<string | null>(null);
  const [cardExpandedTypes, setCardExpandedTypes] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<Subcategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGrid, setExpandedGrid] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const typeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollTimeoutRef = useRef<number | null>(null);
  const searchTimeoutRef = useRef<number | null>(null);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobileView(mobile);
      setSidebarVisible(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setCardExpandedTypes([]);
    setExpandedGrid(false);
  };

  // Enhanced search functionality with debouncing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = window.setTimeout(() => {
      const query = value.toLowerCase().trim();
      if (query) {
        const matchingTypes = materialsData.materials.filter(material => {
          const hasMatchingSubcategory = material.subcategories.some(sub => 
            sub.name.toLowerCase().includes(query) || 
            sub.description.toLowerCase().includes(query)
          );
          return hasMatchingSubcategory;
        }).map(material => material.type);

        setCardExpandedTypes(matchingTypes);
        setExpandedGrid(matchingTypes.length > 0);

        if (matchingTypes.length === 1) {
          requestAnimationFrame(() => {
            scrollToType(matchingTypes[0]);
          });
        }
      } else {
        setCardExpandedTypes([]);
        setExpandedGrid(false);
      }
    }, 300);
  };

  // Enhanced filtering logic
  const filteredMaterials = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) return materialsData.materials.map(material => ({
      ...material,
      subcategories: material.subcategories.map(sub => ({ ...sub, matches: true })),
      hasMatches: true
    }));

    return materialsData.materials.map((material): FilteredMaterial => {
      // Check if material type or description matches
      const typeMatches = material.type.toLowerCase().includes(query);
      const descriptionMatches = material.description.toLowerCase().includes(query);

      // Filter and mark matching subcategories
      const filteredSubcategories = material.subcategories.map((sub): FilteredSubcategory => {
        const nameMatches = sub.name.toLowerCase().includes(query);
        const descMatches = sub.description.toLowerCase().includes(query);
        return {
          ...sub,
          matches: nameMatches || descMatches
        };
      });

      // Check if any subcategories match
      const hasMatchingSubcategories = filteredSubcategories.some(sub => sub.matches);

      return {
        type: material.type,
        description: material.description,
        subcategories: filteredSubcategories,
        hasMatches: typeMatches || descriptionMatches || hasMatchingSubcategories
      };
    }).filter(material => material.hasMatches);
  }, [searchQuery]);

  const scrollToType = (type: string) => {
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    const typeElement = typeRefs.current[type];
    if (typeElement) {
      scrollTimeoutRef.current = window.setTimeout(() => {
        const navbarHeight = 80;
        const heroSection = document.querySelector('.hero-section-products');
        const heroHeight = heroSection?.getBoundingClientRect().height || 0;
        const elementRect = typeElement.getBoundingClientRect();
        const elementPosition = window.pageYOffset + elementRect.top;
        
        const scrollPadding = 40;
        const scrollPosition = elementPosition - navbarHeight - scrollPadding;
        
        window.scrollTo({
          top: Math.max(heroHeight, scrollPosition),
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const handleSidebarClick = (type: string) => {
    setSidebarSelectedType(prevType => {
      const newType = prevType === type ? null : type;
      
      setCardExpandedTypes(prev => {
        if (newType === null) {
          return prev.filter(t => t !== type);
        }
        return [type];
      });
      
      setExpandedGrid(newType !== null);
      return newType;
    });

    if (isMobileView) {
      setSidebarVisible(false);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (type) scrollToType(type);
      });
    });
  };

  const handleCardClick = (type: string) => {
    setCardExpandedTypes(prev => {
      const isCurrentlyExpanded = prev.includes(type);
      const newExpandedTypes = isCurrentlyExpanded ? prev.filter(t => t !== type) : [...prev, type];
      setExpandedGrid(newExpandedTypes.length > 0);

      if (!isCurrentlyExpanded) {
        scrollToType(type);
      }

      return newExpandedTypes;
    });
  };

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  const isCardExpanded = (type: string) => cardExpandedTypes.includes(type);

  return (
    <div className="products-page">
      <ScrollToTop />
      
      <section className="hero-section-products">
        <div className="hero-overlay" />
        <div className="section-content">
          <h1>Our Products</h1>
          <p>Explore our comprehensive range of high-quality products</p>
          
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button
              className={`clear-search ${searchQuery ? 'visible' : ''}`}
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="waves-container">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <path
                id="wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="wave-parallax">
              <use href="#wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
              <use href="#wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use href="#wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use href="#wave" x="48" y="7" fill="rgba(255,255,255,0.2)" />
            </g>
          </svg>
        </div>
      </section>

      <div className="products-layout">
        {isMobileView && (
          <button 
            className="toggle-sidebar-btn"
            onClick={toggleSidebar}
            aria-label={sidebarVisible ? "Hide categories" : "Show categories"}
          >
            <Package2 size={24} />
            <span>{sidebarVisible ? "Hide Categories" : "Show Categories"}</span>
          </button>
        )}

        <aside className={`products-sidebar ${sidebarVisible ? 'visible' : ''}`}>
          <h2>Product Categories</h2>
          <nav>
            {materialsData.materials.map((material) => (
              <div key={material.type} className="sidebar-category">
                <button
                  className={`sidebar-item ${sidebarSelectedType === material.type ? 'active' : ''}`}
                  onClick={() => handleSidebarClick(material.type)}
                >
                  <Package2 size={20} className="category-icon" />
                  <span>{material.type}</span>
                  <ChevronRight 
                    size={20} 
                    className={`chevron-icon ${sidebarSelectedType === material.type ? 'rotate' : ''}`}
                  />
                </button>
                <div className={`sidebar-subcategories ${sidebarSelectedType === material.type ? 'show' : ''}`}>
                  {material.subcategories.map((sub, index) => (
                    <button
                      key={sub.id}
                      className="subcategory-item"
                      onClick={() => setSelectedMaterial(sub)}
                      style={{ '--item-index': index } as React.CSSProperties}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <main className={`products-content ${!sidebarVisible ? 'full-width' : ''}`}>
          <div className={`products-grid ${expandedGrid ? 'expanded' : ''}`}>
            {filteredMaterials.map((material: FilteredMaterial, typeIndex: number) => (
              <div 
                key={material.type}
                className="type-container"
                ref={el => typeRefs.current[material.type] = el}
                style={{ '--type-index': typeIndex } as React.CSSProperties}
              >
                <div 
                  className={`type-header ${isCardExpanded(material.type) ? 'expanded' : ''}`}
                  onClick={() => handleCardClick(material.type)}
                >
                  <div className="type-header-content">
                    <div className="type-image">
                      <img 
                        src={material.subcategories[0]?.image} 
                        alt={material.type}
                        loading="lazy"
                      />
                      <div className="type-image-overlay" />
                    </div>
                    <div className="type-text">
                      <h3>{material.type}</h3>
                      <p className="type-description">{material.description}</p>
                    </div>
                  </div>
                  <div className="type-header-actions">
                    <span className="material-count">
                      {material.subcategories.filter(sub => !searchQuery || sub.matches).length} products
                    </span>
                    {isCardExpanded(material.type) ? (
                      <Minus className="expand-icon" size={20} />
                    ) : (
                      <Plus className="expand-icon" size={20} />
                    )}
                  </div>
                </div>

                <div className={`products-list ${isCardExpanded(material.type) ? 'expanded' : ''}`}>
                  {material.subcategories
                    .filter(sub => !searchQuery || sub.matches)
                    .map((subcategory, index) => (
                      <div
                        key={subcategory.id}
                        className="product-card"
                        onClick={() => setSelectedMaterial(subcategory)}
                        style={{ '--card-index': index } as React.CSSProperties}
                      >
                        <div className="product-image">
                          <img src={subcategory.image} alt={subcategory.name} loading="lazy" />
                        </div>
                        <div className="product-info">
                          <h4>{subcategory.name}</h4>
                          <p>{subcategory.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {selectedMaterial && (
        <div className="product-modal" onClick={() => setSelectedMaterial(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedMaterial.image} alt={selectedMaterial.name} />
            <div className="modal-info">
              <h3>{selectedMaterial.name}</h3>
              <p>{selectedMaterial.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
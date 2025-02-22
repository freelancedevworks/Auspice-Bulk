import { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronRight, Package2, Search, Plus, Minus } from 'lucide-react';
import materialsData from '../data/materials.json';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/Materials.css';

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

export default function Materials() {
  const [sidebarSelectedType, setSidebarSelectedType] = useState<string | null>(null);
  const [cardExpandedTypes, setCardExpandedTypes] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<Subcategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGrid, setExpandedGrid] = useState(false);
  const typeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Filtered materials only affect the main content, not the sidebar
  const filteredMaterials = useMemo(() => {
    if (!searchQuery) return materialsData.materials;

    return materialsData.materials.filter(material => {
      const matchInType = material.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchInDescription = material.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchInSubcategories = material.subcategories.some(
        sub =>
          sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return matchInType || matchInDescription || matchInSubcategories;
    });
  }, [searchQuery]);

  // Auto-expand cards when searching
  useEffect(() => {
    if (searchQuery) {
      const typesToExpand = filteredMaterials
        .filter(material => 
          material.subcategories.some(sub => 
            sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
        .map(material => material.type);

      setCardExpandedTypes(prev => {
        const newExpandedTypes = [...new Set([...prev, ...typesToExpand])];
        setExpandedGrid(newExpandedTypes.length > 0);
        return newExpandedTypes;
      });
    } else {
      setCardExpandedTypes([]);
      setExpandedGrid(false);
    }
  }, [searchQuery, filteredMaterials]);

  const scrollToType = (type: string) => {
    const typeElement = typeRefs.current[type];
    if (typeElement) {
      // Get the navbar height
      const navbarHeight = 80;
      
      // Get the hero section height
      const heroSection = document.querySelector('.hero-section-materials');
      const heroHeight = heroSection?.getBoundingClientRect().height || 0;
      
      // Calculate the element's position
      const elementRect = typeElement.getBoundingClientRect();
      const elementPosition = window.pageYOffset + elementRect.top;
      
      // Calculate the final scroll position
      // We want the element to be at the top of the viewport, just below the navbar
      const scrollPosition = elementPosition - navbarHeight - 20; // 20px padding
      
      // Scroll to the calculated position
      window.scrollTo({
        top: Math.max(heroHeight, scrollPosition),
        behavior: 'smooth'
      });
    }
  };

  const handleSidebarClick = (type: string) => {
    // Toggle the selected type
    setSidebarSelectedType(prevType => {
      const newType = prevType === type ? null : type;
      
      // Update expanded types based on selection
      if (newType === null) {
        setCardExpandedTypes(prev => prev.filter(t => t !== type));
        setExpandedGrid(false);
      } else {
        if (!cardExpandedTypes.includes(type)) {
          setCardExpandedTypes(prev => [...prev, type]);
          setExpandedGrid(true);
        }
      }
      
      return newType;
    });
    
    // Scroll after state updates
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToType(type);
      });
    });
  };

  const handleCardClick = (type: string) => {
    setCardExpandedTypes(prev => {
      const isCurrentlyExpanded = prev.includes(type);
      const newExpandedTypes = isCurrentlyExpanded
        ? prev.filter(t => t !== type)
        : [...prev, type];
      
      setExpandedGrid(newExpandedTypes.length > 0);

      // Only scroll if we're expanding
      if (!isCurrentlyExpanded) {
        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollToType(type);
          });
        });
      }

      return newExpandedTypes;
    });
  };

  const isCardExpanded = (type: string) => cardExpandedTypes.includes(type);

  // Add loading state for images
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages(prev => new Set(prev).add(imageUrl));
  };

  // Update the image rendering in sidebar and cards
  const renderImage = (imageUrl: string, alt: string, className?: string) => (
    <div className={`image-container ${className || ''}`}>
      {!loadedImages.has(imageUrl) && (
        <div className="image-placeholder pulse" />
      )}
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        onLoad={() => handleImageLoad(imageUrl)}
        className={loadedImages.has(imageUrl) ? 'loaded' : ''}
      />
    </div>
  );

  return (
    <div className="materials-page">
      <ScrollToTop />
      
      <section className="hero-section-materials">
        <div className="hero-overlay" />
        <div className="section-content">
          <h1>Our Materials</h1>
          <p>Explore our comprehensive range of high-quality materials</p>
          
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
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

      <div className="materials-layout">
        {/* Sidebar Navigation - Always shows all categories */}
        <aside className="materials-sidebar">
          <h2>Material Categories</h2>
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

        {/* Main Content - Shows filtered results */}
        <main className="materials-content">
          <div className={`materials-grid ${expandedGrid ? 'expanded' : ''}`}>
            {filteredMaterials.map((material: MaterialType, typeIndex: number) => (
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
                      {renderImage(
                        material.subcategories[0]?.image,
                        material.type,
                        'sidebar-image'
                      )}
                      <div className="type-image-overlay" />
                    </div>
                    <div className="type-text">
                      <h3>{material.type}</h3>
                      <p className="type-description">{material.description}</p>
                    </div>
                  </div>
                  <div className="type-header-actions">
                    <span className="material-count">
                      {material.subcategories.length} materials
                    </span>
                    {isCardExpanded(material.type) ? (
                      <Minus className="expand-icon" size={20} />
                    ) : (
                      <Plus className="expand-icon" size={20} />
                    )}
                  </div>
                </div>

                <div className={`materials-list ${isCardExpanded(material.type) ? 'expanded' : ''}`}>
                  {material.subcategories.map((subcategory, index) => (
                    <div
                      key={subcategory.id}
                      className="material-card"
                      onClick={() => setSelectedMaterial(subcategory)}
                      style={{ '--card-index': index } as React.CSSProperties}
                    >
                      <div className="material-image">
                        {renderImage(subcategory.image, subcategory.name)}
                      </div>
                      <div className="material-info">
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
        <div className="material-modal" onClick={() => setSelectedMaterial(null)}>
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
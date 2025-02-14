import axios from 'axios';
import { debounce } from 'lodash';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ScrollToTop from '../components/ScrollToTop';
import { API_ENDPOINTS } from '../constants/api';
import '../styles/Materials.css';

interface Subcategory {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface MaterialType {
  id: string;
  type: string;
  description: string;
  subcategories: Subcategory[];
}

export default function Materials() {
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [selectedMaterial, setSelectedMaterial] = useState<Subcategory | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch materials data
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const response = await axios.get<MaterialType[]>(API_ENDPOINTS.MATERIALS.LIST);
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
        toast.error('Failed to load materials');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  // Filter materials based on search and category
  const filteredMaterials = useMemo(() => {
    let filtered = materials;

    if (selectedCategory) {
      filtered = filtered.filter(m => m.type === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(material => {
        const matchInType = material.type.toLowerCase().includes(query);
        const matchInDescription = material.description.toLowerCase().includes(query);
        const matchInSubcategories = material.subcategories.some(
          sub =>
            sub.name.toLowerCase().includes(query) ||
            sub.description.toLowerCase().includes(query)
        );
        return matchInType || matchInDescription || matchInSubcategories;
      });
    }

    return filtered;
  }, [materials, searchQuery, selectedCategory]);

  const toggleCard = (materialId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(materialId)) {
        newSet.delete(materialId);
      } else {
        newSet.add(materialId);
      }
      return newSet;
    });
  };

  const clearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    setSearchQuery('');
  };

  return (
    <div className="materials-page">
      <div className="materials-hero">
        <h1>Our Materials</h1>
        <p>Explore our comprehensive range of high-quality materials</p>
      </div>

      <div className="materials-controls">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search materials..."
            onChange={e => debouncedSearch(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search" onClick={clearSearch}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="category-filters">
          <button
            className={`category-btn ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {materials.map(material => (
            <button
              key={material.id}
              className={`category-btn ${selectedCategory === material.type ? 'active' : ''}`}
              onClick={() => setSelectedCategory(material.type)}
            >
              {material.type}
            </button>
          ))}
        </div>
      </div>

      <div className="materials-grid">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner">Loading materials...</div>
          </div>
        ) : filteredMaterials.length === 0 ? (
          <div className="no-results">
            <p>No materials found matching your search criteria</p>
          </div>
        ) : (
          filteredMaterials.map(material => (
            <div key={material.id} className="material-card">
              <div
                className="material-header"
                onClick={() => toggleCard(material.id)}
              >
                <div className="material-title">
                  <h2>{material.type}</h2>
                  <p>{material.description}</p>
                </div>
                {expandedCards.has(material.id) ? (
                  <ChevronUp className="expand-icon" />
                ) : (
                  <ChevronDown className="expand-icon" />
                )}
              </div>

              <div className={`subcategories ${expandedCards.has(material.id) ? 'expanded' : ''}`}>
                {material.subcategories.map(sub => (
                  <div
                    key={sub.id}
                    className="subcategory-card"
                    onClick={() => setSelectedMaterial(sub)}
                  >
                    <div className="subcategory-image">
                      <img src={sub.image} alt={sub.name} loading="lazy" />
                    </div>
                    <div className="subcategory-info">
                      <h3>{sub.name}</h3>
                      <p>{sub.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedMaterial && (
        <div className="material-modal" onClick={() => setSelectedMaterial(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedMaterial(null)}>
              <X size={24} />
            </button>
            <div className="modal-image">
              <img src={selectedMaterial.image} alt={selectedMaterial.name} />
            </div>
            <div className="modal-info">
              <h2>{selectedMaterial.name}</h2>
              <p>{selectedMaterial.description}</p>
            </div>
          </div>
        </div>
      )}

      <ScrollToTop />
    </div>
  );
}
import axios from 'axios';
import { ChevronDown, ChevronUp, FolderOpen, Search, Trash2, X, Edit, ArrowLeft } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { API_ENDPOINTS } from '../../constants/api';
import '../../styles/AdminMaterials.css';
import { MaterialForm } from '../components/MaterialForm';
import { SubcategoryForm } from '../components/SubcategoryForm';
import { EditMaterialForm } from '../components/EditMaterialForm';
import { useNavigate } from 'react-router-dom';


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

interface MaterialFormData {
  type: string;
  description: string;
}

interface SubcategoryFormData {
  name: string;
  description: string;
  image: string;
}

interface NewSubcategory {
  name: string;
  description: string;
  image: string;
}

interface NewMaterialFormData {
  type: string;
  description: string;
  subcategories: NewSubcategory[];
}

interface SubcategoryData {
  name: string;
  description: string;
  image: string;
}

export default function AdminMaterials() {
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [isEditingMaterial, setIsEditingMaterial] = useState<string | null>(null);
  const [isAddingSubcategory, setIsAddingSubcategory] = useState<string | null>(null);
  const [isEditingSubcategory, setIsEditingSubcategory] = useState<{
    materialId: string;
    subcategoryId: string;
  } | null>(null);
  const [materialFormData, setMaterialFormData] = useState<MaterialFormData>({
    type: '',
    description: '',
  });
  const [subcategoryFormData, setSubcategoryFormData] = useState<SubcategoryFormData>({
    name: '',
    description: '',
    image: '',
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'material' | 'subcategory';
    materialId: string;
    subcategoryId?: string;
    name: string;
  } | null>(null);
  const [newMaterialData, setNewMaterialData] = useState<NewMaterialFormData>({
    type: '',
    description: '',
    subcategories: [],
  });
  const navigate = useNavigate();

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

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

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

  const filteredMaterials = useMemo(() => {
    let filtered = materials;

    if (selectedCategory) {
      filtered = filtered.filter(m => m.type === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return filtered.map(material => {
        // Check if any subcategories match the search
        const matchingSubcategories = material.subcategories.filter(sub =>
          sub.name.toLowerCase().includes(query) ||
          sub.description.toLowerCase().includes(query)
        );

        // If material matches or has matching subcategories, return modified material
        if (
          material.type.toLowerCase().includes(query) ||
          material.description.toLowerCase().includes(query) ||
          matchingSubcategories.length > 0
        ) {
          // If searching for subcategory, only return matching subcategories
          if (matchingSubcategories.length > 0 && !material.type.toLowerCase().includes(query)) {
            return {
              ...material,
              subcategories: matchingSubcategories,
            };
          }
          return material;
        }
        return null;
      }).filter(Boolean) as MaterialType[]; // Filter out null values
    }

    return filtered;
  }, [materials, searchQuery, selectedCategory]);

  const handleAddMaterial = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      
      // First create the material
      const materialResponse = await axios.post(
        API_ENDPOINTS.MATERIALS.LIST,
        {
          type: newMaterialData.type,
          description: newMaterialData.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Then add subcategories if any
      const subcategoryPromises = newMaterialData.subcategories.map(sub =>
        axios.post(
          `${API_ENDPOINTS.MATERIALS.LIST}/${materialResponse.data.id}/subcategories`,
          sub,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );

      await Promise.all(subcategoryPromises);

      // Fetch the updated material with subcategories
      const updatedMaterialResponse = await axios.get(
        `${API_ENDPOINTS.MATERIALS.LIST}/${materialResponse.data.id}`
      );

      setMaterials([...materials, updatedMaterialResponse.data]);
      setIsAddingMaterial(false);
      setNewMaterialData({
        type: '',
        description: '',
        subcategories: [],
      });
      toast.success('Material added successfully');
    } catch (error) {
      console.error('Error adding material:', error);
      toast.error('Failed to add material');
    }
  };

  const handleEditMaterial = async (materialId: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.put(
        `${API_ENDPOINTS.MATERIALS.LIST}/${materialId}`,
        materialFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedMaterials = materials.map(m =>
        m.id === materialId ? { ...m, ...materialFormData } : m
      );
      setMaterials(updatedMaterials);
      setIsEditingMaterial(null);
      setMaterialFormData({ type: '', description: '' });
      toast.success('Material updated successfully');
    } catch (error) {
      console.error('Error updating material:', error);
      toast.error('Failed to update material');
    }
  };

  const handleDeleteMaterial = async (materialId: string, materialType: string) => {
    setDeleteConfirmation({
      type: 'material',
      materialId,
      name: materialType,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmation) return;

    try {
      const token = localStorage.getItem('admin_token');
      if (deleteConfirmation.type === 'material') {
        await axios.delete(
          `${API_ENDPOINTS.MATERIALS.LIST}/${deleteConfirmation.materialId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setMaterials(materials.filter(m => m.id !== deleteConfirmation.materialId));
        toast.success('Material deleted successfully');
      } else if (deleteConfirmation.type === 'subcategory') {
        await axios.delete(
          `${API_ENDPOINTS.MATERIALS.LIST}/${deleteConfirmation.materialId}/subcategories/${deleteConfirmation.subcategoryId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const updatedMaterials = materials.map(m => {
          if (m.id === deleteConfirmation.materialId) {
            return {
              ...m,
              subcategories: m.subcategories.filter(
                sub => sub.id !== deleteConfirmation.subcategoryId,
              ),
            };
          }
          return m;
        });

        setMaterials(updatedMaterials);
        toast.success('Subcategory deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Failed to delete');
    } finally {
      setDeleteConfirmation(null);
    }
  };

  const handleAddSubcategory = async (materialId: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.post(
        `${API_ENDPOINTS.MATERIALS.LIST}/${materialId}/subcategories`,
        subcategoryFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedMaterials = materials.map(m =>
        m.id === materialId
          ? { ...m, subcategories: [...m.subcategories, response.data] }
          : m
      );
      setMaterials(updatedMaterials);
      setIsAddingSubcategory(null);
      setSubcategoryFormData({ name: '', description: '', image: '' });
      const cardElement = document.querySelector(`[data-material-id="${materialId}"]`);
      cardElement?.classList.add('success-feedback');
      setTimeout(() => {
        cardElement?.classList.remove('success-feedback');
      }, 300);
      toast.success('Subcategory added successfully');
    } catch (error) {
      console.error('Error adding subcategory:', error);
      toast.error('Failed to add subcategory');
    }
  };

  const handleEditSubcategory = async (
    materialId: string,
    subcategoryId: string,
  ) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.put(
        `${API_ENDPOINTS.MATERIALS.LIST}/${materialId}/subcategories/${subcategoryId}`,
        subcategoryFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const updatedMaterials = materials.map(m => {
        if (m.id === materialId) {
          return {
            ...m,
            subcategories: m.subcategories.map(sub =>
              sub.id === subcategoryId ? { ...sub, ...subcategoryFormData } : sub,
            ),
          };
        }
        return m;
      });

      setMaterials(updatedMaterials);
      setIsEditingSubcategory(null);
      setSubcategoryFormData({ name: '', description: '', image: '' });
      toast.success('Subcategory updated successfully');
    } catch (error) {
      console.error('Error updating subcategory:', error);
      toast.error('Failed to update subcategory');
    }
  };

  const handleDeleteSubcategory = async (
    materialId: string,
    subcategoryId: string,
    subcategoryName: string,
  ) => {
    setDeleteConfirmation({
      type: 'subcategory',
      materialId,
      subcategoryId,
      name: subcategoryName,
    });
  };

  const handleAddNewSubcategory = () => {
    setNewMaterialData(prev => ({
      ...prev,
      subcategories: [
        ...prev.subcategories,
        { name: '', description: '', image: '' },
      ],
    }));
  };

  const handleRemoveNewSubcategory = (index: number) => {
    setNewMaterialData(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateNewSubcategory = (
    index: number,
    field: keyof NewSubcategory,
    value: string
  ) => {
    setNewMaterialData(prev => ({
      ...prev,
      subcategories: prev.subcategories.map((sub, i) =>
        i === index ? { ...sub, [field]: value } : sub
      ),
    }));
  };

  return (
    <div className="admin-materials-page">
      <div className="admin-materials-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/admin/dashboard')}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>Manage Materials</h1>
        <button className="add-material-btn" onClick={() => setIsAddingMaterial(true)}>
          Add New Material
        </button>
      </div>

      <div className="search-filter-section">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search materials..."
            onChange={e => setSearchQuery(e.target.value)}
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

      <div className="admin-materials-grid">
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
            <div key={material.id} className="admin-material-card">
              <div
                className="material-header"
                onClick={() => toggleCard(material.id)}
              >
                <div className="material-title">
                  <h2>{material.type}</h2>
                  <p>{material.description}</p>
                </div>
                <div className="material-actions">
                  <button 
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingMaterial(material.id);
                      setMaterialFormData({
                        type: material.type,
                        description: material.description,
                      });
                    }}
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMaterial(material.id, material.type);
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                  {expandedCards.has(material.id) ? (
                    <ChevronUp className="expand-icon" />
                  ) : (
                    <ChevronDown className="expand-icon" />
                  )}
                </div>
              </div>

              <div className={`subcategories ${expandedCards.has(material.id) ? 'expanded' : ''}`}>
                {material.subcategories.length === 0 ? (
                  <div className="empty-subcategories">
                    <FolderOpen size={48} />
                    <p>No subcategories found for this material</p>
                    <button onClick={(e) => {
                      e.stopPropagation();
                      setIsAddingSubcategory(material.id);
                    }}>
                      Add First Subcategory
                    </button>
                  </div>
                ) : (
                  <>
                    {material.subcategories.map(sub => (
                      <div key={sub.id} className="subcategory-card">
                        <div className="subcategory-image">
                          <img src={sub.image} alt={sub.name} loading="lazy" />
                        </div>
                        <div className="subcategory-info">
                          <h3>{sub.name}</h3>
                          <p>{sub.description}</p>
                          <div className="subcategory-actions">
                            <button className="edit-btn" onClick={(e) => {
                              e.stopPropagation();
                              setIsEditingSubcategory({ materialId: material.id, subcategoryId: sub.id });
                            }}>Edit</button>
                            <button
                              className="delete-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSubcategory(material.id, sub.id, sub.name);
                              }}
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {material.subcategories.length > 0 && (
                  <button className="add-subcategory-btn" onClick={(e) => {
                    e.stopPropagation();
                    setIsAddingSubcategory(material.id);
                  }}>
                    Add New Subcategory
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Material Form Modal */}
      {isAddingMaterial && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Material</h2>
            <MaterialForm
              materialData={newMaterialData}
              onSubmit={handleAddMaterial}
              onCancel={() => setIsAddingMaterial(false)}
              onChange={(data: NewMaterialFormData) => setNewMaterialData(data)}
              onAddSubcategory={handleAddNewSubcategory}
              onRemoveSubcategory={handleRemoveNewSubcategory}
              onUpdateSubcategory={handleUpdateNewSubcategory}
            />
          </div>
        </div>
      )}

      {/* Edit Material Modal */}
      {isEditingMaterial && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Material</h2>
            <EditMaterialForm
              data={materialFormData}
              onSubmit={() => handleEditMaterial(isEditingMaterial)}
              onCancel={() => {
                setIsEditingMaterial(null);
                setMaterialFormData({ type: '', description: '' });
              }}
              onChange={setMaterialFormData}
            />
          </div>
        </div>
      )}

      {/* Subcategory Form Modal */}
      {(isAddingSubcategory || isEditingSubcategory) && (
        <div className="modal">
          <div className="modal-content">
            <SubcategoryForm
              data={subcategoryFormData}
              isEdit={!!isEditingSubcategory}
              onSubmit={() => {
                if (isAddingSubcategory) {
                  handleAddSubcategory(isAddingSubcategory);
                } else if (isEditingSubcategory) {
                  handleEditSubcategory(
                    isEditingSubcategory.materialId,
                    isEditingSubcategory.subcategoryId,
                  );
                }
              }}
              onCancel={() => {
                setIsAddingSubcategory(null);
                setIsEditingSubcategory(null);
              }}
              onChange={(data: SubcategoryData) => setSubcategoryFormData(data)}
            />
          </div>
        </div>
      )}

      {/* Add Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteConfirmation}
        title={`Delete ${deleteConfirmation?.type === 'material' ? 'Material' : 'Subcategory'}`}
        message={`Are you sure you want to delete "${deleteConfirmation?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmation(null)}
      />
    </div>
  );
}
  
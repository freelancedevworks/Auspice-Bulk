import { Plus, Layers, List, Save, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface NewSubcategory {
  name: string;
  description: string;
  image: string;
}

interface MaterialFormData {
  type: string;
  description: string;
  subcategories: NewSubcategory[];
}

interface MaterialFormProps {
  materialData: MaterialFormData;
  onSubmit: () => void;
  onCancel: () => void;
  onChange: (data: MaterialFormData) => void;
  onAddSubcategory: () => void;
  onRemoveSubcategory: (index: number) => void;
  onUpdateSubcategory: (index: number, field: keyof NewSubcategory, value: string) => void;
}

export function MaterialForm({
  materialData,
  onSubmit,
  onCancel,
  onChange,
  onAddSubcategory,
  onRemoveSubcategory,
  onUpdateSubcategory,
}: MaterialFormProps) {
  const [expandedSubcategories, setExpandedSubcategories] = useState<number[]>([]);

  const toggleSubcategory = (index: number) => {
    setExpandedSubcategories(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <form 
      className="material-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="form-section material-details">
        <h3>
          <Layers size={20} />
          Material Details
        </h3>
        <div className="input-group">
          <label>Type</label>
          <input
            type="text"
            value={materialData.type}
            onChange={(e) => onChange({ ...materialData, type: e.target.value })}
            required
            placeholder="Enter material type"
          />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea
            value={materialData.description}
            onChange={(e) => onChange({ ...materialData, description: e.target.value })}
            required
            placeholder="Enter material description"
          />
        </div>
      </div>

      <div className="form-section subcategories-section">
        <div className="section-header">
          <h3>
            <List size={20} />
            Subcategories ({materialData.subcategories?.length || 0})
          </h3>
          <button
            type="button"
            className="add-btn"
            onClick={onAddSubcategory}
          >
            <Plus size={16} />
            Add Subcategory
          </button>
        </div>

        {materialData.subcategories?.map((sub, index) => (
          <div key={index} className="subcategory-form-item">
            <div 
              className="subcategory-header"
              onClick={() => toggleSubcategory(index)}
            >
              <h4>Subcategory {index + 1}</h4>
              <div className="subcategory-header-actions">
                <button
                  type="button"
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSubcategory(index);
                  }}
                >
                  <X size={16} />
                </button>
                {expandedSubcategories.includes(index) ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
            </div>
            {expandedSubcategories.includes(index) && (
              <div className="subcategory-form-content">
                <div className="input-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) => onUpdateSubcategory(index, 'name', e.target.value)}
                    required
                    placeholder="Enter subcategory name"
                  />
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <textarea
                    value={sub.description}
                    onChange={(e) => onUpdateSubcategory(index, 'description', e.target.value)}
                    required
                    placeholder="Enter subcategory description"
                  />
                </div>
                <div className="input-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={sub.image}
                    onChange={(e) => onUpdateSubcategory(index, 'image', e.target.value)}
                    required
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          <Save size={16} />
          Save Material
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          <X size={16} />
          Cancel
        </button>
      </div>
    </form>
  );
} 
import { Save, X } from 'lucide-react';
import { ImageUpload } from './ImageUpload';



interface SubcategoryData {
  name: string;
  description: string;
  image: string;
}

interface SubcategoryFormProps {
  data: SubcategoryData;
  isEdit?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onChange: (data: SubcategoryData) => void;
}

export function SubcategoryForm({
  data,
  isEdit = false,
  onSubmit,
  onCancel,
  onChange,
}: SubcategoryFormProps) {
  return (
    <form 
      className="subcategory-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h2>{isEdit ? 'Edit Subcategory' : 'Add New Subcategory'}</h2>
      
      <div className="input-group">
        <label>Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          required
          placeholder="Enter subcategory name"
        />
      </div>

      <div className="input-group">
        <label>Description</label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          required
          placeholder="Enter subcategory description"
        />
      </div>

      <div className="input-group">
        <label>Image</label>
        <ImageUpload
          currentImage={data.image}
          onImageSelect={(imageUrl) => onChange({ ...data, image: imageUrl })}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          <Save size={16} />
          {isEdit ? 'Update Subcategory' : 'Add Subcategory'}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          <X size={16} />
          Cancel
        </button>
      </div>
    </form>
  );
}

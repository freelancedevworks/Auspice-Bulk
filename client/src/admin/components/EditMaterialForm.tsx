import { Save, X } from 'lucide-react';

interface EditMaterialFormProps {
  data: {
    type: string;
    description: string;
  };
  onSubmit: () => void;
  onCancel: () => void;
  onChange: (data: { type: string; description: string }) => void;
}

export function EditMaterialForm({
  data,
  onSubmit,
  onCancel,
  onChange,
}: EditMaterialFormProps) {
  return (
    <form 
      className="edit-material-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="form-section">
        <div className="input-group">
          <label>Type</label>
          <input
            type="text"
            value={data.type}
            onChange={(e) => onChange({ ...data, type: e.target.value })}
            required
            placeholder="Enter material type"
          />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            required
            placeholder="Enter material description"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          <Save size={16} />
          Update Material
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          <X size={16} />
          Cancel
        </button>
      </div>
    </form>
  );
} 
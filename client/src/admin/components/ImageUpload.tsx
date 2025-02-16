import { Image as ImageIcon, Loader2, Upload, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';

// ImageUpload Component
export const ImageUpload = ({ 
  onImageSelect, 
  currentImage 
}: { 
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);



  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
  
    if (file.size > 2 * 1024 * 1024) {
      setError('File size must be less than 2MB');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  
    setIsLoading(true);
    setError(null);
  
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) throw new Error('Upload failed');
  
      const data = await response.json();
      onImageSelect(data.url);
    } catch (err) {
      console.error('Image upload error:', err);
      setError('Failed to upload image. Please try again.');
      setPreviewUrl(currentImage || null);
    } finally {
      setIsLoading(false);
    }
  }, [onImageSelect, currentImage]);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onImageSelect('');
  };

  return (
    <div className="w-full">
      <div
        className={`
          relative 
          rounded-lg 
          border-2 
          border-dashed 
          transition-all
          duration-200
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${previewUrl ? 'h-72' : 'h-64'}
          hover:border-blue-400
          hover:bg-blue-50/50
        `}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="mt-4 text-sm text-gray-600 font-medium">Uploading your image...</p>
          </div>
        ) : previewUrl ? (
          <div className="relative h-full w-full group">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-full w-full rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black bg-opacity-60 rounded-lg">
              <label
                htmlFor="image-upload"
                className="flex items-center px-4 py-2 bg-white rounded-md cursor-pointer hover:bg-gray-50 transition-colors font-medium"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Change
              </label>
              <button
                onClick={removeImage}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
              >
                <X className="w-5 h-5 mr-2" />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="w-16 h-16 text-gray-400 mb-4" />
            <div className="text-center px-4">
              <p className="text-base font-medium text-gray-700 mb-2">
                Drop your image here, or <span className="text-blue-500">browse</span>
              </p>
              <p className="text-sm text-gray-500">
                SVG, PNG, JPG or GIF (max. 2MB)
              </p>
            </div>
          </label>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 text-sm text-red-600 bg-red-50 rounded-md flex items-center">
          <X className="w-5 h-5 mr-2 text-red-500" />
          {error}
        </div>
      )}
    </div>
  );
};
export default ImageUpload;
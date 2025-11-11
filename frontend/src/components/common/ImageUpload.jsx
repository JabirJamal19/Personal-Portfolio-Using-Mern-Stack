import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const ImageUpload = ({ currentImage, onImageUploaded, label = "Upload Image" }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    await uploadImage(file);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('token');
    
    setUploading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const response = await axios.post(`${API_URL}/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      const imageUrl = response.data.data.url;
      onImageUploaded(imageUrl);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to upload image';
      
      // If Cloudinary is not configured, show helpful message
      if (error.response?.status === 503) {
        toast.error('Image upload not configured. Please paste image URL instead.');
      } else {
        toast.error(errorMessage);
      }
      
      setPreview(currentImage || '');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-dark-700">
        {label}
      </label>

      {/* Image Preview */}
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg border-2 border-dark-200"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400?text=Invalid+Image';
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <div className="spinner w-5 h-5 border-2"></div>
              Uploading...
            </>
          ) : (
            <>
              <FiUpload />
              {preview ? 'Change Image' : 'Upload Image'}
            </>
          )}
        </button>

        {!preview && (
          <div className="flex items-center gap-2 text-sm text-dark-500">
            <FiImage />
            <span>JPG, PNG, GIF, WEBP (Max 5MB)</span>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Helper Text */}
      <p className="text-xs text-dark-500">
        Upload your image or keep using the current URL field below
      </p>
    </div>
  );
};

export default ImageUpload;

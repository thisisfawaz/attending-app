import { useState, useRef } from 'react';

export default function ImageUploader({ onImageUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const THEME_COLOR = '#E2171D';

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div 
      className={`upload-area ${dragActive ? 'drag-active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <input 
        ref={inputRef}
        type="file" 
        accept="image/*"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <div className="upload-content" style={{ pointerEvents: 'none' }}>
        <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', color: THEME_COLOR }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <p className="upload-text">
          Drag & drop your photo here, or click anywhere to browse
        </p>
        <p className="upload-hint">Supports JPG, PNG, GIF (max 5MB)</p>
      </div>
    </div>
  );
}
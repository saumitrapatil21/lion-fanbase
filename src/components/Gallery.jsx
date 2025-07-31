import React, { useState, useEffect, useRef, useCallback } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendingImages, setPendingImages] = useState([]);
  const [showCaptionModal, setShowCaptionModal] = useState(false);
  const imagesRef = useRef([]);
  const fileInputRef = useRef(null);

  // Gallery images with metadata
  const galleryImages = [
    {
      id: 1,
      src: '/4a7fad1e-f259-4832-8ade-ce7f370fe155.jpg',
      alt: 'Majestic male lion with golden mane in natural habitat',
      title: 'King of the Savanna',
      category: 'male',
      description: 'A powerful male lion displaying his magnificent mane, symbol of strength and dominance in the pride.'
    },
    {
      id: 2,
      src: '/5b3ef39f-ff2d-47bf-9eb7-e192eb2f4264.jpg',
      alt: 'Lion pride resting together in the African wilderness',
      title: 'Pride Unity',
      category: 'pride',
      description: 'Lions demonstrating their social nature, resting together as a family unit in their natural environment.'
    },
    {
      id: 3,
      src: '/5e27f160-d563-4bb3-a6c2-78e5ce21523a.jpg',
      alt: 'Lioness hunting in the golden grasslands',
      title: 'The Hunter',
      category: 'female',
      description: 'A focused lioness showcasing the grace and power that makes her an apex predator.'
    },
    {
      id: 4,
      src: '/img.png',
      alt: 'Lion in artistic representation',
      title: 'Artistic Vision',
      category: 'art',
      description: 'An artistic interpretation capturing the essence and spirit of these magnificent creatures.'
    }
  ];

  const categories = [
    { id: 'all', label: '🌟 All', count: galleryImages.length + uploadedImages.length },
    { id: 'male', label: '👑 Boys', count: galleryImages.filter(img => img.category === 'male').length },
    { id: 'female', label: '👸 Girls', count: galleryImages.filter(img => img.category === 'female').length },
    { id: 'pride', label: '👨‍👩‍👧‍👦 Family', count: galleryImages.filter(img => img.category === 'pride').length },
    { id: 'art', label: '🎨 Art', count: galleryImages.filter(img => img.category === 'art').length },
    { id: 'uploaded', label: '📤 My Photos', count: uploadedImages.length }
  ];

  // Upload functionality
  const handleFiles = (files) => {
    const newImages = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      src: URL.createObjectURL(file),
      alt: `Uploaded lion photo: ${file.name}`,
      title: file.name,
      category: 'uploaded',
      description: 'Your uploaded lion photo!',
      file,
      isUploaded: true,
      caption: ''
    }));

    setPendingImages(newImages);
    setShowCaptionModal(true);
  };

  const addCaptionsAndUpload = (imagesWithCaptions) => {
    setUploadedImages(prev => [...prev, ...imagesWithCaptions]);
    setPendingImages([]);
    setShowCaptionModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const skipCaptionsAndUpload = () => {
    setUploadedImages(prev => [...prev, ...pendingImages]);
    setPendingImages([]);
    setShowCaptionModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const removeUploadedImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const allImages = [...galleryImages, ...uploadedImages];
  const filteredImages = filter === 'all'
    ? allImages
    : allImages.filter(img => img.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageIndex = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleImages(prev => [...new Set([...prev, imageIndex])]);
            }, imageIndex * 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    imagesRef.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [filteredImages]);

  const openLightbox = useCallback((image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  }, []);

  const navigateImage = useCallback((direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }

    setSelectedImage(filteredImages[newIndex]);
  }, [filteredImages, selectedImage]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, navigateImage, closeLightbox]);

  return (
    <div className="gallery">
      <div className="gallery__container">
        <div className="gallery__header">
          <h1 className="gallery__title">📸 🦁 🌟</h1>
          <p className="gallery__subtitle">
            👀 Look! 📱 Click! 😍 Enjoy!
          </p>
        </div>

        <div className="gallery__filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`gallery__filter ${filter === category.id ? 'gallery__filter--active' : ''}`}
              onClick={() => {
                setFilter(category.id);
                setVisibleImages([]);
              }}
              aria-label={`Filter by ${category.label}`}
            >
              {category.label}
              <span className="gallery__filter-count">({category.count})</span>
            </button>
          ))}
        </div>

        <div className="gallery__grid">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery__item ${visibleImages.includes(index) ? 'gallery__item--visible' : ''}`}
              ref={el => imagesRef.current[index] = el}
              data-index={index}
              onClick={() => openLightbox(image)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(image);
                }
              }}
              aria-label={`View ${image.title} in full size`}
            >
              <div className="gallery__image-container">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="gallery__image"
                  loading="lazy"
                />
                {image.isUploaded && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeUploadedImage(image.id);
                    }}
                    className="gallery__remove-btn"
                    aria-label="Remove uploaded image"
                  >
                    ❌
                  </button>
                )}
                <div className="gallery__overlay">
                  <div className="gallery__overlay-content">
                    <h3 className="gallery__image-title">{image.title}</h3>
                    <p className="gallery__image-description">{image.description}</p>
                    <span className="gallery__view-icon">🔍</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="gallery__empty">
            <p>No images found for the selected category.</p>
          </div>
        )}

        {/* Upload Section */}
        <div className="gallery__upload-section">
          <h3 className="gallery__upload-title">📤 Upload Your Lion Photos! 🦁</h3>
          <div
            className={`gallery__upload-area ${dragActive ? 'gallery__upload-area--active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="gallery__file-input"
            />

            <div className="gallery__upload-content">
              <div className="gallery__upload-icon">📸</div>
              <h4 className="gallery__upload-text">📱 ➡️ 🖼️</h4>
              <p className="gallery__upload-hint">👆 Click or drag photos here! 👆</p>
              <div className="gallery__upload-emojis">🦁 📷 🌟 🎉</div>
            </div>
          </div>

          {showSuccess && (
            <div className="gallery__success">
              🎉 YAY! Photo uploaded! 🎉
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="gallery__lightbox" onClick={closeLightbox}>
          <div className="gallery__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery__lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ×
            </button>
            
            <button
              className="gallery__lightbox-nav gallery__lightbox-nav--prev"
              onClick={() => navigateImage('prev')}
              aria-label="Previous image"
            >
              ‹
            </button>
            
            <div className="gallery__lightbox-image-container">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="gallery__lightbox-image"
              />
            </div>
            
            <button
              className="gallery__lightbox-nav gallery__lightbox-nav--next"
              onClick={() => navigateImage('next')}
              aria-label="Next image"
            >
              ›
            </button>
            
            <div className="gallery__lightbox-info">
              <h3 className="gallery__lightbox-title">{selectedImage.title}</h3>
              <p className="gallery__lightbox-description">{selectedImage.description}</p>
              {selectedImage.caption && (
                <div className="gallery__lightbox-caption">
                  <strong>📝 Your Caption:</strong> {selectedImage.caption}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Caption Modal */}
      {showCaptionModal && (
        <CaptionModal
          images={pendingImages}
          onSave={addCaptionsAndUpload}
          onSkip={skipCaptionsAndUpload}
          onClose={() => {
            setPendingImages([]);
            setShowCaptionModal(false);
          }}
        />
      )}
    </div>
  );
};

// Caption Modal Component
const CaptionModal = ({ images, onSave, onSkip, onClose }) => {
  const [captions, setCaptions] = useState(
    images.reduce((acc, img) => ({ ...acc, [img.id]: '' }), {})
  );

  const handleCaptionChange = (imageId, caption) => {
    setCaptions(prev => ({ ...prev, [imageId]: caption }));
  };

  const handleSave = () => {
    const imagesWithCaptions = images.map(img => ({
      ...img,
      caption: captions[img.id] || '',
      description: captions[img.id] || 'Your uploaded lion photo!'
    }));
    onSave(imagesWithCaptions);
  };

  return (
    <div className="gallery__caption-modal" onClick={onClose}>
      <div className="gallery__caption-content" onClick={(e) => e.stopPropagation()}>
        <div className="gallery__caption-header">
          <h3 className="gallery__caption-title">📝 Add Captions to Your Photos! 🦁</h3>
          <button
            className="gallery__caption-close"
            onClick={onClose}
            aria-label="Close caption modal"
          >
            ❌
          </button>
        </div>

        <div className="gallery__caption-images">
          {images.map((image) => (
            <div key={image.id} className="gallery__caption-item">
              <img
                src={image.src}
                alt={image.alt}
                className="gallery__caption-preview"
              />
              <div className="gallery__caption-input-section">
                <label className="gallery__caption-label">
                  📝 Caption for {image.title}:
                </label>
                <textarea
                  className="gallery__caption-input"
                  placeholder="Write something about your lion photo... 🦁"
                  value={captions[image.id] || ''}
                  onChange={(e) => handleCaptionChange(image.id, e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="gallery__caption-actions">
          <button
            className="gallery__caption-btn gallery__caption-btn--skip"
            onClick={onSkip}
          >
            ⏭️ Skip Captions
          </button>
          <button
            className="gallery__caption-btn gallery__caption-btn--save"
            onClick={handleSave}
          >
            💾 Save with Captions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

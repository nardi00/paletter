import React from "react";

const ImagePreview = ({photos, imgRef, getColor}) => {
  return (
    <div className="custom-file-preview">
      {photos.length > 0 && (
        <div className="prev-img">
          <img
            src={photos[photos.length - 1].src}
            alt={photos[photos.length - 1].name}
            ref={imgRef}
            onLoad={getColor}
            onChange={getColor}
          />
        </div>
      )}
    </div>
  );
}

export default ImagePreview

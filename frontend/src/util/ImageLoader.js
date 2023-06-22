import { useState } from "react";
import "./ImageLoader.css"

const ImageLoader = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };
  
  return (
    <div style={{ position: "relative" }} className={`${className} image-loader`}>
      {loading && (
        <div className="spinner-wrapper"
          style={{

            zIndex: 1,
          }}
        >
          <div className="loading-spinner"></div>
        </div>
      )}
      <img className={className}
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
        style={{ display: loading ? "none" : "inline" }}
      />
    </div>
  );
};

export default ImageLoader;

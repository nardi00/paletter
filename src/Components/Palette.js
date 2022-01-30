import React from 'react';

const Palette = ({colors}) => {
  return (
    <div className="palette-container">
        {colors.length > 0 &&
          colors.map((item, index) => (
            <div
              className="color-item"
              style={{ backgroundColor: item }}
              key={index}
            >
            <div className="color-label-container">
                <p className="color-label">{item}</p>
              </div>
            </div>
          ))}
      </div>
  )
}

export default Palette

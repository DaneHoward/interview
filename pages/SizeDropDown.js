import React from 'react';
import styles from '../styles/dropdownStyle.module.css';




const ShirtSizeDropdown = ({ productId, variants, onSizeChange }) => {
  // Extract shirt sizes from the variants
  const sizes = variants
  ? variants.map((variant) => {
      const nameParts = variant.name.split("-");
      const size = nameParts[nameParts.length - 1].trim();
      return size;
    })
  : [];

  const handleChange = (event) => {
    onSizeChange(productId, event.target.value);
  };
  
  


  // Create a unique list of shirt sizes
  const uniqueSizes = Array.from(new Set(sizes));

  return (
    <select className={styles.customDropdown} onChange={handleChange}>
  {uniqueSizes && uniqueSizes.map((size, index) => (
    <option key={index} value={size}>
      {size}
    </option>
  ))}
</select>

  );
  
};

export default ShirtSizeDropdown;

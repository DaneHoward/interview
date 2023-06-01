// components/Header.js
import React, { useState, useEffect } from 'react';
import ShirtSizeDropdown from './SizeDropDown'
import ImageWithModal from './ImageWithModal';

import styles from '../styles/Home.module.css';

const Body = (props) => {
  // Add state to track the selected size for each product
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedVals, setSelectedVals] = useState([]);

  useEffect(() => {
    if (props.products && props.products.length > 0) {
      setSelectedVals(props.products);
    }
  }, [props.products]);

  const handleSizeChange = (productId, newSize) => {
    setSelectedVals((prevSelectedVals) => {
      return prevSelectedVals.map((product) => {
        if (product.id === productId) {
          // Find the variant with the new size
          const newSelectedVariant = product.variants.find(
            (variant) => variant.name.split('-')[1].trim() === newSize
          );
              
          // Update the selected value for the product
          const updatedProduct = { ...product, selected: newSelectedVariant };

          return updatedProduct;
        }
        return product;
      });
    });
  };
  
  return (
    
    <div style={{flexWrap:'wrap', display:'flex', width:'80%', 
     //border: '1px solid black', 
     padding: '10px', justifyContent:'space-evenly'}}>
      {props.products && props.products.map((option, index) => (
           <div style={{
            display: 'flex',
            flexDirection:'column',
            paddingBottom:'1vh',
            marginBottom:'1vh',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid black',
            flex: '0 0 30%',
            padding: '10px',
          }}>
              <div><h4>{option.name}</h4></div>
              
              <div> <ImageWithModal
        src={option.thumbnail_url}
        alt="Your image description"
        style={{ width: '100%' }}
      /></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', marginTop:'4px', width:'70%' }}>
  <div>
    {selectedVals[index] && selectedVals[index].selected
      ? '$' + selectedVals[index].selected.retail_price
      : '$Free.99'}
  </div>

  <div>
    {option.variants && option.variants.length > 1 ? (
      <ShirtSizeDropdown
        productId={option.id}
        variants={option.variants}
        onSizeChange={handleSizeChange}
        setCart={props.updateCart}
      />
    ) : (
      <></>
    )}
  </div>
</div>


          <button 
          className={styles.addToCart}
          onClick={(event) => {
  props.addToCart(selectedVals[index].selected);
}}>Add To Cart</button>
            </div>
            
          ))}

    </div>
  );
};

export default Body;

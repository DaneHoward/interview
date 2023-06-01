// components/Header.js
import React, { useState } from 'react';

import 'react-dropdown/style.css';
import styles from '../styles/Home.module.css';
import HoverDropdown from '../pages/HoverDropdown';

const Header = (props) => {
  return (
    <header className={styles.headerContainer}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
      <div style={{paddingRight:4}}>
        <img
          style={{ width: '50px', height: '50px' }} // Adjust the size as needed
          src="assets/imgs/logo_trans.png" // Replace with your icon's URL or path
          alt="Interview Example"
        />
      </div>
      <div>
        <h1>Interview Example</h1>
      </div>
    </div>
      
      <HoverDropdown cart={props.cart} setCart={props.updateCart}/>
    </header>
  );
};

export default Header;

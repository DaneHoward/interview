// components/HoverDropdown.js
import React, {useState, useEffect} from 'react';
import styles from '../styles/dropdown.module.css';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import Dropdown from 'react-dropdown';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const HoverDropdown = (props) => {
    const [selected, setSelected] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [localCart, setLocalCart] = useState(props.cart);

    const getTotal = (cart) => {
      let sum = 0;
      cart && cart.map(item => {
        sum += parseFloat(item.retail_price);
      });
      return sum;
    };
    

    useEffect(() => {
      setLocalCart(props.cart);
      console.log('carts right now: ', props.cart);
    }, [props.cart]);

    const toggleDrawer = (open) => (event) => {
        setDrawerOpen(open);
      };

      const list = () => (
        <div
  style={{
    border: '1px solid black',
    height: '85%',
    width:'100%',
    paddingLeft:'3%',
    paddingRight:'3%',
    alignSelf:'center',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  }}
>
  <div style={{ flexGrow: 1 }}>
    {props.cart &&
      props.cart.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
  <img style={{ width: '25%', marginRight: '16px' }} src={item.files[1].preview_url} />
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ fontWeight: 'bold', fontSize: '1.1em', marginBottom: '4px' }}>
      {item.name}
    </div>
    <div>{item.retail_price && '$' + item.retail_price}</div>
  </div>
</div>

 <button
  onClick={() => {
    // Create a new cart array without the removed item
    const updatedCart = props.cart.filter(
      (_, itemIndex) => itemIndex !== index
    );
    // Update the cart state
    props.setCart(updatedCart);
  }}
  style={{
    backgroundColor: '#FF4B4B',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s',
    outline: 'none',
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = '#FF1F1F';
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = '#FF4B4B';
  }}
>
  X
</button>

        </div>
      ))}
  </div>
</div>

      );
  // 757-664-7800
    const options = [
        { value: 'all', label: 'All' },
        { value: 'cart', label: 'My Cart' },
      ];
  
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
      };

      const handleClick = (selectedOption) => {
        console.log(selectedOption);
        setSelected(selectedOption);
      };
    
      const handleMenuItemClick = (option) => {
        console.log(`Selected: ${option.label}`);
        setMenuOpen(false);
        if(option.value == 'cart'){
            console.log('this fires!');
            setDrawerOpen(true);
        }
        
      };

  return (
    <div className={styles.dropdownContainer}>
         <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}
      sx={{
        width: '33%', // Set custom width for the drawer
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '400px', // Set custom width for the drawer paper
          boxSizing: 'border-box',
        },
      }}
      >
        <div style={{textAlign:'center', fontSize:20,fontWeight:'bold'}}>My Cart</div>
        <div style={{paddingLeft:5, fontWeight:'bold'}}>{props.cart && props.cart.length ?  'Total Items: ' + props.cart.length : ''}</div>
        {list()}
        <div style={{paddingLeft:5, fontWeight:'bold'}}>
          Sub-Total: ${ props.cart ? getTotal(props.cart) : '0.00'}
        </div>
        <button
  style={{
    width: '97%',
    height:'10%',
    backgroundColor: '#33A033',
    color: 'white',
    border: 'none',
    padding: '2%',
    margin:'1%',
    fontSize: '16px',
    cursor: 'pointer',
  }}
>
  Checkout
</button>
      </Drawer>
      <div className={styles.hamburger}>
      <FaBars size={24} onClick={handleMenuToggle} />
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          {options && options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleMenuItemClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      </div>
      <div className={styles.buttonRow}>
     
      <button className={styles.button} onClick={() => handleClick(0)}>
        Home
      </button>
      <button className={styles.button} onClick={toggleDrawer(true)}>
       Cart <FaShoppingCart size={16} />  { props.cart && props.cart.length > 0 ? props.cart.length : <></>}
      </button>
    </div>
      <div className={styles.mobileMenuOpen}>
      
      </div>
    </div>
  );
};

export default HoverDropdown;

import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Header from './header';
import Body from './body';

export default function Home() {
  const [myCart, setCart] = useState([]);

  const [fullList, setFullList] = useState([]);
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);


  function combineProductsWithVariants(products, variants) {
    return products.map(product => {
      const productVariants = variants.filter(variant => variant.sync_product_id === product.id);
      return {
        ...product,
        selected: productVariants[0],
        variants: productVariants,
      };
    });
  }

  const updateCart = (newCartValue) =>{
    setCart(newCartValue);
  }

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
  
        if (response.ok) {
          const data = await response.json();
          setProducts(data.result);
          return data.result;
        } else {
          console.error("Error fetching products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    const getVariantData = async (productIds) => {
      try {
        const allVariants = [];
  
        for (const productId of productIds) {
          const response = await fetch(`/api/product/${productId}`);
  
          if (response.ok) {
            const data = await response.json();
            allVariants.push(...data.sync_variants);
          } else {
            console.error("Error fetching variants:", response.statusText);
          }
        }
  
        setVariants(allVariants);
        return allVariants;
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };
  
    const fetchData = async () => {
      const products = await fetchProducts();
      const productIds = products.map((product) => product.id);
      const variants = await getVariantData(productIds);
      const temp = combineProductsWithVariants(products, variants);
      
      setFullList(temp);
    };
  
    fetchData();
  }, []);
  
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Hire Dane</title>
        <link rel="icon" href="assets/imgs/logo_trans.png" />
      </Head>

      <main>
        <Header cart={myCart} updateCart={updateCart} />
        <div style={{paddingTop:'5%'}}></div>
        <div>THIS IS AN EXAMPLE WEBSITE. Please don't steal my stuff and just hire me instead!</div>
        <div style={{paddingTop:'5%'}}></div>
        {fullList.length > 0 ?
        <Body cart={myCart} products={fullList} addToCart={addToCart} updateCart={updateCart} />
          :<div style={{justifyContent:'center', textAlign:'center'}}><img src="assets/imgs/cool-load.gif"/><br></br></div> }
      
      </main>

     

      <footer>
        <a
          href="https://danehoward.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{flexDirection:'row', alignContent:'center' }}>
          <div style={{ textAlign:'center'}}>Powered by</div>
          <div style={{ textAlign:'center'}}><img src="assets/imgs/logo_trans.png" alt="Dane Howard" className={styles.logo} /></div>
          </div>

        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 90px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

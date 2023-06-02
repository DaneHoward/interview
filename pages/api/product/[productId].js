async function getProductDataById(id) {
    try {
      const oauthToken = "ZofOgXzhGyoqKgBacjrF1uC3SfhxcbNrSbKtPyGv"; // Replace this with your actual OAuth token
      const response = await fetch(`https://api.printful.com/store/products/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${oauthToken}`
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product data:', error);
      throw error;
    }
  }
  
  export default async function handler(req, res) {
    const {
      query: { productId },
    } = req;
  
    try {
      const productData = await getProductDataById(productId);
      if (productData && productData.result) {
        res.status(200).json(productData.result);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
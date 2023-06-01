// pages/api/products.js

export default async function handler(req, res) {
    try {
      const oauthToken = ""; // Replace this with your actual OAuth token
      const response = await fetch("localhost:3000/products", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${oauthToken}`
        }
      });
  
      const data = await response.json();
     // console.log('here is your stinking data', data);
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching products." });
    }
  }
  
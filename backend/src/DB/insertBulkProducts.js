import Product from "../Models/Product.Model.js";
import dbConnection from "./dbConnection.js";

// Connect to MongoDB
const insertBulk = async () => {
  // Generate Random Unique Data
  const generateUniqueProductData = () => {
    const sizes = ["S", "M", "L", "XL", "XXL"];
    const colors = ["Red", "Blue", "Green", "Yellow", "Black"];
    const highlights = [
      "Waterproof",
      "Durable",
      "Lightweight",
      "Eco-friendly",
      "Handmade",
    ];
    const breadcrumbs = ["Home", "Clothing", "Men", "Women", "T-Shirts"];

    const getRandomElements = (arr) => {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.floor(Math.random() * arr.length) + 1);
    };

    const usedCombinations = new Set();
    const generateUniqueCombination = () => {
      let sizesData, colorsData, highlightsData, breadcrumbsData, key;
      do {
        sizesData = getRandomElements(sizes);
        colorsData = getRandomElements(colors);
        highlightsData = getRandomElements(highlights);
        breadcrumbsData = getRandomElements(breadcrumbs);
        key = `${sizesData.join("-")}-${colorsData.join(
          "-"
        )}-${highlightsData.join("-")}-${breadcrumbsData.join("-")}`;
      } while (usedCombinations.has(key));

      usedCombinations.add(key);

      return {
        sizes: sizesData,
        colors: colorsData,
        highlights: highlightsData,
        breadcrumbs: breadcrumbsData,
      };
    };

    return generateUniqueCombination();
  };

  // Create and Save 100 Unique Products
  const createUniqueProducts = async () => {
    for (let i = 0; i < 100; i++) {
      const { sizes, colors, highlights, breadcrumbs } =
        generateUniqueProductData();

      const newProduct = new Product({
        title: `Sample Product ${i + 1}`,
        description: `This is the description for Sample Product ${i + 1}.`,
        category: 1, // Replace with actual category ID
        brand: 1, // Replace with actual brand ID
        price: Math.floor(Math.random() * 100) + 1, // Random price between 1 and 100
        sizes,
        colors,
        highlights,
        stock:100,
        breadcrumbs,
        thumbnail:"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
      });

      await newProduct.save();
      console.log(`Product ${i + 1} created:`, newProduct);
    }

    console.log("100 unique products have been created.");
    mongoose.connection.close(); // Close connection when done
  };

  // Run the function to create products
  createUniqueProducts().catch(console.error);
};
export default insertBulk;
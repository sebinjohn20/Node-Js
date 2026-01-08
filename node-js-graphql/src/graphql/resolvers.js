const products = require("../data/products");

const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find((item) => item.id === id),
  },
  Mutation: {
    createProduct: (_, { title, category, price, inStock }) => {
      const newlyCreatedProduct = {
        id: String(products.length + 1),
        title,
        category,
        price,
        inStock,
      };
      products.push(newlyCreatedProduct);
      return newlyCreatedProduct;
    },
    deleteProduct: (_, { id }) => {
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) return false;
      products.splice(index, 1);
      return true;
    },

    updateProduct: (_, { id, title, category, price, inStock }) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      if (title !== undefined) product.title = title;
      if (category !== undefined) product.category = category;
      if (price !== undefined) product.price = price;
      if (inStock !== undefined) product.inStock = inStock;
      return product;
    },
  },
};
module.exports = resolvers;

//

const Product = require("../models/Products");
const resolvers = {
  Query: {
    products: async () => await Product.find({}),
    product: async (_, { id }) => await Product.findById(id),

    products: async (_, { sortBy = "price", order = "des" }) => {
      return await Product.find({}).sort({
        [sortBy]: order === "asc" ? 1 : -1,
      });
    },
  },
  Mutation: {
    createProduct: async (_, args) => {
      const newlyCreatedProduct = new Product(args);
      return await newlyCreatedProduct.save();
    },
    deleteProduct: async (_, { id }) => {
      const deleteProduct = await Product.findByIdAndDelete(id);

      return !!deleteProduct;
    },

    updateProduct: async (_, { id, ...updatedFields }) => {
      return await Product.findByIdAndUpdate(id, updatedFields, { new: true });
    },
  },
};
module.exports = resolvers;

//fdsfsdfsdfsdfsdfdfsdsfsdfdfdffsdfdfsdfsdfdsffdsdfdfdsfddfdfddfsdfdfsdfsdfdsfdsfdffdfdsfdsfdfdsfsdffffdfdsfdffdsfdfdfdfdffdsfdsfffdsfsfsdfdfsdfdsfdsfdsfdfdfdsfdfdfdfdsfdsfdsfdssfsdfdsfdsffdsfdfsdfdsfdsfsdfsdfdsfsdfsdfsdfsdfffsdffsdfsdfsdfffsafddsfsdfsdfsdfsdfsdfsdfffsfsdfsdfsfsdfdfsdfdsffsdfsafsdsfsdfasfsdfsdfsdfdfsdfasdfsdfsdfsdfsdfsdffdsfasfsdfsdffsdffsfdfdsfdsfsdfsdfdfdfdfsdfdsfsdfdsfdfdffdfdsfdsfdfdsfffdsfdfsdfdfdfsdfsdfsdffdfdfsdfsdfsdfsadfsdfhjhkjhkjkjhkjjkhjhjhhjkkkjhkjhkhjkjhkhjjkhjhkkjhkjhjkjhkkjkjkjhkhkjkjkjkjkjhkjhkjhkjkjkjkjkjkjjkjkjkjkkjhkjhhkjhkjkjljkkjhkjhhjkkjhkjhkjhkjhkhjkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkhjkhjkjhhjkhjkkhjhjkkjhkjhkjhkjhkjhkhjkjhkjhkjhkjhkjhkjhkjhkhjkjhjkhkhjkjhkhjkjhkjhkjhkjhkjhhjkjhkkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkhjkjhkjhkjhkjhjhkkjhkhjkjhkhjkjhkjhkjhkjhkjhhhhkjhkjhhhhhhhhhhhhhhhhhhhhhkjhkjhkhjkjhjkhjkhkjhjkhkjhkjhkjhkjhkjhkjdsfdsfsdfsdfddsfsdfsdfsdfdfdfsdfdsfdfsdfdfsdfhjkhkjkjhkjhkjhdfdsfdsfdsfdsfdsfdffffdsfdsfdsfdsfdsfdsfdsfdsfdffddfdfdfdfsdfsdfsdfsdfsdfsdfdsfsdfsdfdsfsdfafdsfsdfsdfsdfsdfdsfsdfdsfdsfsdfdsfsdfsdfdsfsdfdfsadfsdfsdfsdfdfsdfsdfsdfdsfdsfsdfsadfdsfsdfsdfsdfdsfsdfsdfsafsdfsfdssdfsdfsddsfsdfdsfasfsdfffsdfsdfsdffdsfdfdsfdsfdsfsdfsdfsdffdfdsfsdfffdsfsdfdsfsdfsdfsdfsdfdfdsfsdfdfsdfdsfdfsdfdsfsdfdfsdffsafsdfsdf

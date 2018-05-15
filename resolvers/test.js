export default {
  Query: {
    allCats: async (parent, args, { Cat }) => {
      const cats = await Cat.find();
      console.log(cats);
      const result = cats.map(x => {
        x._id = x._id.toString();
        return x;
      });
      return result;
    }
  },
  Mutation: {
    createCat: async (parent, args, { Cat }) => {
      const kitty = await new Cat(args).save();
      kitty._id = kitty._id.toString();
      return kitty;
    }
  }
};

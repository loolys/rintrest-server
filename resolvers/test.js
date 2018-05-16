import bcrypt from "bcrypt";

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
    },
    allPins: async (parent, args, { Pin }) => {
      const pins = await Pin.find();
      return pins;
    }
  },
  Mutation: {
    createCat: async (parent, args, { Cat }) => {
      const kitty = await new Cat(args).save();
      kitty._id = kitty._id.toString();
      return kitty;
    },
    createPin: async (parent, args, { Pin }) => {
      const pin = await Pin(args).save();
      console.log(pin);
      return pin;
    },
    createUser: async (parent, args, { User }) => {
      console.log(args);
      const newUser = new User(args);
      const user = await newUser.save();
      console.log(user);
      return user;
    },
    loginUser: async (parent, { username, password }, { User }) => {
      const user = await User.findOne({ username }, (err, user) => {
        if (err) return false;
      });

      if (!user) return { success: false };

      const validate = await bcrypt.compare(password, user.password);

      return {
        success: validate
      };
    }
  }
};

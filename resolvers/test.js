import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import decode from "jwt-decode";

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
      const result = pins.map(x => {
        x._id = x._id.toString();
        return x;
      });
      return result;
    },
    usersPins: async (parent, { header }, { Pin }) => {
      const { username } = await decode(header);
      console.log(username);
      const result = await Pin.find({ user: username });
      return result;
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
      try {
        const user = await newUser.save();

        return {
          success: true,
          username: user.username
        };
      } catch (err) {
        return {
          success: false,
          username: "",
          error: {
            path: "Username",
            message: "Username already exists"
          }
        };
      }
    },
    likePin: async (parent, { username, id }, { Pin }) => {
      const pin = await Pin.findById(id);
      if (pin.likes.indexOf(username) === -1) {
        return Pin.findByIdAndUpdate(
          id,
          {
            $inc: { likeCount: 1 },
            $push: { likes: username }
          },
          { new: true }
        );
      } else {
        return Pin.findByIdAndUpdate(
          id,
          {
            $inc: { likeCount: -1 },
            $pull: { likes: username }
          },
          { new: true }
        );
      }
    },
    loginUser: async (parent, { username, password }, { User }) => {
      const user = await User.findOne({ username }, (err, user) => {
        if (err) return false;
      });

      if (!user)
        return {
          success: false,
          error: {
            path: "User",
            message: "Username Not Found"
          }
        };

      const validate = await bcrypt.compare(password, user.password);

      if (!validate) {
        return {
          success: false,
          error: {
            path: "Password",
            message: "Invalid Password"
          }
        };
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username
        },
        process.env.SECRET
      );

      console.log(token);

      return {
        success: validate,
        token
      };
    }
  }
};

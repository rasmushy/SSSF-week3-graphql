import {User} from '../../interfaces/User';
const UserModel = require('../models/userModel');
// TODO: Add resolvers for user
// 1. Queries
// 1.1. users
// 1.2. userById
// 2. Mutations
// 2.1. createUser
// 2.2. updateUser
// 2.3. deleteUser

const userResolver = {
  Query: {
    users: async (_parent: undefined, users: User) => {
      return await UserModel.find();
    },
    userById: async (_parent: undefined, user: User) => {
      return await UserModel.findById(user.id);
    },
  },
  Mutation: {
    createUser: async (_parent: undefined, user: User) => {
      return await UserModel.create(new UserModel(user));
    },
    updateUser: async (_parent: undefined, args: User) => {
      if (args.id) {
        return await UserModel.findByIdAndUpdate(
          args.id,
          {
            user_name: args.user_name,
            email: args.email,
          },
          {new: true}
        );
      } else {
        return null;
      }
    },
    deleteUser: async (_parent: undefined, args: User) => {
      const deletedUser = await UserModel.findByIdAndDelete(args.id);
      return deletedUser;
    },
  },
};

export default userResolver;

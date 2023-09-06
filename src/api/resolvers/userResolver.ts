// TODO: Add resolvers for user
// 1. Queries
// 1.1. users
// 1.2. userById
// 2. Mutations
// 2.1. createUser
// 2.2. updateUser
// 2.3. deleteUser

import {User} from '../../interfaces/User';
import userModel from '../models/userModel';

const userResolver = {
  Query: {
    async users() {
      return await userModel.find();
    },
    async userById(_parent: {}, user: User['id']) {
      const userFound = await userModel.findById(user.id);
      if (!userFound) {
        throw new Error(`User with id ${user} not found`);
      }

      return user as User;
    },
  },
  Mutation: {
    createUser: (_parent: {}, user: User) => {
      const newUser = new userModel(user);
      userModel.create(newUser);
      return newUser;
    },
    updateUser: (_parent: {}, user: User) => {
      userModel.findOneAndUpdate(user.id, user, {
        new: true,
      });
      return user;
    },
    deleteUser: (_parent: {}, user: User) => {
      userModel.findOneAndDelete({_id: user.id});
      return user;
    },
  },
};

export default userResolver;

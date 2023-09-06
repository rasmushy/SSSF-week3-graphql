import {Cat, CatTest} from '../../interfaces/Cat';
import {Point} from 'geojson';
const CatModel = require('../models/catModel');
// TODO: Add resolvers for cat
// 1. Queries
// 1.1. cats
// 1.2. catById
// 1.3. catsByOwner
// 1.4. catsByArea
// 2. Mutations
// 2.1. createCat
// 2.2. updateCat
// 2.3. deleteCat

const catResolver = {
  Query: {
    async cats() {
      return await CatModel.find();
    },
    async catById(cat: Cat) {
      return await CatModel.findById(cat.id);
    },
    async catsByOwner(cat: Cat) {
      return await CatModel.find({owner: cat.owner});
    },
    async catsByArea(_parent: undefined, args: Cat) {
      return await CatModel.find({
        location: {
          $near: {
            $maxDistance: 1000,
            $geometry: {
              type: args.location.type,
              coordinates: args.location.coordinates,
            },
          },
        },
      });
    },
  },
  Mutation: {
    createCat: async (_parent: undefined, cat: Cat) => {
      return await CatModel.create(new CatModel(cat));
    },
    updateCat: async (_parent: undefined, args: Cat) => {
      const updateCat = await CatModel.findByIdAndUpdate(
        args.id,
        {
          cat_name: args.cat_name,
          weight: args.weight,
          owner: args.owner,
          filename: args.filename,
          birthdate: args.birthdate,
          location: args.location,
        },
        {new: true}
      );
      return updateCat;
    },
    deleteCat: async (_parent: undefined, cat: Cat) => {
      const deleteCat = await CatModel.findOneAndDelete({_id: cat.id});
      return deleteCat;
    },
  },
};

export default catResolver;

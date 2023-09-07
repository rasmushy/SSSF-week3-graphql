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
import {Cat} from '../../interfaces/Cat';
import catModel from '../models/catModel';
import {Point} from 'geojson';

interface CoordinatePoint {
  lat: number;
  lng: number;
}

interface AreaCoordinates {
  topRight: CoordinatePoint;
  bottomLeft: CoordinatePoint;
}

const catResolver = {
  Query: {
    async cats() {
      const cats = await catModel.find({});
      const catsArray: Cat[] = cats.map((cat) => {
        const catOutput = {
          cat_name: cat.cat_name,
          weight: cat.weight,
          birthdate: cat.birthdate,
          filename: cat.filename,
          location: cat.location,
          owner: cat.owner,
        };
        return catOutput;
      }) as Cat[];

      return catsArray;
    },

    async catById(_parent: {}, cat: Cat['id']) {
      const catFound = await catModel.findById(cat.id);
      if (!catFound) {
        throw new Error(`Cat with id ${cat} not found`);
      }

      const catOutput = {
        id: cat,
        cat_name: catFound.cat_name,
        weight: catFound.weight,
        birthdate: catFound.birthdate,
        filename: catFound.filename,
        location: catFound.location,
        owner: catFound.owner,
      };

      return catOutput as Cat;
    },

    async catsByOwner(_parent: {}, ownerId: Cat['owner']) {
      const catsFound = await catModel.find({owner: ownerId.id});
      const catsArray: Cat[] = catsFound.map((cat) => {
        const catOutput = {
          id: cat.id,
          cat_name: cat.cat_name,
          weight: cat.weight,
          birthdate: cat.birthdate,
          filename: cat.filename,
          location: cat.location,
          owner: cat.owner,
        };
        return catOutput;
      }) as Cat[];

      return catsArray;
    },

    async catsByArea(_parent: {}, coordinates: AreaCoordinates) {
      const catsFound = await catModel.find({
        location: {
          $geoWithin: {
            $box: [
              [coordinates.bottomLeft.lat, coordinates.bottomLeft.lng],
              [coordinates.topRight.lat, coordinates.topRight.lng],
            ],
          },
        },
      });

      const catsArray: Cat[] = catsFound.map((cat) => {
        const catLocation = cat.location as Point;

        const catOutput = {
          id: cat.id,
          cat_name: cat.cat_name,
          weight: cat.weight,
          birthdate: cat.birthdate,
          filename: cat.filename,
          location: catLocation,
          owner: cat.owner,
        };
        return catOutput;
      }) as Cat[];

      return catsArray;
    },
  },

  Mutation: {
    createCat: async (_parent: {}, cat: Cat) => {
      const newCat = new catModel(cat);
      await catModel.create(newCat);
      return newCat;
    },
    updateCat: async (_parent: {}, cat: Cat) => {
      await catModel.findOneAndUpdate(cat.id, cat, {new: true});
      return cat;
    },
    deleteCat: async (_parent: {}, cat: Cat) => {
      await catModel.findOneAndDelete({_id: cat.id});
      return cat;
    },
  },
};

export default catResolver;

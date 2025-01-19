import graphql from "graphql";
import Movie from "../models/movie.js";
import Director from "../models/director.js";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    directors: {
      type: DirectorsType,
      resolve(parent) {
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorsType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorsType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        const director = new Director({
          name: args.name,
          age: args.age,
        });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });
        return movie.save();
      },
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Movie.findByIdAndDelete(args.id);
      },
    },
    deleteDirector: {
      type: DirectorsType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Director.findByIdAndDelete(args.id);
      },
    },
    updateDirector: {
      type: DirectorsType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return Director.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name, age: args.age } },
          { new: true }
        );
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Movie.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              genre: args.genre,
              directorId: args.directorId,
            },
          },
          { new: true }
        );
      },
    },
  },
});

// корневой запрос
const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorsType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorsType),
      resolve() {
        return Director.find({});
      },
    },
  },
});

// Экспорт схемы
export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

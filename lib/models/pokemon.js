//  @flow

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Model = new Schema({
  id: Number,
  name: String,
  types: [String],
  height: Number,
  weight: Number,
  sprites: {
    front_default: String
  },
  stats: {
    speed: {
      base: Number,
      effort: Number
    },
    specialDefense: {
      base: Number,
      effort: Number
    },
    specialAttack: {
      base: Number,
      effort: Number
    },
    defense: {
      base: Number,
      effort: Number
    },
    attack: {
      base: Number,
      effort: Number
    },
    hp: {
      base: Number,
      effort: Number
    }
  }
})

const Pokemon = mongoose.model('pokemons', Model)

async function count (condition: Object = {}) {
  const query = Pokemon.find(condition)
  return query.count().exec()
}

type Query = {
  select: string,
  condition: Object,
  pageSize: number,
  page: number,
  sort: {
    field: string,
    direction: number
  }
}

async function all (
  {
    select = 'id name types height weight sprites.front_default',
    condition = {},
    pageSize = 5,
    page = 1,
    sort = { field: 'id', direction: 1 }
  }: Query
) {
  const query = Pokemon
    .find(condition)
    .select(select)
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .sort({
      [sort.field]: sort.direction
    })
  return query.exec()
}

async function types () {
  return Pokemon
    .find()
    .select('types')
    .exec()
}

async function get (id: number) {
  return Pokemon
    .find({ id })
    .exec()
}

exports.Model = Pokemon
exports.count = count
exports.all = all
exports.types = types
exports.get = get

//  @flow

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Model = new Schema({
  id: Number,
  name: String,
  photo: String,
  provider: String,
  favoritePokemons: [Number]
})

const User = mongoose.model('users', Model)

type UserType = {
  id: number,
  name: string,
  photo?: string,
  provider: string,
  favoritePokemons?: Array<number>
}

async function save (user: UserType) {
  return User
    .update({ id: user.id }, user, { upsert: true })
    .exec()
}

async function get (id: number) {
  return User
    .find({ id })
    .exec()
}

async function update (user: UserType) {
  return User
    .update({ id: user.id }, user)
    .exec()
}

exports.Model = User
exports.save = save
exports.get = get
exports.update = update

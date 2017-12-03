//  

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


async function save (user) {
  return User
    .update({ id: user.id }, user, { upsert: true })
    .exec()
}

async function get (id) {
  return User
    .find({ id })
    .exec()
}

async function update (user) {
  return User
    .update({ id: user.id }, user)
    .exec()
}

exports.Model = User
exports.save = save
exports.get = get
exports.update = update

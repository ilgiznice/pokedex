const express = require('express')
const endpoints = require('../../etc/endpoints')
const apiController = require('../controllers/api_controller')

const router = express.Router()

router.get(endpoints.pokemonsByName.backend, async (req, res) => {
  await apiController.getPokemonsByNameRequest({ req, res })
})

router.get(endpoints.pokemonList.backend, async (req, res) => {
  await apiController.getPokemonsRequest({ req, res })
})

router.get(endpoints.pokemonById.backend, async (req, res) => {
  await apiController.getPokemonByIdRequest({ req, res })
})

router.post(endpoints.addPokemonToFavorite.backend, async (req, res) => {
  await apiController.addPokemonToFavoriteRequest({ req, res })
})

router.post(endpoints.removePokemonFromFavorite.backend, async (req, res) => {
  await apiController.removePokemonFromFavoriteRequest({ req, res })
})

module.exports = router

const express  = require("express")
const {
    getProducts
} = require ("../controllers/products")

const routes = express.Router()

routes.route("/").get(getProducts)

module.exports = routes
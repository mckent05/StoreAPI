const productModel = require("../models/product")


const getProducts = async(req, res) => {
  const { company, feature} = req.query
  const queryObject = {}
  console.log(queryObject)
  if(company) {
    queryObject = {
      ...queryObject,
      company: company
    }
  }
  try {
    const products = await productModel.find(queryObject)
    res.status(200).json({ products, length:products.length })
  }catch(err) {
    console.log(err)
  }
 
}

module.exports = {
    getProducts
}
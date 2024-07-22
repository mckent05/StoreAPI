const productModel = require("../models/product")


const getProducts = async(req, res) => {
  const { company, featured, numericFilters } = req.query
  let queryObject = {}
  
  if(company) {
    queryObject.company = company
  }
  if(featured) {
    queryObject.featured = featured === "true" ? true: false
  }
  if(numericFilters) {
    const operatorMap =  {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }

    const regex =  /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.trim().replace(regex, (match) => `-${operatorMap[match]}-` )
    const options = ["price", "rating"]
    filters.split(",").forEach(filter => {
      const [price, operator, value] = filter.split("-")
      if(options.includes(price)) {
        queryObject[price] = { [operator]: value }
      }
    })
    console.log(queryObject)
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
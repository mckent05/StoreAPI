require("dotenv").config()
const connectDB = require("./config/db")
const express = require("express")
const productRoutes = require("./routes/product")
const notFound = require("./middleware/notFound")
const errorHandler = require("./middleware/errorhandler")
const app = express()
let connectionString = process.env.MONGO_URI
connectionString = connectionString.replace("<password>", encodeURIComponent(process.env.password))

app.use(express.json())

app.use("/api/v1/products", productRoutes)
app.use(notFound)
app.use(errorHandler)


const PORT = 3000

const start = async () => {
    try {
        await connectDB(connectionString)
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}...` )
        })
    } catch (error) {
        console.log(error)
    }
}

start()
require('dotenv').config()

let PORT = 3003
let MONGODB_URI = 'mongodb+srv://fullstack:hySalasana2019@fullstack-ptwry.mongodb.net/test?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  PORT
}
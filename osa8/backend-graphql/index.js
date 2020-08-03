const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const JWT_SECRET = 'hooj_sekred'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstack:hySalasana2019@fullstack-ptwry.mongodb.net/bookdb?retryWrites=true&w=majority'

console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error in connecting to MongoDB', error.message)
    })

const typeDefs = gql`
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genres: [String]): [Book!]!
        findAuthor(author: String!): Author!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author

        createUser(
            username: String!
            favoriteGenre: String
            password: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments,
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {

            if (Object.keys(args).length !== 0) {
                if (args.author) {
                    const author = await Author.findOne({ name: args.author })

                    if (!author) {
                        return []
                    }

                    const returnedBooks = await Book.find({ author: author.id, genres: { $in: args.genres } }).populate('author', { name: 1 })
                    return returnedBooks
                } else if (args.filters !== null) {
                    const returnedBooks = await Book.find({ genres: { $in: args.genres } }).populate('author', { name: 1 })
                    return returnedBooks
                }
            }

            const returnedBooks = await Book.find({}).populate('author', { name: 1 })
            return returnedBooks
        },
        allAuthors: async () => {
            const authors = await Author.find({})
            return authors
        },
        findAuthor: async (root, args) =>
            await Author.findOne({ name: args.name })
        ,
        me: (root, args, context) => {
            return context
        }
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({ author: root })
            return books.length
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            const author = await Author.findOne({ name: args.author })
            let book

            if (!author) {
                const newAuthor = new Author({ name: args.author })
                try {
                    const returnedAuthor = await newAuthor.save()
                    book = new Book({ ...args, author: returnedAuthor })
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }
            } else {
                book = new Book({ ...args, author: author })
            }

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            return book
        },
        editAuthor: async (root, args, context) => {
            const author = await Author.findOne({ name: args.name })

            if (!author) {
                return null
            }

            author.born = args.setBornTo
            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            return author
        },
        createUser: async (root, args) => {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(args.password, saltRounds)
            const user = new User({ username: args.username, passwordHash: passwordHash, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(args.password, user.passwordHash)

            if (!(user && passwordCorrect)) {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null

        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )

            const currentUser = await User
                .findById(decodedToken.id)

            return currentUser
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})

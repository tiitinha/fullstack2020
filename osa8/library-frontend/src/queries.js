import { gql } from '@apollo/client'

export const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            name
        }
        published
        genres
    }
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query getAllBooks($author: String, $genres: [String]) {
        allBooks(author: $author, genres: $genres) {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
    mutation CreateBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author
            published: $published,
            genres: $genres
        ) {
            title 
            author {
                name
            }
            id
        }
    }
`

export const UPDATE_AUTHOR = gql`
    mutation UpdateAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
        }
    }
`

export const FIND_AUTHOR = gql`
    query findAuthorByName($nameToSearch: String!) {
        findAuthor(name: $nameToSearch) {
            name
            born
        }
    }
`
export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const CREATE_USER = gql`
    mutation createUser($username: String!, $favoriteGenre: String!) {
        createUser(username: $username, favoriteGenre: $favoriteGenre) {
            user
        }
    }
`

export const CURRENT_USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`


import { gql } from '@apollo/client'

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
    query {
        allBooks {
            title
            author
            published
        }
    }
`

export const CREATE_BOOK = gql`
    mutation CreateBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author
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
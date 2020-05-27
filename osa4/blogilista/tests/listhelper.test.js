const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of emti list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogi = {
            title: 'otsiko',
            author: 'Minä',
            url: 'google.fi',
            likes: 78
        }
        expect(listHelper.totalLikes([blogi])).toBe(78)
    })

    test('of a bigger list is calculated right', () => {
        const blogi = {
            title: 'otsiko',
            author: 'Minä',
            url: 'google.fi',
            likes: 78
        }
        const blogi2 = {
            title: 'otsiko2',
            author: 'Minä',
            url: 'google.fi',
            likes: 22
        }

        expect(listHelper.totalLikes([blogi, blogi2])).toBe(100)
    })

})

describe('favorite blog', () => {
    test('the one with most likes is returned', () => {
        const blogi = {
            title: 'otsiko',
            author: 'Minä',
            url: 'google.fi',
            likes: 78
        }
        const blogi2 = {
            title: 'otsiko2',
            author: 'Minä',
            url: 'google.fi',
            likes: 22
        }

        expect(listHelper.favoriteBlog([blogi, blogi2])).toEqual(blogi)
    })
})


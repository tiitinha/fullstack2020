const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((likes, item) => {
        return likes + item.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    const maxValue = blogs
        .map(blog => blog.likes)
        .reduce((a, b) => Math.max(a,b))

    return blogs.find(blog => blog.likes === maxValue)
}

const mostBlogs = (blogs) => {
    const occurrencies = blogs
        .map(blog => blog.author)
        .reduce((memo, author) => {
            memo[author] = (memo[author] + 1) || 1
            return memo
        }, {})

    const mostOccurencies = Object.keys(occurrencies)
        .reduce((highest, current) =>
            occurrencies[highest] > occurrencies[current]
                ? highest
                : current
        )

    return { author: mostOccurencies, blogs: occurrencies[mostOccurencies] }
}

const mostLikes = (blogs) => {
    const likes = blogs
        .reduce((blogs, blog) => {
            blogs[blog.author] = (blogs[blog.author] + blog.likes) || blog.likes
            return blogs
        }, {})

    const authorMostLikes = Object.keys(likes)
        .reduce((highest, current) =>
            likes[highest] > likes[current]
                ? highest
                : current
        )

    return { author: authorMostLikes, likes: likes[authorMostLikes] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
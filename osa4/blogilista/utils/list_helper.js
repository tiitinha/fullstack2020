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

    console.log(blogs.find(blog => blog.likes === maxValue))
    return blogs.find(blog => blog.likes === maxValue)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
import React from 'react'

const NewBlogForm = ({ handleCreation, title, titleChange, author, authorChange, url, urlChange }) => {
    return (
        <>
            <h1>log in to application</h1>
            <form onSubmit={handleCreation}>
                <div>
                    title
                <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={titleChange}
                    />
                </div>
                <div>
                    author
                <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={authorChange}
                    />
                </div>
                <div>
                    url
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={urlChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default NewBlogForm
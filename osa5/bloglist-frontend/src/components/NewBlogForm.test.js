import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

test('Form calls the function given as a prop', () => {
    const mockHandleCreation = jest.fn()

    const component = render(
        <NewBlogForm handleCreation={mockHandleCreation} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
        target: { value: 'testi' }
    })

    fireEvent.change(title, {
        target: { value: 'testititle' }
    })

    fireEvent.change(url, {
        target: { value: 'testiurl' }
    })

    fireEvent.submit(form)

    expect(mockHandleCreation.mock.calls).toHaveLength(1)
})

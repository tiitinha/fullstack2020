describe('Blog', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login', function () {
        beforeEach(function () {
            cy.createUser('testi', 'salainen', 'testinimi')
        })

        it('succeeds with correct credentials', function () {
            cy.get('input:first').type('test')
            cy.get('input:last').type('salainen')
            cy.get('#login-button').click()

            cy.contains('testi logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('input:first').type('test')
            cy.get('input:last').type('wrong')
            cy.get('#login-button').click()

            cy.get('html').should('not.contain', 'testi logged in')
            cy.get('.error')
                .should('contain', 'wrong credentials')
                .should('have.css', 'color', 'rgb(255, 0, 0)')
        })

    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.createUser({
                username: 'testi',
                password: 'salainen',
                name: 'testinimi'
            })
            cy.login({
                username: 'testi',
                password: 'salainen'
            })
        })

        it('a blog can be created', function () {
            cy.contains('New blog').click()
            cy.get('#title').type('title')
            cy.get('#author').type('testjim')
            cy.get('#url').type('test.url')

            cy.get('#create-button').click()

            cy.get('.blog').click()
            cy.get('html').should('contain', 'title')
                .and('contain', 'testjim')
                .and('contain', 'test.url')

            cy.get('.add')
                .should('contain', 'undefined a new blog title by testjim added')
        })

        describe('and when a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'title1',
                    author: 'author1',
                    url: 'url1',
                    likes: 0
                })
            })

            it('a blog can be deleted', function () {
                cy.get('.blog').click()
                cy.get('#remove-button').click()
                cy.get('html').should('not.contain', 'title1')
            })

        })

        describe('and multiple blogs exist', function () {
            beforeEach(function () {
                for (let i = 0; i < 10; i++) {
                    cy.createBlog({
                        title: `title${i}`,
                        author: `author${i}`,
                        url: `url${i}`,
                        likes: i
                    })
                }
            })

            it('blogs are ordered by likes', function () {

                cy.get('.blog')
                    .each(($el, index) => {
                        cy.wrap($el).click()
                        cy.get('.likes')
                            .should('contain', `${10 - 1 - index}`)                            
                })
            })

        })
    })



})
// import { render, screen, waitFor } from '@testing-library/react'
// import userEvent, { UserEvent } from '@testing-library/user-event'

// import Page from '../app/(auth)/(login)/page'

// let user: UserEvent

// describe('Sign in', () => {
// 	beforeEach(() => {
// 		user = userEvent.setup()
// 	})

// 	it('sign in successfully', async () => {
// 		render(<Page />)

// 		const header = screen.getByRole('heading')
// 		const headerText = 'Acessar dashboard'

// 		await waitFor(() => expect(header).toHaveTextContent(headerText))

// 		// user.type(screen.getByLabelText('Seu e-mail'), 'bruno@fintracer.com.br')
// 		// user.type(screen.getByLabelText('Sua senha'), '123456')

// 		// await screen.getByLabelText('Seu e-mail')
// 	})
// })

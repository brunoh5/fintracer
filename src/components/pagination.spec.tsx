/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'

import { Pagination } from './pagination'

let user: UserEvent
let onPageChangeCallBack: any

describe('Pagination', () => {
	beforeEach(() => {
		user = userEvent.setup()
		onPageChangeCallBack = jest.fn()
	})

	it('should be calculate the right amount of pages', () => {
		const view = render(
			<Pagination
				pageIndex={0}
				totalCount={200}
				perPage={10}
				onPageChange={onPageChangeCallBack}
			/>,
		)

		expect(view.getByText('Página 1 de 20')).toBeInTheDocument()
		expect(view.getByText('Total de 200 item(s)')).toBeInTheDocument()
	})

	it('should be able to navigate to the next page', async () => {
		const view = render(
			<Pagination
				pageIndex={0}
				totalCount={200}
				perPage={10}
				onPageChange={onPageChangeCallBack}
			/>,
		)

		const nextPageButton = view.getByRole('button', {
			name: 'Próxima página',
		})

		await user.click(nextPageButton)

		expect(onPageChangeCallBack).toHaveBeenCalledWith(1)
	})

	it('should be able to navigate to the previous page', async () => {
		const view = render(
			<Pagination
				pageIndex={5}
				totalCount={200}
				perPage={10}
				onPageChange={onPageChangeCallBack}
			/>,
		)

		const previousPageButton = view.getByRole('button', {
			name: 'Página anterior',
		})

		await user.click(previousPageButton)

		expect(onPageChangeCallBack).toHaveBeenCalledWith(4)
	})
})

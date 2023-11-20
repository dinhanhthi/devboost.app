import { fireEvent, render, screen } from '@testing-library/react'

import UlidValidator from '../UlidValidator'

Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    readText: jest.fn()
  }
})

describe('UlidValidator', () => {
  it('renders without crashing', () => {
    render(<UlidValidator />)
  })

  it('disables ClearButton and ValidateButton when UUID input is empty', () => {
    render(<UlidValidator />)
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const validateButton = screen.getByRole('button', { name: /validate/i })
    expect(clearButton).toBeDisabled()
    expect(validateButton).toBeDisabled()
  })

  it('enables ClearButton and ValidateButton when UUID input is not empty', () => {
    render(<UlidValidator />)
    const input = screen.getByTestId('ulid-input')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const validateButton = screen.getByRole('button', { name: /validate/i })
    fireEvent.change(input, { target: { value: 'test' } })
    expect(clearButton).toBeEnabled()
    expect(validateButton).toBeEnabled()
  })

  it('clears UUID input when ClearButton is clicked', () => {
    render(<UlidValidator />)
    const input = screen.getByTestId('ulid-input')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const validateButton = screen.getByRole('button', { name: /validate/i })
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(clearButton)
    expect(input).toHaveValue('')
    expect(clearButton).toBeDisabled()
    expect(validateButton).toBeDisabled()
  })

  it('pastes from clipboard when ClipboardButton is clicked', async () => {
    const clipboardSpy = jest
      .spyOn(navigator.clipboard, 'readText')
      .mockImplementation(() => Promise.resolve('clipboardValue'))
    render(<UlidValidator />)
    const clipboardButton = screen.getByRole('button', { name: /clipboard/i })
    fireEvent.click(clipboardButton)
    await screen.findByDisplayValue('clipboardValue')
    const input = screen.getByTestId('ulid-input')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const validateButton = screen.getByRole('button', { name: /validate/i })
    expect(input).toHaveValue('clipboardValue')
    expect(clearButton).toBeEnabled()
    expect(validateButton).toBeEnabled()
    clipboardSpy.mockRestore()
  })

  it('validates ULID when ValidateButton is clicked', async () => {
    render(<UlidValidator />)
    const input = screen.getByTestId('ulid-input')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    const clearButton = screen.getByRole('button', { name: /clear/i })
    fireEvent.change(input, { target: { value: '01HFE5Z3SZDQVR53EY0T54C9TS' } })
    fireEvent.click(validateButton)
    expect(await screen.findByText('ULID is valid', { exact: false })).toBeVisible()
    expect(clearButton).toBeEnabled()
  })

  it('displays error message when ULID is invalid', async () => {
    render(<UlidValidator />)
    const input = screen.getByTestId('ulid-input')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    const clearButton = screen.getByRole('button', { name: /clear/i })
    fireEvent.change(input, { target: { value: 'invalid' } })
    fireEvent.click(validateButton)
    expect(await screen.findByText('ULID is invalid', { exact: false })).toBeVisible()
    expect(clearButton).toBeEnabled()
  })
})

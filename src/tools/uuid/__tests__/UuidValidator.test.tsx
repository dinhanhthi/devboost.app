import { fireEvent, render, screen } from '@testing-library/react'
import UuidValidator from '../UuidValidator'

Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    readText: jest.fn()
  }
})

describe('UuidValidator', () => {
  it('renders without crashing', () => {
    render(<UuidValidator />)
  })

  it('disables ClearButton and ValidateButton when UUID input is empty', () => {
    render(<UuidValidator />)
    const clearButton = screen.getByTestId('clear-button')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    expect(clearButton).toBeDisabled()
    expect(validateButton).toBeDisabled()
  })

  it('enables ClearButton and ValidateButton when UUID input is not empty', () => {
    render(<UuidValidator />)
    const input = screen.getByTestId('uuid-input')
    const clearButton = screen.getByTestId('clear-button')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    fireEvent.change(input, { target: { value: 'test' } })
    expect(clearButton).toBeEnabled()
    expect(validateButton).toBeEnabled()
  })

  it('clears UUID input when ClearButton is clicked', () => {
    render(<UuidValidator />)
    const input = screen.getByTestId('uuid-input')
    const clearButton = screen.getByTestId('clear-button')
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
    render(<UuidValidator />)
    const clipboardButton = screen.getByTestId('clipboard-button')
    fireEvent.click(clipboardButton)
    await screen.findByDisplayValue('clipboardValue')
    const input = screen.getByTestId('uuid-input')
    const clearButton = screen.getByTestId('clear-button')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    expect(input).toHaveValue('clipboardValue')
    expect(clearButton).toBeEnabled()
    expect(validateButton).toBeEnabled()
    clipboardSpy.mockRestore()
  })

  it('validates UUID when ValidateButton is clicked', async () => {
    render(<UuidValidator />)
    const input = screen.getByTestId('uuid-input')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    const clearButton = screen.getByTestId('clear-button')
    fireEvent.change(input, { target: { value: '123639f0-8522-11ee-9b23-0500b4b78763' } })
    fireEvent.click(validateButton)
    expect(await screen.findByText('UUID is valid', { exact: false })).toBeVisible()
    expect(clearButton).toBeEnabled()
  })

  it('displays error message when UUID is invalid', async () => {
    render(<UuidValidator />)
    const input = screen.getByTestId('uuid-input')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    const clearButton = screen.getByTestId('clear-button')
    fireEvent.change(input, { target: { value: 'invalid' } })
    fireEvent.click(validateButton)
    expect(await screen.findByText('UUID is invalid', { exact: false })).toBeVisible()
    expect(clearButton).toBeEnabled()
  })

  it('displays sample UUID when SampleButton is clicked', () => {
    render(<UuidValidator />)
    const input = screen.getByTestId('uuid-input')
    const sampleButton = screen.getByTestId('sample-button')
    const clearButton = screen.getByTestId('clear-button')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(sampleButton)
    expect(input).toHaveValue('123639f0-8522-11ee-9b23-0500b4b78763')
    expect(clearButton).toBeEnabled()
    expect(validateButton).toBeEnabled()
  })
})

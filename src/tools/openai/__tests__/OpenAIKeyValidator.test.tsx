import { fireEvent, render, screen } from '@testing-library/react'

import OpenAiKeyValidator from '../OpenAiKeyValidator'

Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    readText: jest.fn()
  }
})

global.fetch = jest.fn()

describe('OpenAiKeyValidator', () => {
  it('renders without crashing', () => {
    render(<OpenAiKeyValidator />)
  })

  it('disables ClearButton and ValidateButton when API key input is empty', () => {
    render(<OpenAiKeyValidator />)
    const clearButton = screen.getByTestId('clear-button')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    expect(clearButton).toBeDisabled()
    expect(validateButton).toBeDisabled()
  })

  it('enables ClearButton and ValidateButton when API key input is not empty', () => {
    render(<OpenAiKeyValidator />)
    const input = screen.getByPlaceholderText('sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    const clearButton = screen.getByTestId('clear-button')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    fireEvent.change(input, { target: { value: 'test' } })
    expect(clearButton).toBeEnabled()
    expect(validateButton).toBeEnabled()
  })

  it('clears API key input when ClearButton is clicked', () => {
    render(<OpenAiKeyValidator />)
    const input = screen.getByPlaceholderText('sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
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
    render(<OpenAiKeyValidator />)
    const clipboardButton = screen.getByTestId('clipboard-button')
    fireEvent.click(clipboardButton)
    await screen.findByDisplayValue('clipboardValue')
    const input = screen.getByPlaceholderText('sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    const clearButton = screen.getByTestId('clear-button')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    expect(input).toHaveValue('clipboardValue')
    expect(clearButton).toBeEnabled()
    expect(validateButton).toBeEnabled()
    clipboardSpy.mockRestore()
  })

  it('shows invalid when API key is invalid', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: 401,
        json: () => Promise.resolve({ message: 'Invalid API key' })
      } as Response)
    )
    render(<OpenAiKeyValidator />)
    const input = screen.getByPlaceholderText('sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(validateButton)
    const invalidText = await screen.findByTestId('invalid')
    expect(invalidText).toBeInTheDocument()
  })

  it('show valid when API key is valid', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ message: 'Valid API key' })
      } as Response)
    )
    render(<OpenAiKeyValidator />)
    const input = screen.getByPlaceholderText('sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(validateButton)
    const validText = await screen.findByTestId('valid')
    expect(validText).toBeInTheDocument()
  })

  it('shows error when there is an error with fetch', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.reject(new Error('error')))
    render(<OpenAiKeyValidator />)
    const input = screen.getByPlaceholderText('sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(validateButton)
    const errorText = await screen.findByTestId('error')
    expect(errorText).toBeInTheDocument()
  })

  it('displays a sample API key when Sample button is clicked', () => {
    render(<OpenAiKeyValidator />)
    const input = screen.getByPlaceholderText('sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    const clearButton = screen.getByTestId('clear-button')
    const validateButton = screen.getByRole('button', { name: /validate/i })
    const sampleButton = screen.getByTestId('sample-button')
    fireEvent.click(sampleButton)
    expect(input).toHaveValue('sk-dvREYJKERUIeXANAZfABC3BlbkFJs4FlBU4TYxgqkfH9UAV0')
    expect(clearButton).toBeEnabled()
    expect(validateButton).toBeEnabled()
  })
})

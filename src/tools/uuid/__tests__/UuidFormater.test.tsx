import { fireEvent, render, screen } from '@testing-library/react'
import UuidFormater from '../UuidFormater'

Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    readText: jest.fn(),
    writeText: jest.fn()
  }
})

describe('UuidFormater', () => {
  it('renders without crashing', () => {
    render(<UuidFormater />)
  })

  it('disables ClearButton and Format button when string to format input is empty', () => {
    render(<UuidFormater />)
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const formatButton = screen.getByRole('button', { name: /format/i })
    expect(clearButton).toBeDisabled()
    expect(formatButton).toBeDisabled()
  })

  it('enables ClearButton and Format button when string to format input is not empty', () => {
    render(<UuidFormater />)
    const input = screen.getByPlaceholderText('123639f0852211ee9b230500b4b78763')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const formatButton = screen.getByRole('button', { name: /format/i })
    fireEvent.change(input, { target: { value: 'test' } })
    expect(clearButton).toBeEnabled()
    expect(formatButton).toBeEnabled()
  })

  it('clears all inputs when ClearButton is clicked', () => {
    render(<UuidFormater />)
    const input = screen.getByPlaceholderText('123639f0852211ee9b230500b4b78763')
    const output = screen.getByPlaceholderText('123639f0-8522-11ee-9b23-0500b4b78763')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const formatButton = screen.getByRole('button', { name: /format/i })
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.change(output, { target: { value: 'test' } })
    fireEvent.click(clearButton)
    expect(input).toHaveValue('')
    expect(output).toHaveValue('')
    expect(clearButton).toBeDisabled()
    expect(formatButton).toBeDisabled()
  })

  it('pastes from clipboard when ClipboardButton is clicked', async () => {
    const clipboardSpy = jest
      .spyOn(navigator.clipboard, 'readText')
      .mockImplementation(() => Promise.resolve('clipboardValue'))
    render(<UuidFormater />)
    const clipboardButton = screen.getByRole('button', { name: /clipboard/i })
    fireEvent.click(clipboardButton)
    await screen.findByDisplayValue('clipboardValue')
    const input = screen.getByPlaceholderText('123639f0852211ee9b230500b4b78763')
    const output = screen.getByPlaceholderText('123639f0-8522-11ee-9b23-0500b4b78763')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const formatButton = screen.getByRole('button', { name: /format/i })
    expect(input).toHaveValue('clipboardValue')
    expect(output).toHaveValue('')
    expect(clearButton).toBeEnabled()
    expect(formatButton).toBeEnabled()
    clipboardSpy.mockRestore()
  })

  it('formats string to UUID when Format button is clicked', () => {
    render(<UuidFormater />)
    const input = screen.getByPlaceholderText('123639f0852211ee9b230500b4b78763')
    const output = screen.getByPlaceholderText('123639f0-8522-11ee-9b23-0500b4b78763')
    const formatButton = screen.getByRole('button', { name: /format/i })
    fireEvent.change(input, { target: { value: '123639f0852211ee9b230500b4b78763' } })
    fireEvent.click(formatButton)
    expect(output).toHaveValue('123639f0-8522-11ee-9b23-0500b4b78763')
  })

  it('copies UUID to clipboard when CopyButton is clicked', () => {
    const clipboardSpy = jest
      .spyOn(navigator.clipboard, 'writeText')
      .mockImplementation(() => Promise.resolve())
    render(<UuidFormater />)
    const input = screen.getByPlaceholderText('123639f0852211ee9b230500b4b78763')
    const output = screen.getByPlaceholderText('123639f0-8522-11ee-9b23-0500b4b78763')
    const formatButton = screen.getByRole('button', { name: /format/i })
    const copyButton = screen.getByRole('button', { name: /copy/i })
    fireEvent.change(input, { target: { value: '123639f0852211ee9b230500b4b78763' } })
    fireEvent.click(formatButton)
    fireEvent.click(copyButton)
    expect(output).toHaveValue('123639f0-8522-11ee-9b23-0500b4b78763')
    expect(clipboardSpy).toHaveBeenCalledWith('123639f0-8522-11ee-9b23-0500b4b78763')
    clipboardSpy.mockRestore()
  })

  it('disables CopyButton when UUID output is empty', () => {
    render(<UuidFormater />)
    const copyButton = screen.getByRole('button', { name: /copy/i })
    expect(copyButton).toBeDisabled()
  })

  it('enables CopyButton when UUID output is not empty', () => {
    render(<UuidFormater />)
    const output = screen.getByPlaceholderText('123639f0-8522-11ee-9b23-0500b4b78763')
    const copyButton = screen.getByRole('button', { name: /copy/i })
    fireEvent.change(output, { target: { value: '123639f0-8522-11ee-9b23-0500b4b78763' } })
    expect(copyButton).toBeEnabled()
  })

  it('displays error message when string to format is invalid', () => {
    render(<UuidFormater />)
    const input = screen.getByPlaceholderText('123639f0852211ee9b230500b4b78763')
    const output = screen.getByPlaceholderText('123639f0-8522-11ee-9b23-0500b4b78763')
    const formatButton = screen.getByRole('button', { name: /format/i })
    fireEvent.change(input, { target: { value: 'invalid' } })
    fireEvent.click(formatButton)
    expect(output).toHaveValue('⚠️ Invalid UUID')
  })

  it('displays a sample string when SampleButton is clicked', () => {
    render(<UuidFormater />)
    const input = screen.getByPlaceholderText('123639f0852211ee9b230500b4b78763')
    const sampleButton = screen.getByRole('button', { name: /sample/i })
    fireEvent.click(sampleButton)
    expect(input).toHaveValue('123639f0852211ee9b230500b4b78763')
  })
})

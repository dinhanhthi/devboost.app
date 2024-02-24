import { fireEvent, render, screen } from '@testing-library/react'
import ulidx from 'ulidx'
import UlidTimeDecoder from '../UlidTimeDecoder'

Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    readText: jest.fn()
  }
})

jest.mock('ulidx', () => ({
  decodeTime: jest.fn(),
  isValid: jest.fn()
}))

describe('UlidTimeDecoder', () => {
  it('renders without crashing', () => {
    render(<UlidTimeDecoder />)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('disables Decode button and ClearButton when the input is empty', () => {
    render(<UlidTimeDecoder />)
    const decodeButton = screen.getByRole('button', { name: /decode/i })
    const clearButton = screen.getByTestId('clear-button')
    expect(decodeButton).toBeDisabled()
    expect(clearButton).toBeDisabled()
  })

  it('enables Decode button and ClearButton when the input is not empty', () => {
    render(<UlidTimeDecoder />)
    const input = screen.getByPlaceholderText('01HFE5Z3SZDQVR53EY0T54C9TS')
    const decodeButton = screen.getByRole('button', { name: /decode/i })
    const clearButton = screen.getByTestId('clear-button')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(decodeButton).toBeEnabled()
    expect(clearButton).toBeEnabled()
  })

  it('clears input when ClearButton is clicked', () => {
    render(<UlidTimeDecoder />)
    const input = screen.getByPlaceholderText('01HFE5Z3SZDQVR53EY0T54C9TS')
    const clearButton = screen.getByTestId('clear-button')
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(clearButton)
    expect(input).toHaveValue('')
  })

  it('pastes from clipboard when ClipboardButton is clicked', async () => {
    const clipboardSpy = jest
      .spyOn(navigator.clipboard, 'readText')
      .mockImplementationOnce(() => Promise.resolve('clipboardValue'))
    render(<UlidTimeDecoder />)
    const clipboardButton = screen.getByTestId('clipboard-button')
    fireEvent.click(clipboardButton)
    await screen.findByDisplayValue('clipboardValue')
    const input = screen.getByPlaceholderText('01HFE5Z3SZDQVR53EY0T54C9TS')
    const clearButton = screen.getByTestId('clear-button')
    const decodeButton = screen.getByRole('button', { name: /decode/i })
    expect(input).toHaveValue('clipboardValue')
    expect(clearButton).toBeEnabled()
    expect(decodeButton).toBeEnabled()
    clipboardSpy.mockRestore()
  })

  it('shows error if ULID code is not valid when Decode button is clicked', async () => {
    render(<UlidTimeDecoder />)
    const input = screen.getByPlaceholderText('01HFE5Z3SZDQVR53EY0T54C9TS')
    const decodeButton = screen.getByRole('button', { name: /decode/i })
    jest.spyOn(ulidx, 'isValid').mockReturnValueOnce(false)
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(decodeButton)
    const error = await screen.findByTestId('invalid')
    expect(error).toHaveTextContent('ULID is invalid!')
  })

  it('shows decoded time if ULID code is valid when Decode button is clicked', async () => {
    render(<UlidTimeDecoder />)
    const input = screen.getByPlaceholderText('01HFE5Z3SZDQVR53EY0T54C9TS')
    const decodeButton = screen.getByRole('button', { name: /decode/i })
    jest.spyOn(ulidx, 'isValid').mockReturnValueOnce(true)
    jest.spyOn(ulidx, 'decodeTime').mockReturnValueOnce(1234567890)
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(decodeButton)
    const decodedTime = await screen.findByTestId('timeMs')
    expect(decodedTime).toBeInTheDocument()
  })

  it('displays a sample ULID code when Sample button is clicked', () => {
    render(<UlidTimeDecoder />)
    const sampleButton = screen.getByTestId('sample-button')
    fireEvent.click(sampleButton)
    const input = screen.getByPlaceholderText('01HFE5Z3SZDQVR53EY0T54C9TS')
    expect(input).toHaveValue('01HFE5Z3SZDQVR53EY0T54C9TS')
  })
})

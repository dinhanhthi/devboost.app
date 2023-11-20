import { fireEvent, render, screen } from '@testing-library/react'
import uuid from 'uuid'
import UuidDecoder from '../UuidDecoder'

Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    readText: jest.fn()
  }
})

jest.mock('uuid', () => ({
  validate: jest.fn()
}))

global.fetch = jest.fn()

describe('UuidDecoder', () => {
  it('renders without crashing', () => {
    render(<UuidDecoder />)
  })

  it('disables ClearButton and Decode button when UUID input is empty', () => {
    render(<UuidDecoder />)
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const decodeButton = screen.getByRole('button', { name: /decode/i })
    expect(clearButton).toBeDisabled()
    expect(decodeButton).toBeDisabled()
  })

  it('enables ClearButton and Decode button when UUID input is not empty', () => {
    render(<UuidDecoder />)
    const input = screen.getByTestId('uuid-input')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const decodeButton = screen.getByRole('button', { name: /decode/i })
    fireEvent.change(input, { target: { value: 'test' } })
    expect(clearButton).toBeEnabled()
    expect(decodeButton).toBeEnabled()
  })

  it('clears UUID input when ClearButton is clicked', () => {
    render(<UuidDecoder />)
    const input = screen.getByTestId('uuid-input')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const decodeButton = screen.getByRole('button', { name: /decode/i })
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(clearButton)
    expect(input).toHaveValue('')
    expect(clearButton).toBeDisabled()
    expect(decodeButton).toBeDisabled()
  })

  it('pastes from clipboard when ClipboardButton is clicked', async () => {
    const clipboardSpy = jest
      .spyOn(navigator.clipboard, 'readText')
      .mockImplementation(() => Promise.resolve('clipboardValue'))
    render(<UuidDecoder />)
    const clipboardButton = screen.getByRole('button', { name: /clipboard/i })
    fireEvent.click(clipboardButton)
    await screen.findByDisplayValue('clipboardValue')
    const input = screen.getByTestId('uuid-input')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const decodeButton = screen.getByRole('button', { name: /decode/i })
    expect(input).toHaveValue('clipboardValue')
    expect(clearButton).toBeEnabled()
    expect(decodeButton).toBeEnabled()
    clipboardSpy.mockRestore()
  })

  it('displays error message when UUID is invalid', async () => {
    jest.spyOn(uuid, 'validate').mockReturnValueOnce(false)
    render(<UuidDecoder />)
    const input = screen.getByTestId('uuid-input')
    const decodeButton = screen.getByRole('button', { name: /decode/i })
    fireEvent.change(input, { target: { value: 'invalid' } })
    fireEvent.click(decodeButton)
    expect(await screen.findByText('Invalid UUID', { exact: false })).toBeVisible()
  })

  it('displays decoded UUID when Decode button is clicked and UUID is valid', async () => {
    jest.spyOn(uuid, 'validate').mockReturnValueOnce(true)
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ message: 'Decoded UUID' })
      } as Response)
    )
    render(<UuidDecoder />)
    const input = screen.getByTestId('uuid-input')
    const decodeButton = screen.getByRole('button', { name: /decode/i })
    fireEvent.change(input, { target: { value: 'valid' } })
    fireEvent.click(decodeButton)
    expect(await screen.findByText('Decoded UUID', { exact: false })).toBeVisible()
  })
})

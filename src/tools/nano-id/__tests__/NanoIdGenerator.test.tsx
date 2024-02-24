import { fireEvent, render, screen } from '@testing-library/react'
import nanoid from 'nanoid'

import NanoIdGenerator from '../NanoIdGenerator'

Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    writeText: jest.fn()
  }
})

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
  customAlphabet: jest.fn()
}))

describe('NanoIdGenerator', () => {
  it('renders without crashing', () => {
    render(<NanoIdGenerator />)
  })

  it('disables CopyButton, DownloladButton and ClearButton when textarea is empty', () => {
    render(<NanoIdGenerator />)
    const copyButton = screen.getByTestId('copy-button')
    const downloadButton = screen.getByTestId('download-button')
    const clearButton = screen.getByTestId('clear-button')
    expect(copyButton).toBeDisabled()
    expect(downloadButton).toBeDisabled()
    expect(clearButton).toBeDisabled()
  })

  it('enables CopyButton, DownloladButton and ClearButton when textarea is not empty', () => {
    render(<NanoIdGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate Nano IDs...')
    const copyButton = screen.getByTestId('copy-button')
    const downloadButton = screen.getByTestId('download-button')
    const clearButton = screen.getByTestId('clear-button')
    fireEvent.change(textarea, { target: { value: 'test' } })
    expect(copyButton).toBeEnabled()
    expect(downloadButton).toBeEnabled()
    expect(clearButton).toBeEnabled()
  })

  it('clears textarea when ClearButton is clicked', () => {
    render(<NanoIdGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate Nano IDs...')
    const clearButton = screen.getByTestId('clear-button')
    fireEvent.change(textarea, { target: { value: 'test' } })
    fireEvent.click(clearButton)
    expect(textarea).toHaveValue('')
  })

  it('copies textarea value to clipboard when CopyButton is clicked', () => {
    render(<NanoIdGenerator />)
    const clipboardSpy = jest
      .spyOn(navigator.clipboard, 'writeText')
      .mockImplementation(() => Promise.resolve())
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate Nano IDs...')
    fireEvent.change(textarea, { target: { value: 'test' } })
    const copyButton = screen.getByTestId('copy-button')
    fireEvent.click(copyButton)
    expect(clipboardSpy).toHaveBeenCalledWith('test')
  })

  it('disables GenerateButton when the records value is less than 1 or greater than 500', () => {
    render(<NanoIdGenerator />)
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const recordsInput = screen.getByPlaceholderText('max 500')
    fireEvent.change(recordsInput, { target: { value: '0' } })
    expect(generateButton).toBeDisabled()
    fireEvent.change(recordsInput, { target: { value: '501' } })
    expect(generateButton).toBeDisabled()
  })

  it('enables GenerateButton when the records value is between 1 and 500', () => {
    render(<NanoIdGenerator />)
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const recordsInput = screen.getByPlaceholderText('max 500')
    fireEvent.change(recordsInput, { target: { value: '10' } })
    expect(generateButton).toBeEnabled()
    fireEvent.change(recordsInput, { target: { value: '450' } })
    expect(generateButton).toBeEnabled()
  })

  it('generates Nano IDs when GenerateButton is clicked on first load', () => {
    jest.spyOn(nanoid, 'nanoid').mockReturnValue('rAN-z5uWJuaOnwjvPefF-')
    render(<NanoIdGenerator />)
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate Nano IDs...')
    fireEvent.click(generateButton)
    expect(textarea).toHaveValue('rAN-z5uWJuaOnwjvPefF-')
  })

  it('generates Nano IDs when GenerateButton is clicked on first load with custom characters', () => {
    jest.spyOn(nanoid, 'customAlphabet').mockReturnValue(() => '211322211233213131111')
    render(<NanoIdGenerator />)
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate Nano IDs...')
    const yourCharacterInput = screen.getByPlaceholderText('abcXyz123@')
    fireEvent.change(yourCharacterInput, { target: { value: '123' } })
    fireEvent.click(generateButton)
    expect(textarea).toHaveValue('211322211233213131111')
  })

  it('generates Nano IDs when GenerateButton is clicked on first load with custom size', () => {
    jest.spyOn(nanoid, 'nanoid').mockImplementationOnce((idSize?: number) => {
      if (idSize) {
        return 'rAN-z5uWJu'
      }
      return 'rAN-z5uWJuaOnwjvPefF-'
    })
    render(<NanoIdGenerator />)
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate Nano IDs...')
    const idSizeInput = screen.getByPlaceholderText('max 100')
    fireEvent.change(idSizeInput, { target: { value: '10' } })
    fireEvent.click(generateButton)
    expect(textarea).toHaveValue('rAN-z5uWJu')
  })

  it('generates Nano IDs when GenerateButton is clicked and the records input is set', () => {
    jest
      .spyOn(nanoid, 'nanoid')
      .mockReturnValueOnce('rAN-z5uWJuaOnwjvPefF-')
      .mockReturnValueOnce('rAN-z5uWJu')
    render(<NanoIdGenerator />)
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate Nano IDs...')
    const recordsInput = screen.getByPlaceholderText('max 500')
    fireEvent.change(recordsInput, { target: { value: '2' } })
    fireEvent.click(generateButton)
    expect(textarea).toHaveValue('rAN-z5uWJuaOnwjvPefF-\nrAN-z5uWJu')
  })
})

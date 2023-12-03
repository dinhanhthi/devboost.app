import { fireEvent, render, screen } from '@testing-library/react'
import uuid from 'uuid'
import UuidGenerator from '../UuidGenerator'

Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    writeText: jest.fn()
  }
})

jest.mock('uuid', () => ({
  NIL: '00000000-0000-0000-0000-000000000000',
  validate: jest.fn(),
  v1: jest.fn(),
  v3: jest.fn(),
  v4: jest.fn(),
  v5: jest.fn()
}))

describe('UuidGenerator', () => {
  it('renders without crashing', () => {
    render(<UuidGenerator />)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('disables CopyButton, DownloadButton, ClearButton when the texterea is empty', () => {
    render(<UuidGenerator />)
    const copyButton = screen.getByRole('button', { name: /copy/i })
    const downloadButton = screen.getByRole('button', { name: /download/i })
    const clearButton = screen.getByRole('button', { name: /clear/i })
    expect(copyButton).toBeDisabled()
    expect(downloadButton).toBeDisabled()
    expect(clearButton).toBeDisabled()
  })

  it('enables CopyButton, DownloadButton, ClearButton when the texterea is not empty', () => {
    render(<UuidGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate UUIDs...')
    const copyButton = screen.getByRole('button', { name: /copy/i })
    const downloadButton = screen.getByRole('button', { name: /download/i })
    const clearButton = screen.getByRole('button', { name: /clear/i })
    fireEvent.change(textarea, { target: { value: 'test' } })
    expect(copyButton).toBeEnabled()
    expect(downloadButton).toBeEnabled()
    expect(clearButton).toBeEnabled()
  })

  it('clears the textarea when ClearButton is clicked', () => {
    render(<UuidGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate UUIDs...')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    const copyButton = screen.getByRole('button', { name: /copy/i })
    const downloadButton = screen.getByRole('button', { name: /download/i })
    fireEvent.change(textarea, { target: { value: 'test' } })
    fireEvent.click(clearButton)
    expect(textarea).toHaveValue('')
    expect(clearButton).toBeDisabled()
    expect(copyButton).toBeDisabled()
    expect(downloadButton).toBeDisabled()
  })

  it('copies the textarea when CopyButton is clicked', () => {
    const clipboardSpy = jest
      .spyOn(navigator.clipboard, 'writeText')
      .mockImplementation(() => Promise.resolve())
    render(<UuidGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate UUIDs...')
    const copyButton = screen.getByRole('button', { name: /copy/i })
    fireEvent.change(textarea, { target: { value: 'test' } })
    fireEvent.click(copyButton)
    expect(clipboardSpy).toHaveBeenCalledWith('test')
  })

  it('disables all generate buttons when the record count input is less than 1 or greater than 500', () => {
    render(<UuidGenerator />)
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const nilButton = screen.getByRole('button', { name: /nil/i })
    const recordInput = screen.getByPlaceholderText('max 500')
    fireEvent.change(recordInput, { target: { value: 0 } })
    expect(generateButton).toBeDisabled()
    fireEvent.change(recordInput, { target: { value: 501 } })
    expect(generateButton).toBeDisabled()
    expect(nilButton).toBeDisabled()
  })

  it('does not render the namespace input and the name input on the first load', () => {
    render(<UuidGenerator />)
    const namespaceInput = screen.queryByPlaceholderText('6ba7b810-9dad-11d1-80b4-00c04fd430c8')
    const nameInput = screen.queryByPlaceholderText('Enter name...')
    expect(namespaceInput).not.toBeInTheDocument()
    expect(nameInput).not.toBeInTheDocument()
  })

  it('generates UUIDs when GenerateButton is clicked on first load', () => {
    jest.spyOn(uuid, 'v1').mockReturnValueOnce('b1d82820-866b-11ee-b7d9-7f085416ca4d')
    render(<UuidGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate UUIDs...')
    const generateButton = screen.getByRole('button', { name: /generate/i })
    fireEvent.click(generateButton)
    expect(textarea).toHaveValue('b1d82820-866b-11ee-b7d9-7f085416ca4d')
  })

  it('generates NIL UUID when NilButton is clicked', () => {
    render(<UuidGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate UUIDs...')
    const nilButton = screen.getByRole('button', { name: /nil/i })
    fireEvent.click(nilButton)
    expect(textarea).toHaveValue('00000000-0000-0000-0000-000000000000')
  })

  it('generates UUIDs when GenerateButton is clicked on first load and the records input is set', () => {
    jest
      .spyOn(uuid, 'v1')
      .mockReturnValueOnce('b1d82820-866b-11ee-b7d9-7f085416ca4d')
      .mockReturnValueOnce('b1d82821-866b-11ee-b7d9-7f085416ca4d')
    render(<UuidGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate UUIDs...')
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const recordsInput = screen.getByPlaceholderText('max 500')
    fireEvent.change(recordsInput, { target: { value: 2 } })
    fireEvent.click(generateButton)
    expect(textarea).toHaveValue(
      'b1d82820-866b-11ee-b7d9-7f085416ca4d\nb1d82821-866b-11ee-b7d9-7f085416ca4d'
    )
  })
})

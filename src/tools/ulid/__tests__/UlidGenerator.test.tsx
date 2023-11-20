import { fireEvent, render, screen } from '@testing-library/react'
import ulidx from 'ulidx'
import UlidGenerator from '../UlidGenerator'

Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    writeText: jest.fn()
  }
})

jest.mock('ulidx', () => ({
  ulid: jest.fn()
}))

describe('UlidGenerator', () => {
  it('renders without crashing', () => {
    render(<UlidGenerator />)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('disables CopyButton, DownloladButton and ClearButton when textarea is empty', () => {
    render(<UlidGenerator />)
    const copyButton = screen.getByRole('button', { name: /copy/i })
    const downloadButton = screen.getByRole('button', { name: /download/i })
    const clearButton = screen.getByRole('button', { name: /clear/i })
    expect(copyButton).toBeDisabled()
    expect(downloadButton).toBeDisabled()
    expect(clearButton).toBeDisabled()
  })

  it('enables CopyButton, DownloladButton and ClearButton when textarea is not empty', () => {
    render(<UlidGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate ULIDs...')
    const copyButton = screen.getByRole('button', { name: /copy/i })
    const downloadButton = screen.getByRole('button', { name: /download/i })
    const clearButton = screen.getByRole('button', { name: /clear/i })
    fireEvent.change(textarea, { target: { value: 'test' } })
    expect(copyButton).toBeEnabled()
    expect(downloadButton).toBeEnabled()
    expect(clearButton).toBeEnabled()
  })

  it('clears textarea when ClearButton is clicked', () => {
    render(<UlidGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate ULIDs...')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    fireEvent.change(textarea, { target: { value: 'test' } })
    fireEvent.click(clearButton)
    expect(textarea).toHaveValue('')
  })

  it('copies textarea value to clipboard when CopyButton is clicked', () => {
    render(<UlidGenerator />)
    const clipboardSpy = jest
      .spyOn(navigator.clipboard, 'writeText')
      .mockImplementation(() => Promise.resolve())
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate ULIDs...')
    const copyButton = screen.getByRole('button', { name: /copy/i })
    fireEvent.change(textarea, { target: { value: 'test' } })
    fireEvent.click(copyButton)
    expect(clipboardSpy).toHaveBeenCalledWith('test')
  })

  it('disables GenerateButton when the record value is less than 1 or greater than 500', () => {
    render(<UlidGenerator />)
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const inputRecords = screen.getByPlaceholderText('max 500')
    fireEvent.change(inputRecords, { target: { value: '0' } })
    expect(generateButton).toBeDisabled()
    fireEvent.change(inputRecords, { target: { value: '501' } })
    expect(generateButton).toBeDisabled()
  })

  it('enables GenerateButton when the record value is between 1 and 500', () => {
    render(<UlidGenerator />)
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const inputRecords = screen.getByPlaceholderText('max 500')
    fireEvent.change(inputRecords, { target: { value: '1' } })
    expect(generateButton).toBeEnabled()
    fireEvent.change(inputRecords, { target: { value: '500' } })
    expect(generateButton).toBeEnabled()
  })

  it('generates ulids when GenerateButton is clicked on first load', () => {
    jest.spyOn(ulidx, 'ulid').mockReturnValueOnce('01HFKCHPBADBC3PQTZ2JQ2JMKE')
    render(<UlidGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate ULIDs...')
    const generateButton = screen.getByRole('button', { name: /generate/i })
    fireEvent.click(generateButton)
    expect(textarea).toHaveValue('01HFKCHPBADBC3PQTZ2JQ2JMKE')
  })

  it('generates ulids when GenerateButton is clicked and the time seed input is set', () => {
    jest.spyOn(ulidx, 'ulid').mockImplementationOnce((seedTime?: number) => {
      if (seedTime === 1622304000000) {
        return '01HFKCHPBADBC3PQTZ2JQ2JMKE'
      }
      return 'noThing'
    })
    render(<UlidGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate ULIDs...')
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const inputTimeSeed = screen.getByPlaceholderText('time seed')
    fireEvent.change(inputTimeSeed, { target: { value: '1622304000000' } })
    fireEvent.click(generateButton)
    expect(textarea).toHaveValue('01HFKCHPBADBC3PQTZ2JQ2JMKE')
  })

  it('generates ulids when GenerateButton is clicked on first load and the record input is set', () => {
    jest
      .spyOn(ulidx, 'ulid')
      .mockReturnValueOnce('01HFKCHPBADBC3PQTZ2JQ2JMKE')
      .mockReturnValueOnce('01HFKD1008YD7TM55T5WMRQ5B3')
    render(<UlidGenerator />)
    const textarea = screen.getByPlaceholderText('Click "Generate" button to generate ULIDs...')
    const generateButton = screen.getByRole('button', { name: /generate/i })
    const inputRecords = screen.getByPlaceholderText('max 500')
    fireEvent.change(inputRecords, { target: { value: '2' } })
    fireEvent.click(generateButton)
    expect(textarea).toHaveValue('01HFKCHPBADBC3PQTZ2JQ2JMKE\n01HFKD1008YD7TM55T5WMRQ5B3')
  })
})

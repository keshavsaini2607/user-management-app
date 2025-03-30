import { render, screen, fireEvent } from '@testing-library/react'
import FileCard from '../index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  }
}))

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  }
}))

const mockFile = {
  id: '1',
  filename: 'test.pdf',
  publicUrl: 'http://example.com/test.pdf',
  createdAt: '2024-03-15T10:00:00Z',
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
})

const MockFileCard = () => (
  <QueryClientProvider client={queryClient}>
    <FileCard file={mockFile} />
  </QueryClientProvider>
)

describe('FileCard', () => {
  beforeAll(() => {
    // Mock window.URL.createObjectURL
    global.URL.createObjectURL = jest.fn()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders file information correctly', () => {
    render(<MockFileCard />)
    
    expect(screen.getByText(mockFile.filename)).toBeInTheDocument()
    expect(screen.getByText(/File Uploaded On:/)).toBeInTheDocument()
  })

  it('has working delete button', async () => {
    render(<MockFileCard />)
    
    const buttons = screen.getAllByRole('button')
    const deleteButton = buttons[1]
    expect(deleteButton).toBeInTheDocument()
    
    fireEvent.click(deleteButton)
    // Wait for mutation to complete
    await new Promise(resolve => setTimeout(resolve, 0))
  })

  it('has working chat button', () => {
    const { container } = render(<MockFileCard />)
    
    const buttons = screen.getAllByRole('button')
    const chatButton = buttons[0]
    expect(chatButton).toBeInTheDocument()
    
    fireEvent.click(chatButton)
  })
})
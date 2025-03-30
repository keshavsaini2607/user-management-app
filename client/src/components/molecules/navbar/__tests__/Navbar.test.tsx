import { render, screen } from '@testing-library/react'
import Navbar from '../index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const MockNavbar = () => (
  <QueryClientProvider client={queryClient}>
    <Navbar />
  </QueryClientProvider>
)

describe('Navbar', () => {
  it('renders role information', () => {
    render(<MockNavbar />)
    expect(screen.getByText(/Role:/)).toBeInTheDocument()
  })
})
import { render, screen, fireEvent } from '@testing-library/react'
import SignUp from '../page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const MockSignUp = () => (
  <QueryClientProvider client={queryClient}>
    <SignUp />
  </QueryClientProvider>
)

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}))

describe('SignUp', () => {
  it('renders signup form', () => {
    render(<MockSignUp />)
    
    expect(screen.getByText('Create an account')).toBeInTheDocument()
    expect(screen.getByText('Already have an account?')).toBeInTheDocument()
  })

  it('has login link', () => {
    render(<MockSignUp />)
    
    const loginLink = screen.getByText('Log-In')
    expect(loginLink).toBeInTheDocument()
    expect(loginLink.getAttribute('href')).toBe('/auth/signin')
  })
})
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DynamicForm from '../index';
import { IFormField } from '@/constants/formTypes';

describe('DynamicForm', () => {
  const mockOnSubmit = jest.fn();
  
  const mockFormFields: IFormField[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'Enter email',
      validation: { required: 'Email is required' }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      validation: { required: 'Password is required' }
    }
  ];

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form fields correctly', () => {
    render(
      <DynamicForm
        formFields={mockFormFields}
        submitButtonText="Submit"
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('allows input value changes', () => {
    render(
      <DynamicForm
        formFields={mockFormFields}
        submitButtonText="Submit"
        onSubmit={mockOnSubmit}
      />
    );

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testpass');
  });

  it('shows password toggle functionality', () => {
    render(
      <DynamicForm
        formFields={mockFormFields}
        submitButtonText="Submit"
        onSubmit={mockOnSubmit}
      />
    );

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: '' });

    expect(passwordInput.type).toBe('password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('displays validation errors for empty fields', async () => {
    render(
      <DynamicForm
        formFields={mockFormFields}
        submitButtonText="Submit"
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });
});
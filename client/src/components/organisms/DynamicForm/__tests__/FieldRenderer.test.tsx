import { render, screen, fireEvent } from '@testing-library/react';
import FieldRenderer from '../FieldRenderer';
import { IFormField } from '@/constants/formTypes';

describe('FieldRenderer', () => {
  const mockRegister = jest.fn();
  const mockErrors = {};

  const baseField: IFormField = {
    name: 'testField',
    label: 'Test Field',
    type: 'text',
    placeholder: 'Enter test value',
    validation: { required: 'This field is required' }
  };

  it('renders text input correctly', () => {
    render(
      <FieldRenderer
        field={baseField}
        register={mockRegister}
        errors={mockErrors}
      />
    );

    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter test value')).toBeInTheDocument();
  });

  it('renders email input correctly', () => {
    const emailField = { ...baseField, type: 'email' };
    render(
      <FieldRenderer
        field={emailField}
        register={mockRegister}
        errors={mockErrors}
      />
    );

    const input = screen.getByPlaceholderText('Enter test value');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders password input with toggle visibility', () => {
    const passwordField = { ...baseField, type: 'password' };
    render(
      <FieldRenderer
        field={passwordField}
        register={mockRegister}
        errors={mockErrors}
      />
    );

    const input = screen.getByPlaceholderText('Enter test value');
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('displays error message when provided', () => {
    const errors = {
      testField: {
        message: 'This field is required'
      }
    };

    render(
      <FieldRenderer
        field={baseField}
        register={mockRegister}
        errors={errors}
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
});
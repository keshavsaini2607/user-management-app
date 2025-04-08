
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserTable } from "../index";
import { useApiQuery, useApiMutation } from "@/hooks/useApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the hooks
jest.mock("@/hooks/useApi", () => ({
  useApiQuery: jest.fn(),
  useApiMutation: jest.fn(),
}));

// Mock the toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockUsers = [
  {
    id: "1",
    username: "testuser",
    email: "test@example.com",
    role: "user",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
];

describe("UserTable", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the useApiQuery hook
    (useApiQuery as jest.Mock).mockReturnValue({
      isPending: false,
      data: mockUsers,
    });

    // Mock the useApiMutation hook
    (useApiMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isSuccess: false,
      isPending: false,
    });
  });

  const renderUserTable = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserTable />
      </QueryClientProvider>
    );
  };

  it("renders the table with user data", () => {
    renderUserTable();
    
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("shows loading spinner when data is loading", () => {
    (useApiQuery as jest.Mock).mockReturnValue({
      isPending: true,
      data: null,
    });

    renderUserTable();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("shows 'No users found' when there are no users", () => {
    (useApiQuery as jest.Mock).mockReturnValue({
      isPending: false,
      data: [],
    });

    renderUserTable();
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  it("handles role change", async () => {
    const mockUpdateRole = jest.fn();
    (useApiMutation as jest.Mock).mockReturnValue({
      mutate: mockUpdateRole,
      isSuccess: false,
      isPending: false,
    });

    renderUserTable();
    
    const roleSelect = screen.getByRole("combobox");
    fireEvent.click(roleSelect);
    
    const adminOption = screen.getByText("Admin");
    fireEvent.click(adminOption);

    await waitFor(() => {
      expect(mockUpdateRole).toHaveBeenCalledWith({
        updatingUserId: "1",
        role: "admin",
      });
    });
  });

  it("handles user deletion", async () => {
    const mockDeleteUser = jest.fn();
    (useApiMutation as jest.Mock).mockReturnValue({
      mutate: mockDeleteUser,
      isSuccess: false,
      isPending: false,
    });

    renderUserTable();
    
    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalledWith({
        deleteUserId: "1",
      });
    });
  });
});
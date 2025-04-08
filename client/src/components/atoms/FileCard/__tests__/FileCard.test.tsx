import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FileCard from "../index";
import { useApiMutation } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Mock the dependencies
jest.mock("@/hooks/useApi", () => ({
  useApiMutation: jest.fn().mockReturnValue({
    mutate: jest.fn(),
    isPending: false,
    isSuccess: false,
    error: null,
  }),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
}));
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("FileCard", () => {
  const mockFile = {
    id: "1",
    filename: "test-file.pdf",
    publicUrl: "http://example.com/test-file.pdf",
    createdAt: "2024-01-01T00:00:00.000Z",
  };

  const mockRouter = {
    push: jest.fn(),
  };

  const mockQueryClient = {
    invalidateQueries: jest.fn(),
    getQueryData: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useApiMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isSuccess: false,
      error: null,
    });
  });

  it("renders file information correctly", () => {
    render(<FileCard file={mockFile} />);
    
    expect(screen.getByText(mockFile.filename)).toBeInTheDocument();
    expect(screen.getByText("File Uploaded On: Mon Jan 01 2024")).toBeInTheDocument();
    expect(screen.getByTestId("chat-button")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  it("navigates to chat page when chat button is clicked", () => {
    render(<FileCard file={mockFile} />);
    
    const chatButton = screen.getByTestId("chat-button");
    fireEvent.click(chatButton);
    
    expect(mockRouter.push).toHaveBeenCalledWith(`/dashboard/chat/${mockFile.id}`);
  });

  it("handles successful file deletion", async () => {
    const mockDeleteFile = jest.fn();
    (useApiMutation as jest.Mock).mockReturnValue({
      mutate: mockDeleteFile,
      isPending: false,
      isSuccess: true,
      error: null,
    });

    render(<FileCard file={mockFile} />);
    
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(mockDeleteFile).toHaveBeenCalledWith(undefined);
      expect(toast.success).toHaveBeenCalledWith("File deleted successfully");
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalled();
    });
  });

  it("handles file deletion error", async () => {
    const mockDeleteFile = jest.fn();
    (useApiMutation as jest.Mock).mockReturnValue({
      mutate: mockDeleteFile,
      isPending: false,
      isSuccess: false,
      error: new Error("Delete failed"),
    });

    render(<FileCard file={mockFile} />);
    
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(mockDeleteFile).toHaveBeenCalledWith(undefined);
      expect(toast.error).toHaveBeenCalledWith("Error deleting file");
    });
  });

  it("disables delete button while deletion is pending", () => {
    (useApiMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
      isSuccess: false,
      error: null,
    });

    render(<FileCard file={mockFile} />);
    
    const deleteButton = screen.getByTestId("delete-button");
    expect(deleteButton).toBeDisabled();
  });
});
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import FileUploader from "..";

// Mock dependencies
jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@/api/upload", () => ({
  uploadFile: jest.fn(),
}));

describe("FileUploader", () => {
  const mockMutate = jest.fn();
  const mockFile = new File(["dummy content"], "test.pdf", {
    type: "application/pdf",
  });

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      data: null,
      error: null,
    });
  });

  it("renders correctly with default text", () => {
    render(<FileUploader />);
    expect(
      screen.getByText(/Click to upload/i)
    ).toBeDefined();
  });

  it("allows file selection via input", () => {
    const handleFileSelect = jest.fn();
    render(<FileUploader onFileSelect={handleFileSelect} />);

    const fileInput = screen.getByLabelText(/Click to upload/i).querySelector("input[type='file']");

    if (fileInput) {
      fireEvent.change(fileInput, {
        target: { files: [mockFile] },
      });
      expect(handleFileSelect).toHaveBeenCalledWith(mockFile);
    }
  });

  it("triggers upload when clicking the button", async () => {
    render(<FileUploader />);

    const fileInput = screen.getByLabelText(/Click to upload/i).querySelector("input[type='file']");
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [mockFile] } });
    }

    await waitFor(() => {
      expect(screen.getByText(/Upload File/i)).toBeDefined();
    });

    fireEvent.click(screen.getByText(/Upload File/i));
    expect(mockMutate).toHaveBeenCalled();
  });

  it("shows success toast when upload completes", () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      data: { data: { fileId: "123" } },
      error: null,
    });

    render(<FileUploader />);
    expect(toast.success).toHaveBeenCalledWith("File uploaded successfully");
  });

  it("shows error toast on upload failure", () => {
    const error = { response: { data: { message: "Upload failed" } } };
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      data: null,
      error,
    });

    render(<FileUploader />);
    expect(toast.error).toHaveBeenCalledWith("Upload failed");
  });
});

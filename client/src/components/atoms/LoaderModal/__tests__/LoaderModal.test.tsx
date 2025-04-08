import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import LoaderModal from "..";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoaderModal", () => {
  const mockPush = jest.fn();
  const mockClose = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    mockPush.mockClear();
    mockClose.mockClear();
  });

  it("renders when isOpen is true", () => {
    render(<LoaderModal isOpen={true} onClose={mockClose} fileId="123" />);

    expect(
      screen.getByText(/Chat with your uploaded file using AI Bot/i)
    ).toBeTruthy();
    expect(screen.getByText(/Chat with AI/i)).toBeTruthy();
    expect(screen.getByText(/Not Now/i)).toBeTruthy();
  });

  it("redirects to chat on clicking 'Chat with AI'", () => {
    render(<LoaderModal isOpen={true} onClose={mockClose} fileId="abc123" />);
    fireEvent.click(screen.getByText(/Chat with AI/i));
    expect(mockPush).toHaveBeenCalledWith("/dashboard/chat/abc123");
  });

  it("calls onClose when 'Not Now' is clicked", () => {
    render(<LoaderModal isOpen={true} onClose={mockClose} fileId="abc123" />);
    fireEvent.click(screen.getByText(/Not Now/i));
    expect(mockClose).toHaveBeenCalled();
  });

  it("does not redirect if fileId is missing", () => {
    render(<LoaderModal isOpen={true} onClose={mockClose} />);
    fireEvent.click(screen.getByText(/Chat with AI/i));
    expect(mockPush).not.toHaveBeenCalled();
  });
});

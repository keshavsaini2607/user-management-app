import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useApiQuery } from "@/hooks/useApi";
import { useUserStore } from "@/state/user-store";
import { FileInterface } from "@/types/file.interface";
import { FileList } from "@/components/molecules";

// Mocks
jest.mock("@/hooks/useApi", () => ({
   useApiQuery: jest.fn(),
}));

jest.mock("@/state/user-store", () => ({
   useUserStore: jest.fn(),
}));

jest.mock("@/components/atoms/FileCard", () => (props: any) => (
   <div data-testid="file-card">{props.file.name}</div>
));

describe("FileList", () => {
   const mockSetUserFiles = jest.fn();

   beforeEach(() => {
      (useUserStore as jest.Mock).mockReturnValue({
         setUserFiles: mockSetUserFiles,
      });
   });

   afterEach(() => {
      jest.clearAllMocks();
   });

   it("renders file cards after loading", async () => {
      const mockFiles: FileInterface[] = [
         {
            id: "1",
            name: "File One",
            userId: "user1",
            filename: "file-one",
            publicUrl: "https://example.com/file1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
         },
         {
            id: "2",
            name: "File Two",
            userId: "user2",
            filename: "file-two",
            publicUrl: "https://example.com/file2",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
         },
      ];

      (useApiQuery as jest.Mock).mockReturnValue({
         isPending: false,
         data: mockFiles,
      });

      render(<FileList />);

      await waitFor(() => {
         expect(screen.getAllByTestId("file-card")).toHaveLength(2);
         expect(screen.getByText("File One")).toBeTruthy();
         expect(screen.getByText("File Two")).toBeTruthy();
      });

      expect(mockSetUserFiles).toHaveBeenCalledWith(mockFiles);
   });

   it("does not crash if data is empty", () => {
      (useApiQuery as jest.Mock).mockReturnValue({
         isPending: false,
         data: [],
      });

      render(<FileList />);

      expect(screen.queryByTestId("file-card")).toBeNull();
      expect(mockSetUserFiles).not.toHaveBeenCalled();
   });
});

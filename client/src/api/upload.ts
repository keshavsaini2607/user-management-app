import { API_ENDPOINTS } from "@/constants/endpoints";
import { apiClient } from "./apiClient";
import Cookies from "js-cookie";

export const uploadFile = async (data: FormData, onProgress?: (progress: number) => void) => {
   try {
      const token = Cookies.get("auth-token");
      const response = await apiClient.post(
         API_ENDPOINTS.UPLOAD_FILE,
         data,
         {
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
               if (progressEvent.total && onProgress) {
                  const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  console.log(`Upload progress: ${percentCompleted}%`);
                  onProgress(percentCompleted);
               }
            }
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
   }
};

import { apiClient } from "@/api/apiClient";
import { useQuery, useMutation, UseMutationOptions } from "@tanstack/react-query";
import Cookies from 'js-cookie';

/**
 * Removes token from cookies when unauthorized (401).
 */
const handleUnauthorized = async (error: any) => {
  if (error.response?.status === 401) {
    Cookies.remove('auth-token');
    console.warn("Unauthorized! Token removed.");
  }
};

/**
 * Hook for fetching data from a REST API.
 */
export const useApiQuery = (key: string, url: string, options = {}) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const token = Cookies.get('auth-token');
      try {
        const response = await apiClient.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error: any) {
        await handleUnauthorized(error);
        throw error;
      }
    },
    ...options,
  });
};

/**
 * Hook for sending data (POST, PUT, DELETE) to a REST API.
 */
export const useApiMutation = <T, R = any>(
  method: string,
  url: string,
  options: UseMutationOptions<R, unknown, T> = {}
) => {
  return useMutation<R, unknown, T>({
    mutationFn: async (data: T) => {
      const token = Cookies.get('auth-token');
      try {
        const response = await apiClient({ 
          method, 
          url, 
          data,
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      } catch (error: any) {
        await handleUnauthorized(error);
        throw error;
      }
    },
    ...options,
  });
};

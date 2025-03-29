"use client";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { useApiQuery } from "@/hooks/useApi";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import Spinner from "@/components/atoms/Spinner";
import { Trash2 } from "lucide-react";
import { useApiMutation } from "@/hooks/useApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const UserTable = () => {
   const queryClient = useQueryClient();
   const { isPending, data: users } = useApiQuery(
      "allusers",
      API_ENDPOINTS.LIST_USERS
   );

   const { mutate: updateUserRole } = useApiMutation(
      "PATCH",
      API_ENDPOINTS.UPDATE_USER_ROLE
   );

   const { mutate: deleteUser, isSuccess } = useApiMutation(
      "POST",
      API_ENDPOINTS.DELETE_USER
   );

   const handleDelete = async (userId: string) => {
      try {
         deleteUser({ deleteUserId: userId });
         toast.success("User deleted successfully");
      } catch (error) {
         toast.error("Failed to delete user");
      }
   };

   useEffect(() => {
      if (isSuccess) {
         queryClient.invalidateQueries(queryClient.getQueryData(["allusers"]));
      }
   }, [isSuccess]);

   const handleRoleChange = async (userId: string, newRole: string) => {
      try {
         updateUserRole({ updatingUserId: userId, role: newRole });
         toast.success("Role updated successfully");
      } catch (error) {
         toast.error("Failed to update role");
      }
   };

   if (isPending) {
      return <Spinner loading={isPending} />;
   }

   return (
      <div className="rounded-md shadow-sm">
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {!users?.length && (
                  <TableRow>
                     <TableCell colSpan={6} className="text-center">
                        No users found
                     </TableCell>
                  </TableRow>
               )}
               {users?.map((user) => (
                  <TableRow key={user.id}>
                     <TableCell className="font-medium">
                        {user.username}
                     </TableCell>
                     <TableCell>{user.email}</TableCell>
                     <TableCell>
                        <Select
                           defaultValue={user.role}
                           onValueChange={(value) =>
                              handleRoleChange(user.id, value)
                           }
                        >
                           <SelectTrigger className="w-[110px]">
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                           </SelectContent>
                        </Select>
                     </TableCell>
                     <TableCell>
                        {format(new Date(user.createdAt), "MMM dd, yyyy")}
                     </TableCell>
                     <TableCell>
                        {format(new Date(user.updatedAt), "MMM dd, yyyy")}
                     </TableCell>
                     <TableCell className="text-right">
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => handleDelete(user.id)}
                           className="cursor-pointer bg-red-500"
                           //    disabled={isDeleting}
                        >
                           <Trash2 className="h-4 w-4 text-white" />
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
};

export default UserTable;

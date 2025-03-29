import { User } from "@/types/user.interface";
import { create } from "zustand";

type UserState = {
   user: User | null;
   setUser: (user: User | null) => void;
   userFiles: File[] | null;
   setUserFiles: (userFiles: File[] | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
   user: null,
   setUser: (user: User | null) => set(() => ({ user })),
   userFiles: null,
   setUserFiles: (userFiles: File[] | null) => set(() => ({ userFiles })),
}));

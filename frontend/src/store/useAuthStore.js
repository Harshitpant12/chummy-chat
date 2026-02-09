import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check")

            set({ authUser: response.data })
        } catch (error) {
            console.log("Error in checkAuth:", error);

            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    }
}))
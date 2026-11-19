import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GoogleUserProfile {

    id: string,
    name: string,
    email: string,
    email_verified: string,
    picture: string,
}

const useStore = create(
    persist((set: any) => ({

        isLoggedIn: false,
        setLoggedin: (data: boolean) => set({ isLoggedIn: data }),

        isGuest: false,
        setGuest: (data: boolean) => set({ isGuest: data }),

        userProfile: {
            id: '',
            name: '',
            email: '',
            email_verified: false,
            picture: '',
        },

        setUserProfile: (data: GoogleUserProfile | null) => set({ userProfile: data }),

        isLoading: false,
        setLoading: (data: boolean) => set({ isLoading: data }),

 
    }),

        {
            name: 'job-storage',
        }
    )
);

export default useStore;
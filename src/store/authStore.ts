import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types/book';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  checkUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, username')
          .eq('id', user.id)
          .single();

        if (profile) {
          set({
            user: {
              id: user.id,
              email: user.email!,
              username: profile.username || user.email!,
              role: profile.role || 'user'
            },
            isLoading: false
          });
        } else {
          set({ user: null, isLoading: false });
        }
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error checking user:', error);
      set({ 
        error: 'Failed to check authentication status. Please try again.',
        isLoading: false 
      });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        throw new Error(signInError.message);
      }

      await useAuthStore.getState().checkUser();
    } catch (error) {
      console.error('Sign in error:', error);
      set({ 
        error: 'Invalid email or password. Please try again.',
        isLoading: false 
      });
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    try {
      set({ isLoading: true, error: null });

      // First check if the email is already registered
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();

      if (existingUser) {
        throw new Error('Username is already taken');
      }

      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      if (data?.user) {
        // Wait for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update the profile with the username
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ username })
          .eq('id', data.user.id);

        if (profileError) {
          throw new Error('Failed to set username');
        }

        await useAuthStore.getState().checkUser();
      }
    } catch (error) {
      console.error('Sign up error:', error);
      set({ 
        error: (error as Error).message || 'Failed to create account. Please try again.',
        isLoading: false 
      });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, isLoading: false });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ 
        error: 'Failed to sign out. Please try again.',
        isLoading: false 
      });
    }
  }
}));
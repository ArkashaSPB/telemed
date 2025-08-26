'use client';
import { create } from "zustand";

export const useServicesStore = create((set) => ({
    services: [],
    setServices: (data) => set({ services: data }),
}));

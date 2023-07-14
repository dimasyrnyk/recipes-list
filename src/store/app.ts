import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IAlert } from "../constants/app";

interface AppState {
  alert: IAlert | null;
  appShowAlert: (alert: IAlert) => void;
  appHideAlert: () => void;
}

export const useApp = create<AppState>()(
  devtools((set) => ({
    alert: null,
    appShowAlert: (alert: IAlert) => set({ alert }),
    appHideAlert: () => set({ alert: null }),
  }))
);

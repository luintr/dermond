import { create } from 'zustand';

type ModelStore = {
  modelState: boolean;
  setModelHide: () => void;
  setModelToggle: () => void;
};

export const useModelStore = create<ModelStore>()(set => ({
  modelState: false,
  setModelHide: () => set(() => ({ modelState: false })),
  setModelToggle: () => set(state => ({ modelState: !state.modelState })),
}));

type HeaderColor = {
  headerColor: 'dark' | 'light';
  setHeaderColor: (color: 'dark' | 'light') => void;
};

export const useHeaderColorStore = create<HeaderColor>()(set => ({
  headerColor: 'dark',
  setHeaderColor: (color: 'dark' | 'light') => set({ headerColor: color }),
}));

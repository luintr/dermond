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

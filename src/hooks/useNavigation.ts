import { create } from 'zustand';

export type ViewType = 'HOME' | 'UNIVERSAL_IMPORTER' | 'ANALYTICS';

interface NavigationState {
  stack: ViewType[];
  push: (view: ViewType) => void;
  pop: () => void;
  reset: (view: ViewType) => void;
  currentView: () => ViewType;
}

export const useNavigation = create<NavigationState>((set, get) => ({
  stack: ['HOME'],
  push: (view) => set((state) => ({ stack: [...state.stack, view] })),
  pop: () => set((state) => {
    if (state.stack.length > 1) {
      return { stack: state.stack.slice(0, -1) };
    }
    return state;
  }),
  reset: (view) => set({ stack: [view] }),
  currentView: () => {
    const stack = get().stack;
    return stack[stack.length - 1];
  }
}));

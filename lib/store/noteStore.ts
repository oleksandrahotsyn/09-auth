import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CreateNotePost } from "../api/clientApi";

type NoteDraftStore = {
  draft: CreateNotePost;
  setDraft: (note: CreateNotePost) => void;
  clearDraft: () => void;
};
const initialDraft: CreateNotePost = {
  title: "",
  content: "",
  tag: "Todo",
};
export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);

"use client";

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";
import Loading from "@/app/loading";

type Props = {
  id: string;
};

const NotePreview = ({ id }: Props) => {
  const router = useRouter();

  const { data: note, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (!note) {
    return <Loading />;
  }

  if (error) {
    throw error;
  }

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button onClick={() => router.back()} className={css.backBtn}>
              Back
            </button>
          </div>

          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;

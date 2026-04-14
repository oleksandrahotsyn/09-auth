"use client";

import css from "./page.module.css";

import fetchNotes from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

import Link from "next/link";
import { useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

export default function NotesClient({ tag }: { tag?: string }) {
  const [searchWord, setSearchWord] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const normalizedTag = tag === "all" ? "" : (tag ?? "");

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchWord(event.target.value);
      setPage(1);
    },
    1000,
  );

  const { data } = useQuery({
    queryKey: ["myNoteHubKey", searchWord, normalizedTag, page],
    queryFn: () => fetchNotes(searchWord, normalizedTag, page),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchWord} onChange={handleChange} />

        {data && data.notes.length > 0 && (
          <Pagination
            totalPages={data.totalPages}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}

        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </div>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

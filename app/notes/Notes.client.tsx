// app/notes/Notes.client.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote, NoteResponse } from "@/lib/api";
import type { NoteCreate } from "@/types/note";
import NotesList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Loading from "./loading";
import ErrorComponent from "./error";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";

export default function NotesClient( ) {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debounced, setDebounced] = useState<string>("");

  const queryClient = useQueryClient();

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(searchQuery);
      setPage(1); 
    }, 300);

    return () => clearTimeout(t);
  }, [searchQuery]);

  const queryKey = useMemo(() => ["notes", page, debounced], [page, debounced]);

  const {
    data,
    isLoading,
    error,
    isFetching, 
  } = useQuery<NoteResponse, Error>({
    queryKey,
    queryFn: () => fetchNotes(page, 12, debounced), 
    staleTime: 1000 * 5,
    placeholderData: (prevData) => prevData,
  });

  const addMutation = useMutation({
    mutationFn: (payload: NoteCreate) => createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
    onError: (err) => {
      console.error("Create note error", err);
      alert("Failed to create note");
    },
  });


  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  if (isLoading) return <Loading />;
  if (error || !data) return <ErrorComponent error={error ?? new Error("No data")} reset={() => setPage(1)} />;

  const notes = data.notes ?? [];
  const totalPages = data.totalPages ?? 1;

  return (
    <div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <button
          // className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Create Note +
        </button>

        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        {isFetching && <span style={{ marginLeft: 8 }}>Loading…</span>}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}

      <NotesList notes={notes} />

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
      )}
    </div>
  );
}

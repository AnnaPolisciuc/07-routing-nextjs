import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";

interface NoteModalPageProps {
  params: { id: string };
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  console.log("Modal params:", params);
  
  const { id } = params;

  if (!id) {
    console.error("No note ID passed to modal!");
    return <p>Note ID missing!</p>;
  }

  const note = await fetchNoteById(id);
  console.log("Note fetched in modal:", note);

  if (!note) return <p>Note not found!</p>;

  return <NotePreview note={note} />;
}

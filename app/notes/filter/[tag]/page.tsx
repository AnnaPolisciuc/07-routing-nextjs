import NotesPage from "../../../../components/NotesPage/NotesPage";

// список разрешённых тегов
const allowedTags = ["Todo", "Work", "Personal", "Meeting", "Shopping", "all"] as const;
type AllowedTag = (typeof allowedTags)[number];

interface FilteredNotesPageProps {
  params: { tag: string };
}

export default function FilteredNotesPage({ params }: FilteredNotesPageProps) {
  // если тег не из списка, показываем "all"
  const tag: AllowedTag = allowedTags.includes(params.tag as AllowedTag)
    ? (params.tag as AllowedTag)
    : "all";

  return <NotesPage tag={tag} />;
}

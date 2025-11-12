
import Link from "next/link";
import type { ReactElement } from "react";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function SidebarDefault(): ReactElement {
  return (
    <nav aria-label="Notes filter">
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <Link href="/notes/filter/all">All notes</Link>
        </li>

        {TAGS.map((tag) => (
          <li key={tag} style={{ marginTop: 8 }}>
            <Link href={`/notes/filter/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

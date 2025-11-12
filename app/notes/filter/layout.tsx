import SidebarNotes from './@sidebar/SidebarNotes';
import type { ReactNode } from 'react';

interface FilterLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export default function FilterLayout({ children }: FilterLayoutProps) {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <SidebarNotes />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}

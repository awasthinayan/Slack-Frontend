import {
  BellIcon,
  HomeIcon,
  MessagesSquareIcon,
  MoreHorizontalIcon,
} from 'lucide-react';

import UserButton from '@/components/Atoms/UserButton/UserButton';
import { SidebarButton } from '@/components/Molecules/SidebarButton/SidebarButton';
import { WorkspaceSwitcher } from '@/components/Organisms/Workspace/WorkspaceSwitcher';

export const WorkspaceSidebar = () => {
  return (
    <aside className="flex h-full w-24 flex-col justify-between px-3 py-4 cursor-pointer">
      <div className="flex flex-col items-center gap-4">
        <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-sidebar-primary text-sm font-semibold tracking-wide text-sidebar-primary-foreground shadow-sm">
          WS
        </div>

        <nav className="flex flex-col items-center gap-4 cursor-pointer">
          <WorkspaceSwitcher />
          <SidebarButton Icon={HomeIcon} Label="Home" isActive={true} />

          <SidebarButton
            Icon={MessagesSquareIcon}
            Label="DMs"
            isActive={true}
          />

          <SidebarButton
            Icon={BellIcon}
            Label="notifications"
            isActive={true}
          />

          <SidebarButton
            Icon={MoreHorizontalIcon}
            Label="more options"
            isActive={true}
          />
        </nav>
      </div>

      <div className="flex justify-center border-t border-sidebar-border/80 pt-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sidebar-accent/80 shadow-sm">
          <UserButton />
        </div>
      </div>
    </aside>
  );
};

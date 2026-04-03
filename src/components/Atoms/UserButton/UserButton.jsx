import { LogOutIcon, PlusIcon, SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { CreateWorkspaceModal } from '@/components/Molecules/CreateWorkspaceModal/CreateWorkspaceModal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useCreateWorkspaceModal } from '@/Hooks/Context/workspaceContext';

const getInitials = (email = '') => email.trim().slice(0, 2).toUpperCase();

export default function UserButton() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const { setopenCreateWorkspaceModal } = useCreateWorkspaceModal();

  const handleLogout = () => {
    logout();
    navigate('/signin', { replace: true });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-sidebar-border/70 bg-sidebar text-sidebar-foreground shadow-sm transition-all duration-200 outline-none hover:-translate-y-0.5 hover:border-sidebar-primary/40 hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          >
            <Avatar
              size="lg"
              className="ring-2 ring-sidebar-primary/20 transition-transform duration-200 group-hover:scale-105"
            >
              <AvatarFallback className="bg-sidebar-primary font-semibold text-sidebar-primary-foreground">
                {getInitials(auth?.user?.email)}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="w-56 rounded-2xl border border-sidebar-border bg-sidebar p-2 text-sidebar-foreground shadow-xl"
        >
          <DropdownMenuLabel className="px-2 py-2 text-sidebar-foreground">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Your account</span>
              <span className="truncate text-xs text-sidebar-foreground/70">
                {auth?.user?.email || 'Signed in user'}
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-sidebar-border" />

          <DropdownMenuItem
            disabled
            className="rounded-xl px-2 py-2 text-sidebar-foreground/60"
          >
            <SettingsIcon className="h-4 w-4" />
            Settings
            <DropdownMenuShortcut>Soon</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="rounded-xl px-2 py-2 focus:bg-sidebar-accent focus:text-sidebar-accent-foreground cursor-pointer"
            onSelect={() => setopenCreateWorkspaceModal(true)}
          >
            <PlusIcon className="h-4 w-4" />
            Create workspace
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-sidebar-border" />

          <DropdownMenuItem
            variant="destructive"
            className="rounded-xl px-2 py-2 cursor-pointer"
            onSelect={handleLogout}
          >
            <LogOutIcon className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateWorkspaceModal />
    </>
  );
}

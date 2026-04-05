import { ChevronDownIcon, ChevronRightIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useCreateChannelModal } from '@/Hooks/Context/useCreateChannel';
import { useCreateMemberModal } from '@/Hooks/Context/useCreateMember';

export const WorkspacePanelSection = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const {
    setOpentoCreateChannelModal,
    setSelectedWorkspaceId: setSelectedChannelWorkspaceId,
  } = useCreateChannelModal();
  const {
    setOpentoCreateMemberModal,
    setSelectedWorkspaceId: setSelectedMemberWorkspaceId,
  } = useCreateMemberModal();
  const ToggleIcon = isOpen ? ChevronDownIcon : ChevronRightIcon;
  const isChannelSection = title?.trim().toLowerCase() === 'channels';
  const isMemberSection = title?.trim().toLowerCase() === 'members';

  const { workspaceId } = useParams();

  return (
    <section className="flex flex-col">
      <div className="flex w-full items-start">
        <div className="flex min-w-0 w-full flex-col">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex w-fit items-center rounded-xl px-2 text-slate-600 hover:bg-white/60 hover:text-slate-900 cursor-pointer"
            onClick={() => setIsOpen((current) => !current)}
          >
            <ToggleIcon className="size-4 shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">
              {title}
            </span>
          </Button>

          {isOpen ? (
            <div className="mt-0.5 ml-5 flex w-full flex-col">{children}</div>
          ) : null}
        </div>

        {isChannelSection || isMemberSection ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="ml-auto rounded-full text-slate-600 hover:bg-white/60 hover:text-slate-900 cursor-pointer"
            onClick={() => {
              if (isChannelSection) {
                setSelectedChannelWorkspaceId(workspaceId);
                setOpentoCreateChannelModal(true);
              }

              if (isMemberSection) {
                setSelectedMemberWorkspaceId(workspaceId);
                setOpentoCreateMemberModal(true);
              }
            }}
          >
            <PlusIcon className="size-4 shrink-0" />
          </Button>
        ) : null}
      </div>
    </section>
  );
};

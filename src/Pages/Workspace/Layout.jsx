import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { WorkspaceOptions } from '@/components/Organisms/Workspace/WorkspaceOptions';
import { WorkspacePanel } from '@/components/Organisms/Workspace/WorkspacePanel';
import { WorkspaceSidebar } from '@/components/Organisms/Workspace/WorkspaceSidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { LAST_WORKSPACE_KEY } from '@/Context/AuthContext';

export const WorkspaceLayout = ({ children }) => {
  const { workspaceId } = useParams();

  useEffect(() => {
    if (!workspaceId) return;

    localStorage.setItem(LAST_WORKSPACE_KEY, workspaceId);
  }, [workspaceId]);

  return (
    <div className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.12),_transparent_22%),linear-gradient(180deg,_color-mix(in_oklab,white_65%,hsl(var(--background)))_0%,_hsl(var(--background))_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-25" />

      <div className="relative flex h-full flex-col overflow-hidden ">
        <WorkspaceOptions />

        <div className="flex flex-1 overflow-hidden min-h-0">
          <WorkspaceSidebar />

          <ResizablePanelGroup
            id="workspace-panels"
            direction="horizontal"
            className="flex-1 h-full min-w-0"
            defaultLayout={{ workspaceList: 20, workspaceContent: 80 }}
          >
            {/* LEFT PANEL */}
            <ResizablePanel
              id="workspace-list-panel"
              className="min-w-0"
              defaultSize={20}
              minSize={0}
              maxSize="60vw"
            >
              <div className="h-full w-full bg-[#cde8e5] flex ">
                <WorkspacePanel />
              </div>
            </ResizablePanel>

            {/* DIVIDER */}
            <ResizableHandle withHandle className="bg-gray-300 w-[3px]" />

            {/* RIGHT PANEL */}
            <ResizablePanel
              id="workspace-content-panel"
              className="min-w-0"
              defaultSize={80}
              minSize="25%"
            >
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

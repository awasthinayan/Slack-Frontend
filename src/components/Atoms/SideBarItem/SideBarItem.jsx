import { cva } from 'class-variance-authority';
import { FilePenLineIcon, HashIcon, SendIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sideBarItemsVariants = cva(
  'flex w-full items-center justify-start gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'text-slate-700 hover:bg-white/25 hover:text-slate-950 hover:shadow-none',
        active:
          'bg-white text-slate-950 shadow-sm ring-1 ring-slate-200/80 hover:bg-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const getFallbackIcon = (label) => {
  const normalizedLabel = label?.trim().toLowerCase();

  if (normalizedLabel === 'drafts') return FilePenLineIcon;
  if (normalizedLabel === 'sends' || normalizedLabel === 'sent')
    return SendIcon;

  return HashIcon;
};

export const SideBarItem = ({ icon: Icon, variant, label, Id, className }) => {
  const { workspaceId } = useParams();
  const ResolvedIcon = Icon || getFallbackIcon(label);
  const isStaticItem =
    label?.trim().toLowerCase() === 'drafts' ||
    label?.trim().toLowerCase() === 'sends' ||
    label?.trim().toLowerCase() === 'sent';

  if (isStaticItem) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={cn(sideBarItemsVariants({ variant }), className)}
      >
        <ResolvedIcon className="size-4 shrink-0" />
        <span className="truncate">{label}</span>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn(sideBarItemsVariants({ variant }), className)}
    >
      <Link to={`/workspace/${workspaceId}/channels/${Id}`}>
        <ResolvedIcon className="size-4 shrink-0" />
        <span className="truncate">{label}</span>
      </Link>
    </Button>
  );
};

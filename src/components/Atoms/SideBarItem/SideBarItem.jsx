import { cva } from 'class-variance-authority';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sideBarItemsVariants = cva(
  'flex items-center justify-start gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
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

export const SideBarItem = ({
  icon: Icon,
  variant,
  label,
  Id,
  className,
  type = 'channel',
}) => {
  const { workspaceId } = useParams();
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
        <Icon className="size-4 shrink-0" />
        <span className="truncate">{label}</span>
      </Button>
    );
  }

  const linkPath =
    type === 'member'
      ? `/workspace/${workspaceId}/members/${Id}`
      : `/workspace/${workspaceId}/channels/${Id}`;

  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn(sideBarItemsVariants({ variant }), className)}
    >
      <Link to={linkPath}>
        <Icon className="size-4 shrink-0" />
        <span className="truncate">{label}</span>
      </Link>
    </Button>
  );
};

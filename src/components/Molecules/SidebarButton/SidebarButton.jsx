import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const getSidebarButtonClassName = (isActive) =>
  cn(
    'h-12 w-12 cursor-pointer rounded-2xl border border-sidebar-border/70 bg-sidebar/70 text-sidebar-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sidebar-primary/40 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md',
    isActive &&
      'border-sidebar-primary/30 bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_12px_24px_-12px_hsl(var(--sidebar-primary))] hover:bg-sidebar-primary hover:text-sidebar-primary-foreground'
  );

export const getSidebarButtonLabelClassName = (isActive) =>
  cn(
    'max-w-[72px] text-center text-[11px] font-medium leading-tight text-sidebar-foreground/70 transition-colors',
    isActive && 'text-sidebar-foreground'
  );

export const SidebarButton = ({ Icon, Label, isActive }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        size="icon-lg"
        variant="ghost"
        className={getSidebarButtonClassName(isActive)}
      >
        <Icon className="h-5 w-5" />
      </Button>
      <span className={getSidebarButtonLabelClassName(isActive)}>{Label}</span>
    </div>
  );
};

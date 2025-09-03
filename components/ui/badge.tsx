import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline';
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
  const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
    default: 'bg-muted text-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input',
  };
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs', variants[variant], className)} {...props} />;
};


import React from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ErrorStateProps {
  statusCode?: number;
  title: string;
  message: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  icon?: React.ReactNode;
}

export function ErrorState({
  statusCode,
  title,
  message,
  primaryAction,
  secondaryAction,
  icon,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-in fade-in duration-500">
      <div className="bg-white dark:bg-card rounded-[2rem] border border-black dark:border-border shadow-none overflow-hidden relative max-w-2xl w-full p-8 md:p-14">
        {/* Background glow effect based on existing design */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-none blur-3xl -z-10 opacity-20 bg-blue-400 dark:bg-blue-900 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="flex flex-col items-center relative z-10">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-none flex items-center justify-center mb-6 border border-black/10 dark:border-border">
            {icon || <AlertCircle className="w-8 h-8" />}
          </div>

          {statusCode && (
            <span className="px-4 py-1.5 rounded-none text-[12px] font-black uppercase tracking-widest bg-neutral-100 dark:bg-secondary text-neutral-600 dark:text-secondary-foreground mb-4 border border-black/10 dark:border-border">
              Error {statusCode}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-heading uppercase tracking-tight font-black text-gray-900 dark:text-foreground mb-4">
            {title}
          </h1>

          <p className="text-neutral-600 dark:text-muted-foreground font-mono text-[14px] leading-relaxed max-w-md mb-10">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            {primaryAction && (
              primaryAction.href ? (
                <Link href={primaryAction.href} className="w-full sm:w-auto">
                  <Button className="w-full" size="lg" onClick={primaryAction.onClick}>
                    {primaryAction.label}
                  </Button>
                </Link>
              ) : (
                <Button className="w-full sm:w-auto" size="lg" onClick={primaryAction.onClick}>
                  {primaryAction.label}
                </Button>
              )
            )}

            {secondaryAction && (
              secondaryAction.href ? (
                <Link href={secondaryAction.href} className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full" size="lg" onClick={secondaryAction.onClick}>
                    {secondaryAction.label}
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" className="w-full sm:w-auto" size="lg" onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

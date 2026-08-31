import type { ComponentProps, ReactNode } from "react";
import { PlusIcon, type LucideIcon } from "lucide-react";

import { IconCard } from "@/components/ui/IconCard";
import { cn } from "@/utils/utils";

type ContactInfoProps = ComponentProps<"div"> & {
  href?: string;
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = ComponentProps<"div"> & {
  children: ReactNode;
  contactInfo?: ContactInfoProps[];
  description?: string;
  eyebrow?: string;
  formSectionClassName?: string;
  title?: string;
};

export function ContactCard({
  title = "Contactez-moi",
  description = "Présentez-moi votre projet ou votre opportunité. Je vous répondrai dans les meilleurs délais.",
  eyebrow,
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        "relative grid h-full w-full border border-brand-border bg-brand-surface shadow-[0_24px_70px_rgba(17,24,43,0.08)] lg:grid-cols-[0.9fr_1.1fr]",
        className,
      )}
      {...props}
    >
      <PlusIcon className="absolute -left-3 -top-3 z-10 h-6 w-6 text-brand-blue" aria-hidden="true" />
      <PlusIcon className="absolute -right-3 -top-3 z-10 h-6 w-6 text-brand-blue" aria-hidden="true" />
      <PlusIcon className="absolute -bottom-3 -left-3 z-10 h-6 w-6 text-brand-blue" aria-hidden="true" />
      <PlusIcon className="absolute -bottom-3 -right-3 z-10 h-6 w-6 text-brand-blue" aria-hidden="true" />

      <div className="flex flex-col justify-between bg-brand-surface">
        <div className="relative h-full px-6 py-10 sm:p-10 lg:p-12">
          {eyebrow ? (
            <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-brand-muted">{description}</p>

          <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {contactInfo?.map((info) => <ContactInfo key={info.label} {...info} />)}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex h-full w-full items-center border-t border-brand-border bg-brand-ivory p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12",
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({ icon: Icon, label, value, href, className, ...props }: ContactInfoProps) {
  return (
    <div className={cn("flex items-center gap-4 py-3", className)} {...props}>
      <IconCard size="sm">
        <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
      </IconCard>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-brand-navy">{label}</p>
        {href ? (
          <a
            href={href}
            className="mt-1 block truncate text-sm text-brand-muted transition-colors hover:text-brand-blue"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 text-sm text-brand-muted">{value}</p>
        )}
      </div>
    </div>
  );
}

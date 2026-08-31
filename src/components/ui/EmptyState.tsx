import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyState({ title, actionLabel, actionHref }: { title: string; actionLabel?: string; actionHref?: string }) {
  return (
    <div className="rounded-[2px] border border-dashed border-[#D9DFEA] bg-white px-6 py-16 text-center md:py-20">
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[2px] bg-[#EEF4FD] text-primary">
        <Plus size={34} strokeWidth={2.2} />
      </div>
      <p className="font-display text-2xl font-bold text-text-primary">{title}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="mt-8 inline-flex">
          <Button icon={<Plus size={16} />}>{actionLabel}</Button>
        </Link>
      ) : null}
    </div>
  );
}

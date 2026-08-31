import { Button } from "@/components/ui/Button";

export function Pagination({ page, total, limit, onPageChange }: { page: number; total: number; limit: number; onPageChange: (page: number) => void }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="flex items-center justify-between border-t border-app-border px-4 py-3 text-sm text-text-secondary">
      <span>
        Page {page} sur {totalPages} - {total} éléments
      </span>
      <div className="flex gap-2">
        <Button variant="secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Précédent
        </Button>
        <Button variant="secondary" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          Suivant
        </Button>
      </div>
    </div>
  );
}

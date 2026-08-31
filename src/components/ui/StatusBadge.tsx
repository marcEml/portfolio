import { Badge } from "@/components/ui/Badge";

export function StatusBadge({ status }: { status?: string | boolean }) {
  if (status === true || status === "publie" || status === "Publié") return <Badge tone="green">Publié</Badge>;
  if (status === "archive" || status === "Archivé") return <Badge tone="red">Archivé</Badge>;
  if (status === "traite") return <Badge tone="green">Traité</Badge>;
  if (status === "non_lu") return <Badge tone="red">Non lu</Badge>;
  if (status === "lu") return <Badge tone="blue">Lu</Badge>;
  return <Badge tone="gray">Brouillon</Badge>;
}

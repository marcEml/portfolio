import { FileUpload } from "../ui/FileUpload";
import { FormField } from "./FormField";

export function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: File | string;
  onChange: (value?: File) => void;
}) {
  return (
    <FormField label={label}>
      <FileUpload
        value={value}
        accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp", ".svg"] }}
        showValueText={false}
        previewClassName="h-32 w-48"
        onChange={(file) => onChange(file ?? undefined)}
      />
    </FormField>
  );
}

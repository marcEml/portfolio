import { LazyImage } from "@/components/ui/lazy-image";
import { Check, FolderKanban, ExternalLink } from "lucide-react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogDescription,
} from "./MorphingDialog";
import { usePreferences } from "@/contexts/PreferencesContext";

type Image = {
  src: string;
  alt: string;
  fallback: string;
};

export function ImageGallery({ Images }: { Images: Image[] }) {
  const { language } = usePreferences();
  const isFrench = language === "fr";

  return (
    <div className="relative flex w-full flex-col items-center justify-center px-4">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-2">
        {Images.map((image, index) => {
          const ratio = 16 / 9;

          return (
            <MorphingDialog key={`${image.src}-${index}`} transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.8 }}>
              <MorphingDialogTrigger className="oldart-gallery-card group flex h-full w-full flex-col overflow-hidden border-2 border-brand-navy bg-brand-surface shadow-[7px_7px_0_rgb(var(--brand-blue))] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_rgb(var(--brand-blue))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">
                <LazyImage
                  alt={image.alt}
                  className="saturate-[0.74] contrast-[1.05] transition-[filter,transform] duration-700 group-hover:scale-[1.025] group-hover:saturate-100"
                  containerClassName="cn-rounded"
                  fallback={image.fallback}
                  inView={true}
                  key={index}
                  ratio={ratio}
                  src={image.src}
                />
              </MorphingDialogTrigger>

              <MorphingDialogContainer>
                <MorphingDialogContent className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto border-2 border-brand-navy bg-brand-surface shadow-[14px_14px_0_rgb(var(--brand-blue))]">
                  <header className="relative border-b-2 border-brand-navy bg-brand-blue-soft px-6 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-12">
                    <MorphingDialogClose
                      ariaLabel={isFrench ? "Fermer la gallerie" : "Close Gallery"}
                      className="right-4 top-4 z-10 flex size-10 items-center justify-center border-2 border-brand-navy bg-brand-surface text-brand-navy transition hover:bg-brand-navy hover:text-brand-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:right-6 sm:top-6"
                    />
                  </header>

                  <LazyImage
                    alt={image.alt}
                    containerClassName="cn-rounded"
                    fallback={image.fallback}
                    inView={true}
                    key={index}
                    ratio={ratio}
                    src={image.src}
                  />
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          );
        })}
      </div>
    </div>
  );
}

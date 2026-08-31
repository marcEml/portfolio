import { useState, type ElementType } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  FileText,
  FolderKanban,
  Github,
  Gitlab,
  GraduationCap,
  Heart,
  House,
  Linkedin,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { PreferenceControls } from "@/components/layout/PreferenceControls";
import { socialLinks } from "@/config/portfolioLinks";
import { usePreferences } from "@/contexts/PreferencesContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

type NavItem = {
  external?: boolean;
  href?: string;
  id: string;
  title: string;
  icon: ElementType;
  targetId?: string;
};

function SidebarLink({
  item,
  activeId,
  compact = false,
  onSelect,
}: {
  item: NavItem;
  activeId: string;
  compact?: boolean;
  onSelect: (id: string) => void;
}) {
  const targetId = item.targetId ?? item.id;
  const isActive = activeId === targetId;
  const Icon = item.icon;
  const href = item.href ?? `#${targetId}`;

  return (
    <div className="relative group">
      <a
        href={href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noreferrer" : undefined}
        aria-current={isActive ? "location" : undefined}
        aria-label={compact ? item.title : undefined}
        title={compact ? item.title : undefined}
        onClick={() => {
          if (!item.external) onSelect(targetId);
        }}
        className={`group flex items-center transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
          compact
            ? "mx-auto h-10 w-10 items-center justify-center"
            : "w-full items-center gap-2.5 px-2.5 py-2"
        } ${isActive ? "font-semibold text-brand-navy" : "text-brand-muted hover:text-brand-navy"}`}
      >
        <Icon
          className={`shrink-0 ${compact ? "h-5 w-5" : "h-4 w-4"} ${
            isActive ? "text-brand-blue" : "text-brand-muted group-hover:text-brand-blue"
          }`}
          strokeWidth={1.7}
          aria-hidden="true"
        />
        {compact ? null : (
          <span className="min-w-0 text-[13px] tracking-wide">
              <span className="block truncate">{item.title}</span>
          </span>
        )}
      </a>
      <span
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-blue transition-[width] duration-300 ease-out group-hover:w-full group-focus-visible:w-full"
        aria-hidden="true"
      />
    </div>
  );
}

export function Sidebar({
  className = "",
  activeId,
  onSelect,
}: {
  className?: string;
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  const [internalId, setInternalId] = useState("home");
  const { language } = usePreferences();
  const currentId = activeId ?? internalId;
  const handleSelect = onSelect ?? setInternalId;
  const isFrench = language === "fr";
  const navigationItems: NavItem[] = [
    { id: "home", title: "Yao Marc-Emmanuel BROU", icon: House },
    { id: "about", title: isFrench ? "À propos" : "About", icon: UserRound },
    { id: "skills", title: isFrench ? "Compétences" : "Skills", icon: Code2 },
    { id: "cursus", title: isFrench ? "Cursus" : "Education", icon: GraduationCap },
    { id: "certifications", title: "Certifications", icon: BadgeCheck },
    { id: "projects", title: isFrench ? "Projets" : "Projects", icon: FolderKanban },
    { id: "experience", title: isFrench ? "Expériences" : "Experience", icon: BriefcaseBusiness },
    { id: "freetime", title: isFrench ? "Loisirs et centres d'intérêt" : "Interests", icon: Heart },
    { id: "contact", title: "Contact", icon: Mail },
  ];
  const shortcutItems: NavItem[] = [
    { id: "github", title: "GitHub", icon: Github, href: socialLinks.github, external: true },
    { id: "gitlab", title: "GitLab", icon: Gitlab, href: socialLinks.gitlab, external: true },
    {
      id: "linkedin",
      title: "LinkedIn",
      icon: Linkedin,
      href: socialLinks.linkedin,
      external: true,
    },
    { id: "tryhackme", title: "TryHackMe", icon: ShieldCheck },
    {
      id: "contact-shortcut",
      targetId: "contact",
      title: isFrench ? "E-mail" : "Email",
      icon: Mail,
    },
    { id: "cv", title: isFrench ? "CV" : "Résumé", icon: FileText },
  ];

  return (
    <div
      className={`flex h-screen w-full flex-col border-r border-brand-border bg-brand-surface p-3 font-sans ${className}`}
    >
      <div className="mb-3">
        <PreferenceControls />
      </div>

      <div className="flex justify-center py-3">
        <Avatar className="h-32 w-32 ring-4 ring-brand-blue-soft">
          <AvatarImage
            className="object-cover"
            src="/assets/pp.png"
            alt={
              isFrench ? "Portrait de Yao Marc-Emmanuel Brou" : "Portrait of Yao Marc-Emmanuel Brou"
            }
          />
          <AvatarFallback>MB</AvatarFallback>
        </Avatar>
      </div>

      <nav
        aria-label={isFrench ? "Navigation du portfolio" : "Portfolio navigation"}
        className="mt-3 flex flex-1 flex-col justify-center gap-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {navigationItems.map((item) => (
          <SidebarLink key={item.id} item={item} activeId={currentId} onSelect={handleSelect} />
        ))}
      </nav>

      <nav
        aria-label={isFrench ? "Liens professionnels" : "Professional links"}
        className="mt-auto grid grid-cols-3 gap-1 border-t border-brand-border pt-3"
      >
        {shortcutItems.map((item) => (
          <SidebarLink
            key={item.id}
            item={item}
            activeId={currentId}
            compact
            onSelect={handleSelect}
          />
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;

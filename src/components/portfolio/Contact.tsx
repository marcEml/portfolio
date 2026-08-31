"use client";

import { type FormEvent, useState } from "react";
import { CheckCircle2, Clock3, LoaderCircle, Mail, MapPin, Send } from "lucide-react";

import { ContactCard } from "@/components/ui/ContactBoard";
import { usePreferences } from "@/contexts/PreferencesContext";

type FormStatus = "idle" | "sending" | "success" | "error";

const fieldClassName =
  "mt-2 w-full border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-navy outline-none transition placeholder:text-brand-muted/60 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15";

export function Contact() {
  const { language } = usePreferences();
  const isFrench = language === "fr";
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(
          isFrench
            ? result?.message ?? "L’envoi a échoué. Réessayez dans quelques instants."
            : "Your message could not be sent. Please try again in a few moments.",
        );
      }

      form.reset();
      setStatus("success");
      setFeedback(
        isFrench
          ? "Votre message a bien été envoyé. Merci, je vous répondrai rapidement."
          : "Your message has been sent. Thank you — I will get back to you shortly.",
      );
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : isFrench
            ? "L’envoi a échoué. Vous pouvez également me contacter directement par e-mail."
            : "Your message could not be sent. You can also contact me directly by email.",
      );
    }
  }

  return (
    <section id="contact" className="scroll-mt-6 bg-brand-surface px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <ContactCard
          eyebrow="07 — Contact"
          title={isFrench ? "Une idée, un projet ou une opportunité ?" : "An idea, a project or an opportunity?"}
          description={isFrench ? "Décrivez-moi votre besoin avec quelques éléments de contexte. Le message sera envoyé directement dans ma boîte professionnelle." : "Tell me what you need and provide a little context. Your message will be sent directly to my professional inbox."}
          contactInfo={[
            {
              icon: Mail,
              label: isFrench ? "E-mail" : "Email",
              value: "by.marc.eml@gmail.com",
              href: "mailto:by.marc.eml@gmail.com",
            },
            {
              icon: MapPin,
              label: isFrench ? "Localisation" : "Location",
              value: "Rennes, France",
            },
            {
              icon: Clock3,
              label: isFrench ? "Disponibilité" : "Availability",
              value: isFrench ? "Réponse sous 1 à 2 jours ouvrés" : "Reply within 1–2 business days",
            },
          ]}
        >
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-brand-navy">
                {isFrench ? "Nom complet" : "Full name"}
                <input
                  className={fieldClassName}
                  type="text"
                  name="name"
                  autoComplete="name"
                  minLength={2}
                  maxLength={80}
                  placeholder={isFrench ? "Votre nom" : "Your name"}
                  required
                />
              </label>

              <label className="text-sm font-semibold text-brand-navy">
                {isFrench ? "Adresse e-mail" : "Email address"}
                <input
                  className={fieldClassName}
                  type="email"
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder={isFrench ? "vous@exemple.com" : "you@example.com"}
                  required
                />
              </label>
            </div>

            <label className="mt-5 block text-sm font-semibold text-brand-navy">
              {isFrench ? "Objet" : "Subject"}
              <input
                className={fieldClassName}
                type="text"
                name="subject"
                minLength={3}
                maxLength={120}
                placeholder={isFrench ? "Projet, opportunité, collaboration…" : "Project, opportunity, collaboration…"}
                required
              />
            </label>

            <label className="mt-5 block text-sm font-semibold text-brand-navy">
              Message
              <textarea
                className={`${fieldClassName} min-h-36 resize-y`}
                name="message"
                minLength={20}
                maxLength={5000}
                placeholder={isFrench ? "Parlez-moi de votre besoin et de son contexte." : "Tell me about your needs and their context."}
                required
              />
            </label>

            <label className="absolute -left-[9999px]" aria-hidden="true">
              {isFrench ? "Ne pas remplir ce champ" : "Do not fill in this field"}
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-relaxed text-brand-muted">
                {isFrench
                  ? "Vos coordonnées servent uniquement à vous répondre et ne sont pas conservées par le site."
                  : "Your contact details are used only to reply to you and are not stored by this website."}
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-brand-navy px-6 text-sm font-semibold text-brand-surface transition hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue disabled:cursor-wait disabled:opacity-65"
              >
                {status === "sending" ? (
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="size-4" aria-hidden="true" />
                )}
                {status === "sending"
                  ? isFrench
                    ? "Envoi…"
                    : "Sending…"
                  : isFrench
                    ? "Envoyer le message"
                    : "Send message"}
              </button>
            </div>

            <div className="mt-5 min-h-6" aria-live="polite" aria-atomic="true">
              {feedback ? (
                <p
                  className={`flex items-start gap-2 text-sm ${
                    status === "success" ? "text-emerald-700" : "text-red-700"
                  }`}
                  role={status === "error" ? "alert" : "status"}
                >
                  {status === "success" ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  ) : null}
                  {feedback}
                </p>
              ) : null}
            </div>
          </form>
        </ContactCard>

        <a
          href="#home"
          className="mt-12 inline-flex border-b border-brand-navy pb-1 text-sm font-semibold text-brand-navy transition hover:border-brand-blue hover:text-brand-blue"
        >
          {isFrench ? "Revenir en haut" : "Back to top"}
        </a>
      </div>
    </section>
  );
}

export default Contact;

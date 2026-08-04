import { useState } from "react";
import { FORMSPREE_URL, t } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export function ContactForm() {
  const { tr, lang } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error("failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full border-3 border-foreground bg-background px-4 py-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground placeholder:text-foreground/40 focus:outline-none focus:shadow-hard";

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      <input type="hidden" name="_language" value={lang} />
      <input type="text" name="name" required placeholder={tr(t.fName)} className={field} />
      <input type="email" name="email" required placeholder={tr(t.fEmail)} className={field} />
      <textarea rows={5} name="message" required placeholder={tr(t.fMsg)} className={`${field} resize-none`} />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full border-3 border-foreground bg-foreground px-5 py-4 font-display text-2xl uppercase tracking-wide text-background transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {status === "sending" ? tr(t.sending) : tr(t.send)}
      </button>
      {status === "sent" && (
        <p className="border-3 border-foreground bg-accent px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-foreground">
          {tr(t.sent)}
        </p>
      )}
      {status === "error" && (
        <p className="border-3 border-foreground bg-background px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em]">
          {tr(t.failed)}
        </p>
      )}
    </form>
  );
}

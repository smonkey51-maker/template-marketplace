import { z } from "zod";

// ── /api/subscribe ────────────────────────────────────────────────────────────
export const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).pipe(z.email("Invalid email")),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;

// ── /api/contact ──────────────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Inserisci nome e cognome").max(100),
  company: z.string().trim().min(2, "Inserisci il nome dell'azienda").max(120),
  email: z.string().trim().toLowerCase().max(254).pipe(z.email("Indirizzo email non valido")),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+()\-.\s]*$/, "Numero di telefono non valido")
    .optional()
    .default(""),
  message: z.string().trim().min(10, "Scrivi almeno qualche riga").max(2000),
  // Must be an explicit yes: the privacy notice has to be accepted to send the form.
  consent: z.literal(true, { error: "Per inviare il messaggio accetta l'informativa privacy" }),
  // Honeypot: real visitors never see or fill this field. It is accepted by the
  // schema on purpose: the route drops the message silently, so a bot learns nothing.
  website: z.string().max(500).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

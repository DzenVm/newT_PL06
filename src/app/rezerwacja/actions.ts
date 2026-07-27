"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko").max(120),
  email: z.string().trim().min(1, "Podaj adres e-mail").email("Podaj poprawny adres e-mail"),
  phone: z.string().trim().min(6, "Podaj numer telefonu").max(30),
  checkIn: z.string().min(1, "Wybierz datę przyjazdu"),
  checkOut: z.string().min(1, "Wybierz datę wyjazdu"),
  guests: z.string().min(1, "Podaj liczbę gości"),
  interest: z.enum(["apartament", "salon-gier", "wydarzenie", "inne"]),
  message: z.string().max(2000).optional(),
  ageConfirm: z.string().refine((v) => v === "on", "Potwierdzenie pełnoletności (18+) jest wymagane"),
  privacyConsent: z.string().refine((v) => v === "on", "Zgoda na przetwarzanie danych jest wymagana"),
  company: z.string().max(0).optional(),
});

export interface ReservationState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitReservation(
  _prevState: ReservationState,
  formData: FormData
): Promise<ReservationState> {
  const raw = Object.fromEntries(formData.entries());
  // Unchecked checkboxes are omitted from FormData entirely, so give them
  // an explicit "off" value — otherwise the base string check fails with
  // a generic type error instead of our custom required-checkbox message.
  const normalized = {
    ...raw,
    ageConfirm: raw.ageConfirm ?? "off",
    privacyConsent: raw.privacyConsent ?? "off",
  };
  const parsed = schema.safeParse(normalized);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Sprawdź zaznaczone pola formularza.",
      fieldErrors,
    };
  }

  if (new Date(parsed.data.checkOut) <= new Date(parsed.data.checkIn)) {
    return {
      status: "error",
      message: "Sprawdź zaznaczone pola formularza.",
      fieldErrors: { checkOut: "Data wyjazdu musi być późniejsza niż data przyjazdu" },
    };
  }

  // Integration point: connect a mailer/CRM (e.g. Resend, Postmark,
  // HubSpot) here using environment-provided credentials. Left
  // unconnected deliberately — no third-party keys are bundled with
  // this template.
  console.log("Nowe zapytanie o rezerwację:", {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    checkIn: parsed.data.checkIn,
    checkOut: parsed.data.checkOut,
    guests: parsed.data.guests,
    interest: parsed.data.interest,
    message: parsed.data.message,
  });

  return {
    status: "success",
    message: "Dziękujemy! Nasz concierge odpowie w ciągu 24 godzin na podany adres e-mail.",
  };
}

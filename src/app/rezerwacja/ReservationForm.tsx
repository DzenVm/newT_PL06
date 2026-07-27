"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitReservation, type ReservationState } from "./actions";

const initialReservationState: ReservationState = { status: "idle" };

const inputClass =
  "w-full border-b border-white/20 bg-transparent py-3 text-sm text-ivory placeholder:text-ivory/35 outline-none transition-colors focus:border-gold";
const labelClass = "block text-[11px] uppercase tracking-[0.14em] text-ivory/50";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex w-full items-center justify-center bg-gold px-8 py-4 text-[13px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Wysyłanie…" : "Wyślij zapytanie"}
    </button>
  );
}

export function ReservationForm() {
  const [state, formAction] = useActionState(submitReservation, initialReservationState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  const error = (field: string) => state.fieldErrors?.[field];

  return (
    <form ref={formRef} action={formAction} className="space-y-8" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">Imię i nazwisko</label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder="Jan Kowalski" />
          {error("name") && <p className="mt-1.5 text-xs text-burgundy-light">{error("name")}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Adres e-mail</label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="jan@przyklad.pl" />
          {error("email") && <p className="mt-1.5 text-xs text-burgundy-light">{error("email")}</p>}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="phone">Telefon</label>
          <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="+48 600 000 000" />
          {error("phone") && <p className="mt-1.5 text-xs text-burgundy-light">{error("phone")}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="guests">Liczba gości</label>
          <input id="guests" name="guests" type="number" min={1} max={12} required defaultValue={2} className={inputClass} />
          {error("guests") && <p className="mt-1.5 text-xs text-burgundy-light">{error("guests")}</p>}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="checkIn">Data przyjazdu</label>
          <input id="checkIn" name="checkIn" type="date" required className={`${inputClass} [color-scheme:dark]`} />
          {error("checkIn") && <p className="mt-1.5 text-xs text-burgundy-light">{error("checkIn")}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="checkOut">Data wyjazdu</label>
          <input id="checkOut" name="checkOut" type="date" required className={`${inputClass} [color-scheme:dark]`} />
          {error("checkOut") && <p className="mt-1.5 text-xs text-burgundy-light">{error("checkOut")}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="interest">Czym jesteś zainteresowany/a?</label>
        <select id="interest" name="interest" required defaultValue="apartament" className={`${inputClass} [color-scheme:dark]`}>
          <option value="apartament">Pobyt w apartamencie</option>
          <option value="salon-gier">Miejsce w salonie gier (18+)</option>
          <option value="wydarzenie">Wydarzenie prywatne / firmowe</option>
          <option value="inne">Inne</option>
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">Wiadomość (opcjonalnie)</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Szczególne życzenia, preferowana kategoria apartamentu, godzina przyjazdu…"
        />
      </div>

      {/* Honeypot — hidden from real visitors, catches basic bots. */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="company">Nie wypełniaj tego pola</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-4 border-t border-white/10 pt-6">
        <label className="flex items-start gap-3 text-xs leading-relaxed text-ivory/60">
          <input type="checkbox" name="ageConfirm" required className="mt-0.5 h-4 w-4 shrink-0 accent-gold" />
          Potwierdzam, że ukończyłem/am 18 lat.
        </label>
        {error("ageConfirm") && <p className="text-xs text-burgundy-light">{error("ageConfirm")}</p>}

        <label className="flex items-start gap-3 text-xs leading-relaxed text-ivory/60">
          <input type="checkbox" name="privacyConsent" required className="mt-0.5 h-4 w-4 shrink-0 accent-gold" />
          Zapoznałem/am się z{" "}
          <a href="/polityka-prywatnosci" className="text-gold underline underline-offset-2">
            polityką prywatności
          </a>{" "}
          i wyrażam zgodę na przetwarzanie danych w celu obsługi zapytania.
        </label>
        {error("privacyConsent") && <p className="text-xs text-burgundy-light">{error("privacyConsent")}</p>}
      </div>

      <SubmitButton />

      <div role="status" aria-live="polite">
        {state.status === "success" && (
          <p className="border border-emerald-light/40 bg-emerald-light/10 px-4 py-3 text-sm text-emerald-light">
            {state.message}
          </p>
        )}
        {state.status === "error" && state.message && !Object.keys(state.fieldErrors ?? {}).length && (
          <p className="border border-burgundy-light/40 bg-burgundy-light/10 px-4 py-3 text-sm text-burgundy-light">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

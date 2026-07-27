export const SITE_URL = "https://morbitel.site";
export const CONTACT_EMAIL = "kontakt@morbitel.site";
export const RESERVATIONS_EMAIL = "rezerwacje@morbitel.site";
export const CITY = "Warszawa";
export const TIME_ZONE = "Europe/Warsaw";

// Real, publicly operated Polish national helpline for behavioural
// addictions (incl. gambling), co-financed by the Ministry of Health's
// Problem Gambling Resolution Fund. Verified — do not alter.
export const HELPLINE = {
  phone: "801 889 880",
  hours: "codziennie 17:00–22:00",
  operator: "Instytut Psychologii Zdrowia Polskiego Towarzystwa Psychologicznego",
};

export const NAV_LINKS = [
  { href: "/#apartamenty", label: "Apartamenty" },
  { href: "/#salon-gier", label: "Salon Gier" },
  { href: "/#restauracja", label: "Restauracja i Bar" },
  { href: "/#spa", label: "SPA i Wellness" },
  { href: "/#wydarzenia", label: "Wydarzenia" },
] as const;

export const LEGAL_LINKS = [
  { href: "/regulamin", label: "Regulamin" },
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/polityka-cookies", label: "Polityka cookies" },
  { href: "/odpowiedzialna-gra", label: "Odpowiedzialna gra 18+" },
] as const;

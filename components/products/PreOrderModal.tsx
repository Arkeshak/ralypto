"use client";
import { useEffect, useRef, useState } from "react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { buildWhatsAppUrl, chipi, validatePreOrder, type PreOrderData, type PreOrderErrors } from "@/lib/products";

const empty: PreOrderData = { name: "", email: "", phone: "", address: "" };

export default function PreOrderModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [data, setData] = useState<PreOrderData>(empty);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<PreOrderErrors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setSent(false);
      d.showModal();
      document.documentElement.classList.add("pd-lock");
    } else if (!open && d.open) d.close();
    return () => document.documentElement.classList.remove("pd-lock");
  }, [open]);

  const set = (k: keyof PreOrderData) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...data, [k]: ev.target.value };
    setData(next);
    if (errors[k]) setErrors(validatePreOrder(next, consent));
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validatePreOrder(data, consent);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      ref.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const clean = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      address: data.address.trim(),
    };
    window.open(buildWhatsAppUrl(clean), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field = (k: keyof PreOrderData, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className={`pd-field ${errors[k] ? "has-error" : ""}`}>
      <label htmlFor={`pd-${k}`}>{label}</label>
      <input
        id={`pd-${k}`}
        name={k}
        value={data[k]}
        onChange={set(k)}
        required
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `pd-${k}-err` : undefined}
        {...props}
      />
      {errors[k] && <p id={`pd-${k}-err`} className="pd-err" role="alert">{errors[k]}</p>}
    </div>
  );

  return (
    <dialog
      ref={ref}
      className="pd-modal"
      data-lenis-prevent
      aria-labelledby="pd-title"
      onClose={() => {
        document.documentElement.classList.remove("pd-lock");
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="pd-modal__box">
        <button type="button" className="pd-modal__x" onClick={onClose} aria-label="Close pre-order form">×</button>
        <p className="pd-kicker">Pre-order registration</p>
        <h2 id="pd-title">Register your interest in {chipi.name}</h2>
        <p className="pd-modal__note">
          Submit your details to register your interest in Chipi. Our team will contact you through WhatsApp to
          confirm your pre-order and provide the next steps.
        </p>
        {sent ? (
          <div className="pd-sent" role="status">
            <p><strong>WhatsApp should now be open in a new tab.</strong></p>
            <p>Send the pre-filled message to reach our team. Your pre-order is not confirmed until we reply to you personally.</p>
            <button type="button" className="pd-btn pd-btn--ghost" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            {field("name", "Full name", { autoComplete: "name" })}
            {field("email", "Email address", { type: "email", autoComplete: "email", inputMode: "email" })}
            {field("phone", "WhatsApp number", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "+94 77 123 4567" })}
            <div className={`pd-field ${errors.address ? "has-error" : ""}`}>
              <label htmlFor="pd-address">Delivery address</label>
              <textarea
                id="pd-address"
                name="address"
                rows={3}
                value={data.address}
                onChange={set("address")}
                required
                autoComplete="street-address"
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? "pd-address-err" : undefined}
              />
              {errors.address && <p id="pd-address-err" className="pd-err" role="alert">{errors.address}</p>}
            </div>
            <div className={`pd-check ${errors.consent ? "has-error" : ""}`}>
              <label>
                <input
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  aria-invalid={!!errors.consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (errors.consent) setErrors({ ...errors, consent: undefined });
                  }}
                />
                <span>I agree to be contacted by Ralypto regarding my Chipi pre-order.</span>
              </label>
              {errors.consent && <p className="pd-err" role="alert">{errors.consent}</p>}
            </div>
            <button type="submit" className="pd-btn pd-btn--full">
              <WhatsAppIcon size={18} /> Continue to WhatsApp
            </button>
            <p className="pd-fine">This is a pre-order inquiry, not a payment. No money is taken on this website.</p>
          </form>
        )}
      </div>
    </dialog>
  );
}

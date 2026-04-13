"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import { contactSchema } from "@/lib/validation";
import { socials } from "@/lib/data";
import { MagneticButton } from "../layout/magnetic-button";

const socialIcons = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
  Email: Mail,
  Twitter: FaXTwitter,
};

export function Contact({ socials: profileSocials }) {
  const activeSocials = Array.isArray(profileSocials) && profileSocials.length > 0 ? profileSocials : socials;

  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    setSuccess(true);
    reset();
  }

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#00ffaa]">Contact</p>
          <h2 className="mt-4 font-syne text-4xl font-black tracking-tight text-white sm:text-6xl">Let&apos;s Build Together.</h2>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-4xl border border-white/10 bg-white/3 p-6">
            <div className="space-y-4">
              {activeSocials.slice(0,3).map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a key={social.label} href={social.href} className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-4 text-white/80 transition-all duration-300 hover:translate-x-1 hover:border-[#00ffaa]/30 hover:text-white">
                    <span className="flex items-center gap-3">
                      {Icon ? <Icon className="h-4 w-4 text-[#00ffaa]" /> : null}
                      {social.label}
                    </span>
                    <span className="text-xs uppercase tracking-[0.24em] text-white/40">Open</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }} className="rounded-4xl border border-white/10 bg-white/3 p-6">
            {success ? (
              <div className="flex min-h-112 flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-16 w-16 text-[#00ffaa]" />
                <h3 className="mt-6 font-syne text-3xl font-black text-white">Message sent.</h3>
                <p className="mt-3 max-w-md text-white/70">Thanks for reaching out. I&apos;ll respond as soon as possible.</p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Name" error={errors.name?.message}>
                    <input {...register("name")} className={inputClass} />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input {...register("email")} type="email" className={inputClass} />
                  </Field>
                </div>
                <Field label="Subject" error={errors.subject?.message}>
                  <input {...register("subject")} className={inputClass} />
                </Field>
                <Field label="Message" error={errors.message?.message}>
                  <textarea {...register("message")} rows={7} className={inputClass} />
                </Field>

                <div className="pt-2">
                  <MagneticButton type="submit" className="bg-[#00ffaa] text-[#071014] hover:text-black" disabled={isSubmitting}>
                    {isSubmitting ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isSubmitting ? "Sending" : "Send Message"}
                  </MagneticButton>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-[#05070a] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#00ffaa]/50";

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
import { useState } from "react";
import { Mail, Send, Check } from "lucide-react";
import toast from "react-hot-toast";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // No backend wired up yet — this is a static, interview-ready contact form.
    setSent(true);
    toast.success("Message ready to send");
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink-dim focus:outline-none ${
      errors[field] ? "border-alert" : "border-line focus:border-signal"
    }`;

  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Contact</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Get in touch</h1>
      <p className="mt-3 text-sm text-ink-dim">
        Questions, feedback, or a bug report from the AI Brain Scanner — send it over.
      </p>

      {sent ? (
        <div className="glass mt-8 flex flex-col items-center gap-3 rounded-2xl p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-signal/10 text-signal">
            <Check size={22} />
          </div>
          <p className="font-display text-lg font-semibold text-ink">Message queued</p>
          <p className="text-sm text-ink-dim">Thanks, {form.name}. This is a demo form — nothing was sent.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-ink-dim">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass("name")}
              placeholder="Naveen V."
            />
            {errors.name && <p className="mt-1 text-xs text-alert">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink-dim">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass("email")}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-alert">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-ink-dim">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass("message")}
              placeholder="What's on your mind?"
            />
            {errors.message && <p className="mt-1 text-xs text-alert">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-signal py-3 text-sm font-semibold text-void transition hover:bg-signal/90"
          >
            <Send size={15} /> Send message
          </button>

          <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-ink-dim">
            <Mail size={12} /> hello@example.com
          </p>
        </form>
      )}
    </div>
  );
}

export default Contact;

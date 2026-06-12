"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const PRIORITY_OPTIONS = [
  "Commute",
  "Schools",
  "Beach access",
  "Affordability",
  "Walkability",
  "Military/base access",
  "Investment",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under $500K",
  "$500K – $750K",
  "$750K – $1M",
  "$1M – $1.5M",
  "$1.5M – $2M",
  "$2M+",
  "Not sure yet",
];

const TIMELINE_OPTIONS = [
  "Within 30 days",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];

export function BuyerQuestionnaire() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [priorities, setPriorities] = useState<string[]>([]);

  function togglePriority(priority: string) {
    setPriorities((prev) =>
      prev.includes(priority) ? prev.filter((p) => p !== priority) : [...prev, priority],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "buyer-questionnaire",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          outOfArea: formData.get("outOfArea"),
          currentLocation: formData.get("currentLocation"),
          timeline: formData.get("timeline"),
          budget: formData.get("budget"),
          preferredAreas: formData.get("preferredAreas"),
          vaFinancing: formData.get("vaFinancing"),
          firstTimeBuyer: formData.get("firstTimeBuyer"),
          lenderIntro: formData.get("lenderIntro"),
          priorities,
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
      setPriorities([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card>
        <h2 className="heading-section text-cabernet">Thank You!</h2>
        <p className="mt-3 text-espresso/90">
          Your information has been received. We&apos;ll be in touch soon to schedule your free buyer strategy call.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="heading-section text-cabernet">Buyer Questionnaire</h2>
      <p className="mt-2 text-espresso/90">
        Share a few details about your move so we can prepare for your strategy call.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <fieldset>
          <legend className="text-sm font-semibold text-cabernet">Contact Information</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Input label="Name" name="name" required />
            <Input label="Email" name="email" type="email" required />
            <Input label="Phone" name="phone" type="tel" required />
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-cabernet">Your Move</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Select label="Moving from out of area?" name="outOfArea" options={["Yes", "No"]} />
            <Input label="Current Location" name="currentLocation" />
            <Select label="Timeline" name="timeline" options={TIMELINE_OPTIONS} />
            <Select label="Budget Range" name="budget" options={BUDGET_OPTIONS} />
            <Input label="Preferred Areas" name="preferredAreas" className="sm:col-span-2" />
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-cabernet">Buyer Profile</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <Select label="Using VA financing?" name="vaFinancing" options={["Yes", "No", "Not sure"]} />
            <Select label="First-time buyer?" name="firstTimeBuyer" options={["Yes", "No"]} />
            <Select label="Need lender introduction?" name="lenderIntro" options={["Yes", "No"]} />
          </div>
        </fieldset>

        <div>
          <span className="block text-sm font-semibold text-cabernet">What matters most?</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRIORITY_OPTIONS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => togglePriority(p)}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  priorities.includes(p)
                    ? "bg-cabernet text-white"
                    : "bg-rose text-espresso hover:bg-blush/40"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-espresso">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-4 py-2 focus:border-cabernet focus:outline-none focus:ring-1 focus:ring-cabernet"
            placeholder="Tell us about your ideal neighborhood, commute, or any questions..."
          />
        </div>

        <Button type="submit" disabled={status === "loading"} size="lg">
          {status === "loading" ? "Submitting..." : "Submit & Book Strategy Call"}
        </Button>
        {status === "error" && (
          <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
        )}
      </form>
    </Card>
  );
}

function Input({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-espresso">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-4 py-2 focus:border-cabernet focus:outline-none focus:ring-1 focus:ring-cabernet"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  className,
}: {
  label: string;
  name: string;
  options: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-espresso">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-4 py-2 focus:border-cabernet focus:outline-none focus:ring-1 focus:ring-cabernet"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

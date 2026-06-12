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
] as const;

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

type CustomSearchFormProps = {
  defaultArea?: string;
  compact?: boolean;
};

export function CustomSearchForm({ defaultArea = "", compact = false }: CustomSearchFormProps) {
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
          leadType: "custom-search",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          budget: formData.get("budget"),
          timeline: formData.get("timeline"),
          preferredAreas: formData.get("preferredAreas") || defaultArea,
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
        <h3 className="heading-card text-cabernet">Request Received</h3>
        <p className="mt-2 text-espresso/90">
          We&apos;ll review your criteria and send a custom list of matching homes. Want to discuss your search in detail?
        </p>
        <Button href="/contact" className="mt-4">
          Book a Strategy Call
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      {!compact && (
        <>
          <h3 className="heading-card text-cabernet">Request a Custom Home Search</h3>
          <p className="mt-2 text-sm text-espresso/90">
            Tell us your budget, timeline, preferred areas, and commute needs. We&apos;ll send a custom list of matching homes.
          </p>
        </>
      )}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" />
          <SelectField label="Budget Range" name="budget" options={BUDGET_OPTIONS} />
          <SelectField label="Timeline" name="timeline" options={TIMELINE_OPTIONS} />
          <Field label="Preferred Areas" name="preferredAreas" defaultValue={defaultArea} />
        </div>
        <div>
          <span className="block text-sm font-medium text-espresso">What matters most?</span>
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
            Additional Details
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-4 py-2 focus:border-cabernet focus:outline-none focus:ring-1 focus:ring-cabernet"
          />
        </div>
        <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" ? "Submitting..." : "Request Custom Search"}
        </Button>
        {status === "error" && (
          <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
        )}
      </form>
    </Card>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-espresso">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-4 py-2 focus:border-cabernet focus:outline-none focus:ring-1 focus:ring-cabernet"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
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

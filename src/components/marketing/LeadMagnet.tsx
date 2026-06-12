"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type LeadMagnetProps = {
  title: string;
  description: string;
  leadType: string;
  checklistItems?: string[];
};

export function LeadMagnet({
  title,
  description,
  leadType,
  checklistItems,
}: LeadMagnetProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, leadType }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card variant="filled">
        <h3 className="heading-card text-cabernet">Checklist Requested!</h3>
        <p className="mt-2 text-espresso/90">
          Thank you! We&apos;ll send your checklist shortly. Ready to talk through your move?
        </p>
        <Button href="/contact" className="mt-4" variant="primary">
          Book a Strategy Call
        </Button>
      </Card>
    );
  }

  return (
    <Card variant="filled">
      <h3 className="heading-card text-cabernet">{title}</h3>
      <p className="mt-2 text-espresso/90">{description}</p>
      {checklistItems && (
        <ul className="mt-4 space-y-2 text-sm text-espresso/80">
          {checklistItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 text-cabernet">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor={`${leadType}-name`} className="block text-sm font-medium text-espresso">
            Name
          </label>
          <input
            id={`${leadType}-name`}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-4 py-2 focus:border-cabernet focus:outline-none focus:ring-1 focus:ring-cabernet"
          />
        </div>
        <div>
          <label htmlFor={`${leadType}-email`} className="block text-sm font-medium text-espresso">
            Email
          </label>
          <input
            id={`${leadType}-email`}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-4 py-2 focus:border-cabernet focus:outline-none focus:ring-1 focus:ring-cabernet"
          />
        </div>
        <Button type="submit" disabled={status === "loading"} className="w-full">
          {status === "loading" ? "Sending..." : "Get the Checklist"}
        </Button>
        {status === "error" && (
          <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
        )}
      </form>
    </Card>
  );
}

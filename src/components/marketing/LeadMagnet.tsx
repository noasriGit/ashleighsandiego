"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  createLeadSubmissionController,
  LEAD_SUBMISSION_ERROR_MESSAGE,
  LeadSubmissionError,
} from "@/lib/leads/client";

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
  const [errorMessage, setErrorMessage] = useState("");
  const submitterRef = useRef<ReturnType<typeof createLeadSubmissionController> | null>(null);
  if (submitterRef.current === null) submitterRef.current = createLeadSubmissionController();
  const submitter = submitterRef.current;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await submitter.submit({ name, email, leadType });
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof LeadSubmissionError ? error.message : LEAD_SUBMISSION_ERROR_MESSAGE,
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card variant="filled">
        <div role="status" aria-live="polite">
          <h3 className="heading-card text-cabernet">Checklist Requested!</h3>
          <p className="mt-2 text-espresso/90">
            Your request reached Ashleigh&apos;s team. They&apos;ll follow up with your checklist.
          </p>
          <Button href="/contact" className="mt-4" variant="primary">
            Book a Strategy Call
          </Button>
        </div>
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
              <span className="mt-1 text-cabernet" aria-hidden="true">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor={`${leadType}-name`} className="block text-sm font-medium text-espresso">
            Name
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <input
            id={`${leadType}-name`}
            type="text"
            required
            aria-required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-4 py-2 focus:border-cabernet focus:outline-none focus:ring-1 focus:ring-cabernet"
          />
        </div>
        <div>
          <label htmlFor={`${leadType}-email`} className="block text-sm font-medium text-espresso">
            Email
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <input
            id={`${leadType}-email`}
            type="email"
            required
            aria-required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-4 py-2 focus:border-cabernet focus:outline-none focus:ring-1 focus:ring-cabernet"
          />
        </div>
        <Button type="submit" disabled={status === "loading"} className="w-full">
          {status === "loading" ? "Sending..." : "Get the Checklist"}
        </Button>
        {status === "error" && (
          <p className="text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </Card>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon, CloseIcon, TruckIcon } from "@/components/icons";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export function PincodeCheck() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "ok" | "fail">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const pin = value.trim();
    if (!/^[1-9][0-9]{5}$/.test(pin)) {
      setState("fail");
      return;
    }
    setState("checking");
    window.setTimeout(() => {
      setState("ok");
    }, 700);
  }

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <p className="flex items-center gap-2 text-sm font-bold text-gray-900">
        <TruckIcon className="h-4 w-4 text-primary" />
        Delivery Options
      </p>
      <form onSubmit={handleSubmit} className="mt-2.5 flex gap-2">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setState("idle");
          }}
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter 6-digit pincode"
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-primary"
        />
        <button
          type="submit"
          disabled={state === "checking"}
          className="shrink-0 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
        >
          {state === "checking" ? "Checking..." : "Check"}
        </button>
      </form>
      {state === "ok" && (
        <p className="mt-2.5 flex items-start gap-1.5 text-xs text-green-600">
          <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            Delivery available to {value}. Estimated delivery in <b>3 – 5 days</b>. Free shipping
            for orders above {formatPrice(site.freeShippingThreshold)}.
          </span>
        </p>
      )}
      {state === "fail" && (
        <p className="mt-2.5 flex items-start gap-1.5 text-xs text-red-600">
          <CloseIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>Please enter a valid 6-digit pincode.</span>
        </p>
      )}
    </div>
  );
}

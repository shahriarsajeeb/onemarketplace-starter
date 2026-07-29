"use client";

import { Icon } from "@iconify/react";
import { format, parseISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export function DatePickerField({
  value,
  onChange,
  minimumDate,
  error = false,
}: {
  value: string;
  onChange: (value: string) => void;
  minimumDate: Date;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedDate = value ? parseISO(value) : undefined;

  useEffect(() => {
    if (!open) return;

    const close = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", closeWithKeyboard);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", closeWithKeyboard);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative mt-2">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border px-3 text-left text-xs font-normal transition ${
          error
            ? "border-[#bd6b6b] bg-[#fffafa]"
            : open
              ? "border-[#6e916a] bg-white"
              : "border-black/10 bg-white hover:border-black/20"
        }`}
      >
        <span className={selectedDate ? "text-[#242724]" : "text-[#9a9f97]"}>
          {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Select date"}
        </span>
        <Icon
          icon="solar:calendar-linear"
          width="17"
          className="text-[#657062]"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose milestone due date"
          className="absolute top-12 right-0 z-30 rounded-2xl border border-black/8 bg-white p-3 shadow-[0_20px_60px_rgba(26,34,26,.18)]"
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            defaultMonth={selectedDate ?? minimumDate}
            disabled={{ before: minimumDate }}
            onSelect={(date) => {
              if (!date) return;
              onChange(format(date, "yyyy-MM-dd"));
              setOpen(false);
            }}
            showOutsideDays
          />
          <p className="border-t border-black/7 px-2 pt-3 text-[10px] text-[#858a82]">
            Earliest available date: {format(minimumDate, "MMM d, yyyy")}
          </p>
        </div>
      )}
    </div>
  );
}

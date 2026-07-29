"use client";

import { Icon } from "@iconify/react";
import { addDays, isAfter, parseISO, startOfDay } from "date-fns";
import {
  Controller,
  useFieldArray,
  useForm,
  useWatch,
  type FieldError,
} from "react-hook-form";
import { useState } from "react";
import type { ClientJob } from "../data/client-data";
import { DatePickerField } from "./date-picker-field";

type JobPostValues = {
  title: string;
  description: string;
  expertise: string;
  duration: string;
  skills: string;
  milestones: {
    title: string;
    amount: number;
    due: string;
  }[];
  questions: { value: string }[];
  attachments?: FileList;
};

export function JobPostForm({ initialJob }: { initialJob?: ClientJob }) {
  const editing = Boolean(initialJob);
  const [published, setPublished] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<JobPostValues>({
    mode: "onChange",
    defaultValues: {
      title: initialJob?.title ?? "",
      description: initialJob?.description ?? "",
      expertise: initialJob?.level ?? "",
      duration: initialJob?.duration ?? "",
      skills: initialJob?.skills.join(", ") ?? "",
      milestones:
        initialJob?.milestones.map((milestone) => ({
          title: milestone.title,
          amount: milestone.amount,
          due: normalizeDueDate(milestone.due),
        })) ?? [{ title: "", amount: 0, due: "" }],
      questions:
        initialJob?.screeningQuestions.map((question) => ({
          value: question,
        })) ?? [{ value: "" }],
    },
  });

  const {
    fields: milestoneFields,
    append: appendMilestone,
    remove: removeMilestone,
  } = useFieldArray({ control, name: "milestones" });
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({ control, name: "questions" });

  const skills = useWatch({ control, name: "skills" }) ?? "";
  const milestones = useWatch({ control, name: "milestones" }) ?? [];
  const questions = useWatch({ control, name: "questions" }) ?? [];
  const totalBudget = milestones.reduce(
    (total, milestone) =>
      total +
      (Number.isFinite(Number(milestone.amount))
        ? Number(milestone.amount)
        : 0),
    0,
  );
  const milestoneIncomplete = milestones.some(
    (milestone) =>
      !milestone.title?.trim() ||
      Number(milestone.amount) <= 0 ||
      !milestone.due,
  );
  const questionIncomplete = questions.some(
    (question) => !question.value?.trim(),
  );

  const publishJob = async () => {
    setPublished(true);
  };

  return (
    <form
      onSubmit={handleSubmit(publishJob)}
      className="mt-8 grid gap-5"
      noValidate
    >
      {published && (
        <p
          role="status"
          className="rounded-xl bg-[#e7f2e4] p-4 text-sm font-semibold text-[#4d784a]"
        >
          {editing
            ? "Your changes to the job post have been saved."
            : "Your job post is ready and published to the marketplace."}
        </p>
      )}

      <Section
        title="Project basics"
        detail="This information appears on freelancer and agency job feeds."
      >
        <FormField
          label="Job title"
          error={errors.title}
          required
        >
          <input
            {...register("title", {
              required: "Enter a clear job title.",
              minLength: {
                value: 10,
                message: "Job title must be at least 10 characters.",
              },
              maxLength: {
                value: 100,
                message: "Job title cannot exceed 100 characters.",
              },
            })}
            placeholder="e.g. Senior Next.js developer for a collaborative workspace"
            className={inputClass(Boolean(errors.title))}
          />
        </FormField>

        <FormField
          label="Project description"
          error={errors.description}
          required
        >
          <textarea
            {...register("description", {
              required: "Describe the project and expected outcome.",
              minLength: {
                value: 80,
                message:
                  "Add at least 80 characters so talent can scope the work.",
              },
              maxLength: {
                value: 5000,
                message: "Description cannot exceed 5,000 characters.",
              },
            })}
            rows={7}
            placeholder="Describe the product, current stage, expected outcomes, and what success looks like…"
            className={`${inputClass(Boolean(errors.description))} h-auto resize-none py-3`}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Expertise level"
            error={errors.expertise}
            required
          >
            <select
              {...register("expertise", {
                required: "Select an expertise level.",
              })}
              className={`${inputClass(Boolean(errors.expertise))} bg-white`}
            >
              <option value="">Select expertise level</option>
              <option>Entry level</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>
          </FormField>
          <FormField
            label="Expected duration"
            error={errors.duration}
            required
          >
            <select
              {...register("duration", {
                required: "Select an expected project duration.",
              })}
              className={`${inputClass(Boolean(errors.duration))} bg-white`}
            >
              <option value="">Select duration</option>
              <option>Less than 1 month</option>
              <option>1–2 months</option>
              <option>3–6 months</option>
              <option>6+ months</option>
            </select>
          </FormField>
        </div>

        <p className="rounded-xl bg-[#f3f5f1] p-3 text-xs text-[#737970]">
          All job posts are publicly visible in the OneMarketplace.io talent
          marketplace.
        </p>
      </Section>

      <Section
        title="Skills and discovery"
        detail="Tags help us match the job with the right independent professionals."
      >
        <FormField
          label="Skills and expertise"
          error={errors.skills}
          required
        >
          <input
            {...register("skills", {
              required: "Add at least one required skill.",
              validate: (value) =>
                value
                  .split(",")
                  .map((skill) => skill.trim())
                  .filter(Boolean).length > 0 ||
                "Add at least one required skill.",
            })}
            placeholder="e.g. Next.js, TypeScript, Product design"
            className={inputClass(Boolean(errors.skills))}
          />
        </FormField>
        <div className="flex flex-wrap gap-2">
          {skills
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
            .map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[#edf3ea] px-3 py-1.5 text-[10px] font-medium text-[#527052]"
              >
                {skill}
              </span>
            ))}
        </div>
      </Section>

      <Section
        title="Fixed budget and milestones"
        detail="The total fixed-price budget is the sum of all project milestones."
      >
        <div className="rounded-xl bg-[#f2f5ef] p-4">
          <p className="text-xs text-[#7b8078]">Total project budget</p>
          <p className="mt-1 text-2xl font-semibold">
            ${totalBudget.toLocaleString()}
          </p>
        </div>

        <div className="grid gap-3">
          {milestoneFields.map((field, index) => {
            const milestoneErrors = errors.milestones?.[index];
            return (
              <div
                key={field.id}
                className="grid items-start gap-3 rounded-xl border border-black/7 p-4 sm:grid-cols-[minmax(0,1fr)_170px_170px_auto]"
              >
                <FormField
                  label="Milestone title"
                  error={milestoneErrors?.title}
                  required
                  compact
                >
                  <input
                    {...register(`milestones.${index}.title`, {
                      required: "Enter a milestone title.",
                      minLength: {
                        value: 3,
                        message: "Use at least 3 characters.",
                      },
                    })}
                    placeholder="e.g. Architecture and prototype"
                    className={inputClass(
                      Boolean(milestoneErrors?.title),
                      true,
                    )}
                  />
                </FormField>
                <FormField
                  label="Budget (USD)"
                  error={milestoneErrors?.amount}
                  required
                  compact
                >
                  <input
                    {...register(`milestones.${index}.amount`, {
                      required: "Enter a budget.",
                      valueAsNumber: true,
                      min: {
                        value: 10,
                        message: "Budget must be greater than $10.",
                      },
                      validate: (value) =>
                        Number.isFinite(value) || "Enter a valid number.",
                    })}
                    type="number"
                    inputMode="decimal"
                    min="10"
                    step="1"
                    placeholder="e.g. 3000"
                    className={inputClass(
                      Boolean(milestoneErrors?.amount),
                      true,
                    )}
                  />
                </FormField>
                <FormField
                  label="Due date"
                  error={milestoneErrors?.due}
                  required
                  compact
                >
                  <Controller
                    control={control}
                    name={`milestones.${index}.due`}
                    rules={{
                      required: "Select a due date.",
                      validate: (value) => {
                        if (!value) return "Select a due date.";
                        const selectedDate = startOfDay(parseISO(value));
                        const today = startOfDay(new Date());

                        if (!isAfter(selectedDate, today)) {
                          return "Due date must be after today.";
                        }

                        if (index > 0) {
                          const previousDueDate = getValues(
                            `milestones.${index - 1}.due`,
                          );
                          if (
                            previousDueDate &&
                            !isAfter(
                              selectedDate,
                              startOfDay(parseISO(previousDueDate)),
                            )
                          ) {
                            return "Must be later than the previous milestone.";
                          }
                        }

                        return true;
                      },
                    }}
                    render={({ field: dueDateField }) => {
                      const previousDueDate =
                        index > 0
                          ? milestones[index - 1]?.due
                          : undefined;
                      const minimumDate = previousDueDate
                        ? addDays(
                            startOfDay(parseISO(previousDueDate)),
                            1,
                          )
                        : addDays(startOfDay(new Date()), 1);

                      return (
                        <DatePickerField
                          value={dueDateField.value}
                          minimumDate={minimumDate}
                          error={Boolean(milestoneErrors?.due)}
                          onChange={(value) => {
                            dueDateField.onChange(value);
                            void trigger("milestones");
                          }}
                        />
                      );
                    }}
                  />
                </FormField>
                <button
                  type="button"
                  aria-label="Remove milestone"
                  disabled={milestoneFields.length === 1}
                  onClick={() => removeMilestone(index)}
                  className="mt-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#8b5656] hover:bg-[#f8eeee] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Icon icon="solar:trash-bin-trash-linear" width="18" />
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          disabled={milestoneIncomplete}
          onClick={() =>
            appendMilestone({ title: "", amount: 0, due: "" })
          }
          className="inline-flex h-10 cursor-pointer items-center gap-2 justify-self-start rounded-xl border border-black/10 px-4 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon icon="solar:add-circle-linear" width="17" />
          Add milestone
        </button>
      </Section>

      <Section
        title="Screening and attachments"
        detail="Ask focused questions and share files that clarify the project."
      >
        {questionFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`questions.${index}.value`)}
              placeholder="Add a screening question"
              className={`${inputClass(false)} min-w-0 flex-1`}
            />
            <button
              type="button"
              aria-label={`Remove screening question ${index + 1}`}
              onClick={() => removeQuestion(index)}
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-black/10"
            >
              <Icon icon="solar:close-circle-linear" width="18" />
            </button>
          </div>
        ))}
        <button
          type="button"
          disabled={questionIncomplete}
          onClick={() => appendQuestion({ value: "" })}
          className="inline-flex h-10 cursor-pointer items-center gap-2 justify-self-start rounded-xl border border-black/10 px-4 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon icon="solar:add-circle-linear" width="17" />
          Add question
        </button>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 p-6 text-xs font-semibold text-[#52784f]">
          <Icon icon="solar:paperclip-linear" width="18" />
          Attach project brief
          <input
            {...register("attachments")}
            type="file"
            multiple
            className="sr-only"
          />
        </label>
      </Section>

      <div className="sticky bottom-4 flex justify-end gap-2 rounded-2xl border border-black/8 bg-white/95 p-4 shadow-[0_12px_40px_rgba(28,35,28,.12)] backdrop-blur">
        <button
          type="button"
          className="h-11 rounded-xl border border-black/10 px-5 text-sm font-semibold"
        >
          Save draft
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="h-11 cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-[#b8bcb6] disabled:text-white/80"
        >
          {isSubmitting
            ? editing
              ? "Saving…"
              : "Publishing…"
            : editing
              ? "Save changes"
              : "Publish job"}
        </button>
      </div>
    </form>
  );
}

function Section({
  title,
  detail,
  children,
}: {
  title: string;
  detail: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-5 rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
      <header>
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-1 text-xs text-[#7b8078]">{detail}</p>
      </header>
      <div className="grid gap-5 border-t border-black/7 pt-5">
        {children}
      </div>
    </section>
  );
}

function FormField({
  label,
  error,
  required = false,
  compact = false,
  children,
}: {
  label: string;
  error?: FieldError;
  required?: boolean;
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`${compact ? "text-[10px] text-[#737970]" : "text-xs"} font-semibold`}
    >
      {label} {required && <RequiredMark />}
      {children}
      {error?.message && (
        <span className="mt-1.5 block text-[10px] font-medium text-[#a85252]">
          {error.message}
        </span>
      )}
    </label>
  );
}

function inputClass(error: boolean, compact = false) {
  return `${compact ? "mt-2 h-10 rounded-lg text-xs" : "mt-2 h-11 rounded-xl text-sm"} w-full border px-3 font-normal text-[#242724] outline-none transition ${
    error
      ? "border-[#bd6b6b] bg-[#fffafa] focus:border-[#a85252]"
      : "border-black/10 focus:border-[#6e916a]"
  }`;
}

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-[#a85252]">
      *
    </span>
  );
}

function normalizeDueDate(dueDate: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) return dueDate;

  const parsedDate = new Date(`${dueDate}, 2026`);
  if (Number.isNaN(parsedDate.getTime())) return "";

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

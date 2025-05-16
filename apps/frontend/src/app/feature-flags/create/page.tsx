"use client";
import { createFeatureFlag } from "@/api/featureFlag";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type {
  CreateFeatureFlagInput,
  FeatureFlagType,
} from "@/types/featureFlag.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const multivariateOptionSchema = z.object({
  key: z.string().min(1, "Key required"),
  value: z.string().min(1, "Value required"),
  percentage: z.number().min(0).max(100),
});

const createFeatureFlagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required").max(255),
  enabled: z.boolean(),
  type: z.enum(["boolean", "percentage", "multivariate"]),
  value: z
    .union([
      z.boolean(),
      z.number().min(0).max(100),
      z.array(multivariateOptionSchema),
      z.undefined(),
    ])
    .optional(),
});

type FormValues = z.infer<typeof createFeatureFlagSchema>;

export default function CreateFeatureFlagPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(createFeatureFlagSchema),
    defaultValues: {
      name: "",
      description: "",
      enabled: false,
      type: "boolean",
      value: undefined,
    },
  });

  const type = form.watch("type");
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "value",
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      let value: CreateFeatureFlagInput["value"] = undefined;
      if (data.type === "boolean") value = data.enabled;
      else if (data.type === "percentage") value = Number(data.value);
      else if (data.type === "multivariate") value = data.value;
      await createFeatureFlag({
        name: data.name,
        description: data.description,
        enabled: data.enabled,
        type: data.type as FeatureFlagType,
        value,
      });
      setSuccess(true);
      setTimeout(() => router.push("/"), 1200);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Failed to create feature flag");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-background rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create Feature Flag</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Flag name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Short description"
                    maxLength={255}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Max 255 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Enabled</FormLabel>
                  <FormDescription>
                    Is this flag enabled by default?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <select {...field} className="border rounded px-2 py-1">
                    <option value="boolean">Boolean</option>
                    <option value="percentage">Percentage</option>
                    <option value="multivariate">Multivariate</option>
                  </select>
                </FormControl>
                <FormDescription>
                  Boolean: On/Off, Percentage: rollout %, Multivariate: multiple
                  values
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Dynamic value fields */}
          {type === "percentage" && (
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rollout Percentage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      placeholder="0-100"
                      value={
                        typeof field.value === "number"
                          ? field.value
                          : field.value === undefined
                            ? ""
                            : Number(field.value) || ""
                      }
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Users affected by this flag (%)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {type === "multivariate" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Multivariate Options</FormLabel>
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    append({ key: "", value: "", percentage: 0 } as never)
                  }
                >
                  Add Option
                </Button>
              </div>
              {fields.length === 0 && (
                <div className="text-sm text-muted-foreground mb-2">
                  Add at least one option.
                </div>
              )}
              {fields.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2 items-end">
                  <Controller
                    control={form.control}
                    name={`value.${idx}.key` as const}
                    render={({ field }) => (
                      <Input {...field} placeholder="Key" className="w-24" />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name={`value.${idx}.value` as const}
                    render={({ field }) => (
                      <Input {...field} placeholder="Value" className="w-32" />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name={`value.${idx}.percentage` as const}
                    render={({ field }) => (
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        step={1}
                        {...field}
                        placeholder="%"
                        className="w-20"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => remove(idx)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <FormDescription>
                Each option must have a key, value, and percentage (0-100).
              </FormDescription>
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Creating..."
              : "Create Feature Flag"}
          </Button>
          {error && (
            <div className="text-destructive text-sm mt-2">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm mt-2">
              Feature flag created! Redirecting...
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

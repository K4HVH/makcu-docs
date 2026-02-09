import { createSignal, createMemo } from 'solid-js';

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

export interface UseFormOptions<T extends Record<string, any>> {
  initialValues: T;
  validate?: (values: T) => FormErrors<T>;
  onSubmit: (values: T) => void | Promise<void>;
}

export type UseFormReturn<T extends Record<string, any>> = {
  values: T;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  hasSubmitted: boolean;
  handleChange: (field: keyof T) => (value: any) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (e?: SubmitEvent) => Promise<void>;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  reset: () => void;
};

export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const [values, setValues] = createSignal<T>(options.initialValues);
  const [errors, setErrors] = createSignal<FormErrors<T>>({});
  const [touched, setTouched] = createSignal<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [hasSubmitted, setHasSubmitted] = createSignal(false);

  const validateForm = (): FormErrors<T> => {
    if (options.validate) {
      return options.validate(values());
    }
    return {};
  };

  const handleChange = (field: keyof T) => (value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }) as T);

    // Re-validate on change after first submit
    if (hasSubmitted()) {
      const newErrors = validateForm();
      setErrors(() => newErrors);
    }
  };

  const handleBlur = (field: keyof T) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }) as Partial<Record<keyof T, boolean>>);

    // Only show errors after blur if form has been submitted
    if (hasSubmitted()) {
      const newErrors = validateForm();
      setErrors(() => newErrors);
    }
  };

  const handleSubmit = async (e?: SubmitEvent) => {
    if (e) {
      e.preventDefault();
    }

    setHasSubmitted(true);

    const newErrors = validateForm();
    setErrors(() => newErrors);

    // Mark all fields as touched
    const allTouched = Object.keys(values()).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    ) as Partial<Record<keyof T, boolean>>;
    setTouched(() => allTouched);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await options.onSubmit(values());
    } finally {
      setIsSubmitting(false);
    }
  };

  const setFieldValue = (field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }) as T);
  };

  const setFieldError = (field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }) as FormErrors<T>);
  };

  const reset = () => {
    setValues(() => options.initialValues);
    setErrors(() => ({} as FormErrors<T>));
    setTouched(() => ({} as Partial<Record<keyof T, boolean>>));
    setIsSubmitting(false);
    setHasSubmitted(false);
  };

  // Computed values for display errors (only show if field is touched or form submitted)
  const displayErrors = createMemo(() => {
    const currentErrors = errors();
    const currentTouched = touched();
    const submitted = hasSubmitted();

    const display: FormErrors<T> = {};
    Object.keys(currentErrors).forEach((key) => {
      if (submitted || currentTouched[key as keyof T]) {
        display[key as keyof T] = currentErrors[key as keyof T];
      }
    });
    return display;
  });

  return {
    get values() { return values(); },
    get errors() { return displayErrors(); },
    get touched() { return touched(); },
    get isSubmitting() { return isSubmitting(); },
    get hasSubmitted() { return hasSubmitted(); },
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    reset,
  };
}

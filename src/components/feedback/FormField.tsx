import { Component, JSX, Show } from 'solid-js';
import { FieldError } from './FieldError';
import '../../styles/components/feedback/FormField.css';

interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: JSX.Element;
  class?: string;
}

export const FormField: Component<FormFieldProps> = (props) => {
  return (
    <div class={`form-field ${props.class || ''}`}>
      <Show when={props.label}>
        <label class="form-field__label">
          {props.label}
          {props.required && <span class="form-field__required">*</span>}
        </label>
      </Show>
      <div class="form-field__control">{props.children}</div>
      <FieldError error={props.error} />
    </div>
  );
};

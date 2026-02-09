import { Component, Show } from 'solid-js';
import { BsExclamationCircle } from 'solid-icons/bs';
import '../../styles/components/feedback/FieldError.css';

interface FieldErrorProps {
  error?: string;
  class?: string;
}

export const FieldError: Component<FieldErrorProps> = (props) => {
  return (
    <Show when={props.error}>
      <div class={`field-error ${props.class || ''}`}>
        <BsExclamationCircle />
        <span class="field-error__message">{props.error}</span>
      </div>
    </Show>
  );
};

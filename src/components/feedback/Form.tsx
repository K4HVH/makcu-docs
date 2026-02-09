import { Component, JSX, splitProps } from 'solid-js';
import '../../styles/components/feedback/Form.css';

interface FormProps extends Omit<JSX.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit?: (e: SubmitEvent) => void | Promise<void>;
  children: JSX.Element;
  class?: string;
}

export const Form: Component<FormProps> = (props) => {
  const [local, rest] = splitProps(props, ['onSubmit', 'children', 'class']);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (local.onSubmit) {
      await local.onSubmit(e);
    }
  };

  return (
    <form class={`form ${local.class || ''}`} onSubmit={handleSubmit} {...rest}>
      {local.children}
    </form>
  );
};

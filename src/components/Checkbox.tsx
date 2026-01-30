import { Component, JSX, createEffect, splitProps } from 'solid-js';
import '../styles/components/Checkbox.css';

interface CheckboxProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  size?: 'normal' | 'compact';
  indeterminate?: boolean;
}

export const Checkbox: Component<CheckboxProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'label',
    'size',
    'disabled',
    'indeterminate',
    'class',
  ]);

  let inputRef: HTMLInputElement | undefined;

  const size = () => local.size ?? 'normal';

  createEffect(() => {
    if (inputRef) {
      inputRef.indeterminate = local.indeterminate ?? false;
    }
  });

  const classNames = () => {
    const classes = ['checkbox'];

    if (local.disabled) {
      classes.push('checkbox--disabled');
    }

    if (size() === 'compact') {
      classes.push('checkbox--compact');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <label class={classNames()}>
      <input
        ref={inputRef}
        type="checkbox"
        class="checkbox__input"
        disabled={local.disabled}
        {...rest}
      />
      <span class="checkbox__box" />
      {local.label && <span class="checkbox__label">{local.label}</span>}
    </label>
  );
};

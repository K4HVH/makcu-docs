import { Component, JSX, Show, splitProps } from 'solid-js';
import '../../styles/components/navigation/Titlebar.css';

interface TitlebarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Title text displayed in the center */
  title: string;
  /** Optional subtitle displayed below the title */
  subtitle?: string;
  /** Content rendered on the left side (e.g., icons, back buttons) */
  left?: JSX.Element;
  /** Content rendered on the right side (e.g., action buttons, avatars) */
  right?: JSX.Element;
  /** Visual variant */
  variant?: 'default' | 'emphasized' | 'subtle';
  /** Size variant */
  size?: 'compact' | 'normal' | 'spacious';
  /** Whether the titlebar sticks to the top on scroll */
  sticky?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  class?: string;
}

export const Titlebar: Component<TitlebarProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'title',
    'subtitle',
    'left',
    'right',
    'variant',
    'size',
    'sticky',
    'disabled',
    'children',
    'class',
  ]);

  const variant = () => local.variant ?? 'default';
  const size = () => local.size ?? 'normal';

  const classNames = () => {
    const classes = ['titlebar'];

    classes.push(`titlebar--${variant()}`);

    if (size() !== 'normal') {
      classes.push(`titlebar--${size()}`);
    }

    if (local.sticky) {
      classes.push('titlebar--sticky');
    }

    if (local.disabled) {
      classes.push('titlebar--disabled');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <div class={classNames()} {...rest}>
      <Show when={local.left}>
        <div class="titlebar__left">{local.left}</div>
      </Show>

      <div class="titlebar__center">
        <span class="titlebar__title">{local.title}</span>
        <Show when={local.subtitle}>
          <span class="titlebar__subtitle">{local.subtitle}</span>
        </Show>
      </div>

      <Show when={local.right}>
        <div class="titlebar__right">{local.right}</div>
      </Show>
    </div>
  );
};

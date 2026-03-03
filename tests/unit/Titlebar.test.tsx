import { render } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import { Titlebar } from '../../src/components/navigation/Titlebar';

describe('Titlebar', () => {
  // === Rendering ===

  it('renders with title', () => {
    const { getByText } = render(() => <Titlebar title="Dashboard" />);
    expect(getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders with default class', () => {
    const { container } = render(() => <Titlebar title="Test" />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(() => <Titlebar title="Settings" subtitle="Manage preferences" />);
    expect(getByText('Settings')).toBeInTheDocument();
    expect(getByText('Manage preferences')).toBeInTheDocument();
  });

  it('does not render subtitle element when not provided', () => {
    const { container } = render(() => <Titlebar title="Test" />);
    const subtitle = container.querySelector('.titlebar__subtitle');
    expect(subtitle).not.toBeInTheDocument();
  });

  // === Left & Right Content ===

  it('renders left content', () => {
    const { getByText } = render(() => (
      <Titlebar title="Test" left={<span>Left Content</span>} />
    ));
    expect(getByText('Left Content')).toBeInTheDocument();
  });

  it('renders right content', () => {
    const { getByText } = render(() => (
      <Titlebar title="Test" right={<span>Right Content</span>} />
    ));
    expect(getByText('Right Content')).toBeInTheDocument();
  });

  it('does not render left zone when left is not provided', () => {
    const { container } = render(() => <Titlebar title="Test" />);
    const left = container.querySelector('.titlebar__left');
    expect(left).not.toBeInTheDocument();
  });

  it('does not render right zone when right is not provided', () => {
    const { container } = render(() => <Titlebar title="Test" />);
    const right = container.querySelector('.titlebar__right');
    expect(right).not.toBeInTheDocument();
  });

  it('renders both left and right content together', () => {
    const { getByText } = render(() => (
      <Titlebar
        title="Test"
        left={<span>Left</span>}
        right={<span>Right</span>}
      />
    ));
    expect(getByText('Left')).toBeInTheDocument();
    expect(getByText('Right')).toBeInTheDocument();
  });

  // === Variants ===

  it('applies default variant by default', () => {
    const { container } = render(() => <Titlebar title="Test" />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).toHaveClass('titlebar--default');
  });

  it('applies emphasized variant', () => {
    const { container } = render(() => <Titlebar title="Test" variant="emphasized" />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).toHaveClass('titlebar--emphasized');
  });

  it('applies subtle variant', () => {
    const { container } = render(() => <Titlebar title="Test" variant="subtle" />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).toHaveClass('titlebar--subtle');
  });

  // === Sizes ===

  it('does not add size class for normal (default)', () => {
    const { container } = render(() => <Titlebar title="Test" />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).not.toHaveClass('titlebar--normal');
    expect(titlebar).not.toHaveClass('titlebar--compact');
    expect(titlebar).not.toHaveClass('titlebar--spacious');
  });

  it('applies compact size', () => {
    const { container } = render(() => <Titlebar title="Test" size="compact" />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).toHaveClass('titlebar--compact');
  });

  it('applies spacious size', () => {
    const { container } = render(() => <Titlebar title="Test" size="spacious" />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).toHaveClass('titlebar--spacious');
  });

  // === Sticky ===

  it('does not apply sticky class by default', () => {
    const { container } = render(() => <Titlebar title="Test" />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).not.toHaveClass('titlebar--sticky');
  });

  it('applies sticky class when sticky prop is true', () => {
    const { container } = render(() => <Titlebar title="Test" sticky />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).toHaveClass('titlebar--sticky');
  });

  // === Disabled ===

  it('does not apply disabled class by default', () => {
    const { container } = render(() => <Titlebar title="Test" />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).not.toHaveClass('titlebar--disabled');
  });

  it('applies disabled class when disabled prop is true', () => {
    const { container } = render(() => <Titlebar title="Test" disabled />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).toHaveClass('titlebar--disabled');
  });

  // === Custom Class ===

  it('appends custom class', () => {
    const { container } = render(() => <Titlebar title="Test" class="my-custom" />);
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).toHaveClass('titlebar');
    expect(titlebar).toHaveClass('my-custom');
  });

  // === Pass-through Attributes ===

  it('passes through HTML attributes', () => {
    const { container } = render(() => (
      <Titlebar title="Test" data-testid="my-titlebar" id="tb1" />
    ));
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).toHaveAttribute('data-testid', 'my-titlebar');
    expect(titlebar).toHaveAttribute('id', 'tb1');
  });

  // === Structure ===

  it('renders title in center zone', () => {
    const { container } = render(() => <Titlebar title="Center Title" />);
    const center = container.querySelector('.titlebar__center');
    expect(center).toBeInTheDocument();
    const title = center?.querySelector('.titlebar__title');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe('Center Title');
  });

  it('renders subtitle in center zone', () => {
    const { container } = render(() => <Titlebar title="Title" subtitle="Sub" />);
    const center = container.querySelector('.titlebar__center');
    const subtitle = center?.querySelector('.titlebar__subtitle');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle?.textContent).toBe('Sub');
  });

  it('places left content in left zone', () => {
    const { container } = render(() => (
      <Titlebar title="Test" left={<span data-testid="left-item">L</span>} />
    ));
    const leftZone = container.querySelector('.titlebar__left');
    expect(leftZone).toBeInTheDocument();
    expect(leftZone?.querySelector('[data-testid="left-item"]')).toBeInTheDocument();
  });

  it('places right content in right zone', () => {
    const { container } = render(() => (
      <Titlebar title="Test" right={<span data-testid="right-item">R</span>} />
    ));
    const rightZone = container.querySelector('.titlebar__right');
    expect(rightZone).toBeInTheDocument();
    expect(rightZone?.querySelector('[data-testid="right-item"]')).toBeInTheDocument();
  });

  // === Combined Props ===

  it('handles all props together', () => {
    const { container, getByText } = render(() => (
      <Titlebar
        title="Full"
        subtitle="All props"
        variant="emphasized"
        size="spacious"
        sticky
        disabled
        left={<span>Left</span>}
        right={<span>Right</span>}
        class="extra"
        data-testid="full"
      />
    ));
    const titlebar = container.querySelector('.titlebar');
    expect(titlebar).toHaveClass('titlebar--emphasized');
    expect(titlebar).toHaveClass('titlebar--spacious');
    expect(titlebar).toHaveClass('titlebar--sticky');
    expect(titlebar).toHaveClass('titlebar--disabled');
    expect(titlebar).toHaveClass('extra');
    expect(getByText('Full')).toBeInTheDocument();
    expect(getByText('All props')).toBeInTheDocument();
    expect(getByText('Left')).toBeInTheDocument();
    expect(getByText('Right')).toBeInTheDocument();
  });
});

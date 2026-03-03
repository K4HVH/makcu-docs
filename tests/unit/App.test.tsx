import { render } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import App from '../../src/app/App';

describe('App', () => {
  it('renders the design system test page', () => {
    const { getByText } = render(() => <App />);
    expect(getByText('MidnightUI')).toBeInTheDocument();
  });

  it('renders typography section by default', () => {
    const { container } = render(() => <App />);
    expect(container.querySelector('.card')).toBeInTheDocument();
  });

  it('renders sidebar navigation with tabs', () => {
    const { container } = render(() => <App />);
    // The sidebar permanent pane should be present
    expect(container.querySelector('.pane--permanent')).toBeInTheDocument();
    // The sidebar should contain a tablist for navigation
    expect(document.querySelector('.pane--permanent [role="tablist"]')).toBeInTheDocument();
  });
});

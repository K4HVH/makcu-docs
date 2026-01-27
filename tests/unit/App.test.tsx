import { render } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import App from '../../src/app/App';

describe('App', () => {
  it('renders home page by default', () => {
    const { getByText } = render(() => <App />);
    expect(getByText('Home Page')).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    const { getByText } = render(() => <App />);
    expect(getByText('Welcome to your SolidJS application!')).toBeInTheDocument();
  });

  it('renders the child component on home', () => {
    const { getByText } = render(() => <App />);
    expect(getByText('Child component')).toBeInTheDocument();
  });
});

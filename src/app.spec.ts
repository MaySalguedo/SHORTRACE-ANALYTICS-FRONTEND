/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import App from './App.svelte';

describe('App.svelte', () => {
  it('should render the header and child components correctly', () => {
    render(App);

    expect(screen.getByText(/SHORTRACE/i)).toBeDefined();

    expect(screen.getByLabelText(/short link code/i)).toBeDefined();
  });
});

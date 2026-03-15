import type { Component } from 'solid-js';
import { GridBackground } from '../../components/surfaces/GridBackground';
import { Card, CardHeader } from '../../components/surfaces/Card';
import { Button } from '../../components/inputs/Button';

const Home: Component = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <GridBackground />
      <div class="content" style={{ 'overflow-y': 'auto' }}>

        <div
          class="container container--wide text-center"
          style={{ margin: '0 auto', 'padding-top': 'var(--spacing-16)' }}
        >
          <h1>makcu</h1>
          <p class="text-lg">
            A high-performance, idiomatic Rust library for the MAKCU USB mouse and input controller.
            Sync and async support, zero-copy parsing, no-lock hot paths.
          </p>
          <div class="flex" style={{ 'justify-content': 'center' }}>
            <Button variant="primary">Get Started</Button>
            <Button variant="secondary">API Reference</Button>
          </div>
        </div>

        <div
          class="container--wide grid"
          style={{ margin: '0 auto', 'grid-template-columns': 'repeat(2, 1fr)', padding: 'var(--g-spacing-lg)' }}
        >
          <Card padding="spacious">
            <CardHeader title="High Performance" subtitle="Zero bottlenecks on hot paths" />
            <p>Pre-built command strings, payload coalescing, channels and atomics. No mutex contention on reads.</p>
          </Card>
          <Card padding="spacious">
            <CardHeader title="Idiomatic Rust" subtitle="Designed for the language" />
            <p>Result-based errors, builder patterns, feature flags, and zero-cost abstractions throughout.</p>
          </Card>
          <Card padding="spacious">
            <CardHeader title="Feature Flags" subtitle="Only pay for what you use" />
            <p>Opt-in async, batching, extras, and profiler. The base crate exposes only firmware-native commands.</p>
          </Card>
          <Card padding="spacious">
            <CardHeader title="Auto Reconnect" subtitle="Resilient by default" />
            <p>Background reconnection monitor with exponential backoff. Your app stays in control via a watch channel.</p>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Home;

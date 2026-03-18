import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Introduction: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="MAKCU Rust Library" subtitle="Safe, high-performance Rust interface for MAKCU devices" />
        <p>
          The <A href="https://crates.io/crates/makcu"><code>makcu</code></A> crate provides a complete Rust API for controlling MAKCU mouse
          input devices over serial. It handles connection negotiation, baud rate switching,
          command serialization, response parsing, automatic reconnection, and concurrent access.
        </p>
        <table class="api-params">
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Crate Version</td>
              <td><code>0.1.1</code></td>
            </tr>
            <tr>
              <td>Rust Edition</td>
              <td><code>2024</code></td>
            </tr>
            <tr>
              <td>MSRV</td>
              <td><code>1.85</code></td>
            </tr>
            <tr>
              <td>Firmware Compatibility</td>
              <td>v3.2 (left) / v3.7 (right)</td>
            </tr>
            <tr>
              <td>Transport</td>
              <td>Serial at 4 Mbaud (auto-negotiated)</td>
            </tr>
            <tr>
              <td>Thread Safety</td>
              <td><code>Send + Sync</code> (shareable via <code>Arc</code>)</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <div id="installation" data-search-target>
        <Card>
          <CardHeader title="Installation" subtitle="Add makcu to your project" />
          <pre><code>cargo add makcu</code></pre>
          <p>
            With optional features:
          </p>
          <pre><code>{`cargo add makcu --features async,batch,extras`}</code></pre>
          <div class="api-response-label">Feature Flags</div>
          <table class="api-params">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><A href="/library/features/async"><code>async</code></A></td>
                <td>Async API via <A href="/library/types#core-types"><code>AsyncDevice</code></A>. Requires Tokio.</td>
              </tr>
              <tr>
                <td><A href="/library/features/batch"><code>batch</code></A></td>
                <td>Fluent command batching with automatic coalescing.</td>
              </tr>
              <tr>
                <td><A href="/library/features/extras"><code>extras</code></A></td>
                <td>Software-implemented operations: <A href="/library/features/extras#click">click</A>, <A href="/library/features/extras#move-smooth">smooth move</A>, <A href="/library/features/extras#drag">drag</A>, <A href="/library/features/extras#move-pattern">patterns</A>, <A href="/library/features/extras#event-callbacks">event callbacks</A>.</td>
              </tr>
              <tr>
                <td><A href="/library/features/profile"><code>profile</code></A></td>
                <td>Per-command timing profiler. Zero cost when disabled.</td>
              </tr>
              <tr>
                <td><A href="/library/features/mock"><code>mock</code></A></td>
                <td>In-process mock transport for testing without hardware.</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div id="quick-start" data-search-target>
        <Card>
          <CardHeader title="Quick Start" subtitle="Connect and send commands in five lines" />
          <pre><code>{`use makcu::{Device, Button};

let device = Device::connect()?;
device.move_xy(100, -50)?;
device.button_down(Button::Left)?;
device.button_up(Button::Left)?;
device.wheel(3)?;`}</code></pre>
          <p>
            <A href="/library/connection#connecting"><code>Device::connect()</code></A> auto-detects the MAKCU by USB VID/PID, negotiates
            the baud rate to 4 Mbaud, and verifies the firmware responds. All methods
            take <code>&self</code> and can be called concurrently from multiple threads.
            See the <A href="/library/connection#threading-model">threading model</A> for details.
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader title="Getting Started" subtitle="Connection and configuration" />
        <div class="docs-grid">
          <A href="/library/connection" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Connection" subtitle="Auto-detect, connect, configure, and reconnect" />
            </Card>
          </A>
        </div>
      </Card>

      <Card>
        <CardHeader title="API" subtitle="Device control methods" />
        <div class="docs-grid">
          <A href="/library/movement" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Movement" subtitle="Relative cursor movement, silent move, and scroll wheel" />
            </Card>
          </A>
          <A href="/library/buttons" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Buttons" subtitle="Press, release, and query button states" />
            </Card>
          </A>
          <A href="/library/locks" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Locks" subtitle="Lock and unlock mouse inputs" />
            </Card>
          </A>
          <A href="/library/info" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Device Info" subtitle="Version, device info, and serial number" />
            </Card>
          </A>
          <A href="/library/stream" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Button Stream" subtitle="Real-time button state change events" />
            </Card>
          </A>
          <A href="/library/fire-and-forget" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Fire and Forget" subtitle="Send commands without waiting for responses" />
            </Card>
          </A>
        </div>
      </Card>

      <Card>
        <CardHeader title="Features" subtitle="Optional cargo feature flags" />
        <div class="docs-grid">
          <A href="/library/features/async" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Async" subtitle="Full async parity with Tokio" />
            </Card>
          </A>
          <A href="/library/features/batch" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Batch" subtitle="Fluent command sequences with automatic coalescing" />
            </Card>
          </A>
          <A href="/library/features/extras" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Extras" subtitle="Click, smooth move, drag, patterns, and event callbacks" />
            </Card>
          </A>
          <A href="/library/features/mock" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Mock" subtitle="In-process mock transport for testing" />
            </Card>
          </A>
          <A href="/library/features/profile" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Profile" subtitle="Per-command timing statistics" />
            </Card>
          </A>
        </div>
      </Card>

      <Card>
        <CardHeader title="Reference" subtitle="Types and error handling" />
        <div class="docs-grid">
          <A href="/library/types" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Types and Errors" subtitle="Complete type reference and error handling" />
            </Card>
          </A>
        </div>
      </Card>
    </>
  );
};

export default Introduction;

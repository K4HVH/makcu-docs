import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Introduction: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="MAKCU Native API" subtitle="Firmware command reference for v3.2 (left) / v3.7 (right)" />
        <p>
          Complete reference for the MAKCU device firmware command interface.
          All commands have been physically verified against the tested firmware.
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
              <td>Left Chip Firmware</td>
              <td><code>v3.2</code></td>
            </tr>
            <tr>
              <td>Right Chip Firmware</td>
              <td><code>v3.7</code></td>
            </tr>
            <tr>
              <td>Protocol</td>
              <td>ASCII over serial (4 Mbaud). See <A href="/native/protocol">Command Protocol</A> and <A href="/native/transport">Transport</A>.</td>
            </tr>
            <tr>
              <td>Line Terminator</td>
              <td><code>\r\n</code></td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <CardHeader title="Overview" subtitle="Device architecture and protocol" />
        <div class="docs-grid">
          <A href="/native/hardware" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Hardware" subtitle="Device architecture and USB port layout" />
            </Card>
          </A>
          <A href="/native/transport" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Transport" subtitle="Serial interface, baud rates, and USB identification" />
            </Card>
          </A>
          <A href="/native/connection" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Connection" subtitle="Baud negotiation and connection sequence" />
            </Card>
          </A>
          <A href="/native/protocol" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Command Protocol" subtitle="Request format, response types, and parsing" />
            </Card>
          </A>
        </div>
      </Card>

      <Card>
        <CardHeader title="Commands" subtitle="Firmware command reference" />
        <div class="docs-grid">
          <A href="/native/commands/version" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Version" subtitle="Firmware identification" />
            </Card>
          </A>
          <A href="/native/commands/buttons" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Mouse Buttons" subtitle="Query and set button states" />
            </Card>
          </A>
          <A href="/native/commands/movement" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Mouse Movement" subtitle="Relative cursor movement and silent move" />
            </Card>
          </A>
          <A href="/native/commands/wheel" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Scroll Wheel" subtitle="Scroll input control" />
            </Card>
          </A>
          <A href="/native/commands/locks" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Input Locks" subtitle="Block axes and buttons from reaching the host" />
            </Card>
          </A>
          <A href="/native/commands/stream" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Button Stream" subtitle="Asynchronous button state change events" />
            </Card>
          </A>
          <A href="/native/commands/catch" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Button Capture" subtitle="Per-button press/release event stream while locked" />
            </Card>
          </A>
          <A href="/native/commands/serial" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Serial Spoofing" subtitle="Read and modify the mouse serial number" />
            </Card>
          </A>
        </div>
      </Card>

      <Card>
        <CardHeader title="Reference" subtitle="Additional information" />
        <div class="docs-grid">
          <A href="/native/broken" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Known Issues" subtitle="Non-functional and broken commands" />
            </Card>
          </A>
          <A href="/native/notes" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Notes" subtitle="Implementation details and firmware behaviour" />
            </Card>
          </A>
        </div>
      </Card>
    </>
  );
};

export default Introduction;

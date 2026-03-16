import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Introduction: Component = () => {
  return (
    <>
      <div class="docs-hero">
        <h2>MAKCU Native API</h2>
        <p>
          Complete reference for the MAKCU device firmware command interface.
          All commands documented here have been physically verified against
          firmware v3.2 (left chip) / v3.7 (right chip).
        </p>
      </div>

      <div class="docs-grid">
        <A href="/native/hardware" style={{ "text-decoration": "none" }}>
          <Card interactive padding="normal">
            <CardHeader title="Hardware" subtitle="Device architecture and USB port layout" />
          </Card>
        </A>
        <A href="/native/transport" style={{ "text-decoration": "none" }}>
          <Card interactive padding="normal">
            <CardHeader title="Transport" subtitle="Serial interface, baud rates, and USB identification" />
          </Card>
        </A>
        <A href="/native/connection" style={{ "text-decoration": "none" }}>
          <Card interactive padding="normal">
            <CardHeader title="Connection" subtitle="Baud negotiation and connection sequence" />
          </Card>
        </A>
        <A href="/native/protocol" style={{ "text-decoration": "none" }}>
          <Card interactive padding="normal">
            <CardHeader title="Command Protocol" subtitle="Request format, response types, and parsing" />
          </Card>
        </A>
      </div>

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
          <A href="/native/commands/serial" style={{ "text-decoration": "none" }}>
            <Card interactive variant="subtle" padding="compact">
              <CardHeader title="Serial Spoofing" subtitle="Read and modify the mouse serial number" />
            </Card>
          </A>
        </div>
      </Card>

      <Card variant="subtle">
        <CardHeader title="Firmware Version" />
        <p>
          This documentation covers firmware <strong>v3.2</strong> (left chip) and <strong>v3.7</strong> (right chip).
          Commands and behaviour may differ on other firmware versions. All entries have been tested
          and verified through direct hardware interaction.
        </p>
      </Card>
    </>
  );
};

export default Introduction;

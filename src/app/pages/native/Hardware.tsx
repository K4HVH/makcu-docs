import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Hardware: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="Hardware Architecture" subtitle="Device layout and USB ports" />
        <p>
          MAKCU is a USB passthrough device containing two independent ESP32-S3
          microcontrollers connected via three USB ports.
        </p>
        <pre class="diagram">{
`[USB 1 - Left ]  -->  Gaming PC / Console        (left chip,  v3.2)
[USB 2 - COM  ]  -->  Control software            (serial command interface)
[USB 3 - Right]  -->  Mouse                       (right chip, v3.7)`
        }</pre>
        <p>
          The <strong>left chip</strong> handles HID relay to the host PC and runs the
          command interpreter. The <strong>right chip</strong> manages the physical mouse
          connection. Commands are issued over the COM port (USB 2), which exposes a
          virtual serial interface.
        </p>
      </Card>

      <Card>
        <CardHeader title="USB Ports" />
        <table class="api-params">
          <thead>
            <tr>
              <th>Port</th>
              <th>Label</th>
              <th>Connects To</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>USB 1</code></td>
              <td>Left</td>
              <td>Host PC</td>
              <td>HID output to the gaming PC or console. Left chip (v3.2).</td>
            </tr>
            <tr>
              <td><code>USB 2</code></td>
              <td>COM</td>
              <td>Control PC</td>
              <td>Serial command interface. This is where software connects.</td>
            </tr>
            <tr>
              <td><code>USB 3</code></td>
              <td>Right</td>
              <td>Mouse</td>
              <td>Physical mouse input. Right chip (v3.7).</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <CardHeader title="Constraints" />
        <div class="callout callout--warning">
          <p>
            Only one process may hold the COM port at a time. Attempting to open
            it from a second process will fail.
          </p>
        </div>
        <div class="callout callout--warning">
          <p>
            A mouse must be connected to USB 3 (Right) or the device will not function.
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader title="LED Indicators" />
        <table class="api-params">
          <thead>
            <tr>
              <th>Pattern</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Solid ON</td>
              <td>Side functioning correctly</td>
            </tr>
            <tr>
              <td>Solid OFF</td>
              <td>No peripheral detected</td>
            </tr>
            <tr>
              <td>Slow blink (500ms)</td>
              <td>Reconfiguring or warning state</td>
            </tr>
            <tr>
              <td>Left LED at startup: 1 flash</td>
              <td>Operating at 115200 baud</td>
            </tr>
            <tr>
              <td>Left LED at startup: 4 flashes</td>
              <td>Operating at 4 Mbaud</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default Hardware;

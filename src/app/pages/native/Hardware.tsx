import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Hardware: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="Hardware Architecture" subtitle="Device layout and USB ports" />
        <pre class="diagram">{
`[USB 1 - Left ]  -->  Gaming PC / Console        (left chip,  v3.2)
[USB 2 - COM  ]  -->  Control software            (serial command interface)
[USB 3 - Right]  -->  Mouse                       (right chip, v3.7)`
        }</pre>
        <table class="api-params">
          <thead>
            <tr>
              <th>Port</th>
              <th>Label</th>
              <th>Chip</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>USB 1</code></td>
              <td>Left</td>
              <td>Left (v3.2)</td>
              <td>HID output to the host PC. Runs the command interpreter.</td>
            </tr>
            <tr>
              <td><code>USB 2</code></td>
              <td>COM</td>
              <td>Left (v3.2)</td>
              <td>Serial command interface. Software connects here.</td>
            </tr>
            <tr>
              <td><code>USB 3</code></td>
              <td>Right</td>
              <td>Right (v3.7)</td>
              <td>Physical mouse input.</td>
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

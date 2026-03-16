import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Stream: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="Button Event Stream" subtitle="Asynchronous button state change reporting" />
        <p>
          When enabled, the device emits a raw byte on the serial stream whenever any
          button state changes.
        </p>
      </Card>

      <Card>
        <CardHeader title="Enable / Disable" />
        <table class="api-params">
          <thead>
            <tr>
              <th>Command</th>
              <th>Response</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>km.buttons(1)</code></td>
              <td><span class="api-badge api-badge--executed">EXECUTED</span></td>
              <td>Enable the button event stream.</td>
            </tr>
            <tr>
              <td><code>km.buttons(0)</code></td>
              <td><span class="api-badge api-badge--executed">EXECUTED</span></td>
              <td>Disable the button event stream.</td>
            </tr>
            <tr>
              <td><code>km.buttons()</code></td>
              <td><span class="api-badge api-badge--responded">RESPONDED</span></td>
              <td>Query whether the stream is enabled. Returns <code>0</code> or <code>1</code>.</td>
            </tr>
          </tbody>
        </table>
        <div class="callout callout--warning">
          <p>
            Do not auto-enable on connect. Only enable when button events are explicitly needed.
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader title="Button Bitmask" subtitle="Event byte format" />
        <p>
          Each event is a single byte representing the <strong>complete current state</strong> of
          all buttons. It is a snapshot, not a delta. Compare against the previous value to
          detect individual transitions.
        </p>
        <table class="api-params">
          <thead>
            <tr>
              <th>Bit</th>
              <th>Mask</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>0</td><td><code>0x01</code></td><td>Left</td></tr>
            <tr><td>1</td><td><code>0x02</code></td><td>Right</td></tr>
            <tr><td>2</td><td><code>0x04</code></td><td>Middle</td></tr>
            <tr><td>3</td><td><code>0x08</code></td><td>Side 1 (ms1)</td></tr>
            <tr><td>4</td><td><code>0x10</code></td><td>Side 2 (ms2)</td></tr>
          </tbody>
        </table>
        <p>
          <code>0x00</code> = all buttons released.
        </p>
      </Card>

      <Card>
        <CardHeader title="Parsing" subtitle="Detecting events in the byte stream" />
        <p>
          The device prefixes each event with the literal string <code>km.</code> (<code>6B 6D 2E</code>),
          followed by the raw mask byte. Match this 3-byte prefix, then read the next byte
          unconditionally as the mask.
        </p>
        <div class="callout callout--danger">
          <p>
            Do <strong>not</strong> detect events by watching for bare bytes below 32.
            Certain button combinations produce mask values that collide with control characters:
          </p>
        </div>
        <table class="api-params">
          <thead>
            <tr>
              <th>Combination</th>
              <th>Mask</th>
              <th>Problem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Right + Side 1</td>
              <td><code>0x0A</code></td>
              <td>Equals <code>\n</code>. Dropped by line-based parsers.</td>
            </tr>
            <tr>
              <td>Left + Middle + Side 1</td>
              <td><code>0x0D</code></td>
              <td>Equals <code>\r</code>. Dropped by line-based parsers.</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default Stream;

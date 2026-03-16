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
          button state changes. This allows software to react to physical button presses
          and releases in real time without polling.
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
            The button stream should not be auto-enabled on connect. Only enable it when
            button events are explicitly needed.
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader title="Button Bitmask" subtitle="Event byte format" />
        <p>
          Each event is a single byte representing the <strong>complete current state</strong> of
          all buttons. It is a snapshot, not a delta. Compare against the previous value to
          detect individual button transitions.
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
          A value of <code>0x00</code> means all buttons are released. The mask byte is
          always less than 32, so it will never contain printable ASCII characters.
        </p>
      </Card>

      <Card>
        <CardHeader title="Parsing" subtitle="Detecting events in the byte stream" />
        <p>
          Stream bytes arrive interleaved with normal command responses on the same serial
          connection. The device prefixes each event with the literal string <code>km.</code>,
          followed by the raw mask byte.
        </p>
        <p>
          To detect events: match the 3-byte sequence <code>km.</code> (<code>6B 6D 2E</code>),
          then read the very next byte as the button mask value unconditionally.
        </p>
        <div class="callout callout--danger">
          <p>
            Do <strong>not</strong> detect events by watching for bare bytes below 32.
            Certain button combinations produce mask values that collide with control
            characters:
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
              <td>Equals <code>\n</code>. Dropped by naive line-based parsers.</td>
            </tr>
            <tr>
              <td>Left + Middle + Side 1</td>
              <td><code>0x0D</code></td>
              <td>Equals <code>\r</code>. Dropped by naive line-based parsers.</td>
            </tr>
          </tbody>
        </table>
        <p>
          The <code>km.</code> prefix approach avoids this entirely. After matching the
          prefix, the next byte is always the mask regardless of its value.
        </p>
      </Card>
    </>
  );
};

export default Stream;

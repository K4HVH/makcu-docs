import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const TypesAndErrors: Component = () => {
  return (
    <>
      <div id="types-overview" data-search-target>
        <Card>
          <CardHeader title="Types and Errors" subtitle="Complete type reference and error handling" />
          <p>
            All public types are re-exported from the crate root. Import them
            with <code>use makcu::TypeName</code>.
          </p>
        </Card>
      </div>

      <div id="core-types" data-search-target>
        <Card>
          <CardHeader title="Core Types" subtitle="Primary API types" />
          <table class="api-params">
            <thead>
              <tr>
                <th>Type</th>
                <th>Kind</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Device</code></td>
                <td>struct</td>
                <td>Main sync API. <code>Send + Sync</code>. See <A href="/library/connection#connecting">Connection</A>.</td>
              </tr>
              <tr>
                <td><code>AsyncDevice</code></td>
                <td>struct</td>
                <td>Async API. Requires <A href="/library/features/async"><code>async</code></A> feature.</td>
              </tr>
              <tr>
                <td><code>DeviceConfig</code></td>
                <td>struct</td>
                <td><A href="/library/connection#device-config">Connection configuration</A>.</td>
              </tr>
              <tr>
                <td><code>DeviceInfo</code></td>
                <td>struct</td>
                <td>Combined port + firmware info. Implements <code>Display</code>. See <A href="/library/info#device-info">Device Info</A>.</td>
              </tr>
              <tr>
                <td><code>FireAndForget&lt;'d&gt;</code></td>
                <td>struct</td>
                <td><A href="/library/fire-and-forget">Fire-and-forget</A> wrapper. Borrows <code>Device</code>.</td>
              </tr>
              <tr>
                <td><code>AsyncFireAndForget&lt;'d&gt;</code></td>
                <td>struct</td>
                <td>Async <A href="/library/fire-and-forget">fire-and-forget</A> wrapper. Requires <A href="/library/features/async"><code>async</code></A>.</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div id="enums" data-search-target>
        <Card>
          <CardHeader title="Enums" subtitle="Enumerated types" />

          <div class="api-response-label">Button</div>
          <pre class="api-signature">{`pub enum Button { Left, Right, Middle, Side1, Side2 }`}</pre>
          <p>Identifies a mouse button for <A href="/library/buttons">press, release, and query</A> operations.</p>

          <div class="api-response-label">LockTarget</div>
          <pre class="api-signature">{`pub enum LockTarget { X, Y, Left, Right, Middle, Side1, Side2 }`}</pre>
          <p>Identifies a mouse input (axis or button) for <A href="/library/locks">lock operations</A>.</p>

          <div class="api-response-label">ConnectionState</div>
          <pre class="api-signature">{`pub enum ConnectionState { Disconnected, Connecting, Connected }`}</pre>
          <p>Observable connection states emitted by <A href="/library/connection#connection-events"><code>connection_events()</code></A>.</p>
        </Card>
      </div>

      <div id="data-structs" data-search-target>
        <Card>
          <CardHeader title="Data Structs" subtitle="Value types returned by queries" />

          <div class="api-response-label"><A href="/library/stream#button-mask">ButtonMask</A></div>
          <table class="api-params">
            <thead>
              <tr>
                <th>Method</th>
                <th>Returns</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>left()</code></td><td><code>bool</code></td><td>Left button state (bit 0).</td></tr>
              <tr><td><code>right()</code></td><td><code>bool</code></td><td>Right button state (bit 1).</td></tr>
              <tr><td><code>middle()</code></td><td><code>bool</code></td><td>Middle button state (bit 2).</td></tr>
              <tr><td><code>side1()</code></td><td><code>bool</code></td><td>Side 1 state (bit 3).</td></tr>
              <tr><td><code>side2()</code></td><td><code>bool</code></td><td>Side 2 state (bit 4).</td></tr>
              <tr><td><code>is_pressed(button)</code></td><td><code>bool</code></td><td>Query by <A href="/library/types#enums"><code>Button</code></A> variant.</td></tr>
              <tr><td><code>raw()</code></td><td><code>u8</code></td><td>Raw bitmask byte.</td></tr>
            </tbody>
          </table>

          <div class="api-response-label"><A href="/library/locks#lock-states-all">LockStates</A></div>
          <table class="api-params">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>x</code></td><td><code>bool</code></td><td>Horizontal movement lock.</td></tr>
              <tr><td><code>y</code></td><td><code>bool</code></td><td>Vertical movement lock.</td></tr>
              <tr><td><code>left</code></td><td><code>bool</code></td><td>Left button lock.</td></tr>
              <tr><td><code>right</code></td><td><code>bool</code></td><td>Right button lock.</td></tr>
              <tr><td><code>middle</code></td><td><code>bool</code></td><td>Middle button lock.</td></tr>
              <tr><td><code>side1</code></td><td><code>bool</code></td><td>Side 1 lock.</td></tr>
              <tr><td><code>side2</code></td><td><code>bool</code></td><td>Side 2 lock.</td></tr>
            </tbody>
          </table>

          <div class="api-response-label"><A href="/library/info#device-info">DeviceInfo</A></div>
          <table class="api-params">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>port</code></td><td><code>String</code></td><td>Serial port name.</td></tr>
              <tr><td><code>firmware</code></td><td><code>String</code></td><td>Firmware version string.</td></tr>
            </tbody>
          </table>
          <p>
            Implements <code>Display</code> as <code>{'"port (firmware: version)"'}</code>.
          </p>
        </Card>
      </div>

      <div id="feature-types" data-search-target>
        <Card>
          <CardHeader title="Feature-Gated Types" subtitle="Types available with optional features" />
          <table class="api-params">
            <thead>
              <tr>
                <th>Type</th>
                <th>Feature</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>BatchBuilder&lt;'d&gt;</code></td>
                <td><A href="/library/features/batch"><code>batch</code></A></td>
                <td>Fluent sync <A href="/library/features/batch">batch command builder</A>.</td>
              </tr>
              <tr>
                <td><code>AsyncBatchBuilder&lt;'d&gt;</code></td>
                <td><A href="/library/features/batch"><code>batch</code></A> + <A href="/library/features/async"><code>async</code></A></td>
                <td>Fluent <A href="/library/features/async#async-batch">async batch command builder</A>.</td>
              </tr>
              <tr>
                <td><code>EventHandle</code></td>
                <td><A href="/library/features/extras"><code>extras</code></A></td>
                <td>Handle to a registered <A href="/library/features/extras#event-callbacks">event callback</A>. Unregisters on drop.</td>
              </tr>
              <tr>
                <td><code>MockTransport</code></td>
                <td><A href="/library/features/mock"><code>mock</code></A></td>
                <td>In-process <A href="/library/features/mock">mock transport</A> for testing.</td>
              </tr>
              <tr>
                <td><code>CommandStat</code></td>
                <td><A href="/library/features/profile"><code>profile</code></A></td>
                <td>Per-command <A href="/library/features/profile#command-stat">timing statistics</A>.</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div id="error-handling" data-search-target>
        <Card>
          <CardHeader title="Error Handling" subtitle="MakcuError and Result" />
          <pre class="api-signature">{`pub type Result<T> = std::result::Result<T, MakcuError>`}</pre>
          <p>
            All fallible methods return <code>makcu::Result&lt;T&gt;</code>. The error
            type is <code>MakcuError</code>.
          </p>
        </Card>
      </div>

      <div id="error-variants" data-search-target>
        <Card>
          <CardHeader title="MakcuError" subtitle="Error variants" />
          <pre class="api-signature">{`pub enum MakcuError`}</pre>
          <table class="api-params">
            <thead>
              <tr>
                <th>Variant</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>NotConnected</code></td>
                <td>No active device connection.</td>
              </tr>
              <tr>
                <td><code>Port(serialport::Error)</code></td>
                <td>Serial port error from the underlying driver.</td>
              </tr>
              <tr>
                <td><code>Io(io::Error)</code></td>
                <td>Standard I/O error.</td>
              </tr>
              <tr>
                <td><code>Timeout</code></td>
                <td>Command response timed out. Controlled by <A href="/library/connection#device-config"><code>command_timeout</code></A>.</td>
              </tr>
              <tr>
                <td><code>NotFound</code></td>
                <td>No MAKCU device found during <A href="/library/connection#connecting">auto-detection</A>.</td>
              </tr>
              <tr>
                <td><code>Disconnected</code></td>
                <td>Device disconnected during an operation. See <A href="/library/connection#reconnection">reconnection</A>.</td>
              </tr>
              <tr>
                <td><code>Protocol(String)</code></td>
                <td>Protocol parsing or formatting error.</td>
              </tr>
              <tr>
                <td><code>OutOfRange {'{ value, min, max }'}</code></td>
                <td>Parameter outside the valid range.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::MakcuError;

match device.move_xy(99999, 0) {
    Err(MakcuError::OutOfRange { value, min, max }) => {
        println!("{} not in {}..={}", value, min, max);
    }
    Err(MakcuError::NotConnected) => {
        println!("Device disconnected");
    }
    Err(e) => println!("Error: {}", e),
    Ok(()) => {}
}`}</code></pre>
        </Card>
      </div>

    </>
  );
};

export default TypesAndErrors;

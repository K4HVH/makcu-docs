import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Mock: Component = () => {
  return (
    <>
      <div id="testing-overview" data-search-target>
        <Card>
          <CardHeader title="Testing" subtitle="Mock transport for hardware-free testing" />
          <p>
            The <code>mock</code> feature provides an in-process mock transport that
            simulates device responses without requiring physical hardware. Use it for
            unit tests, CI pipelines, and development.
          </p>
          <pre><code>cargo add makcu --features mock</code></pre>
        </Card>
      </div>

      <div id="mock-device" data-search-target>
        <Card>
          <CardHeader title="Creating a Mock Device" subtitle="Device::mock() constructor" />
          <pre class="api-signature">{`fn Device::mock() -> (Device, Arc<MockTransport>)`}</pre>
          <p>
            Returns a <A href="/library/types#core-types"><code>Device</code></A> backed by a mock transport and
            an <code>Arc&lt;</code><A href="/library/types#feature-types"><code>MockTransport</code></A><code>&gt;</code> for controlling responses and inspecting
            sent commands.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::{Device, MockTransport};

let (device, mock) = Device::mock();`}</code></pre>
          <p>
            The mock device behaves identically to a real device from the caller's
            perspective. All methods work, including <A href="/library/fire-and-forget">fire-and-forget</A>, <A href="/library/features/batch">batch</A>, and <A href="/library/features/extras">extras</A>.
          </p>
          <div class="callout callout--info">
            <p>
              With the <A href="/library/features/async"><code>async</code></A> feature, <code>AsyncDevice::mock()</code> is also
              available and returns an <code>(AsyncDevice, Arc&lt;MockTransport&gt;)</code>.
            </p>
          </div>
        </Card>
      </div>

      <div id="mock-responses" data-search-target>
        <Card>
          <CardHeader title="Registering Responses" subtitle="Define what the mock returns" />
          <pre class="api-signature">{`fn on_command(&self, cmd_bytes: &[u8], response_bytes: &[u8])`}</pre>
          <p>
            Registers a response for a specific command. When the device sends a command
            matching <code>cmd_bytes</code>, the mock replies with <code>response_bytes</code>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`// Register version response
mock.on_command(
    b"km.version()\\r\\n",
    b"km.MAKCU v3.7",
);

let version = device.version()?;
assert_eq!(version, "MAKCU v3.7");`}</code></pre>
        </Card>
      </div>

      <div id="mock-events" data-search-target>
        <Card>
          <CardHeader title="Injecting Events" subtitle="Simulate button state changes" />
          <pre class="api-signature">{`fn inject_button_event(&self, mask: ButtonMask)`}</pre>
          <p>See <A href="/library/stream#button-mask"><code>ButtonMask</code></A> for the bitmask type.</p>
          <p>
            Injects a button event into the stream as if the device had sent it.
            Subscribers to <A href="/library/stream#button-events"><code>button_events()</code></A> and <A href="/library/features/extras#event-callbacks">event callbacks</A> will
            receive it.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::ButtonMask;

let rx = device.button_events();
mock.inject_button_event(ButtonMask::from_raw(0x01));  // left pressed

let event = rx.recv()?;
assert!(event.left());`}</code></pre>
        </Card>
      </div>

      <div id="mock-inspection" data-search-target>
        <Card>
          <CardHeader title="Inspecting Commands" subtitle="Verify what was sent" />
          <table class="api-params">
            <thead>
              <tr>
                <th>Method</th>
                <th>Returns</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>sent_commands()</code></td>
                <td><code>Vec&lt;Vec&lt;u8&gt;&gt;</code></td>
                <td>All commands sent to the mock since creation or last clear.</td>
              </tr>
              <tr>
                <td><code>clear_sent()</code></td>
                <td><code>()</code></td>
                <td>Clear the sent commands history.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`device.move_xy(100, 50)?;

let sent = mock.sent_commands();
assert_eq!(sent.len(), 1);
assert_eq!(sent[0], b"km.move(100,50)\\r\\n");

mock.clear_sent();
assert!(mock.sent_commands().is_empty());`}</code></pre>
        </Card>
      </div>

      <div id="mock-test-example" data-search-target>
        <Card>
          <CardHeader title="Full Test Example" subtitle="Complete unit test pattern" />
          <pre><code>{`#[test]
fn test_button_sequence() -> makcu::Result<()> {
    let (device, mock) = Device::mock();

    // Register query response
    mock.on_command(
        b"km.left()\\r\\n",
        b"km.left()\\r\\n0\\r\\n>>> ",
    );

    // Verify initial state
    assert!(!device.button_state(Button::Left)?);

    // Send press command (fire-and-forget, no response needed)
    device.ff().button_down(Button::Left)?;

    // Verify the command was sent
    let sent = mock.sent_commands();
    assert!(sent.iter().any(|c| c == b"km.left(1)\\r\\n"));

    Ok(())
}`}</code></pre>
        </Card>
      </div>
    </>
  );
};

export default Mock;

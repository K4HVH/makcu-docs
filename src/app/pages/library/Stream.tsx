import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Stream: Component = () => {
  return (
    <>
      <div id="stream-overview" data-search-target>
        <Card>
          <CardHeader title="Button Stream" subtitle="Real-time button state change events" />
          <p>
            The button stream provides asynchronous notification of physical button state
            changes. When enabled, the device sends a bitmask byte on every button press
            or release. The library parses these into <A href="/library/types#data-structs"><code>ButtonMask</code></A> values and
            delivers them through a channel. See the <A href="/native/commands/stream">native button stream</A> documentation
            for details on the underlying firmware protocol.
          </p>
        </Card>
      </div>

      <div id="stream-enable" data-search-target>
        <Card>
          <CardHeader title="Enable / Disable" subtitle="Control the button event stream" />
          <table class="api-params">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>enable_button_stream()</code></td>
                <td>Enable the button event stream on the device.</td>
              </tr>
              <tr>
                <td><code>disable_button_stream()</code></td>
                <td>Disable the button event stream.</td>
              </tr>
              <tr>
                <td><code>button_stream_state()</code></td>
                <td>Query whether the stream is currently enabled. Returns <code>Result&lt;bool&gt;</code>.</td>
              </tr>
            </tbody>
          </table>
          <pre><code>{`device.enable_button_stream()?;
// ... receive events ...
device.disable_button_stream()?;`}</code></pre>
        </Card>
      </div>

      <div id="button-events" data-search-target>
        <Card>
          <CardHeader title="button_events" subtitle="Subscribe to button state changes" />
          <pre class="api-signature">{`fn button_events(&self) -> crossbeam_channel::Receiver<ButtonMask>`}</pre>
          <p>
            Returns a channel receiver that emits a <A href="/library/types#data-structs"><code>ButtonMask</code></A> on every button
            state change. The stream must be enabled first
            via <code>enable_button_stream()</code>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::ButtonMask;

device.enable_button_stream()?;
let rx = device.button_events();

std::thread::spawn(move || {
    while let Ok(mask) = rx.recv() {
        if mask.left() {
            println!("Left button pressed");
        }
    }
});`}</code></pre>
          <div class="callout callout--info">
            <p>
              Multiple subscribers can be created by calling <code>button_events()</code>
              multiple times. Each receiver gets its own copy of every event.
              For a callback-based interface, see the <A href="/library/features/extras#event-callbacks"><code>extras</code> event callbacks</A>.
              For per-button physical press/release events,
              see <A href="/library/catch">Button Capture</A>.
            </p>
          </div>
        </Card>
      </div>

      <div id="button-mask" data-search-target>
        <Card>
          <CardHeader title="ButtonMask" subtitle="Button state snapshot" />
          <pre class="api-signature">{`pub struct ButtonMask`}</pre>
          <p>
            Represents the state of all five buttons at a point in time. Each method
            returns <code>true</code> if the corresponding button is pressed.
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Method</th>
                <th>Returns</th>
                <th>Bit</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>left()</code></td><td><code>bool</code></td><td>0</td></tr>
              <tr><td><code>right()</code></td><td><code>bool</code></td><td>1</td></tr>
              <tr><td><code>middle()</code></td><td><code>bool</code></td><td>2</td></tr>
              <tr><td><code>side1()</code></td><td><code>bool</code></td><td>3</td></tr>
              <tr><td><code>side2()</code></td><td><code>bool</code></td><td>4</td></tr>
              <tr><td><code>is_pressed(</code><A href="/library/types#enums"><code>button</code></A><code>)</code></td><td><code>bool</code></td><td>--</td></tr>
              <tr><td><code>raw()</code></td><td><code>u8</code></td><td>--</td></tr>
            </tbody>
          </table>
          <p>
            The <code>raw()</code> method returns the underlying bitmask byte. Bit 0 is left,
            bit 4 is side2. See the <A href="/native/commands/stream#button-bitmask">native bitmask format</A> for
            the bit layout.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`let mask: ButtonMask = rx.recv()?;

// Named accessors
if mask.left() && mask.right() {
    println!("Both left and right pressed");
}

// Generic accessor
if mask.is_pressed(Button::Middle) {
    println!("Middle pressed");
}

// Raw bitmask
println!("Raw: 0x{:02X}", mask.raw());`}</code></pre>
        </Card>
      </div>
    </>
  );
};

export default Stream;

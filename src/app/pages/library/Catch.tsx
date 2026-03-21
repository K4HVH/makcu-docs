import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Catch: Component = () => {
  return (
    <>
      <div id="catch-overview" data-search-target>
        <Card>
          <CardHeader title="Button Capture" subtitle="Per-button physical press/release event stream" />
          <p>
            Button capture provides a per-button event stream that reports physical press and
            release events. Unlike the <A href="/library/stream">button stream</A> which reports a
            bitmask for all buttons, catch reports events for a single button at a time. The
            button must be <A href="/library/locks#set-lock">locked</A> before enabling catch.
            Maps to the firmware's <A href="/native/commands/catch">km.catch_m*()</A> commands.
          </p>
          <div class="callout callout--danger">
            <p>
              The target button <strong>must
              be <A href="/library/locks#set-lock">locked</A> first</strong>.
              Catch produces no events without an active lock. Unlocking the button is the
              only way to stop the catch stream.
            </p>
          </div>
        </Card>
      </div>

      <div id="enable-catch" data-search-target>
        <Card>
          <CardHeader title="enable_catch" subtitle="Enable the catch stream for a button" />
          <pre class="api-signature">{`fn enable_catch(&self, button: Button) -> Result<()>`}</pre>
          <p>
            Enables the catch stream for the specified button. The button must already
            be locked via <A href="/library/locks#set-lock"><code>set_lock()</code></A>. Calling
            this multiple times is idempotent.
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>button</code></td>
                <td><A href="/library/types#enums"><code>Button</code></A></td>
                <td>Which button to capture events for.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::{Button, LockTarget};

// Lock first, then enable catch
device.set_lock(LockTarget::Left, true)?;
device.enable_catch(Button::Left)?;

// ... receive events ...

// Unlock to stop the catch stream
device.set_lock(LockTarget::Left, false)?;`}</code></pre>
          <div class="callout callout--warning">
            <p>
              There is no explicit catch disable command. Unlocking the button is the only
              way to stop the stream. You cannot keep a button locked while disabling its
              catch stream.
            </p>
          </div>
        </Card>
      </div>

      <div id="catch-events" data-search-target>
        <Card>
          <CardHeader title="catch_events" subtitle="Subscribe to catch press/release events" />
          <pre class="api-signature">{`fn catch_events(&self) -> mpsc::Receiver<CatchEvent>`}</pre>
          <p>
            Returns a channel receiver that emits
            a <A href="/library/types#data-structs"><code>CatchEvent</code></A> on every physical
            press or release of a button with catch enabled. The button must be locked and
            catch must be enabled first.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::{Button, CatchEvent, LockTarget};

device.set_lock(LockTarget::Left, true)?;
device.enable_catch(Button::Left)?;
let rx = device.catch_events();

std::thread::spawn(move || {
    while let Ok(event) = rx.recv() {
        match (event.button, event.pressed) {
            (Button::Left, true) => println!("Left pressed"),
            (Button::Left, false) => println!("Left released"),
            _ => {}
        }
    }
});`}</code></pre>
          <div class="callout callout--info">
            <p>
              Multiple subscribers can be created by calling <code>catch_events()</code>
              multiple times. Each receiver gets its own copy of every event.
              For a callback-based interface, see
              the <A href="/library/features/extras#catch-callbacks"><code>extras</code> catch callbacks</A>.
            </p>
          </div>
        </Card>
      </div>

      <div id="catch-event-type" data-search-target>
        <Card>
          <CardHeader title="CatchEvent" subtitle="Per-button press/release event" />
          <pre class="api-signature">{`pub struct CatchEvent`}</pre>
          <p>
            Represents a single physical press or release of a captured button.
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>button</code></td>
                <td><A href="/library/types#enums"><code>Button</code></A></td>
                <td>Which button produced this event.</td>
              </tr>
              <tr>
                <td><code>pressed</code></td>
                <td><code>bool</code></td>
                <td><code>true</code> for press, <code>false</code> for release.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`let event: CatchEvent = rx.recv()?;
if event.pressed {
    println!("{:?} pressed", event.button);
} else {
    println!("{:?} released", event.button);
}`}</code></pre>
        </Card>
      </div>

      <div id="catch-vs-stream" data-search-target>
        <Card>
          <CardHeader title="Catch vs Button Stream" subtitle="When to use which" />
          <table class="api-params">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Button Stream</th>
                <th>Catch</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Event type</td>
                <td><A href="/library/stream#button-mask"><code>ButtonMask</code></A> (all buttons)</td>
                <td><A href="#catch-event-type"><code>CatchEvent</code></A> (single button)</td>
              </tr>
              <tr>
                <td>Requires lock</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Reports</td>
                <td>Combined state bitmask</td>
                <td>Individual press/release</td>
              </tr>
              <tr>
                <td>Blocks input</td>
                <td>No</td>
                <td>Yes (button is locked)</td>
              </tr>
            </tbody>
          </table>
          <p>
            Both can be active simultaneously without interference. Use the button stream for
            monitoring all buttons at once, and catch for tracking individual button
            press/release events on locked buttons.
          </p>
        </Card>
      </div>
    </>
  );
};

export default Catch;

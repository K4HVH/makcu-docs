import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const FireAndForget: Component = () => {
  return (
    <>
      <div id="ff-overview" data-search-target>
        <Card>
          <CardHeader title="Fire and Forget" subtitle="Send commands without waiting for responses" />
          <p>
            By default, every command waits for the device to respond with
            the <code>{'>>>'}</code> prompt before returning. Fire-and-forget mode skips this
            wait -- the command is written to the transport and the method returns immediately.
          </p>
          <p>
            This is useful for high-frequency operations like continuous mouse movement where
            latency matters more than confirmation.
          </p>
          <div class="callout callout--warning">
            <p>
              Fire-and-forget commands cannot return values. Methods
              like <A href="/library/buttons#button-state"><code>button_state()</code></A>, <A href="/library/locks#lock-state"><code>lock_state()</code></A>,
              and <A href="/library/info#version"><code>version()</code></A> are not available on
              the <A href="/library/types#core-types"><code>FireAndForget</code></A> wrapper.
            </p>
          </div>
        </Card>
      </div>

      <div id="ff-wrapper" data-search-target>
        <Card>
          <CardHeader title="ff()" subtitle="Get the fire-and-forget wrapper" />
          <pre class="api-signature">{`fn ff(&self) -> FireAndForget<'_>`}</pre>
          <p>
            Returns a <code>FireAndForget</code> wrapper that provides the same command
            methods but without waiting for responses. The wrapper borrows
            the <code>Device</code>, so it cannot outlive it.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`// Single fire-and-forget command
device.ff().move_xy(10, 0)?;

// Multiple commands in sequence
let ff = device.ff();
ff.move_xy(100, 0)?;
ff.move_xy(0, 100)?;
ff.wheel(3)?;`}</code></pre>
        </Card>
      </div>

      <div id="ff-methods" data-search-target>
        <Card>
          <CardHeader title="Available Methods" subtitle="Commands available in fire-and-forget mode" />
          <table class="api-params">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>move_xy(x, y)</code></td><td><A href="/library/movement#move-xy">Relative cursor movement</A>.</td></tr>
              <tr><td><code>silent_move(x, y)</code></td><td><A href="/library/movement#silent-move">Atomic drag operation</A>.</td></tr>
              <tr><td><code>wheel(delta)</code></td><td><A href="/library/movement#wheel">Scroll wheel input</A>.</td></tr>
              <tr><td><code>button_down(button)</code></td><td><A href="/library/buttons#button-down">Press a button</A>.</td></tr>
              <tr><td><code>button_up(button)</code></td><td><A href="/library/buttons#button-up">Soft release a button</A>.</td></tr>
              <tr><td><code>button_up_force(button)</code></td><td><A href="/library/buttons#button-up-force">Force release a button</A>.</td></tr>
              <tr><td><code>set_lock(target, locked)</code></td><td><A href="/library/locks#set-lock">Set an input lock</A>.</td></tr>
              <tr><td><code>enable_button_stream()</code></td><td><A href="/library/stream#stream-enable">Enable button event stream</A>.</td></tr>
              <tr><td><code>disable_button_stream()</code></td><td><A href="/library/stream#stream-enable">Disable button event stream</A>.</td></tr>
              <tr><td><code>enable_catch(button)</code></td><td><A href="/library/catch#enable-catch">Enable catch stream</A> for a button.</td></tr>
              <tr><td><code>send_raw(cmd)</code></td><td>Send raw command bytes.</td></tr>
            </tbody>
          </table>
          <p>
            All methods return <code>Result&lt;()&gt;</code>. Errors only occur if the
            command fails validation (e.g. out-of-range parameters) or the transport channel
            is closed.
          </p>
        </Card>
      </div>

      <div id="ff-global" data-search-target>
        <Card>
          <CardHeader title="Global Fire-and-Forget" subtitle="Default all commands to fire-and-forget" />
          <p>
            Set <code>fire_and_forget: true</code> in <A href="/library/connection#device-config"><code>DeviceConfig</code></A> to make all
            commands fire-and-forget by default. Query methods
            (<code>button_state</code>, <code>version</code>, etc.) still wait for responses.
          </p>
          <pre><code>{`use makcu::{Device, DeviceConfig};

let config = DeviceConfig {
    fire_and_forget: true,
    ..Default::default()
};
let device = Device::with_config(config)?;

// These are now fire-and-forget automatically
device.move_xy(100, 0)?;
device.button_down(Button::Left)?;

// This still waits for a response (it needs the return value)
let version = device.version()?;`}</code></pre>
        </Card>
      </div>

      <div id="ff-raw" data-search-target>
        <Card>
          <CardHeader title="Raw Commands" subtitle="Send arbitrary command bytes" />
          <pre class="api-signature">{`fn send_raw(&self, cmd: &[u8]) -> Result<Vec<u8>>`}</pre>
          <p>
            Sends raw bytes to the device and returns the raw response. The command
            must include the <code>\r\n</code> terminator. Available on
            both <code>Device</code> (returns response) and <code>FireAndForget</code> (no
            response).
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`// Confirmed (waits for response)
let response = device.send_raw(b"km.version()\\r\\n")?;

// Fire-and-forget
device.ff().send_raw(b"km.left(1)\\r\\n")?;`}</code></pre>
        </Card>
      </div>
    </>
  );
};

export default FireAndForget;

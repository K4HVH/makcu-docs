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
          <p>
            <code>FireAndForget</code> is an RAII guard that derefs
            to <A href="/library/types#core-types"><code>Device</code></A>. Every method on <code>Device</code> is
            available through the guard -- including <A href="/library/features/extras">extras</A> methods
            like <A href="/library/features/extras#click"><code>click()</code></A> and <A href="/library/features/extras#move-smooth"><code>move_smooth()</code></A>.
          </p>
          <div class="callout callout--info">
            <p>
              Query methods (<A href="/library/buttons#button-state"><code>button_state()</code></A>, <A href="/library/locks#lock-state"><code>lock_state()</code></A>, <A href="/library/info#version"><code>version()</code></A>, etc.)
              always wait for a response regardless of fire-and-forget mode, since they must
              return a value. Both <code>ff()</code> and <code>DeviceConfig</code> fire-and-forget
              behave identically in this regard.
            </p>
          </div>
        </Card>
      </div>

      <div id="ff-wrapper" data-search-target>
        <Card>
          <CardHeader title="ff()" subtitle="Get the fire-and-forget guard" />
          <pre class="api-signature">{`fn ff(&self) -> FireAndForget<'_>`}</pre>
          <p>
            Returns a <code>FireAndForget</code> guard that derefs to <code>Device</code>. While
            the guard is alive, all write commands sent on the current thread skip waiting for
            responses. The guard borrows the <code>Device</code>, so it cannot outlive it.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`// Single fire-and-forget command
device.ff().move_xy(10, 0)?;

// Multiple commands in sequence
let ff = device.ff();
ff.move_xy(100, 0)?;
ff.move_xy(0, 100)?;
ff.wheel(3)?;

// Extras work too
ff.click(Button::Left, Duration::from_millis(50))?;
ff.move_smooth(200, 0, 20, Duration::from_millis(5))?;`}</code></pre>
        </Card>
      </div>

      <div id="ff-methods" data-search-target>
        <Card>
          <CardHeader title="How It Works" subtitle="Thread-local RAII guard" />
          <p>
            The guard sets a thread-local flag when created and clears it on drop. All
            device methods check this flag -- if set, write commands skip waiting for the
            device response. This means:
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Behaviour</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>All <code>Device</code> methods available</td>
                <td>Including <A href="/library/features/extras">extras</A> and <A href="/library/catch">catch</A> -- via <code>Deref&lt;Target=Device&gt;</code>.</td>
              </tr>
              <tr>
                <td>Thread-safe</td>
                <td>The flag is thread-local. Other threads sharing the same <code>Device</code> are unaffected.</td>
              </tr>
              <tr>
                <td>Queries always confirm</td>
                <td>Methods that return values (<code>version()</code>, <code>button_state()</code>, etc.) always wait for a response.</td>
              </tr>
              <tr>
                <td>Nestable</td>
                <td>Extras methods that internally call <code>button_down()</code>, <code>move_xy()</code>, etc. all inherit fire-and-forget from the guard.</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div id="ff-global" data-search-target>
        <Card>
          <CardHeader title="Global Fire-and-Forget" subtitle="Default all commands to fire-and-forget" />
          <p>
            Set <code>fire_and_forget: true</code> in <A href="/library/connection#device-config"><code>DeviceConfig</code></A> to make all
            commands fire-and-forget by default. This is equivalent to wrapping every call
            in <code>ff()</code>. Query methods still wait for responses.
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
          <CardHeader title="Raw Commands in FF Mode" subtitle="send_raw with fire-and-forget" />
          <p>
            <A href="/library/connection#send-raw"><code>send_raw()</code></A> respects fire-and-forget
            mode. When active, the command is sent without waiting and an
            empty <code>Vec</code> is returned.
          </p>
          <pre><code>{`device.ff().send_raw(b"km.left(1)\\r\\n")?;  // returns immediately`}</code></pre>
        </Card>
      </div>
    </>
  );
};

export default FireAndForget;

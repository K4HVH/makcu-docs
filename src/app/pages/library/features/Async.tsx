import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Async: Component = () => {
  return (
    <>
      <div id="async-overview" data-search-target>
        <Card>
          <CardHeader title="Async API" subtitle="Full async parity with Tokio" />
          <p>
            The <code>async</code> feature provides <A href="/library/types#core-types"><code>AsyncDevice</code></A>, an async
            equivalent of <A href="/library/types#core-types"><code>Device</code></A> with identical functionality. All command
            methods are <code>async fn</code> and require a Tokio runtime.
          </p>
          <pre><code>cargo add makcu --features async</code></pre>
        </Card>
      </div>

      <div id="async-connecting" data-search-target>
        <Card>
          <CardHeader title="Connecting" subtitle="Async connection methods" />
          <table class="api-params">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>AsyncDevice::connect().await</code></td>
                <td>Auto-detect and connect.</td>
              </tr>
              <tr>
                <td><code>AsyncDevice::connect_port(port).await</code></td>
                <td>Connect to a specific port.</td>
              </tr>
              <tr>
                <td><code>AsyncDevice::with_config(config).await</code></td>
                <td>Connect with custom configuration.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::AsyncDevice;

#[tokio::main]
async fn main() -> makcu::Result<()> {
    let device = AsyncDevice::connect().await?;
    device.move_xy(100, 0).await?;
    Ok(())
}`}</code></pre>
        </Card>
      </div>

      <div id="async-methods" data-search-target>
        <Card>
          <CardHeader title="Async Methods" subtitle="All device methods have async equivalents" />
          <p>
            Every method on <code>Device</code> has an <code>async</code> counterpart
            on <code>AsyncDevice</code>. The signatures are identical except for
            the <code>async</code> qualifier.
          </p>
          <div class="api-response-label"><A href="/library/movement">Movement</A></div>
          <pre><code>{`device.move_xy(100, 0).await?;
device.silent_move(200, 0).await?;
device.wheel(3).await?;`}</code></pre>
          <div class="api-response-label"><A href="/library/buttons">Buttons</A></div>
          <pre><code>{`device.button_down(Button::Left).await?;
device.button_up(Button::Left).await?;
let pressed = device.button_state(Button::Left).await?;`}</code></pre>
          <div class="api-response-label"><A href="/library/locks">Locks</A></div>
          <pre><code>{`device.set_lock(LockTarget::X, true).await?;
let locked = device.lock_state(LockTarget::X).await?;
let all = device.lock_states_all().await?;`}</code></pre>
          <div class="api-response-label"><A href="/library/info">Device Info</A></div>
          <pre><code>{`let version = device.version().await?;
let info = device.device_info().await?;
let serial = device.serial().await?;`}</code></pre>
          <div class="api-response-label"><A href="/library/stream">Button Stream</A></div>
          <pre><code>{`device.enable_button_stream().await?;
let rx = device.button_events();  // sync -- returns channel`}</code></pre>
          <div class="api-response-label"><A href="/library/catch">Button Capture</A></div>
          <pre><code>{`device.enable_catch(Button::Left).await?;
let rx = device.catch_events();  // sync -- returns channel`}</code></pre>
        </Card>
      </div>

      <div id="async-ff" data-search-target>
        <Card>
          <CardHeader title="AsyncFireAndForget" subtitle="Async fire-and-forget guard" />
          <pre class="api-signature">{`fn ff(&self) -> AsyncFireAndForget<'_>`}</pre>
          <p>
            Works identically to the sync <A href="/library/fire-and-forget"><code>FireAndForget</code></A> guard.
            Derefs to <code>AsyncDevice</code>, so all methods are available. Write commands
            skip waiting for responses while the guard is alive. Methods are still async
            and must be <code>.await</code>ed -- the <code>.await</code> returns immediately
            after the command is queued.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`let ff = device.ff();
ff.move_xy(10, 0).await?;
ff.button_down(Button::Left).await?;
ff.click(Button::Left, Duration::from_millis(50)).await?;`}</code></pre>
        </Card>
      </div>

      <div id="async-batch" data-search-target>
        <Card>
          <CardHeader title="AsyncBatchBuilder" subtitle="Async batch command sequences" />
          <p>
            Requires both <code>async</code> and <A href="/library/features/batch"><code>batch</code></A> features. The builder
            methods are synchronous (they just queue commands), but <code>execute()</code> is
            async.
          </p>
          <pre><code>{`device.batch()
    .button_down(Button::Left)
    .move_xy(100, 0)
    .button_up(Button::Left)
    .execute()
    .await?;`}</code></pre>
        </Card>
      </div>

      <div id="async-extras" data-search-target>
        <Card>
          <CardHeader title="Async Extras" subtitle="Async versions of extras operations" />
          <p>
            With both <code>async</code> and <A href="/library/features/extras"><code>extras</code></A> features, all extras methods
            have async equivalents.
          </p>
          <pre><code>{`device.click(Button::Left, Duration::from_millis(50)).await?;
device.move_smooth(500, 0, 50, Duration::from_millis(5)).await?;
device.drag(Button::Left, 300, 0, 30, Duration::from_millis(5)).await?;`}</code></pre>
          <p>
            <A href="/library/features/extras#event-callbacks">Event callbacks</A> (<code>on_button_press</code>, <code>on_button_event</code>)
            and <A href="/library/features/extras#catch-callbacks">catch callbacks</A> (<code>on_catch</code>, <code>on_catch_event</code>) are
            available on <code>AsyncDevice</code> as synchronous methods. They spawn
            standard threads internally.
          </p>
        </Card>
      </div>

      <div id="async-sync-methods" data-search-target>
        <Card>
          <CardHeader title="Synchronous Methods" subtitle="Methods that are not async on AsyncDevice" />
          <p>
            Some methods on <code>AsyncDevice</code> are synchronous because they do not
            involve device I/O:
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Method</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>disconnect()</code></td>
                <td>Signals shutdown to internal threads.</td>
              </tr>
              <tr>
                <td><code>is_connected()</code></td>
                <td>Reads an atomic flag.</td>
              </tr>
              <tr>
                <td><code>port_name()</code></td>
                <td>Returns a stored string.</td>
              </tr>
              <tr>
                <td><code>connection_events()</code></td>
                <td>Returns a <A href="/library/connection#connection-events">channel receiver</A>.</td>
              </tr>
              <tr>
                <td><code>button_events()</code></td>
                <td>Returns a <A href="/library/stream#button-events">channel receiver</A>.</td>
              </tr>
              <tr>
                <td><code>catch_events()</code></td>
                <td>Returns a <A href="/library/catch#catch-events">channel receiver</A>.</td>
              </tr>
              <tr>
                <td><code>ff()</code></td>
                <td>Returns an <A href="/library/fire-and-forget#ff-wrapper">RAII guard</A>.</td>
              </tr>
              <tr>
                <td><code>batch()</code></td>
                <td>Returns a <A href="/library/features/batch#batch-usage">builder</A>.</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
};

export default Async;

import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const BatchBuilder: Component = () => {
  return (
    <>
      <div id="batch-overview" data-search-target>
        <Card>
          <CardHeader title="Batch Builder" subtitle="Fluent command sequences with automatic coalescing" />
          <p>
            The batch builder lets you queue multiple commands and execute them as a single
            operation. Consecutive native commands are coalesced into a single write call,
            reducing transport overhead. Requires the <code>batch</code> feature.
            See also the <A href="/library/features/async#async-batch">async batch builder</A> for async usage.
          </p>
          <pre><code>cargo add makcu --features batch</code></pre>
        </Card>
      </div>

      <div id="batch-usage" data-search-target>
        <Card>
          <CardHeader title="Usage" subtitle="Build and execute command sequences" />
          <pre class="api-signature">{`fn batch(&self) -> BatchBuilder<'_>`}</pre>
          <p>
            Returns a fluent builder. Chain commands with method calls, then
            call <code>execute()</code> to send them all.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::Button;

device.batch()
    .button_down(Button::Left)
    .move_xy(100, 0)
    .move_xy(0, 50)
    .button_up(Button::Left)
    .execute()?;`}</code></pre>
          <p>
            In this example, all four commands are coalesced into a single write to the
            transport.
          </p>
        </Card>
      </div>

      <div id="batch-methods" data-search-target>
        <Card>
          <CardHeader title="Available Commands" subtitle="Methods available on BatchBuilder" />
          <p>
            All builder methods consume and return <code>self</code> for chaining.
          </p>
          <div class="api-response-label">Native Commands</div>
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
              <tr><td><code>enable_catch(button)</code></td><td><A href="/library/catch#enable-catch">Enable catch stream</A> for a button.</td></tr>
              <tr><td><code>enable_button_stream()</code></td><td><A href="/library/stream#stream-enable">Enable button event stream</A>.</td></tr>
              <tr><td><code>disable_button_stream()</code></td><td><A href="/library/stream#stream-enable">Disable button event stream</A>.</td></tr>
              <tr><td><code>send_raw(cmd)</code></td><td><A href="/library/connection#send-raw">Send arbitrary command bytes</A>.</td></tr>
            </tbody>
          </table>
          <div class="callout callout--info">
            <p>
              Consecutive native commands are automatically coalesced into a single transport
              write. This minimizes serial overhead when sending rapid sequences.
            </p>
          </div>
          <div class="callout callout--warning">
            <p>
              Query methods (<code>button_state</code>, <code>lock_state</code>, <code>version</code>, etc.)
              are not available in batches. Batches use <A href="/library/fire-and-forget">fire-and-forget</A> writes
              internally -- coalescing multiple commands into a single write means responses
              cannot be aligned to individual commands.
            </p>
          </div>
        </Card>
      </div>

      <div id="batch-extras" data-search-target>
        <Card>
          <CardHeader title="Extras Commands" subtitle="Software-implemented operations in batches" />
          <p>
            With the <A href="/library/features/extras"><code>extras</code></A> feature enabled alongside <code>batch</code>,
            additional methods are available on the builder. These introduce timing
            (sleeps, intervals) and break the coalescing boundary.
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>click(button, hold)</code></td>
                <td><A href="/library/features/extras#click">Press, wait, release</A>.</td>
              </tr>
              <tr>
                <td><code>click_sequence(button, hold, count, interval)</code></td>
                <td><A href="/library/features/extras#click-sequence">Repeated clicks</A> with intervals.</td>
              </tr>
              <tr>
                <td><code>move_smooth(x, y, steps, interval)</code></td>
                <td><A href="/library/features/extras#move-smooth">Smooth movement</A> over multiple steps.</td>
              </tr>
              <tr>
                <td><code>move_pattern(waypoints, steps, interval)</code></td>
                <td><A href="/library/features/extras#move-pattern">Navigate waypoints</A> smoothly.</td>
              </tr>
              <tr>
                <td><code>drag(button, x, y, steps, interval)</code></td>
                <td><A href="/library/features/extras#drag">Smooth move</A> with button held.</td>
              </tr>
              <tr>
                <td><code>start_catch(button)</code></td>
                <td><A href="/library/features/extras#catch-convenience">Lock + enable catch</A> in one step.</td>
              </tr>
              <tr>
                <td><code>stop_catch(button)</code></td>
                <td><A href="/library/features/extras#catch-convenience">Unlock button</A>, stopping catch.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::Button;
use std::time::Duration;

device.batch()
    .click(Button::Left, Duration::from_millis(50))
    .move_smooth(500, 0, 20, Duration::from_millis(10))
    .click(Button::Left, Duration::from_millis(50))
    .execute()?;`}</code></pre>
        </Card>
      </div>

      <div id="batch-coalescing" data-search-target>
        <Card>
          <CardHeader title="Command Coalescing" subtitle="How consecutive commands are merged" />
          <p>
            The batch builder groups consecutive native commands into single transport writes.
            Extras commands (which involve timing) break the coalescing boundary.
          </p>
          <pre><code>{`device.batch()
    .move_xy(10, 0)       // ─┐
    .move_xy(0, 10)       //  ├─ coalesced into one write
    .button_down(b)       // ─┘
    .click(b, hold)       // ── separate (has timing)
    .move_xy(20, 0)       // ─┐
    .wheel(3)             //  ├─ coalesced into one write
    .button_up(b)         // ─┘
    .execute()?;`}</code></pre>
          <div class="callout callout--info">
            <p>
              Range validation for parametric commands (move, wheel) is deferred
              until <code>execute()</code> is called. If any command has invalid parameters,
              the entire batch fails.
            </p>
          </div>
        </Card>
      </div>

      <div id="batch-execution" data-search-target>
        <Card>
          <CardHeader title="Execution" subtitle="Running the batch" />
          <pre class="api-signature">{`fn execute(self) -> Result<()>`}</pre>
          <p>
            Consumes the builder and executes all queued commands. Coalesced groups are
            sent as <A href="/library/fire-and-forget">fire-and-forget</A> writes. Returns an error if any command fails
            validation or the transport is unavailable.
          </p>
          <p>
            The builder is consumed on execution -- create a new batch
            with <code>device.batch()</code> for additional sequences.
          </p>
        </Card>
      </div>
    </>
  );
};

export default BatchBuilder;

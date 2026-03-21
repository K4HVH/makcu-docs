import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Catch: Component = () => {
  return (
    <>
      <div id="button-catch" data-search-target>
        <Card>
          <CardHeader title="Button Capture" subtitle="Per-button press/release event stream" />
          <p>
            The <code>km.catch_m*()</code> commands enable a per-button event stream that
            reports physical press and release events while the button
            is <A href="/native/commands/locks#set-lock">locked</A>. Unlike
            the <A href="/native/commands/stream">button stream</A> which reports a bitmask
            for all buttons, catch reports events for a single button using ASCII responses.
          </p>
          <div class="callout callout--danger">
            <p>
              The corresponding button <strong>must
              be <A href="/native/commands/locks#set-lock">locked</A> first</strong>.
              Catch produces no events without an active lock.
            </p>
          </div>
        </Card>
      </div>

      <div id="catch-enable" data-search-target>
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
                <td><code>km.catch_ml(0)</code></td>
                <td><span class="api-badge api-badge--executed">EXECUTED</span></td>
                <td>Enable catch stream for left button.</td>
              </tr>
              <tr>
                <td><code>km.lock_ml(0)</code></td>
                <td><span class="api-badge api-badge--executed">EXECUTED</span></td>
                <td>Disables catch stream (by unlocking the button).</td>
              </tr>
              <tr>
                <td><code>km.catch_ml()</code></td>
                <td><span class="api-badge api-badge--responded">RESPONDED</span></td>
                <td>Always returns <code>0</code>. Does not disable catch.</td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout--warning">
            <p>
              There is no explicit command to disable catch while keeping the button locked.
              Unlocking the button is the only way to stop the catch stream.
              Calling <code>km.catch_ml(0)</code> multiple times is idempotent.
            </p>
          </div>
        </Card>
      </div>

      <div id="catch-events" data-search-target>
        <Card>
          <CardHeader title="Event Format" subtitle="ASCII command-style responses" />
          <p>
            Catch events are full ASCII responses, each terminated
            with <code>{`\\r\\n>>> `}</code>. This is different
            from <A href="/native/commands/stream#button-bitmask">button stream events</A> which
            use raw bitmask bytes after a <code>km.</code> prefix.
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Value</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>1</code></td>
                <td>Physical press</td>
              </tr>
              <tr>
                <td><code>2</code></td>
                <td>Physical release</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example (left button)</div>
          <pre><code>{`<--  km.catch_ml(1)\\r\\n>>>      (press)\n<--  km.catch_ml(2)\\r\\n>>>      (release)`}</code></pre>
        </Card>
      </div>

      <div id="catch-usage" data-search-target>
        <Card>
          <CardHeader title="Usage" subtitle="Lock, enable, listen, unlock" />
          <div class="api-response-label">Full sequence</div>
          <pre><code>{`-->  km.lock_ml(1)\\r\\n            (lock left button)
<--  km.lock_ml(1)\\r\\n>>>

-->  km.catch_ml(0)\\r\\n           (enable catch stream)
<--  km.catch_ml(0)\\r\\n>>>

    ... user physically clicks left button ...

<--  km.catch_ml(1)\\r\\n>>>        (press event)
<--  km.catch_ml(2)\\r\\n>>>        (release event)
<--  km.catch_ml(1)\\r\\n>>>        (press event)
<--  km.catch_ml(2)\\r\\n>>>        (release event)

-->  km.lock_ml(0)\\r\\n            (unlock — stops catch)
<--  km.lock_ml(0)\\r\\n>>> `}</code></pre>
        </Card>
      </div>

      <div id="catch-commands" data-search-target>
        <Card>
          <CardHeader title="All Catch Targets" />
          <table class="api-params">
            <thead>
              <tr>
                <th>Enable</th>
                <th>Button</th>
                <th>Requires</th>
                <th>Press</th>
                <th>Release</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>km.catch_ml(0)</code></td>
                <td>Left</td>
                <td><A href="/native/commands/locks#lock-reference"><code>km.lock_ml(1)</code></A></td>
                <td><code>catch_ml(1)</code></td>
                <td><code>catch_ml(2)</code></td>
              </tr>
              <tr>
                <td><code>km.catch_mr(0)</code></td>
                <td>Right</td>
                <td><A href="/native/commands/locks#lock-reference"><code>km.lock_mr(1)</code></A></td>
                <td><code>catch_mr(1)</code></td>
                <td><code>catch_mr(2)</code></td>
              </tr>
              <tr>
                <td><code>km.catch_mm(0)</code></td>
                <td>Middle</td>
                <td><A href="/native/commands/locks#lock-reference"><code>km.lock_mm(1)</code></A></td>
                <td><code>catch_mm(1)</code></td>
                <td><code>catch_mm(2)</code></td>
              </tr>
              <tr>
                <td><code>km.catch_ms1(0)</code></td>
                <td>Side 1</td>
                <td><A href="/native/commands/locks#lock-reference"><code>km.lock_ms1(1)</code></A></td>
                <td><code>catch_ms1(1)</code></td>
                <td><code>catch_ms1(2)</code></td>
              </tr>
              <tr>
                <td><code>km.catch_ms2(0)</code></td>
                <td>Side 2</td>
                <td><A href="/native/commands/locks#lock-reference"><code>km.lock_ms2(1)</code></A></td>
                <td><code>catch_ms2(1)</code></td>
                <td><code>catch_ms2(2)</code></td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout--warning">
            <p>
              Only <code>km.catch_ml()</code> has been physically verified on v3.2 / v3.7.
              The other buttons are assumed to follow the same pattern.
            </p>
          </div>
        </Card>
      </div>

      <div id="catch-notes" data-search-target>
        <Card>
          <CardHeader title="Notes" />
          <ul>
            <li>
              Catch is <strong>independent
              from <A href="/native/commands/stream">km.buttons()</A></strong>.
              It works without the button stream enabled and does not interfere with it.
            </li>
            <li>
              Args other than <code>0</code> (tested: <code>1</code>, <code>2</code>, <code>3</code>, <code>-1</code>)
              are accepted without error but do not enable the stream.
            </li>
            <li>
              The no-arg form <code>km.catch_ml()</code> always returns <code>0</code> regardless
              of whether catch is active or how many events have occurred.
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
};

export default Catch;

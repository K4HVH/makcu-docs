import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Catch: Component = () => {
  return (
    <>
      <div id="button-catch" data-search-target>
        <Card>
          <CardHeader title="Button Capture" subtitle="Count physical button presses while locked" />
          <p>
            The <code>km.catch_m*()</code> commands return the number of physical button presses
            that have occurred since the last call. The counter resets to zero after each read.
          </p>
          <div class="callout callout--danger">
            <p>
              The corresponding button <strong>must be <A href="/native/commands/locks#set-lock">locked</A> first</strong>.
              If the button is not locked, the catch counter will not increment and always return <code>0</code>.
            </p>
          </div>
        </Card>
      </div>

      <div id="catch-usage" data-search-target>
        <Card>
          <CardHeader title="Usage" subtitle="Lock, then catch" />
          <p>
            The catch mechanism intercepts physical button input at the firmware level. While
            a button is locked, the physical press is blocked from reaching the host but the
            firmware records it internally. Calling the corresponding catch command returns
            the accumulated count and resets it.
          </p>
          <ol>
            <li>Lock the button: <code>km.lock_ml(1)\r\n</code></li>
            <li>Physical presses are now counted but blocked from the host.</li>
            <li>Read the count: <code>km.catch_ml()\r\n</code></li>
            <li>The counter resets to <code>0</code> after the read.</li>
            <li>Unlock when done: <code>km.lock_ml(0)\r\n</code></li>
          </ol>
          <div class="api-response-label">Example</div>
          <pre><code>{`-->  km.lock_ml(1)\\r\\n          (lock left button)
<--  km.lock_ml(1)\\r\\n>>>

    ... user physically clicks left button 3 times ...

-->  km.catch_ml()\\r\\n          (read count)
<--  km.catch_ml()\\r\\n3\\r\\n>>>

-->  km.catch_ml()\\r\\n          (read again, counter reset)
<--  km.catch_ml()\\r\\n0\\r\\n>>>

-->  km.lock_ml(0)\\r\\n          (unlock left button)
<--  km.lock_ml(0)\\r\\n>>> `}</code></pre>
        </Card>
      </div>

      <div id="catch-commands" data-search-target>
        <Card>
          <CardHeader title="Commands" subtitle="All catch targets" />
          <pre class="api-signature">{'km.catch_m<target>()\\r\\n'}</pre>
          <div class="api-response-label">Response Type</div>
          <span class="api-badge api-badge--responded">RESPONDED</span>
          <p>
            Returns an integer: the number of physical presses since the last call.
            Resets to <code>0</code> after each read.
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Command</th>
                <th>Button</th>
                <th>Requires Lock</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>km.catch_ml()</code></td>
                <td>Left</td>
                <td><A href="/native/commands/locks#lock-reference"><code>km.lock_ml(1)</code></A></td>
              </tr>
              <tr>
                <td><code>km.catch_mm()</code></td>
                <td>Middle</td>
                <td><A href="/native/commands/locks#lock-reference"><code>km.lock_mm(1)</code></A></td>
              </tr>
              <tr>
                <td><code>km.catch_mr()</code></td>
                <td>Right</td>
                <td><A href="/native/commands/locks#lock-reference"><code>km.lock_mr(1)</code></A></td>
              </tr>
              <tr>
                <td><code>km.catch_ms1()</code></td>
                <td>Side 1</td>
                <td><A href="/native/commands/locks#lock-reference"><code>km.lock_ms1(1)</code></A></td>
              </tr>
              <tr>
                <td><code>km.catch_ms2()</code></td>
                <td>Side 2</td>
                <td><A href="/native/commands/locks#lock-reference"><code>km.lock_ms2(1)</code></A></td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout--warning">
            <p>
              Remember to <A href="/native/commands/locks#set-lock">unlock</A> the button when
              you are done capturing. While locked, the physical button input is blocked from
              the host.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Catch;

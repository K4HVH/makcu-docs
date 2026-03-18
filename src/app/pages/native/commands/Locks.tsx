import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Locks: Component = () => {
  return (
    <>
      <div id="input-locks" data-search-target>
        <Card>
          <CardHeader title="Input Locks" subtitle="Block specific inputs from reaching the host" />
          <p>
            Locks intercept the specified input before it reaches the host PC. Each lock
            is independent. None persist across power cycles.
            Extended lock variants (<code>km.lock_mw</code>, <code>km.lock_mx+</code>, etc.)
            are <A href="/native/broken#silent-commands">not recognised</A> by the firmware. See the Rust
            library's <A href="/library/locks">lock API</A> for a typed wrapper.
          </p>
        </Card>
      </div>

      <div id="set-lock" data-search-target>
        <Card>
          <CardHeader title="Set Lock" subtitle="Enable or disable a lock" />
          <pre class="api-signature">{'km.lock_<target>(1|0)\\r\\n'}</pre>
          <div class="api-response-label">Response Type</div>
          <span class="api-badge api-badge--executed">EXECUTED</span>
          <div class="api-response-label">Parameters</div>
          <table class="api-params">
            <thead>
              <tr>
                <th>Argument</th>
                <th>Behaviour</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>1</code></td>
                <td>Enable the lock (block input).</td>
              </tr>
              <tr>
                <td><code>0</code></td>
                <td>Disable the lock (allow input).</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div id="query-lock" data-search-target>
        <Card>
          <CardHeader title="Query Lock State" subtitle="Read the current lock state" />
          <pre class="api-signature">{'km.lock_<target>()\\r\\n'}</pre>
          <div class="api-response-label">Response Type</div>
          <span class="api-badge api-badge--responded">RESPONDED</span>
          <p>
            Returns <code>0</code> (unlocked) or <code>1</code> (locked).
          </p>
          <div class="callout callout--info">
            <p>
              Some external documentation references a 0-3 range. This is not the case on
              the tested firmware.
            </p>
          </div>
        </Card>
      </div>

      <div id="lock-reference" data-search-target>
        <Card>
          <CardHeader title="Command Reference" subtitle="All lock targets" />
          <table class="api-params">
            <thead>
              <tr>
                <th>Command</th>
                <th>Target</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>km.lock_mx(1/0)</code></td>
                <td>X-axis</td>
                <td>Lock or unlock horizontal movement</td>
              </tr>
              <tr>
                <td><code>km.lock_my(1/0)</code></td>
                <td>Y-axis</td>
                <td>Lock or unlock vertical movement</td>
              </tr>
              <tr>
                <td><code>km.lock_ml(1/0)</code></td>
                <td>Left</td>
                <td>Lock or unlock left button</td>
              </tr>
              <tr>
                <td><code>km.lock_mr(1/0)</code></td>
                <td>Right</td>
                <td>Lock or unlock right button</td>
              </tr>
              <tr>
                <td><code>km.lock_mm(1/0)</code></td>
                <td>Middle</td>
                <td>Lock or unlock middle button</td>
              </tr>
              <tr>
                <td><code>km.lock_ms1(1/0)</code></td>
                <td>Side 1</td>
                <td>Lock or unlock side button 1</td>
              </tr>
              <tr>
                <td><code>km.lock_ms2(1/0)</code></td>
                <td>Side 2</td>
                <td>Lock or unlock side button 2</td>
              </tr>
            </tbody>
          </table>
          <p class="text-sm text-muted">
            All commands accept the zero-argument form to query state
            (e.g. <code>km.lock_mx()</code> returns <code>0</code> or <code>1</code>).
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`-->  km.lock_mx(1)\\r\\n        (lock X-axis)
<--  km.lock_mx(1)\\r\\n>>>

-->  km.lock_mx()\\r\\n         (query lock state)
<--  km.lock_mx()\\r\\n1\\r\\n>>>

-->  km.lock_mx(0)\\r\\n        (unlock X-axis)
<--  km.lock_mx(0)\\r\\n>>> `}</code></pre>
        </Card>
      </div>
    </>
  );
};

export default Locks;

import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Locks: Component = () => {
  return (
    <>
      <div id="locks-overview" data-search-target>
        <Card>
          <CardHeader title="Input Locks" subtitle="Lock and unlock mouse inputs" />
          <p>
            Locks prevent specific mouse inputs from reaching the host. Seven targets are
            available: two movement axes and five buttons. Locks use
            the <A href="/library/types#enums"><code>LockTarget</code></A> enum. Maps to the
            firmware's <A href="/native/commands/locks"><code>km.lock_*</code></A> commands.
          </p>
          <div class="api-response-label">LockTarget Enum</div>
          <pre class="api-signature">{`pub enum LockTarget`}</pre>
          <table class="api-params">
            <thead>
              <tr>
                <th>Variant</th>
                <th>Locks</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>LockTarget::X</code></td><td>Horizontal mouse movement.</td></tr>
              <tr><td><code>LockTarget::Y</code></td><td>Vertical mouse movement.</td></tr>
              <tr><td><code>LockTarget::Left</code></td><td>Left button.</td></tr>
              <tr><td><code>LockTarget::Right</code></td><td>Right button.</td></tr>
              <tr><td><code>LockTarget::Middle</code></td><td>Middle button.</td></tr>
              <tr><td><code>LockTarget::Side1</code></td><td>Side button 1.</td></tr>
              <tr><td><code>LockTarget::Side2</code></td><td>Side button 2.</td></tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div id="set-lock" data-search-target>
        <Card>
          <CardHeader title="set_lock" subtitle="Enable or disable an input lock" />
          <pre class="api-signature">{`fn set_lock(&self, target: LockTarget, locked: bool) -> Result<()>`}</pre>
          <p>
            Locks (<code>true</code>) or unlocks (<code>false</code>) the specified input.
            When locked, the input is blocked from reaching the host.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::LockTarget;

// Lock horizontal movement
device.set_lock(LockTarget::X, true)?;

// Unlock it
device.set_lock(LockTarget::X, false)?;`}</code></pre>
        </Card>
      </div>

      <div id="lock-state" data-search-target>
        <Card>
          <CardHeader title="lock_state" subtitle="Query a single lock" />
          <pre class="api-signature">{`fn lock_state(&self, target: LockTarget) -> Result<bool>`}</pre>
          <p>
            Returns <code>true</code> if the specified input is currently locked.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`let locked = device.lock_state(LockTarget::Left)?;
println!("Left button lock: {}", locked);`}</code></pre>
        </Card>
      </div>

      <div id="lock-states-all" data-search-target>
        <Card>
          <CardHeader title="lock_states_all" subtitle="Query all locks at once" />
          <pre class="api-signature">{`fn lock_states_all(&self) -> Result<LockStates>`}</pre>
          <p>
            Queries all seven lock states in a single call and returns
            a <A href="/library/types#data-structs"><code>LockStates</code></A> struct.
          </p>
          <div class="api-response-label">LockStates Fields</div>
          <table class="api-params">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>x</code></td><td><code>bool</code></td><td>Horizontal movement lock.</td></tr>
              <tr><td><code>y</code></td><td><code>bool</code></td><td>Vertical movement lock.</td></tr>
              <tr><td><code>left</code></td><td><code>bool</code></td><td>Left button lock.</td></tr>
              <tr><td><code>right</code></td><td><code>bool</code></td><td>Right button lock.</td></tr>
              <tr><td><code>middle</code></td><td><code>bool</code></td><td>Middle button lock.</td></tr>
              <tr><td><code>side1</code></td><td><code>bool</code></td><td>Side button 1 lock.</td></tr>
              <tr><td><code>side2</code></td><td><code>bool</code></td><td>Side button 2 lock.</td></tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`let locks = device.lock_states_all()?;
if locks.x {
    println!("X axis is locked");
}`}</code></pre>
          <div class="callout callout--warning">
            <p>
              Lock states are not persistent across device power cycles. Do not cache lock
              state -- always query the device for current values.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Locks;

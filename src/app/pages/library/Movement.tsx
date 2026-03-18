import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const Movement: Component = () => {
  return (
    <>
      <div id="movement-overview" data-search-target>
        <Card>
          <CardHeader title="Movement" subtitle="Relative cursor movement, silent move, and scroll wheel" />
          <p>
            Three methods control cursor position and scroll input. All accept signed integers
            and validate ranges before sending to the device. For smooth multi-step movement,
            see the <A href="/library/features/extras#move-smooth"><code>extras</code></A> feature.
          </p>
        </Card>
      </div>

      <div id="move-xy" data-search-target>
        <Card>
          <CardHeader title="move_xy" subtitle="Relative cursor movement" />
          <pre class="api-signature">{`fn move_xy(&self, x: i32, y: i32) -> Result<()>`}</pre>
          <p>
            Moves the cursor by <code>(x, y)</code> relative to its current position.
            Positive <code>x</code> moves right, positive <code>y</code> moves down.
            Maps to the firmware's <A href="/native/commands/movement#km-move"><code>km.move(x,y)</code></A> command.
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Range</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>x</code></td>
                <td><code>i32</code></td>
                <td>-32767 to 32767</td>
                <td>Horizontal offset. Positive moves right.</td>
              </tr>
              <tr>
                <td><code>y</code></td>
                <td><code>i32</code></td>
                <td>-32767 to 32767</td>
                <td>Vertical offset. Positive moves down.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`device.move_xy(100, -50)?;  // right 100, up 50`}</code></pre>
          <div class="callout callout--info">
            <p>
              Values outside the valid range return <A href="/library/types#error-variants"><code>MakcuError::OutOfRange</code></A> without
              sending any data to the device.
            </p>
          </div>
        </Card>
      </div>

      <div id="silent-move" data-search-target>
        <Card>
          <CardHeader title="silent_move" subtitle="Atomic drag operation" />
          <pre class="api-signature">{`fn silent_move(&self, x: i32, y: i32) -> Result<()>`}</pre>
          <p>
            Performs a left-button-down, move, left-button-up sequence across two HID frames.
            The host sees a brief drag rather than a plain move. This maps to the
            firmware's <A href="/native/commands/movement#km-silent"><code>km.silent(x,y)</code></A> command.
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Range</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>x</code></td>
                <td><code>i32</code></td>
                <td>-32767 to 32767</td>
                <td>Horizontal offset.</td>
              </tr>
              <tr>
                <td><code>y</code></td>
                <td><code>i32</code></td>
                <td>-32767 to 32767</td>
                <td>Vertical offset.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`device.silent_move(200, 0)?;  // drag right 200`}</code></pre>
        </Card>
      </div>

      <div id="wheel" data-search-target>
        <Card>
          <CardHeader title="wheel" subtitle="Scroll wheel input" />
          <pre class="api-signature">{`fn wheel(&self, delta: i32) -> Result<()>`}</pre>
          <p>
            Sends a scroll wheel event. Positive values scroll up, negative values scroll down.
            Maps to the firmware's <A href="/native/commands/wheel#km-wheel"><code>km.wheel(n)</code></A> command.
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Range</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>delta</code></td>
                <td><code>i32</code></td>
                <td>-127 to 127</td>
                <td>Scroll amount. Positive scrolls up.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`device.wheel(3)?;   // scroll up 3
device.wheel(-5)?;  // scroll down 5`}</code></pre>
        </Card>
      </div>
    </>
  );
};

export default Movement;

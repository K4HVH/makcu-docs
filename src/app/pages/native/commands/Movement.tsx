import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Movement: Component = () => {
  return (
    <>
      <div id="km-move" data-search-target>
        <Card>
          <CardHeader title="km.move(x, y)" subtitle="Relative cursor movement" />
          <pre class="api-signature">km.move(x,y)\r\n</pre>
          <div class="api-response-label">Response Type</div>
          <span class="api-badge api-badge--executed">EXECUTED</span>
          <p>
            Moves the cursor by <code>(x, y)</code> relative to its current position.
            See also the Rust library's <A href="/library/movement#move-xy"><code>move_xy()</code></A> wrapper.
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
                <td>int</td>
                <td>-32767 to +32767</td>
                <td>Horizontal offset. Positive moves right.</td>
              </tr>
              <tr>
                <td><code>y</code></td>
                <td>int</td>
                <td>-32767 to +32767</td>
                <td>Vertical offset. Positive moves down.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`-->  km.move(100,-50)\\r\\n\n<--  km.move(100,-50)\\r\\n>>> `}</code></pre>
          <div class="callout callout--danger">
            <p>
              Smooth and bezier variants (<code>km.move(x,y,steps)</code>
              and <code>km.move(x,y,steps,cx,cy)</code>) are accepted without error but
              <A href="/native/broken#broken-commands">broken</A>. Diagonal moves silently produce no movement.
              Use <code>km.move(x,y)</code> only. The Rust library's <A href="/library/features/extras#move-smooth"><code>move_smooth()</code></A> provides
              a working software implementation.
            </p>
          </div>
        </Card>
      </div>

      <div id="km-silent" data-search-target>
        <Card>
          <CardHeader title="km.silent(x, y)" subtitle="Atomic drag operation" />
          <pre class="api-signature">km.silent(x,y)\r\n</pre>
          <div class="api-response-label">Response Type</div>
          <span class="api-badge api-badge--executed">EXECUTED</span>
          <p>
            Performs a left-button-down, move, left-button-up sequence across two HID frames.
            See also the Rust library's <A href="/library/movement#silent-move"><code>silent_move()</code></A> wrapper.
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
                <td>int</td>
                <td>-32767 to +32767</td>
                <td>Horizontal offset.</td>
              </tr>
              <tr>
                <td><code>y</code></td>
                <td>int</td>
                <td>-32767 to +32767</td>
                <td>Vertical offset.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`-->  km.silent(200,0)\\r\\n\n<--  km.silent(200,0)\\r\\n>>> `}</code></pre>
        </Card>
      </div>
    </>
  );
};

export default Movement;

import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Buttons: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="Mouse Buttons" subtitle="Query and control button states" />
        <p>
          Five buttons are available: <code>left</code>, <code>right</code>, <code>middle</code>,
          {' '}<code>ms1</code> (side button 1), and <code>ms2</code> (side button 2).
        </p>
        <div class="callout callout--danger">
          <p>
            The names <code>side1</code> and <code>side2</code> are <strong>not recognised</strong> by
            the firmware. Always use <code>ms1</code> and <code>ms2</code>.
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader title="Query State" subtitle="Read the current button state" />
        <pre class="api-signature">{'km.<button>()\\r\\n'}</pre>
        <div class="api-response-label">Response Type</div>
        <span class="api-badge api-badge--responded">RESPONDED</span>
        <p>
          Returns <code>0</code> (released) or <code>1</code> (pressed). The returned
          value reflects the combined physical and software state. If the button is held
          down by software, it returns <code>1</code> regardless of physical state.
        </p>
        <div class="callout callout--warning">
          <p>
            The zero-argument form is a <strong>state query</strong>, not a click. It does
            not produce any input on the host.
          </p>
        </div>
        <div class="api-response-label">Commands</div>
        <table class="api-params">
          <thead>
            <tr>
              <th>Command</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>km.left()</code></td><td>Left</td></tr>
            <tr><td><code>km.right()</code></td><td>Right</td></tr>
            <tr><td><code>km.middle()</code></td><td>Middle</td></tr>
            <tr><td><code>km.ms1()</code></td><td>Side 1</td></tr>
            <tr><td><code>km.ms2()</code></td><td>Side 2</td></tr>
          </tbody>
        </table>
        <div class="api-response-label">Example</div>
        <pre><code>{`-->  km.left()\\r\\n\n<--  km.left()\\r\\n0\\r\\n>>> `}</code></pre>
      </Card>

      <Card>
        <CardHeader title="Set State" subtitle="Press, release, or force-release a button" />
        <pre class="api-signature">{'km.<button>(arg)\\r\\n'}</pre>
        <div class="api-response-label">Response Type</div>
        <span class="api-badge api-badge--executed">EXECUTED</span>
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
              <td>Force the button into the pressed state. Overrides the physical state.</td>
            </tr>
            <tr>
              <td><code>0</code></td>
              <td>Release the software-held state. Does not override an active physical press.</td>
            </tr>
            <tr>
              <td><code>2</code></td>
              <td>Force release regardless of physical state.</td>
            </tr>
          </tbody>
        </table>
        <p>
          All five buttons accept the same arguments. Replace <code>{'<button>'}</code> with
          {' '}<code>left</code>, <code>right</code>, <code>middle</code>, <code>ms1</code>,
          or <code>ms2</code>.
        </p>
        <div class="api-response-label">Examples</div>
        <pre><code>{`-->  km.left(1)\\r\\n      (press left button)\n<--  km.left(1)\\r\\n>>> \n\n-->  km.left(0)\\r\\n      (soft release)\n<--  km.left(0)\\r\\n>>> \n\n-->  km.left(2)\\r\\n      (force release)\n<--  km.left(2)\\r\\n>>> `}</code></pre>
        <div class="callout callout--info">
          <p>
            <code>arg=0</code> performs a "soft" release. If the user is physically holding
            the button, it will remain pressed. Use <code>arg=2</code> to force the button
            up regardless of physical state.
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader title="Click" subtitle="Performing a press and release" />
        <p>
          The device has no working click shorthand. The <code>km.click()</code> command
          is present in the firmware but non-functional. To perform a click, send two
          separate commands:
        </p>
        <pre><code>{`km.left(1)\\r\\n\nkm.left(0)\\r\\n`}</code></pre>
        <p>
          Insert a delay between the press and release if the target application requires
          a minimum hold duration.
        </p>
      </Card>
    </>
  );
};

export default Buttons;

import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const BrokenCommands: Component = () => {
  return (
    <>
      <Card>
        <CardHeader title="Known Issues" subtitle="Commands that are non-functional on v3.2 / v3.7" />
        <p>
          The following commands were tested and confirmed non-functional on the
          verified firmware. They should not be used.
        </p>
      </Card>

      <Card>
        <CardHeader title="Broken Commands" subtitle="Accepted by the firmware but produce incorrect results" />
        <table class="api-params">
          <thead>
            <tr>
              <th>Command</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>km.click(...)</code></td>
              <td><span class="api-badge api-badge--broken">SILENT</span></td>
              <td>No click produced. Use separate press and release commands.</td>
            </tr>
            <tr>
              <td><code>km.move(x,y,steps)</code></td>
              <td><span class="api-badge api-badge--warning">BROKEN</span></td>
              <td>Accepted without error but only works in some directions. Diagonal moves produce no movement. Confirmed broken by firmware developer.</td>
            </tr>
            <tr>
              <td><code>km.move(x,y,steps,cx,cy)</code></td>
              <td><span class="api-badge api-badge--warning">BROKEN</span></td>
              <td>Same as above. Bezier movement is non-functional.</td>
            </tr>
            <tr>
              <td><code>km.catch_ml()</code> etc.</td>
              <td><span class="api-badge api-badge--warning">BROKEN</span></td>
              <td>Commands parse correctly and return <code>0</code>, but the click counter never increments regardless of lock state. Confirmed broken via multiple test methods.</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <CardHeader title="Silent Commands" subtitle="Not recognised by the firmware" />
        <p>
          These commands produce no response at all (timeout with no <code>{'>>> '}</code> prompt).
          They are not part of the current firmware.
        </p>
        <table class="api-params">
          <thead>
            <tr>
              <th>Category</th>
              <th>Commands</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Absolute positioning</td>
              <td><code>km.screen()</code>, <code>moveto()</code>, <code>getpos()</code></td>
            </tr>
            <tr>
              <td>Axis streaming</td>
              <td><code>km.axis()</code> and variants</td>
            </tr>
            <tr>
              <td>Raw HID frames</td>
              <td><code>km.mo(...)</code></td>
            </tr>
            <tr>
              <td>Remapping</td>
              <td><code>km.remap_button()</code>, <code>km.invert_x()</code>, <code>km.swap_xy()</code></td>
            </tr>
            <tr>
              <td>Turbo</td>
              <td><code>km.turbo()</code> and variants</td>
            </tr>
            <tr>
              <td>Scroll extras</td>
              <td><code>km.pan()</code>, <code>km.tilt()</code></td>
            </tr>
            <tr>
              <td>Mouse streaming</td>
              <td><code>km.mouse()</code> and variants</td>
            </tr>
            <tr>
              <td>Keyboard</td>
              <td><code>km.down()</code>, <code>km.up()</code>, <code>km.press()</code>, <code>km.string()</code></td>
            </tr>
            <tr>
              <td>Device management</td>
              <td><code>km.info()</code>, <code>km.device()</code>, <code>km.fault()</code>, <code>km.baud()</code>, <code>km.echo()</code>, <code>km.log()</code></td>
            </tr>
            <tr>
              <td>Extended locks</td>
              <td><code>km.lock_mw()</code>, <code>km.lock_mx+()</code>, <code>km.lock_my-()</code></td>
            </tr>
            <tr>
              <td>Wrong button names</td>
              <td><code>km.side1()</code>, <code>km.side2()</code> (use <code>km.ms1()</code> / <code>km.ms2()</code> instead)</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default BrokenCommands;

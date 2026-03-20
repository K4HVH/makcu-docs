import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const BrokenCommands: Component = () => {
  return (
    <>
      <div id="known-issues" data-search-target>
        <Card>
          <CardHeader title="Known Issues" subtitle="Non-functional commands on v3.2 / v3.7" />
        </Card>
      </div>

      <div id="broken-commands" data-search-target>
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
                <td><code>km.move(x,y,steps)</code></td>
                <td><span class="api-badge api-badge--warning">BROKEN</span></td>
                <td>Only works in some directions. Diagonal moves produce no movement. Use <A href="/native/commands/movement#km-move"><code>km.move(x,y)</code></A> instead, or the Rust library's <A href="/library/features/extras#move-smooth"><code>move_smooth()</code></A>.</td>
              </tr>
              <tr>
                <td><code>km.move(x,y,steps,cx,cy)</code></td>
                <td><span class="api-badge api-badge--warning">BROKEN</span></td>
                <td>Bezier movement. Same issue as <A href="/native/commands/movement#km-move"><code>km.move(x,y,steps)</code></A>.</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div id="silent-commands" data-search-target>
        <Card>
          <CardHeader title="Silent Commands" subtitle="Not recognised by the firmware" />
          <p>
            These commands produce no response (timeout with no <code>{'>>> '}</code> prompt).
            See <A href="/native/protocol#response-format">response format</A> for the SILENT response type.
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
                <td>Click shorthand</td>
                <td><code>km.click()</code> and variants. Use <A href="/native/commands/buttons#click">press + release</A> instead.</td>
              </tr>
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
                <td><code>km.info()</code>, <code>km.device()</code>, <code>km.fault()</code>, <code>km.baud()</code>, <code>km.echo()</code>, <code>km.log()</code>, <code>km.bypass()</code>, <code>km.led()</code>, <code>km.release()</code></td>
              </tr>
              <tr>
                <td>Extended locks</td>
                <td><code>km.lock_mw()</code>, <code>km.lock_mx+()</code>, <code>km.lock_my-()</code></td>
              </tr>
              <tr>
                <td>Wrong button names</td>
                <td><code>km.side1()</code>, <code>km.side2()</code> (use <A href="/native/commands/buttons"><code>km.ms1()</code> / <code>km.ms2()</code></A>)</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
};

export default BrokenCommands;

import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../../components/surfaces/Card';
import '../../../../styles/docs.css';

const Extras: Component = () => {
  return (
    <>
      <div id="extras-overview" data-search-target>
        <Card>
          <CardHeader title="Extras" subtitle="Software-implemented convenience operations" />
          <p>
            The <code>extras</code> feature adds higher-level operations built on top of the
            base API. These are implemented in software with controlled timing -- they are
            not firmware commands. These operations can also be used
            in <A href="/library/features/batch#batch-extras">batch sequences</A>.
          </p>
          <pre><code>cargo add makcu --features extras</code></pre>
        </Card>
      </div>

      <div id="click" data-search-target>
        <Card>
          <CardHeader title="click" subtitle="Press, hold, and release" />
          <pre class="api-signature">{`fn click(&self, button: Button, hold: Duration) -> Result<()>`}</pre>
          <p>
            Presses the button, waits for <code>hold</code> duration, then releases.
          </p>
          <table class="api-params">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>button</code></td>
                <td><A href="/library/types#enums"><code>Button</code></A></td>
                <td>Which button to click.</td>
              </tr>
              <tr>
                <td><code>hold</code></td>
                <td><code>Duration</code></td>
                <td>How long to hold the button down.</td>
              </tr>
            </tbody>
          </table>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::Button;
use std::time::Duration;

device.click(Button::Left, Duration::from_millis(50))?;`}</code></pre>
        </Card>
      </div>

      <div id="click-sequence" data-search-target>
        <Card>
          <CardHeader title="click_sequence" subtitle="Repeated clicks with intervals" />
          <pre class="api-signature">{`fn click_sequence(
    &self,
    button: Button,
    hold: Duration,
    count: u32,
    interval: Duration,
) -> Result<()>`}</pre>
          <p>
            Performs <code>count</code> clicks with <code>interval</code> delay between each
            cycle. Each click holds the button for <code>hold</code> duration.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`// Triple-click with 50ms hold and 100ms between clicks
device.click_sequence(
    Button::Left,
    Duration::from_millis(50),
    3,
    Duration::from_millis(100),
)?;`}</code></pre>
        </Card>
      </div>

      <div id="move-smooth" data-search-target>
        <Card>
          <CardHeader title="move_smooth" subtitle="Smooth cursor movement over multiple steps" />
          <pre class="api-signature">{`fn move_smooth(
    &self,
    x: i32,
    y: i32,
    steps: u32,
    interval: Duration,
) -> Result<()>`}</pre>
          <p>
            Moves the cursor by <code>(x, y)</code> total, divided evenly
            across <code>steps</code> increments with <code>interval</code> delay between
            each. Remainder pixels are applied on the final step.
          </p>
          <p>
            If <code>steps</code> is <code>0</code>, executes as a single <A href="/library/movement#move-xy"><code>move_xy</code></A>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`// Move right 500px over 50 steps, 5ms apart
device.move_smooth(500, 0, 50, Duration::from_millis(5))?;`}</code></pre>
          <div class="callout callout--info">
            <p>
              This provides the smooth movement that the firmware's <A href="/native/broken#broken-commands">broken</A> 3-argument
              <A href="/native/commands/movement#km-move"><code>km.move(x,y,steps)</code></A> was supposed to offer.
            </p>
          </div>
        </Card>
      </div>

      <div id="drag" data-search-target>
        <Card>
          <CardHeader title="drag" subtitle="Smooth move with button held" />
          <pre class="api-signature">{`fn drag(
    &self,
    button: Button,
    x: i32,
    y: i32,
    steps: u32,
    interval: Duration,
) -> Result<()>`}</pre>
          <p>
            Presses the button, performs a smooth move, then releases. Equivalent
            to <A href="/library/buttons#button-down"><code>button_down</code></A>, <code>move_smooth</code>, <A href="/library/buttons#button-up"><code>button_up</code></A>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`// Drag left button right 300px over 30 steps
device.drag(
    Button::Left,
    300, 0,
    30,
    Duration::from_millis(5),
)?;`}</code></pre>
        </Card>
      </div>

      <div id="move-pattern" data-search-target>
        <Card>
          <CardHeader title="move_pattern" subtitle="Navigate a sequence of waypoints" />
          <pre class="api-signature">{`fn move_pattern(
    &self,
    waypoints: &[(i32, i32)],
    steps: u32,
    interval: Duration,
) -> Result<()>`}</pre>
          <p>
            Navigates through a list of relative waypoints. Each waypoint is reached
            via <code>move_smooth</code> with the given <code>steps</code>
            and <code>interval</code>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`// Draw a triangle pattern
device.move_pattern(
    &[(100, 0), (-50, 87), (-50, -87)],
    20,
    Duration::from_millis(5),
)?;`}</code></pre>
        </Card>
      </div>

      <div id="catch-convenience" data-search-target>
        <Card>
          <CardHeader title="Catch Convenience" subtitle="Lock, enable, and stop catch in one call" />
          <p>
            These methods combine lock management with catch, wrapping the
            base <A href="/library/catch">catch API</A> for common use cases.
          </p>

          <div class="api-response-label">start_catch</div>
          <pre class="api-signature">{`fn start_catch(&self, button: Button) -> Result<()>`}</pre>
          <p>
            Locks the button and enables catch in one call.
            Equivalent to <A href="/library/locks#set-lock"><code>set_lock(target, true)</code></A> followed
            by <A href="/library/catch#enable-catch"><code>enable_catch(button)</code></A>.
          </p>
          <pre><code>{`use makcu::Button;

device.start_catch(Button::Left)?;
let rx = device.catch_events();

// ... receive events ...

device.stop_catch(Button::Left)?;`}</code></pre>

          <div class="api-response-label">stop_catch</div>
          <pre class="api-signature">{`fn stop_catch(&self, button: Button) -> Result<()>`}</pre>
          <p>
            Unlocks the button, which stops the catch stream. This is the only way to
            disable catch -- there is no explicit disable command in the firmware.
          </p>
          <div class="callout callout--warning">
            <p>
              <code>stop_catch</code> unlocks the button entirely. If the button was locked
              for other reasons (e.g. blocking input), those locks are also released.
            </p>
          </div>
        </Card>
      </div>

      <div id="catch-callbacks" data-search-target>
        <Card>
          <CardHeader title="Catch Callbacks" subtitle="Register handlers for catch events" />
          <p>
            Catch callbacks provide a higher-level interface to
            the <A href="/library/catch">catch stream</A>. Instead of manually reading a channel,
            register a closure that fires on physical press/release events.
          </p>

          <div class="api-response-label">on_catch</div>
          <pre class="api-signature">{`fn on_catch<F>(&self, button: Button, f: F) -> EventHandle
where F: Fn(bool) + Send + 'static`}</pre>
          <p>
            Registers a callback for a specific button's catch events. The closure
            receives <code>true</code> on press and <code>false</code> on release.
          </p>
          <pre><code>{`device.start_catch(Button::Left)?;
let _handle = device.on_catch(Button::Left, |pressed| {
    if pressed {
        println!("Left physically pressed");
    } else {
        println!("Left physically released");
    }
});`}</code></pre>

          <div class="api-response-label">on_catch_event</div>
          <pre class="api-signature">{`fn on_catch_event<F>(&self, f: F) -> EventHandle
where F: Fn(CatchEvent) + Send + 'static`}</pre>
          <p>
            Registers a callback that fires on any catch event from any button.
            Receives the full <A href="/library/catch#catch-event-type"><code>CatchEvent</code></A>.
          </p>
          <pre><code>{`let _handle = device.on_catch_event(|event| {
    println!("{:?} {}", event.button,
        if event.pressed { "pressed" } else { "released" });
});`}</code></pre>

          <div class="api-response-label">EventHandle</div>
          <p>
            Both methods return an <A href="/library/types#feature-types"><code>EventHandle</code></A>. The callback remains active
            as long as the handle is alive. Dropping the handle unregisters the callback.
          </p>
        </Card>
      </div>

      <div id="event-callbacks" data-search-target>
        <Card>
          <CardHeader title="Event Callbacks" subtitle="Register handlers for button events" />
          <p>
            Event callbacks provide a higher-level interface to the <A href="/library/stream">button stream</A>. Instead
            of manually reading a channel, register a closure that fires on button state
            changes. The button stream is enabled automatically when a callback is registered.
          </p>

          <div class="api-response-label">on_button_press</div>
          <pre class="api-signature">{`fn on_button_press<F>(&self, button: Button, f: F) -> EventHandle
where F: Fn(bool) + Send + 'static`}</pre>
          <p>
            Registers a callback for a specific button. The closure
            receives <code>true</code> on press and <code>false</code> on release.
          </p>
          <pre><code>{`let _handle = device.on_button_press(Button::Left, |pressed| {
    if pressed {
        println!("Left pressed");
    } else {
        println!("Left released");
    }
});`}</code></pre>

          <div class="api-response-label">on_button_event</div>
          <pre class="api-signature">{`fn on_button_event<F>(&self, f: F) -> EventHandle
where F: Fn(ButtonMask) + Send + 'static`}</pre>
          <p>
            Registers a callback that fires on any button state change. Receives
            the full <A href="/library/stream#button-mask"><code>ButtonMask</code></A>.
          </p>
          <pre><code>{`let _handle = device.on_button_event(|mask| {
    println!("Buttons: {:05b}", mask.raw());
});`}</code></pre>

          <div class="api-response-label">EventHandle</div>
          <p>
            Both methods return an <A href="/library/types#feature-types"><code>EventHandle</code></A>. The callback remains active
            as long as the handle is alive. Dropping the handle unregisters the callback.
          </p>
          <div class="callout callout--warning">
            <p>
              Store the <code>EventHandle</code> in a variable. If the handle is dropped
              immediately (e.g. by not binding it), the callback is unregistered instantly.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Extras;

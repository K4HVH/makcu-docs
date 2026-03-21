import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import '../../../styles/docs.css';

const LibraryButtons: Component = () => {
  return (
    <>
      <div id="buttons-overview" data-search-target>
        <Card>
          <CardHeader title="Buttons" subtitle="Press, release, and query mouse button states" />
          <p>
            Button operations use the <A href="/library/types#enums"><code>Button</code></A> enum to identify which button to
            control. Five buttons are available.
          </p>
          <div class="api-response-label">Button Enum</div>
          <pre class="api-signature">{`pub enum Button`}</pre>
          <table class="api-params">
            <thead>
              <tr>
                <th>Variant</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>Button::Left</code></td><td>Left mouse button.</td></tr>
              <tr><td><code>Button::Right</code></td><td>Right mouse button.</td></tr>
              <tr><td><code>Button::Middle</code></td><td>Middle mouse button.</td></tr>
              <tr><td><code>Button::Side1</code></td><td>Side button 1 (back).</td></tr>
              <tr><td><code>Button::Side2</code></td><td>Side button 2 (forward).</td></tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div id="button-down" data-search-target>
        <Card>
          <CardHeader title="button_down" subtitle="Press and hold a button" />
          <pre class="api-signature">{`fn button_down(&self, button: Button) -> Result<()>`}</pre>
          <p>
            Forces the specified button into the pressed state. The button remains held
            until explicitly released. Overrides the physical button state.
            Maps to <A href="/native/commands/buttons#set-state"><code>km.&lt;button&gt;(1)</code></A>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`use makcu::Button;

device.button_down(Button::Left)?;`}</code></pre>
        </Card>
      </div>

      <div id="button-up" data-search-target>
        <Card>
          <CardHeader title="button_up" subtitle="Soft release a button" />
          <pre class="api-signature">{`fn button_up(&self, button: Button) -> Result<()>`}</pre>
          <p>
            Releases the button. This is a <strong>soft release</strong> -- if the user is
            physically holding the button, it remains pressed.
            Maps to <A href="/native/commands/buttons#set-state"><code>km.&lt;button&gt;(0)</code></A>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`device.button_up(Button::Left)?;`}</code></pre>
        </Card>
      </div>

      <div id="button-up-force" data-search-target>
        <Card>
          <CardHeader title="button_up_force" subtitle="Force release a button" />
          <pre class="api-signature">{`fn button_up_force(&self, button: Button) -> Result<()>`}</pre>
          <p>
            Forces the button into the released state regardless of physical state.
            Use this when you need to guarantee the button is released.
            Maps to <A href="/native/commands/buttons#set-state"><code>km.&lt;button&gt;(2)</code></A>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`device.button_up_force(Button::Left)?;`}</code></pre>
          <div class="callout callout--info">
            <p>
              The difference between <code>button_up</code> and <code>button_up_force</code>:
              soft release (<code>button_up</code>) respects an active physical press, while
              force release (<code>button_up_force</code>) overrides it.
            </p>
          </div>
        </Card>
      </div>

      <div id="button-state" data-search-target>
        <Card>
          <CardHeader title="button_state" subtitle="Query current button state" />
          <pre class="api-signature">{`fn button_state(&self, button: Button) -> Result<bool>`}</pre>
          <p>
            Returns <code>true</code> if the button is currently pressed, <code>false</code> if
            released. Reflects the combined physical and software state.
            Maps to <A href="/native/commands/buttons#query-state"><code>km.&lt;button&gt;()</code></A>.
          </p>
          <div class="api-response-label">Example</div>
          <pre><code>{`let pressed = device.button_state(Button::Left)?;
println!("Left button: {}", if pressed { "pressed" } else { "released" });`}</code></pre>
          <div class="callout callout--warning">
            <p>
              This is a query, not an action. It does not produce any input on the host.
            </p>
          </div>
        </Card>
      </div>

      <div id="click-pattern" data-search-target>
        <Card>
          <CardHeader title="Click Pattern" subtitle="Press and release sequence" />
          <p>
            There is no single-command click in the base API. All button write methods
            support <A href="/library/fire-and-forget">fire-and-forget</A> mode
            and <A href="/library/features/batch#batch-methods">batch sequences</A>.
            Send a press followed by a release:
          </p>
          <pre><code>{`device.button_down(Button::Left)?;
device.button_up(Button::Left)?;`}</code></pre>
          <p>
            For controlled click timing, use the <A href="/library/features/extras"><code>extras</code></A> feature which
            provides <A href="/library/features/extras#click"><code>device.click()</code></A> with configurable hold duration.
          </p>
        </Card>
      </div>
    </>
  );
};

export default LibraryButtons;

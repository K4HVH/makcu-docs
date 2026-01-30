import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { GridBackground } from '../../components/GridBackground';
import { Card, CardHeader } from '../../components/Card';
import { Checkbox } from '../../components/Checkbox';
import { getCSSVariable } from '../../utils/cssVariables';

const Test: Component = () => {
  const [checked1, setChecked1] = createSignal(false);
  const [checked2, setChecked2] = createSignal(true);
  const [checked3, setChecked3] = createSignal(false);

  return (
    <>
      <GridBackground gridSize={10} />
      <div class="content" style={{ overflow: 'auto' }}>
        <div class="container grid">
          <h1>Design System Test Page</h1>

          <Card>
            <h2>Typography Examples</h2>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>

            <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>. Here's a <a href="#">link example</a>.</p>
            <p><small>This is small text for captions or footnotes.</small></p>

            <ul>
              <li>Unordered list item 1</li>
              <li>Unordered list item 2</li>
              <li>Unordered list item 3</li>
            </ul>

            <ol>
              <li>Ordered list item 1</li>
              <li>Ordered list item 2</li>
              <li>Ordered list item 3</li>
            </ol>

            <p>Inline code example: <code>const foo = 'bar';</code></p>

            <pre>{`function example() {
  console.log('Code block example');
  return true;
}`}</pre>

            <blockquote>
              This is a blockquote for highlighting important information or quotes.
            </blockquote>

            <hr />

            <div class="flex--sm flex--wrap">
              <span class="text-xs">Extra Small</span>
              <span class="text-sm">Small</span>
              <span class="text-base">Base</span>
              <span class="text-lg">Large</span>
              <span class="text-xl">XL</span>
            </div>
          </Card>

          <h2>Card Component Examples</h2>

          <Card>
            <CardHeader title="Default Card" subtitle="Basic card with default styling" />
            <p>This is a default card with normal padding.</p>
          </Card>

          <Card variant="emphasized">
            <CardHeader title="Emphasized Card" subtitle="Stands out more with primary border" />
            <p>This card has the emphasized variant.</p>
          </Card>

          <Card variant="subtle">
            <CardHeader title="Subtle Card" subtitle="More subdued appearance" />
            <p>This card has the subtle variant.</p>
          </Card>

          <Card interactive onClick={() => alert('Card clicked!')}>
            <CardHeader title="Interactive Card" subtitle="Click me!" />
            <p>This card has hover effects and is clickable.</p>
          </Card>

          <Card accent="primary">
            <CardHeader title="Primary Accent" subtitle="Left border accent" />
            <p>This card has a primary color accent on the left border.</p>
          </Card>

          <Card variant="emphasized" interactive accent="primary" padding="spacious">
            <CardHeader title="Combined Options" subtitle="Multiple props combined" />
            <p>This card combines emphasized variant, interactive hover, primary accent, and spacious padding.</p>
          </Card>

          <h2>Checkbox Component Examples</h2>

          <Card>
            <CardHeader title="Basic Checkboxes" />
            <div class="grid--sm">
              <Checkbox label="Unchecked checkbox" />
              <Checkbox label="Checked checkbox" checked />
              <Checkbox label="Disabled checkbox" disabled />
              <Checkbox label="Disabled checked" checked disabled />
            </div>
          </Card>

          <Card>
            <CardHeader title="Interactive Checkboxes" />
            <div class="grid--sm">
              <Checkbox
                label="Toggle me"
                checked={checked1()}
                onChange={(e) => setChecked1(e.currentTarget.checked)}
              />
              <Checkbox
                label="Toggle me too"
                checked={checked2()}
                onChange={(e) => setChecked2(e.currentTarget.checked)}
              />
              <p>
                <small>
                  Checkbox 1: {checked1() ? 'checked' : 'unchecked'} |
                  Checkbox 2: {checked2() ? 'checked' : 'unchecked'}
                </small>
              </p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Indeterminate State" />
            <div class="grid--sm">
              <Checkbox label="Indeterminate checkbox" indeterminate />
              <Checkbox
                label="Toggle all states"
                checked={checked3()}
                indeterminate={checked3() === undefined}
                onChange={(e) => setChecked3(e.currentTarget.checked)}
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Compact Size" />
            <div class="grid--sm">
              <Checkbox label="Compact unchecked" size="compact" />
              <Checkbox label="Compact checked" size="compact" checked />
              <Checkbox label="Compact indeterminate" size="compact" indeterminate />
            </div>
          </Card>

          <Card>
            <CardHeader title="Without Labels" />
            <div class="flex--sm">
              <Checkbox />
              <Checkbox checked />
              <Checkbox indeterminate />
              <Checkbox size="compact" />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Test;

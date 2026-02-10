import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import { Tabs } from '../../../components/navigation/Tabs';
import { BsStar, BsHeart, BsGear, BsSearch, BsBell, BsPerson, BsFire, BsLightning, BsBookmark } from 'solid-icons/bs';

const TabsDemo: Component = () => {
  const [tabValue, setTabValue] = createSignal('dashboard');
  const [scrollableTab, setScrollableTab] = createSignal('month1');
  const [verticalScrollableTab, setVerticalScrollableTab] = createSignal('feature1');

  return (
    <>
      {/* ================================================================
          Tabs Component Examples
          ================================================================ */}
      <h2>Tabs Component Examples</h2>

      <Card>
        <CardHeader title="Basic Tabs" subtitle="Uncontrolled horizontal tabs with default selection" />
        <div data-testid="tabs-basic">
          <Tabs
            options={[
              { value: 'dashboard', label: 'Dashboard' },
              { value: 'analytics', label: 'Analytics' },
              { value: 'reports', label: 'Reports' },
            ]}
            defaultValue="dashboard"
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Vertical Tabs" subtitle="Stack tabs vertically for sidebar navigation patterns" />
        <div data-testid="tabs-vertical">
          <Tabs
            orientation="vertical"
            options={[
              { value: 'profile', label: 'Profile' },
              { value: 'security', label: 'Security' },
              { value: 'notifications', label: 'Notifications' },
              { value: 'billing', label: 'Billing' },
            ]}
            defaultValue="profile"
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="With Icons" subtitle="Tabs can include icons alongside labels" />
        <div data-testid="tabs-icons">
          <Tabs
            options={[
              { value: 'favorites', label: 'Favorites', icon: BsStar },
              { value: 'liked', label: 'Liked', icon: BsHeart },
              { value: 'settings', label: 'Settings', icon: BsGear },
            ]}
            defaultValue="favorites"
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Size Variants" subtitle="Compact, normal, and spacious sizes" />
        <div class="grid--sm">
          <div>
            <h4>Compact</h4>
            <div data-testid="tabs-compact">
              <Tabs
                size="compact"
                options={[
                  { value: 'a', label: 'Alpha' },
                  { value: 'b', label: 'Beta' },
                  { value: 'c', label: 'Gamma' },
                ]}
                defaultValue="a"
              />
            </div>
          </div>
          <div>
            <h4>Normal</h4>
            <Tabs
              options={[
                { value: 'a', label: 'Alpha' },
                { value: 'b', label: 'Beta' },
                { value: 'c', label: 'Gamma' },
              ]}
              defaultValue="a"
            />
          </div>
          <div>
            <h4>Spacious</h4>
            <div data-testid="tabs-spacious">
              <Tabs
                size="spacious"
                options={[
                  { value: 'a', label: 'Alpha' },
                  { value: 'b', label: 'Beta' },
                  { value: 'c', label: 'Gamma' },
                ]}
                defaultValue="a"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Disabled Tabs" subtitle="Entire group or individual tabs can be disabled" />
        <div class="grid--sm">
          <div>
            <h4>Per-tab disabled</h4>
            <div data-testid="tabs-disabled">
              <Tabs
                options={[
                  { value: 'active1', label: 'Active' },
                  { value: 'disabled1', label: 'Disabled', disabled: true },
                  { value: 'active2', label: 'Also Active' },
                ]}
                defaultValue="active1"
              />
            </div>
          </div>
          <div>
            <h4>All disabled</h4>
            <Tabs
              disabled
              options={[
                { value: 'a', label: 'Tab A' },
                { value: 'b', label: 'Tab B' },
                { value: 'c', label: 'Tab C' },
              ]}
              defaultValue="a"
            />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Variants" subtitle="Primary (filled), secondary (bordered), and subtle (underline) styles" />
        <div class="grid--sm">
          <div>
            <h4>Primary</h4>
            <Tabs
              variant="primary"
              options={[
                { value: 'a', label: 'Overview' },
                { value: 'b', label: 'Details' },
                { value: 'c', label: 'History' },
              ]}
              defaultValue="a"
            />
          </div>
          <div>
            <h4>Secondary</h4>
            <div data-testid="tabs-secondary">
              <Tabs
                variant="secondary"
                options={[
                  { value: 'a', label: 'Overview' },
                  { value: 'b', label: 'Details' },
                  { value: 'c', label: 'History' },
                ]}
                defaultValue="a"
              />
            </div>
          </div>
          <div>
            <h4>Subtle</h4>
            <div data-testid="tabs-subtle">
              <Tabs
                variant="subtle"
                options={[
                  { value: 'a', label: 'Overview' },
                  { value: 'b', label: 'Details' },
                  { value: 'c', label: 'History' },
                ]}
                defaultValue="a"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Icon-Only Tabs" subtitle="Compact icon tabs for toolbars and partial pane views" />
        <div class="grid--sm">
          <div>
            <h4>Primary icon-only</h4>
            <div data-testid="tabs-icon-only">
              <Tabs
                iconOnly
                options={[
                  { value: 'favorites', label: 'Favorites', icon: BsStar },
                  { value: 'liked', label: 'Liked', icon: BsHeart },
                  { value: 'settings', label: 'Settings', icon: BsGear },
                ]}
                defaultValue="favorites"
              />
            </div>
          </div>
          <div>
            <h4>Secondary icon-only</h4>
            <Tabs
              iconOnly
              variant="secondary"
              options={[
                { value: 'search', label: 'Search', icon: BsSearch },
                { value: 'bell', label: 'Notifications', icon: BsBell },
                { value: 'person', label: 'Profile', icon: BsPerson },
              ]}
              defaultValue="search"
            />
          </div>
          <div>
            <h4>Subtle icon-only</h4>
            <Tabs
              iconOnly
              variant="subtle"
              options={[
                { value: 'star', label: 'Favorites', icon: BsStar },
                { value: 'fire', label: 'Trending', icon: BsFire },
                { value: 'lightning', label: 'Quick', icon: BsLightning },
              ]}
              defaultValue="star"
            />
          </div>
          <div>
            <h4>Vertical icon-only</h4>
            <Tabs
              iconOnly
              orientation="vertical"
              options={[
                { value: 'star', label: 'Favorites', icon: BsStar },
                { value: 'search', label: 'Search', icon: BsSearch },
                { value: 'gear', label: 'Settings', icon: BsGear },
              ]}
              defaultValue="star"
            />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Content Switching" subtitle="Tabs control which panel is displayed" />
        <Tabs
          value={tabValue()}
          onChange={setTabValue}
          options={[
            { value: 'dashboard', label: 'Dashboard', icon: BsStar },
            { value: 'analytics', label: 'Analytics', icon: BsLightning },
            { value: 'reports', label: 'Reports', icon: BsBookmark },
          ]}
        />
        <div style={{ padding: "var(--g-spacing)", "border-radius": "var(--g-radius)", border: "1px solid var(--g-border-color)", "margin-top": "var(--g-spacing-sm)" }}>
          {tabValue() === 'dashboard' && (
            <div>
              <h4 style={{ margin: "0 0 var(--g-spacing-sm) 0" }}>Dashboard</h4>
              <p style={{ margin: "0", color: "var(--g-text-secondary)" }}>Welcome back. You have 3 unread notifications and 12 pending tasks.</p>
            </div>
          )}
          {tabValue() === 'analytics' && (
            <div>
              <h4 style={{ margin: "0 0 var(--g-spacing-sm) 0" }}>Analytics</h4>
              <p style={{ margin: "0", color: "var(--g-text-secondary)" }}>Page views are up 24% this week. Top referrer: direct traffic.</p>
            </div>
          )}
          {tabValue() === 'reports' && (
            <div>
              <h4 style={{ margin: "0 0 var(--g-spacing-sm) 0" }}>Reports</h4>
              <p style={{ margin: "0", color: "var(--g-text-secondary)" }}>2 reports generated this month. Next scheduled report: Friday.</p>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <CardHeader title="Scrollable Tabs (Horizontal)" />
        <div style={{ display: "flex", "flex-direction": "column", gap: "var(--g-spacing-lg)" }}>
          <div>
            <h3 style={{ margin: "0 0 var(--g-spacing-sm) 0" }}>Many Tabs with Scroll Indicators</h3>
            <p style={{ margin: "0 0 var(--g-spacing) 0", color: "var(--g-text-secondary)" }}>
              When there are too many tabs to fit, scroll indicators appear. Click to scroll one tab, hold to continuously scroll.
            </p>
            <div style={{ width: "400px" }}>
              <Tabs
                scrollable
                variant="primary"
                value={scrollableTab()}
                onChange={setScrollableTab}
                options={[
                  { value: 'month1', label: 'January' },
                  { value: 'month2', label: 'February' },
                  { value: 'month3', label: 'March' },
                  { value: 'month4', label: 'April' },
                  { value: 'month5', label: 'May' },
                  { value: 'month6', label: 'June' },
                  { value: 'month7', label: 'July' },
                  { value: 'month8', label: 'August' },
                  { value: 'month9', label: 'September' },
                  { value: 'month10', label: 'October' },
                  { value: 'month11', label: 'November' },
                  { value: 'month12', label: 'December' },
                ]}
              />
            </div>
            <div style={{ "margin-top": "var(--g-spacing)", padding: "var(--g-spacing)", background: "var(--g-background)", "border-radius": "var(--g-radius)" }}>
              <strong>Selected:</strong> {scrollableTab()}
            </div>
          </div>

          <div>
            <h3 style={{ margin: "0 0 var(--g-spacing-sm) 0" }}>Scrollable with Icons</h3>
            <div style={{ width: "300px" }}>
              <Tabs
                scrollable
                variant="secondary"
                value={scrollableTab()}
                onChange={setScrollableTab}
                options={[
                  { value: 'month1', label: 'January', icon: BsStar },
                  { value: 'month2', label: 'February', icon: BsHeart },
                  { value: 'month3', label: 'March', icon: BsGear },
                  { value: 'month4', label: 'April', icon: BsSearch },
                  { value: 'month5', label: 'May', icon: BsBell },
                  { value: 'month6', label: 'June', icon: BsPerson },
                  { value: 'month7', label: 'July', icon: BsFire },
                  { value: 'month8', label: 'August', icon: BsLightning },
                ]}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Scrollable Tabs (Vertical)" />
        <div style={{ display: "flex", "flex-direction": "column", gap: "var(--g-spacing-lg)" }}>
          <div>
            <h3 style={{ margin: "0 0 var(--g-spacing-sm) 0" }}>Vertical Scrollable Tabs</h3>
            <p style={{ margin: "0 0 var(--g-spacing) 0", color: "var(--g-text-secondary)" }}>
              Scroll indicators work in vertical orientation too. This is useful for sidebars with many options.
            </p>
            <div style={{ height: "300px", width: "200px" }}>
              <Tabs
                scrollable
                orientation="vertical"
                variant="subtle"
                value={verticalScrollableTab()}
                onChange={setVerticalScrollableTab}
                options={[
                  { value: 'feature1', label: 'Dashboard', icon: BsStar },
                  { value: 'feature2', label: 'Analytics', icon: BsSearch },
                  { value: 'feature3', label: 'Reports', icon: BsBookmark },
                  { value: 'feature4', label: 'Settings', icon: BsGear },
                  { value: 'feature5', label: 'Users', icon: BsPerson },
                  { value: 'feature6', label: 'Notifications', icon: BsBell },
                  { value: 'feature7', label: 'Messages', icon: BsHeart },
                  { value: 'feature8', label: 'Activity', icon: BsLightning },
                  { value: 'feature9', label: 'Trending', icon: BsFire },
                  { value: 'feature10', label: 'Bookmarks', icon: BsBookmark },
                ]}
              />
            </div>
            <div style={{ "margin-top": "var(--g-spacing)", padding: "var(--g-spacing)", background: "var(--g-background)", "border-radius": "var(--g-radius)" }}>
              <strong>Selected:</strong> {verticalScrollableTab()}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TabsDemo;

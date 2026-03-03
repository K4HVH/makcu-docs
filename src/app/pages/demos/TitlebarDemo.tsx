import type { Component } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import { Titlebar } from '../../../components/navigation/Titlebar';
import { Button } from '../../../components/inputs/Button';
import { Avatar } from '../../../components/display/Avatar';
import { Badge } from '../../../components/display/Badge';
import { Chip } from '../../../components/display/Chip';
import {
  BsArrowLeft, BsGear, BsBell, BsSearch,
  BsHouseDoor, BsPerson, BsThreeDots, BsPlus,
} from 'solid-icons/bs';

const TitlebarDemo: Component = () => {
  return (
    <>

      {/* Basic Usage */}
      <Card>
        <CardHeader title="Basic Titlebar" subtitle="Simple title with no left/right content" />
        <Titlebar title="Dashboard" />
      </Card>

      {/* With Subtitle */}
      <Card>
        <CardHeader title="With Subtitle" subtitle="Title and descriptive subtitle text" />
        <Titlebar title="Settings" subtitle="Manage your account preferences" />
      </Card>

      {/* Left and Right Content */}
      <Card>
        <CardHeader title="Left & Right Content" subtitle="Arbitrary JSX in left and right zones" />
        <Titlebar
          title="Project Overview"
          left={<Button variant="subtle" icon={BsArrowLeft} size="compact" />}
          right={
            <>
              <Button variant="subtle" icon={BsSearch} size="compact" />
              <Button variant="subtle" icon={BsBell} size="compact" />
              <Button variant="subtle" icon={BsGear} size="compact" />
            </>
          }
        />
      </Card>

      {/* With Avatar */}
      <Card>
        <CardHeader title="With Avatar & Actions" subtitle="Using Avatar component in the right zone" />
        <Titlebar
          title="My Application"
          left={<Button variant="subtle" icon={BsHouseDoor} size="compact" />}
          right={
            <>
              <Badge variant="info" content={3}>
                <Button variant="subtle" icon={BsBell} size="compact" />
              </Badge>
              <Avatar name="John Doe" size="compact" />
            </>
          }
        />
      </Card>

      {/* With Chips */}
      <Card>
        <CardHeader title="With Chips" subtitle="Chips used for status indicators in the right zone" />
        <Titlebar
          title="Build Pipeline"
          subtitle="CI/CD Status"
          left={<Button variant="subtle" icon={BsArrowLeft} size="compact" />}
          right={
            <>
              <Chip variant="success" size="compact">Passing</Chip>
              <Chip variant="info" size="compact">v2.1.0</Chip>
            </>
          }
        />
      </Card>

      {/* Variants */}
      <Card>
        <CardHeader title="Variants" subtitle="Default, emphasized, and subtle visual variants" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <Titlebar
            title="Default Variant"
            variant="default"
            left={<Button variant="subtle" icon={BsHouseDoor} size="compact" />}
            right={<Button variant="subtle" icon={BsGear} size="compact" />}
          />
          <Titlebar
            title="Emphasized Variant"
            variant="emphasized"
            left={<Button variant="subtle" icon={BsHouseDoor} size="compact" />}
            right={<Button variant="subtle" icon={BsGear} size="compact" />}
          />
          <Titlebar
            title="Subtle Variant"
            variant="subtle"
            left={<Button variant="subtle" icon={BsHouseDoor} size="compact" />}
            right={<Button variant="subtle" icon={BsGear} size="compact" />}
          />
        </div>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader title="Size Variants" subtitle="Compact, normal, and spacious sizes" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <Titlebar
            title="Compact Titlebar"
            subtitle="Smaller padding and font"
            size="compact"
            left={<Button variant="subtle" icon={BsArrowLeft} size="compact" />}
            right={<Button variant="subtle" icon={BsGear} size="compact" />}
          />
          <Titlebar
            title="Normal Titlebar"
            subtitle="Default size"
            left={<Button variant="subtle" icon={BsArrowLeft} size="compact" />}
            right={<Button variant="subtle" icon={BsGear} size="compact" />}
          />
          <Titlebar
            title="Spacious Titlebar"
            subtitle="Larger padding and font"
            size="spacious"
            left={<Button variant="subtle" icon={BsArrowLeft} size="compact" />}
            right={<Button variant="subtle" icon={BsGear} size="compact" />}
          />
        </div>
      </Card>

      {/* Disabled */}
      <Card>
        <CardHeader title="Disabled State" subtitle="Reduced opacity and no pointer events" />
        <Titlebar
          title="Disabled Titlebar"
          subtitle="This titlebar is disabled"
          disabled
          left={<Button variant="subtle" icon={BsArrowLeft} size="compact" />}
          right={
            <>
              <Button variant="primary" size="compact" icon={BsPlus}>Add</Button>
              <Button variant="subtle" icon={BsThreeDots} size="compact" />
            </>
          }
        />
      </Card>

      {/* Complex Example */}
      <Card>
        <CardHeader title="Complex Layout" subtitle="Multiple components composed together" />
        <Titlebar
          title="Team Members"
          subtitle="12 active members"
          variant="emphasized"
          left={
            <>
              <Button variant="subtle" icon={BsArrowLeft} size="compact" />
              <Button variant="subtle" icon={BsPerson} size="compact" />
            </>
          }
          right={
            <>
              <Button variant="subtle" icon={BsSearch} size="compact" />
              <Button variant="primary" size="compact" icon={BsPlus}>Invite</Button>
              <Avatar name="Admin" size="compact" />
            </>
          }
        />
      </Card>

      {/* Sticky vs Non-Sticky */}
      <Card>
        <CardHeader title="Sticky vs Non-Sticky" subtitle="Compare side by side — left scrolls away, right stays pinned" />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ 'margin-bottom': 'var(--g-spacing-sm)' }}>Non-Sticky</h4>
            <div style={{ height: '200px', overflow: 'auto', border: 'var(--g-border-width) solid var(--g-border-color)', 'border-radius': 'var(--g-radius)' }}>
              <Titlebar
                title="Normal Header"
                subtitle="I scroll away"
                variant="emphasized"
                left={<Button variant="subtle" icon={BsArrowLeft} size="compact" />}
                right={<Button variant="subtle" icon={BsGear} size="compact" />}
              />
              <div style={{ padding: 'var(--g-spacing)' }}>
                <p style={{ color: 'var(--g-text-secondary)', 'margin-bottom': 'var(--g-spacing)' }}>Scroll down — the titlebar scrolls out of view.</p>
                <p style={{ color: 'var(--g-text-muted)', 'margin-bottom': 'var(--g-spacing)' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p style={{ color: 'var(--g-text-muted)', 'margin-bottom': 'var(--g-spacing)' }}>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                <p style={{ color: 'var(--g-text-muted)', 'margin-bottom': 'var(--g-spacing)' }}>Duis aute irure dolor in reprehenderit in voluptate.</p>
                <p style={{ color: 'var(--g-text-muted)', 'margin-bottom': 'var(--g-spacing)' }}>Excepteur sint occaecat cupidatat non proident.</p>
                <p style={{ color: 'var(--g-text-muted)', 'margin-bottom': 'var(--g-spacing)' }}>Sed ut perspiciatis unde omnis iste natus error.</p>
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ 'margin-bottom': 'var(--g-spacing-sm)' }}>Sticky</h4>
            <div style={{ height: '200px', overflow: 'auto', border: 'var(--g-border-width) solid var(--g-border-color)', 'border-radius': 'var(--g-radius)' }}>
              <Titlebar
                title="Sticky Header"
                subtitle="I stay at the top"
                sticky
                variant="emphasized"
                left={<Button variant="subtle" icon={BsArrowLeft} size="compact" />}
                right={<Button variant="subtle" icon={BsGear} size="compact" />}
              />
              <div style={{ padding: 'var(--g-spacing)' }}>
                <p style={{ color: 'var(--g-text-secondary)', 'margin-bottom': 'var(--g-spacing)' }}>Scroll down — the titlebar stays pinned.</p>
                <p style={{ color: 'var(--g-text-muted)', 'margin-bottom': 'var(--g-spacing)' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p style={{ color: 'var(--g-text-muted)', 'margin-bottom': 'var(--g-spacing)' }}>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                <p style={{ color: 'var(--g-text-muted)', 'margin-bottom': 'var(--g-spacing)' }}>Duis aute irure dolor in reprehenderit in voluptate.</p>
                <p style={{ color: 'var(--g-text-muted)', 'margin-bottom': 'var(--g-spacing)' }}>Excepteur sint occaecat cupidatat non proident.</p>
                <p style={{ color: 'var(--g-text-muted)', 'margin-bottom': 'var(--g-spacing)' }}>Sed ut perspiciatis unde omnis iste natus error.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Title-only minimal */}
      <Card>
        <CardHeader title="Left-only & Right-only" subtitle="Only one side populated" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <Titlebar
            title="Left Only"
            left={<Button variant="subtle" icon={BsArrowLeft} size="compact" />}
          />
          <Titlebar
            title="Right Only"
            right={<Button variant="primary" size="compact" icon={BsPlus}>New</Button>}
          />
        </div>
      </Card>
    </>
  );
};

export default TitlebarDemo;

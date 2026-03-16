import { createSignal, createEffect, onCleanup, onMount, Show, createMemo } from 'solid-js';
import { type RouteSectionProps, useNavigate, useLocation } from '@solidjs/router';
import { GridBackground } from '../../components/surfaces/GridBackground';
import { Pane, type PaneState } from '../../components/navigation/Pane';
import { Tabs } from '../../components/navigation/Tabs';
import { Divider } from '../../components/display/Divider';
import { Titlebar } from '../../components/navigation/Titlebar';
import { Button } from '../../components/inputs/Button';
import {
  BsList, BsInfoCircle, BsCpu, BsPlug, BsLink45deg, BsTerminal,
  BsCheckCircle, BsCursor, BsArrowsMove, BsMouse, BsLock,
  BsBroadcast, BsUpcScan, BsExclamationTriangle, BsJournalText,
  BsBook, BsHouseDoor,
} from 'solid-icons/bs';
import type { TabOption } from '../../components/navigation/Tabs';

const sectionTabs: TabOption[] = [
  { value: 'native', label: 'Native API', icon: BsTerminal },
  { value: 'library', label: 'Library', icon: BsBook },
];

const nativeOverviewTabs: TabOption[] = [
  { value: '/native', label: 'Introduction', icon: BsInfoCircle },
  { value: '/native/hardware', label: 'Hardware', icon: BsCpu },
  { value: '/native/transport', label: 'Transport', icon: BsPlug },
  { value: '/native/connection', label: 'Connection', icon: BsLink45deg },
  { value: '/native/protocol', label: 'Protocol', icon: BsTerminal },
];

const nativeCommandTabs: TabOption[] = [
  { value: '/native/commands/version', label: 'Version', icon: BsCheckCircle },
  { value: '/native/commands/buttons', label: 'Buttons', icon: BsCursor },
  { value: '/native/commands/movement', label: 'Movement', icon: BsArrowsMove },
  { value: '/native/commands/wheel', label: 'Wheel', icon: BsMouse },
  { value: '/native/commands/locks', label: 'Locks', icon: BsLock },
  { value: '/native/commands/stream', label: 'Stream', icon: BsBroadcast },
  { value: '/native/commands/serial', label: 'Serial', icon: BsUpcScan },
];

const nativeReferenceTabs: TabOption[] = [
  { value: '/native/broken', label: 'Known Issues', icon: BsExclamationTriangle },
  { value: '/native/notes', label: 'Notes', icon: BsJournalText },
];

const allNativeTabs = [...nativeOverviewTabs, ...nativeCommandTabs, ...nativeReferenceTabs];

const libraryTabOptions: TabOption[] = [
  { value: '/library', label: 'Coming Soon', icon: BsBook },
];

const isMobileQuery = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

const DocsLayout = (props: RouteSectionProps) => {
  const [paneState, setPaneState] = createSignal<PaneState>(isMobileQuery() ? 'closed' : 'open');
  const [isMobile, setIsMobile] = createSignal(isMobileQuery());
  const navigate = useNavigate();
  const location = useLocation();

  onMount(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (e.matches) setPaneState('closed');
      else setPaneState('open');
    };
    mql.addEventListener('change', handler);
    onCleanup(() => mql.removeEventListener('change', handler));
  });

  const activeSection = () => location.pathname.startsWith('/library') ? 'library' : 'native';

  const pageTitle = createMemo(() => {
    const all = [...allNativeTabs, ...libraryTabOptions];
    return all.find(t => t.value === location.pathname)?.label ?? '';
  });

  let contentRef: HTMLDivElement | undefined;

  createEffect(() => {
    location.pathname;
    contentRef?.scrollTo(0, 0);
  });

  const handlePageNav = (value: string) => {
    navigate(value);
    if (isMobile()) setPaneState('closed');
  };

  return (
    <>
      <GridBackground gridSize={10} />

      <div class="content" style={{ display: 'flex', height: '100%', width: '100%' }}>
        <Pane
          position="left"
          mode={isMobile() ? 'temporary' : 'permanent'}
          fixed={isMobile()}
          openSize="200px"
          state={paneState()}
          onStateChange={setPaneState}
        >
          <Divider spacing="compact" label="Section" labelAlign="start" />
          <Tabs
            orientation="vertical"
            variant="subtle"
            value={activeSection()}
            onChange={(value: string) => {
              const prefix = value === 'library' ? '/library' : '/native';
              if (!location.pathname.startsWith(prefix)) navigate(prefix);
            }}
            options={sectionTabs}
          />
          <Show when={activeSection() === 'native'}>
            <Divider spacing="compact" label="Overview" labelAlign="start" />
            <Tabs
              orientation="vertical"
              variant="subtle"
              value={location.pathname}
              onChange={handlePageNav}
              options={nativeOverviewTabs}
            />
            <Divider spacing="compact" label="Commands" labelAlign="start" />
            <Tabs
              orientation="vertical"
              variant="subtle"
              value={location.pathname}
              onChange={handlePageNav}
              options={nativeCommandTabs}
            />
            <Divider spacing="compact" label="Reference" labelAlign="start" />
            <Tabs
              orientation="vertical"
              variant="subtle"
              value={location.pathname}
              onChange={handlePageNav}
              options={nativeReferenceTabs}
            />
          </Show>
          <Show when={activeSection() === 'library'}>
            <Divider spacing="compact" label="Pages" labelAlign="start" />
            <Tabs
              orientation="vertical"
              variant="subtle"
              value={location.pathname}
              onChange={handlePageNav}
              options={libraryTabOptions}
            />
          </Show>
        </Pane>

        <div ref={contentRef} style={{ flex: 1, overflow: 'auto' }}>
          <Titlebar
            title={activeSection() === 'library' ? 'MAKCU - Library' : 'MAKCU - Native API'}
            subtitle={pageTitle()}
            sticky
            style={{ margin: 'var(--g-spacing-sm)', top: 'var(--g-spacing-sm)' }}
            left={
              <>
                <Show when={isMobile()}>
                  <Button
                    variant="subtle"
                    size="compact"
                    icon={BsList}
                    onClick={() => setPaneState(s => s === 'open' ? 'closed' : 'open')}
                    aria-label="Toggle navigation"
                  />
                </Show>
                <Button
                  variant="subtle"
                  size="compact"
                  icon={BsHouseDoor}
                  onClick={() => navigate('/')}
                  aria-label="Home"
                />
              </>
            }
          />
          <div class="container container--wide grid">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocsLayout;

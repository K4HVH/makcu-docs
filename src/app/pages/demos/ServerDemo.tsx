import type { Component } from 'solid-js';
import { createSignal, For, Show } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import { Button } from '../../../components/inputs/Button';
import { Chip } from '../../../components/display/Chip';
import { TextField } from '../../../components/inputs/TextField';
import { Progress } from '../../../components/feedback/Progress';
import { Table } from '../../../components/display/Table';
import { listHealthServices, getHealthService } from '../../../api/health';
import type { ServiceHealth } from '../../../gen/midnight/midnight_pb';
import { ServiceHealth_ServingStatus } from '../../../gen/midnight/midnight_pb';
import type { Duration } from '@bufbuild/protobuf/wkt';

const formatDuration = (d?: Duration): string => {
  if (!d) return '—';
  const s = Number(d.seconds);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0) parts.push(`${mins}m`);
  parts.push(`${secs}s`);
  return parts.join(' ');
};

const statusLabel = (status: ServiceHealth_ServingStatus): string => {
  switch (status) {
    case ServiceHealth_ServingStatus.SERVING:
      return 'Serving';
    case ServiceHealth_ServingStatus.NOT_SERVING:
      return 'Not Serving';
    default:
      return 'Unknown';
  }
};

const statusVariant = (status: ServiceHealth_ServingStatus) => {
  switch (status) {
    case ServiceHealth_ServingStatus.SERVING:
      return 'success' as const;
    case ServiceHealth_ServingStatus.NOT_SERVING:
      return 'error' as const;
    default:
      return 'neutral' as const;
  }
};

const ServiceDetail: Component<{ service: ServiceHealth }> = (props) => (
  <div class="grid--sm">
    <div class="flex--sm" style={{ 'align-items': 'center', gap: 'var(--g-spacing)' }}>
      <span>Status:</span>
      <Chip variant={statusVariant(props.service.status)}>
        {statusLabel(props.service.status)}
      </Chip>
    </div>
    <div class="flex--sm" style={{ 'align-items': 'center', gap: 'var(--g-spacing)' }}>
      <span>Name:</span>
      <span>{props.service.name}</span>
    </div>
    <div class="flex--sm" style={{ 'align-items': 'center', gap: 'var(--g-spacing)' }}>
      <span>ID:</span>
      <span>{props.service.id}</span>
    </div>
    <Show when={props.service.version}>
      <div class="flex--sm" style={{ 'align-items': 'center', gap: 'var(--g-spacing)' }}>
        <span>Version:</span>
        <span>{props.service.version}</span>
      </div>
    </Show>
    <div class="flex--sm" style={{ 'align-items': 'center', gap: 'var(--g-spacing)' }}>
      <span>Uptime:</span>
      <span>{formatDuration(props.service.uptime)}</span>
    </div>
    <div class="flex--sm" style={{ 'align-items': 'center', gap: 'var(--g-spacing)' }}>
      <span>Interval:</span>
      <span>{formatDuration(props.service.interval)}</span>
    </div>
    <Show when={props.service.message}>
      <div class="flex--sm" style={{ 'align-items': 'center', gap: 'var(--g-spacing)' }}>
        <span>Message:</span>
        <span>{props.service.message}</span>
      </div>
    </Show>
  </div>
);

const ServerDemo: Component = () => {
  // List all services state
  const [listLoading, setListLoading] = createSignal(false);
  const [serviceList, setServiceList] = createSignal<ServiceHealth[]>([]);
  const [listError, setListError] = createSignal<string | null>(null);

  // Get single service state
  const [getLoading, setGetLoading] = createSignal(false);
  const [serviceResult, setServiceResult] = createSignal<ServiceHealth | null>(null);
  const [getError, setGetError] = createSignal<string | null>(null);
  const [serviceId, setServiceId] = createSignal('');

  const runListServices = async () => {
    setListLoading(true);
    setListError(null);
    try {
      const response = await listHealthServices();
      setServiceList(response.services);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setListError(msg);
      setServiceList([]);
    } finally {
      setListLoading(false);
    }
  };

  const runGetService = async () => {
    setGetLoading(true);
    setGetError(null);
    try {
      const id = serviceId().trim() || undefined;
      const response = await getHealthService(id);
      setServiceResult(response);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setGetError(msg);
      setServiceResult(null);
    } finally {
      setGetLoading(false);
    }
  };

  return (
    <>

      <Card>
        <CardHeader title="List Health Services" subtitle="Retrieve all registered services and their current status" />
        <div class="flex--sm">
          <Button
            variant="primary"
            onClick={runListServices}
            loading={listLoading()}
            disabled={listLoading()}
          >
            {listLoading() ? 'Loading...' : 'List Services'}
          </Button>
        </div>

        <Show when={listLoading()}>
          <div style={{ 'margin-top': 'var(--g-spacing)' }}>
            <Progress type="linear" variant="primary" size="sm" />
          </div>
        </Show>

        <Show when={listError()}>
          <Card variant="subtle" style={{ 'margin-top': 'var(--g-spacing)' }}>
            <div class="flex--sm" style={{ 'align-items': 'center' }}>
              <Chip variant="error">Error</Chip>
              <span>{listError()}</span>
            </div>
          </Card>
        </Show>

        <Show when={serviceList().length > 0}>
          <div style={{ 'margin-top': 'var(--g-spacing)' }}>
            <Table
              getRowId={(row: ServiceHealth) => row.id}
              columns={[
                { key: 'id', header: 'ID', cell: (row: ServiceHealth) => row.id },
                { key: 'name', header: 'Service', cell: (row: ServiceHealth) => row.name },
                {
                  key: 'status',
                  header: 'Status',
                  cell: (row: ServiceHealth) => (
                    <Chip size="compact" variant={statusVariant(row.status)}>
                      {statusLabel(row.status)}
                    </Chip>
                  ),
                },
                {
                  key: 'uptime',
                  header: 'Uptime',
                  cell: (row: ServiceHealth) => <span>{formatDuration(row.uptime)}</span>,
                },
                {
                  key: 'interval',
                  header: 'Interval',
                  cell: (row: ServiceHealth) => <span>{formatDuration(row.interval)}</span>,
                },
                {
                  key: 'version',
                  header: 'Version',
                  cell: (row: ServiceHealth) => <span>{row.version ?? '—'}</span>,
                },
                {
                  key: 'message',
                  header: 'Message',
                  cell: (row: ServiceHealth) => <span>{row.message ?? '—'}</span>,
                },
              ]}
              data={serviceList()}
            />
          </div>
        </Show>
      </Card>

      <Card>
        <CardHeader title="Get Service Health" subtitle="Query a specific service by ID, or omit for overall server health" />
        <div class="grid--sm">
          <TextField
            label="Service ID"
            value={serviceId()}
            onChange={setServiceId}
            placeholder="Leave empty for overall server health"
          />
          <div class="flex--sm">
            <Button
              variant="primary"
              onClick={runGetService}
              loading={getLoading()}
              disabled={getLoading()}
            >
              {getLoading() ? 'Checking...' : 'Get Health'}
            </Button>
          </div>
        </div>

        <Show when={getLoading()}>
          <div style={{ 'margin-top': 'var(--g-spacing)' }}>
            <Progress type="linear" variant="primary" size="sm" />
          </div>
        </Show>

        <Show when={getError()}>
          <Card variant="subtle" style={{ 'margin-top': 'var(--g-spacing)' }}>
            <div class="flex--sm" style={{ 'align-items': 'center' }}>
              <Chip variant="error">Error</Chip>
              <span>{getError()}</span>
            </div>
          </Card>
        </Show>

        <Show when={serviceResult()}>
          {(svc) => (
            <Card variant="emphasized" style={{ 'margin-top': 'var(--g-spacing)' }}>
              <CardHeader title="Response" />
              <ServiceDetail service={svc()} />
            </Card>
          )}
        </Show>
      </Card>
    </>
  );
};

export default ServerDemo;

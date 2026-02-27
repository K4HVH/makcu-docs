import { describe, it, expect, vi, beforeEach } from 'vitest';
import { create } from '@bufbuild/protobuf';
import {
  ServiceHealthSchema,
  ServiceHealth_ServingStatus,
  ServiceHealthListSchema,
} from '../../src/gen/midnight/midnight_pb';
import { DurationSchema } from '@bufbuild/protobuf/wkt';

// vi.hoisted runs BEFORE vi.mock factories, ensuring mocks are initialized
const { mockListHealthServices, mockGetHealthService } = vi.hoisted(() => ({
  mockListHealthServices: vi.fn(),
  mockGetHealthService: vi.fn(),
}));

vi.mock('../../src/api/transport', () => ({
  createServiceClient: vi.fn(() => ({
    listHealthServices: mockListHealthServices,
    getHealthService: mockGetHealthService,
  })),
}));

import { listHealthServices, getHealthService, healthClient } from '../../src/api/health';

describe('listHealthServices', () => {
  beforeEach(() => {
    mockListHealthServices.mockReset();
    mockGetHealthService.mockReset();
  });

  it('calls listHealthServices with empty request', async () => {
    const svc = create(ServiceHealthSchema, {
      id: '1', name: 'server', status: ServiceHealth_ServingStatus.SERVING,
    });
    const mockResponse = create(ServiceHealthListSchema, { services: [svc] });
    mockListHealthServices.mockResolvedValue(mockResponse);

    const result = await listHealthServices();

    expect(mockListHealthServices).toHaveBeenCalledWith({});
    expect(result.services).toHaveLength(1);
    expect(result.services[0].name).toBe('server');
  });

  it('returns empty list when no services registered', async () => {
    mockListHealthServices.mockResolvedValue(
      create(ServiceHealthListSchema),
    );

    const result = await listHealthServices();

    expect(result.services).toHaveLength(0);
  });

  it('rejects when the RPC fails', async () => {
    mockListHealthServices.mockRejectedValue(new Error('connection refused'));

    await expect(listHealthServices()).rejects.toThrow('connection refused');
  });
});

describe('getHealthService', () => {
  beforeEach(() => {
    mockListHealthServices.mockReset();
    mockGetHealthService.mockReset();
  });

  it('calls getHealthService with the given id', async () => {
    const uptime = create(DurationSchema, { seconds: 3600n });
    const mockResponse = create(ServiceHealthSchema, {
      id: 'svc-uuid',
      name: 'my-service',
      status: ServiceHealth_ServingStatus.SERVING,
      uptime,
      version: '1.0.0',
    });
    mockGetHealthService.mockResolvedValue(mockResponse);

    const result = await getHealthService('svc-uuid');

    expect(mockGetHealthService).toHaveBeenCalledWith({ id: 'svc-uuid' });
    expect(result.id).toBe('svc-uuid');
    expect(result.name).toBe('my-service');
    expect(result.status).toBe(ServiceHealth_ServingStatus.SERVING);
    expect(result.uptime?.seconds).toBe(3600n);
  });

  it('calls with undefined id for overall server health', async () => {
    mockGetHealthService.mockResolvedValue(
      create(ServiceHealthSchema, {
        id: 'server-id',
        name: 'server',
        status: ServiceHealth_ServingStatus.SERVING,
      }),
    );

    await getHealthService();

    expect(mockGetHealthService).toHaveBeenCalledWith({ id: undefined });
  });

  it('propagates NOT_SERVING status', async () => {
    mockGetHealthService.mockResolvedValue(
      create(ServiceHealthSchema, {
        status: ServiceHealth_ServingStatus.NOT_SERVING,
      }),
    );

    const result = await getHealthService();

    expect(result.status).toBe(ServiceHealth_ServingStatus.NOT_SERVING);
  });

  it('rejects when the RPC fails', async () => {
    mockGetHealthService.mockRejectedValue(new Error('connection refused'));

    await expect(getHealthService()).rejects.toThrow('connection refused');
  });

  it('rejects with ConnectError-like messages', async () => {
    mockGetHealthService.mockRejectedValue(new Error('[unavailable] server not reachable'));

    await expect(getHealthService()).rejects.toThrow('[unavailable] server not reachable');
  });
});

describe('healthClient', () => {
  it('exports a pre-configured client', () => {
    expect(healthClient).toBeDefined();
    expect(healthClient).toHaveProperty('listHealthServices');
    expect(healthClient).toHaveProperty('getHealthService');
  });
});

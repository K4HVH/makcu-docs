import { describe, it, expect } from 'vitest';
import { create, toBinary, fromBinary } from '@bufbuild/protobuf';
import {
  ServiceHealthSchema,
  ServiceHealth_ServingStatus,
  ServiceHealthListSchema,
} from '../../src/gen/midnight/midnight_pb';
import {
  IdRequestSchema,
  OptionalIdRequestSchema,
  HealthService,
} from '../../src/gen/midnight/midnight_services_pb';
import { DurationSchema } from '@bufbuild/protobuf/wkt';

describe('IdRequest', () => {
  it('creates a default message with empty id', () => {
    const req = create(IdRequestSchema);
    expect(req.id).toBe('');
  });

  it('creates a message with an id', () => {
    const req = create(IdRequestSchema, { id: 'abc-123' });
    expect(req.id).toBe('abc-123');
  });

  it('roundtrips through binary serialization', () => {
    const original = create(IdRequestSchema, { id: 'test-id' });
    const bytes = toBinary(IdRequestSchema, original);
    const decoded = fromBinary(IdRequestSchema, bytes);
    expect(decoded.id).toBe('test-id');
  });
});

describe('OptionalIdRequest', () => {
  it('creates a default message with undefined id (optional)', () => {
    const req = create(OptionalIdRequestSchema);
    expect(req.id).toBeUndefined();
  });

  it('creates a message with an id', () => {
    const req = create(OptionalIdRequestSchema, { id: 'svc-uuid' });
    expect(req.id).toBe('svc-uuid');
  });

  it('roundtrips through binary serialization', () => {
    const original = create(OptionalIdRequestSchema, { id: 'roundtrip-id' });
    const bytes = toBinary(OptionalIdRequestSchema, original);
    const decoded = fromBinary(OptionalIdRequestSchema, bytes);
    expect(decoded.id).toBe('roundtrip-id');
  });

  it('roundtrips undefined id through binary', () => {
    const original = create(OptionalIdRequestSchema);
    const bytes = toBinary(OptionalIdRequestSchema, original);
    const decoded = fromBinary(OptionalIdRequestSchema, bytes);
    expect(decoded.id).toBeUndefined();
  });

  it('serializes default (no id) to zero bytes', () => {
    const req = create(OptionalIdRequestSchema);
    const bytes = toBinary(OptionalIdRequestSchema, req);
    expect(bytes.length).toBe(0);
  });
});

describe('ServiceHealth', () => {
  it('creates a default message with expected defaults', () => {
    const health = create(ServiceHealthSchema);
    expect(health.id).toBe('');
    expect(health.name).toBe('');
    expect(health.status).toBe(ServiceHealth_ServingStatus.UNSPECIFIED);
    expect(health.interval).toBeUndefined();
    expect(health.uptime).toBeUndefined();
    expect(health.version).toBeUndefined();
    expect(health.message).toBeUndefined();
  });

  it('creates a message with all fields populated', () => {
    const uptime = create(DurationSchema, { seconds: 86400n, nanos: 0 });
    const interval = create(DurationSchema, { seconds: 30n, nanos: 0 });
    const health = create(ServiceHealthSchema, {
      id: 'svc-001',
      name: 'my-service',
      status: ServiceHealth_ServingStatus.SERVING,
      interval,
      uptime,
      version: '1.2.3',
      message: 'All systems operational',
    });
    expect(health.id).toBe('svc-001');
    expect(health.name).toBe('my-service');
    expect(health.status).toBe(ServiceHealth_ServingStatus.SERVING);
    expect(health.interval?.seconds).toBe(30n);
    expect(health.uptime?.seconds).toBe(86400n);
    expect(health.version).toBe('1.2.3');
    expect(health.message).toBe('All systems operational');
  });

  it('roundtrips through binary serialization', () => {
    const uptime = create(DurationSchema, { seconds: 3600n, nanos: 500000000 });
    const original = create(ServiceHealthSchema, {
      id: 'abc',
      name: 'test-svc',
      status: ServiceHealth_ServingStatus.SERVING,
      uptime,
      version: '2.0.0',
      message: 'healthy',
    });
    const bytes = toBinary(ServiceHealthSchema, original);
    const decoded = fromBinary(ServiceHealthSchema, bytes);
    expect(decoded.id).toBe('abc');
    expect(decoded.name).toBe('test-svc');
    expect(decoded.status).toBe(ServiceHealth_ServingStatus.SERVING);
    expect(decoded.uptime?.seconds).toBe(3600n);
    expect(decoded.uptime?.nanos).toBe(500000000);
    expect(decoded.version).toBe('2.0.0');
    expect(decoded.message).toBe('healthy');
  });

  it('roundtrips with optional fields omitted', () => {
    const original = create(ServiceHealthSchema, {
      id: 'x',
      name: 'y',
      status: ServiceHealth_ServingStatus.SERVING,
    });
    const bytes = toBinary(ServiceHealthSchema, original);
    const decoded = fromBinary(ServiceHealthSchema, bytes);
    expect(decoded.version).toBeUndefined();
    expect(decoded.message).toBeUndefined();
    expect(decoded.uptime).toBeUndefined();
    expect(decoded.interval).toBeUndefined();
  });

  it('roundtrips NOT_SERVING status', () => {
    const original = create(ServiceHealthSchema, {
      status: ServiceHealth_ServingStatus.NOT_SERVING,
    });
    const bytes = toBinary(ServiceHealthSchema, original);
    const decoded = fromBinary(ServiceHealthSchema, bytes);
    expect(decoded.status).toBe(ServiceHealth_ServingStatus.NOT_SERVING);
  });

  it('handles large uptime Duration values', () => {
    const oneYear = create(DurationSchema, { seconds: 365n * 24n * 3600n, nanos: 0 });
    const health = create(ServiceHealthSchema, { uptime: oneYear });
    const bytes = toBinary(ServiceHealthSchema, health);
    const decoded = fromBinary(ServiceHealthSchema, bytes);
    expect(decoded.uptime?.seconds).toBe(365n * 24n * 3600n);
  });
});

describe('ServiceHealthList', () => {
  it('creates a default message with empty services array', () => {
    const list = create(ServiceHealthListSchema);
    expect(list.services).toEqual([]);
  });

  it('creates a message with multiple services', () => {
    const svc1 = create(ServiceHealthSchema, {
      id: '1', name: 'svc-a', status: ServiceHealth_ServingStatus.SERVING,
    });
    const svc2 = create(ServiceHealthSchema, {
      id: '2', name: 'svc-b', status: ServiceHealth_ServingStatus.NOT_SERVING,
    });
    const list = create(ServiceHealthListSchema, { services: [svc1, svc2] });
    expect(list.services).toHaveLength(2);
    expect(list.services[0].name).toBe('svc-a');
    expect(list.services[1].name).toBe('svc-b');
  });

  it('roundtrips through binary serialization', () => {
    const svc = create(ServiceHealthSchema, {
      id: 'rt', name: 'roundtrip', status: ServiceHealth_ServingStatus.SERVING,
    });
    const original = create(ServiceHealthListSchema, { services: [svc] });
    const bytes = toBinary(ServiceHealthListSchema, original);
    const decoded = fromBinary(ServiceHealthListSchema, bytes);
    expect(decoded.services).toHaveLength(1);
    expect(decoded.services[0].name).toBe('roundtrip');
  });
});

describe('ServiceHealth_ServingStatus', () => {
  it('has UNSPECIFIED as 0', () => {
    expect(ServiceHealth_ServingStatus.UNSPECIFIED).toBe(0);
  });

  it('has SERVING as 1', () => {
    expect(ServiceHealth_ServingStatus.SERVING).toBe(1);
  });

  it('has NOT_SERVING as 2', () => {
    expect(ServiceHealth_ServingStatus.NOT_SERVING).toBe(2);
  });

  it('has exactly 3 values', () => {
    const values = Object.values(ServiceHealth_ServingStatus).filter(
      (v) => typeof v === 'number',
    );
    expect(values).toHaveLength(3);
  });
});

describe('HealthService descriptor', () => {
  it('has a listHealthServices method', () => {
    expect(HealthService.method.listHealthServices).toBeDefined();
  });

  it('listHealthServices is unary', () => {
    expect(HealthService.method.listHealthServices.methodKind).toBe('unary');
  });

  it('has a getHealthService method', () => {
    expect(HealthService.method.getHealthService).toBeDefined();
  });

  it('getHealthService is unary', () => {
    expect(HealthService.method.getHealthService.methodKind).toBe('unary');
  });

  it('getHealthService uses OptionalIdRequest as input', () => {
    expect(HealthService.method.getHealthService.input).toBe(OptionalIdRequestSchema);
  });

  it('getHealthService uses ServiceHealth as output', () => {
    expect(HealthService.method.getHealthService.output).toBe(ServiceHealthSchema);
  });
});

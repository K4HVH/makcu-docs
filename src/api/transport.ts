import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { createClient, type Client } from '@connectrpc/connect';
import type { GenService } from '@bufbuild/protobuf/codegenv2';

/**
 * Default base URL for the gRPC-Web backend.
 * Override via VITE_API_BASE_URL environment variable.
 */
const DEFAULT_BASE_URL = 'http://localhost:50051';

/**
 * Creates a gRPC-Web transport configured for the application.
 * Communicates with a tonic server running tonic-web (gRPC-Web layer).
 */
export function createTransport(baseUrl?: string) {
  return createGrpcWebTransport({
    baseUrl: baseUrl ?? import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL,
  });
}

/**
 * Shared transport instance for the application.
 * All service clients should use this unless a different endpoint is needed.
 */
export const transport = createTransport();

/**
 * Creates a typed gRPC-Web client for a given service definition.
 *
 * @example
 * ```ts
 * import { HealthService } from '../gen/midnight/midnight_services_pb';
 * const healthClient = createServiceClient(HealthService);
 * const response = await healthClient.listHealthServices({});
 * ```
 */
export function createServiceClient<T extends GenService<any>>(
  service: T,
  baseUrl?: string,
): Client<T> {
  const t = baseUrl ? createTransport(baseUrl) : transport;
  return createClient(service, t);
}

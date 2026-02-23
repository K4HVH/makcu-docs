import { createServiceClient } from './transport';
import { HealthService } from '../gen/midnightui/health_pb';

/**
 * Pre-configured health service client.
 * Uses the shared gRPC-Web transport to communicate with the backend.
 */
export const healthClient = createServiceClient(HealthService);

/**
 * Convenience function to perform a health check.
 * Returns the server's health status, version, and uptime.
 *
 * @param service - Optional service name to check. Empty string checks overall health.
 */
export async function checkHealth(service = '') {
  return healthClient.check({ service });
}

import { createServiceClient } from './transport';
import { HealthService } from '../gen/midnight/midnight_services_pb';

/**
 * Pre-configured health service client.
 * Uses the shared gRPC-Web transport to communicate with the backend.
 */
export const healthClient = createServiceClient(HealthService);

/**
 * List all registered health services and their current status.
 */
export async function listHealthServices() {
  return healthClient.listHealthServices({});
}

/**
 * Get the health of a specific service by ID, or the overall server health.
 *
 * @param id - Optional service UUID. Omit or leave empty for overall server health.
 */
export async function getHealthService(id?: string) {
  return healthClient.getHealthService({ id });
}

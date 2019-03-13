export type FluxType = string;
/**
 * Action conformed to FSA
 */
export interface FSA<Payload = void> {
  readonly type: FluxType;
  payload: Payload;
  error?: boolean;
  meta?: any;
}

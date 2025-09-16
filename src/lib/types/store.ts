export type GenericApiResponse = {
  success: boolean;
  message: string;
};

export type ResponseState<T> = GenericApiResponse & T;

export interface ErrorPayload extends GenericApiResponse {
  status?: number;
}

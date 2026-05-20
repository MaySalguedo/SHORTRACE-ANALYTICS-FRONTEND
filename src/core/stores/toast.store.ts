import { writable } from 'svelte/store';
import type { AxiosError } from 'axios';

interface ErrorDetails {
  status?: number;
  statusText?: string;
  url?: string;
  message: string;
  timestamp: string;
}

interface ToastState {
  visible: boolean;
  errorDetails: ErrorDetails | null;
}

export const toastStore = writable<ToastState>({
  visible: false,
  errorDetails: null
});

let timeoutId: ReturnType<typeof setTimeout>;

const getNormalizedTimestamp = (): string => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0];
  return `${date} ${time}`;
};

export const showErrorToast = (error: AxiosError | Error, durationMs = 6000) => {
  if (timeoutId) clearTimeout(timeoutId);

  let details: ErrorDetails;
  const timestamp = getNormalizedTimestamp();

  if ('isAxiosError' in error && error.isAxiosError) {
    const axiosError = error as AxiosError<unkown>;

    details = {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      message: axiosError.response?.data?.message || axiosError.message,
      url: axiosError.config?.url
        ? new URL(axiosError.config.url, axiosError.config.baseURL).pathname
        : undefined,
      timestamp
    };
  } else {
    details = { message: error.message, timestamp };
  }

  toastStore.set({ visible: true, errorDetails: details });

  timeoutId = setTimeout(() => {
    toastStore.set({ visible: false, errorDetails: null });
  }, durationMs);
};

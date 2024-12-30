import { AxiosError } from 'axios';

const isObject = (value: unknown): value is Record<string, any> => {
    return value !== null && !Array.isArray(value) && typeof value === 'object';
};

export function parseErrorMessage(error: unknown): string {
    if ((error as AxiosError).isAxiosError) {
        return (
            (error as AxiosError).message +
            ` response: ${JSON.stringify(
                (error as AxiosError)?.response?.data ?? {},
            )}`
        );
    }

    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    if (isObject(error)) {
        return error.message && typeof error.message === 'string'
            ? error.message
            : JSON.stringify(error);
    }

    return JSON.stringify(error);
}

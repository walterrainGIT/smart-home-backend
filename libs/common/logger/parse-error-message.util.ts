export function parseErrorMessage(error: any): string {
    if (error instanceof Error) {
        const errorMessage = error.message;

        const regex = /ERRORS\.[A-Za-z0-9_]+/;
        const match = errorMessage.match(regex);

        if (match) {
            return match[0];
        }
    }
    return 'Unknown error';
}

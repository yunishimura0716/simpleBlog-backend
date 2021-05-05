class BaseError extends Error {
    public name: string;
    public status: number;

    constructor(errorName: string, errorMessage: string, status: number) {
        super(errorMessage);
        this.name = errorName;
        this.status = status;
    }
}

export { BaseError };
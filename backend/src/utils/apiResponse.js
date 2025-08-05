class apiResponse {
    constructor(statusCode, data, message = "Success", errors = []) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.errors = errors;
        this.success = statusCode < 400;

        if (errors.length > 0) {
            this.errors = errors;
        }
    }
}

export { apiResponse };

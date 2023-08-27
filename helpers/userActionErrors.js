import { UserActionError } from './error.handler.js';

class BadRequestError extends UserActionError {
    constructor(message, options = {}) {
        super(message);
        for (const [key, value] of Object.entries(options)) {
            this[key] = value;
        }
    }

    get statusCode() {
        return 400;
    }
}


class NotFoundError extends UserActionError {
    constructor(message, options = {}) {
        super(message);
        for (const [key, value] of Object.entries(options)) {
            this[key] = value;
        }
    }
    get statusCode() {
        return 404
    }
}

export {
    BadRequestError,
    NotFoundError
}
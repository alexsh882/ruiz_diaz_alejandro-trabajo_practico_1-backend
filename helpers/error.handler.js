'use strict';

class ApplicationError extends Error {
    get name() {
        return this.constructor.name;
    }
}

// Cualquier error relacionado con las operaciones de la base de datos 
// se heredará de esta clase.
class DatabaseError extends ApplicationError { }


// Cualquier error producido como resultado de la interacción de un usuario 
// con la aplicación se heredaría de esta clase.
class UserActionError extends ApplicationError { }

export {
    ApplicationError,
    DatabaseError,
    UserActionError
}

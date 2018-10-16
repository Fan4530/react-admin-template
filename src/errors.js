export class AuthError extends Error {
	constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, AuthError)
    }
}

export class IncorrectJsonError extends Error {
	constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, IncorrectJsonError)
    }
}

export class SomethingWrongError extends Error {
	constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, SomethingWrongError)
    }
}

export class ComponentError extends Error {
	constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, ComponentError)
    }
}

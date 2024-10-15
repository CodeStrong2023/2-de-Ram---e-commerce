export class NotFoundException extends Error {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundException";
    this.status = 404;
  }
}

export class BadRequestException extends Error {
  constructor(message = "Bad request") {
    super(message);
    this.name = "BadRequestException";
    this.status = 400;
  }
}

export class UnauthorizedException extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedException";
    this.status = 401;
  }
}

export class ForbiddenException extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenException";
    this.status = 403;
  }
}

export class ConflictException extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.name = "ConflictException";
    this.status = 409;
  }
}

export class InternalServerErrorException extends Error {
  constructor(message = "Internal server error") {
    super(message);
    this.name = "InternalServerErrorException";
    this.status = 500;
  }
}

export class NotImplementedException extends Error {
  constructor(message = "Not implemented") {
    super(message);
    this.name = "NotImplementedException";
    this.status = 501;
  }
}

export class ServiceUnavailableException extends Error {
  constructor(message = "Service unavailable") {
    super(message);
    this.name = "ServiceUnavailableException";
    this.status = 503;
  }
}

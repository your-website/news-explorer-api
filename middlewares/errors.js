// eslint-disable-next-line max-classes-per-file
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class NotImplemented extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 501;
  }
}

module.exports = { NotFoundError, Unauthorized, NotImplemented };

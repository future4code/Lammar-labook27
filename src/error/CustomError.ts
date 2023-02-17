export class CustomError extends Error {
    constructor(public statusCode:number, public message:string) {
        super(message)
    }
}

export class Unauthorized extends CustomError {
    constructor() {
      super(401, "usuário não autorizado");
    }
  }
  
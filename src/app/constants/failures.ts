export class Failure {
  constructor(public message: string) {}
}

export class RequestFailure extends Failure {}

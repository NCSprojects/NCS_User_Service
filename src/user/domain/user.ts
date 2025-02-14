export class User {
  randomId: string;
  preRev: boolean;
  adCnt: number;
  cdCnt: number;
  regDt: Date;

  constructor() {}

  public create(
    randomId: string,
    preRev: boolean,
    adCnt: number,
    cdCnt: number,
    regDt: Date,
  ): User {
    this.randomId = randomId;
    this.adCnt = adCnt;
    this.cdCnt = cdCnt;
    this.preRev = preRev;
    this.regDt = regDt;
    return this;
  }
}

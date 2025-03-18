export class User {
  randomId: string;
  preRev: boolean;
  adCnt: number;
  cdCnt: number;
  regDt: Date;
  manuYn: boolean;

  constructor() {}

  public create(
    randomId: string,
    preRev: boolean,
    adCnt: number,
    cdCnt: number,
    regDt: Date,
    manuYn: boolean,
  ): User {
    this.randomId = randomId;
    this.adCnt = adCnt;
    this.cdCnt = cdCnt;
    this.preRev = preRev;
    this.regDt = regDt;
    this.manuYn = manuYn;
    return this;
  }
  public autoCheck(): boolean {
    if (this.manuYn) {
      return true;
    }
    return false;
  }
}

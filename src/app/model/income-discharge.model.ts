export class IncomeDischarge {

  amount: number;
  description: string;
  type: string;
  uid: string;

  static fromFirebase({ uid, amount, description, type }: any): IncomeDischarge {
    return new IncomeDischarge(amount, description, type, uid);
  }

  constructor( amount: number, description: string, type: string, uid: string) {
    this.amount = amount;
    this.description = description;
    this.type = type
    this.uid = uid
  }

}

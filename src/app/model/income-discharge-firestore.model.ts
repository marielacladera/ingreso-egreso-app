export class IncomeDischargeFirestore {

  amount: number;
  description: string;
  type: string;

  static fromFirebase({ amount, description, type }: any): IncomeDischargeFirestore {
    return new IncomeDischargeFirestore( amount, description, type);
  }

  constructor( amount: number, description: string, type: string) {
    this.amount = amount;
    this.description = description;
    this.type = type;
  }

}

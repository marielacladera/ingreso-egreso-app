import { Pipe, PipeTransform } from '@angular/core';
import { IncomeDischarge } from '../model/income-discharge.model';

@Pipe({
  name: 'orderIncomeDischarge'
})
export class OrderIncomeDischargePipe implements PipeTransform {

  transform( items: IncomeDischarge[]): IncomeDischarge[] {
    return items.slice().sort((a, b) => {
      return( a.type === 'income')? -1: 1;
    });
  }

}

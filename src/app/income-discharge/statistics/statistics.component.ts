import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeDischarge } from 'src/app/model/income-discharge.model';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {

  public income: number;
  public discharge: number;

  public totalIncome: number;
  public totalDischarge: number;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [  ] }
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  constructor(
    private _store: Store<AppState>,
    private _cdr: ChangeDetectorRef
  ) {
    this.income = 0;
    this.discharge = 0;
    this.totalDischarge = 0;
    this.totalIncome = 0;
  }

  ngOnInit(): void {
    this._initialize();
  }

  private _initialize() {
    this._store.select('incomeDischarge').subscribe(({items}) => {
      this.generateStatistic(items);
      this._cdr.markForCheck();
    });

  }

  public generateStatistic(items: IncomeDischarge[]) {
    for(const item of items){
      if(item.type === 'income') {
        this.totalIncome += item.amount*1;
        this.income ++;
      } else {
        this.totalDischarge += item.amount*1;
        this.income ++;
      }
    }
    this.doughnutChartDatasets = [
      { data: [ this.totalIncome, this.totalDischarge ] }
    ];
  }
}

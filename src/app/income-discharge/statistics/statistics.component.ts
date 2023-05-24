import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeDischarge } from 'src/app/model/income-discharge.model';
import { ChartConfiguration } from 'chart.js';
import { AppStateWithIncome } from '../income-discharge.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {

  public income: number;
  public discharge: number;
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [] }
  ];
  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos'];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };
  public totalIncome: number;
  public totalDischarge: number;

  constructor(
    private _store: Store<AppStateWithIncome>,
    private _cdr: ChangeDetectorRef
  ) {
    this.totalDischarge = 0;
    this.totalIncome = 0;
    this.discharge = 0;
    this.income = 0;
  }

  public ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {
    this._store.select('incomeDischarge').subscribe(({items}) => {
      this._generateStatistic(items);
      this._cdr.markForCheck();
    });
  }

  private _generateStatistic(items: IncomeDischarge[]): void {
    for(const item of items){
      if(item.type === 'income') {
        this.totalIncome += item.amount*1;
        this.income ++;
      } else {
        this.totalDischarge += item.amount*1;
        this.income ++;
      }
    }
    this._loadDoughnutChart();
  }

  private _loadDoughnutChart(): void {
    this.doughnutChartDatasets = [
      { data: [ this.totalIncome, this.totalDischarge ] }
    ];
  }

}

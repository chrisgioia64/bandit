import { Component, OnInit } from '@angular/core';
import { ExperimentService } from '../experiment.service';
import { ActivatedRoute } from '@angular/router';
import { Experiment } from '../experiment.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CanvasJS, CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-experiment1',
  templateUrl: './experiment1.component.html',
  styleUrl: './experiment1.component.css',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    CanvasJSAngularChartsModule
  ]
})
export class Experiment1Component implements OnInit {

  experiment : any = null;
  distributionList : any = [];
  algorithmKeys : any = [];
  formGroup : FormGroup;
  timeStep : number = 1;
  n : any = 1;

  leftAlgorithmDatum : Datum = new Datum();
  rightAlgorithmDatum : Datum = new Datum();

  leftAlgorithmData : any = [];
  rightAlgorithmData : any = [];

  meanRegretList : RegretDatum[] = [];
  percentOptimalList : RegretDatum[] = [];

  constructor(private expService :ExperimentService, private route: ActivatedRoute) {
    this.formGroup = new FormGroup({
      leftAlgorithm: new FormControl(),
      rightAlgorithm: new FormControl(),
      stepChooser : new FormControl(null)
    });
    this.formGroup.get('stepChooser')?.setValue(0);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('experimentId')
    const idNumber = Number(id);

    this.chart = new CanvasJS.Chart("chartContainer",
    {
      animationEnabled: true,
      theme: "light2",
      title: {
      },
      // axisX: {
      // 	valueFormatString: "MMM",
      // 	intervalType: "month",
      // 	interval: 1
      // },
      axisY: {
        title: "Cumulative Regret",
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: function(e: any){
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else{
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        type:"line",
        name: "Left",
        showInLegend: true,
        yValueFormatString: "#,###.##",
        dataPoints: this.leftAlgorithmData
      },
      {
        type: "line",
        name: "Right",
        showInLegend: true,
        yValueFormatString: "#,###.##",
        dataPoints: this.rightAlgorithmData
      }]
      });
    this.chart.render();

    let observable = this.expService.getExperimentById(idNumber);
    observable.subscribe( experiment => {
      this.experiment = new Experiment(experiment);
      this.distributionList = this.experiment.distributionInfo;
      this.algorithmKeys = Object.keys(this.experiment.algorithmMap);
      this.n = this.experiment.n;
      this.formGroup.get('leftAlgorithm')?.setValue("1");
      this.formGroup.get('rightAlgorithm')?.setValue("1");
    });
  }

  getChartInstance(event : any) {
    return this.chart;
  }

  updateTimeStep() {
    let value = this.formGroup.get('stepChooser')?.value;
    this.timeStep = value;
    this.updateLeft();
    this.updateRight();

    this.meanRegretList = [];
    let keys = this.algorithmKeys;
    for (let i = 0; i < keys.length; i++) {
        let algorithmName = this.experiment.algorithmMap[keys[i]];
        let data = this.experiment.dataMap[keys[i]][this.timeStep-1];
        let regret = data.cumulativeRegret;
        let datum : RegretDatum = new RegretDatum();
        datum.algorithmName = algorithmName;
        datum.value = regret;
        this.meanRegretList.push(datum);
    }
    this.meanRegretList.sort(function(a, b) {
        let keyA = a.value,
        keyB = b.value;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    this.percentOptimalList = [];
    keys = this.algorithmKeys;
    for (let i = 0; i < keys.length; i++) {
        let algorithmName = this.experiment.algorithmMap[keys[i]];
        let data = this.experiment.dataMap[keys[i]][this.timeStep-1];
        let optimal = data.percentOptimal;
        let datum : RegretDatum = new RegretDatum();
        datum.algorithmName = algorithmName;
        datum.value = optimal;
        this.percentOptimalList.push(datum);
    }
    this.percentOptimalList.sort(function(a, b) {
        let keyA = a.value,
        keyB = b.value;
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });

  }

  updateLeft() {
    let value = this.formGroup.get('leftAlgorithm')?.value;
    let data = this.experiment.dataMap[value][this.timeStep-1];
    this.leftAlgorithmDatum.meanRegret = data.cumulativeRegret;
    this.leftAlgorithmDatum.percentOptimal = data.percentOptimal;
    this.leftAlgorithmDatum.varianceRegret = data.varianceRegret;
    this.leftAlgorithmDatum.sdRegret = Math.sqrt(data.varianceRegret);
    this.leftAlgorithmDatum.lowerRegret = data.cumulativeRegret - Math.sqrt(data.varianceRegret);
    this.leftAlgorithmDatum.upperRegret = data.cumulativeRegret + Math.sqrt(data.varianceRegret);

    let dataAll = this.experiment.dataMap[value];
    this.leftAlgorithmData = [];
    for (let i = 0; i < dataAll.length; i++) {
      let x = i + 1;
      let y = dataAll[i]['cumulativeRegret'];
      let c = {x : x, y: y};
      this.leftAlgorithmData.push(c);
    }
    this.chart.options.data[0].dataPoints = this.leftAlgorithmData;
    console.log(this.chart);
    this.chart.render();
  }

  updateRight() {

    let value = this.formGroup.get('rightAlgorithm')?.value;
    let data = this.experiment.dataMap[value][this.timeStep-1];
    this.rightAlgorithmDatum.meanRegret = data.cumulativeRegret;
    this.rightAlgorithmDatum.percentOptimal = data.percentOptimal;
    this.rightAlgorithmDatum.varianceRegret = data.varianceRegret;
    this.rightAlgorithmDatum.sdRegret = Math.sqrt(data.varianceRegret);
    this.rightAlgorithmDatum.lowerRegret = data.cumulativeRegret - Math.sqrt(data.varianceRegret);
    this.rightAlgorithmDatum.upperRegret = data.cumulativeRegret + Math.sqrt(data.varianceRegret);

    let dataAll = this.experiment.dataMap[value];
    this.rightAlgorithmData = [];
    for (let i = 0; i < dataAll.length; i++) {
      let x = i + 1;
      let y = dataAll[i]['cumulativeRegret'];
      let c = {x : x, y: y};
      this.rightAlgorithmData.push(c);
    }
    this.chart.options.data[1].dataPoints = this.rightAlgorithmData;

    console.log('right algorithm data');
    console.log(this.rightAlgorithmData);
    this.chart.render();
  }

  chart : any;


}

export class Datum {
  meanRegret : number = 0;
  percentOptimal : number = 0;
  varianceRegret : number = 0;
  sdRegret : number = 0;
  upperRegret : number = 0;
  lowerRegret : number = 0;
}

export class RegretDatum {
  algorithmName : string = "";
  value : number = 0;
}

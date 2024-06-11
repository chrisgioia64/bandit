import { Component } from '@angular/core';
import { ExperimentService } from '../experiment.service';
import { ExperimentInfo } from '../experiment-info';
import exp from 'constants';

@Component({
  selector: 'app-view-experiments',
  templateUrl: './view-experiments.component.html',
  styleUrl: './view-experiments.component.css'
})
export class ViewExperimentsComponent {

  experiments : ExperimentInfo[] = [];

  constructor(private expService :ExperimentService) {
  }

  ngOnInit(): void {
    console.log("Hello world");
    let observable = this.expService.getExperiments();
    observable.subscribe( value => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        let experiment = value[keys[i]];
        let dName = this.getDistributionName(experiment);
        console.log(experiment);
        // console.log(dName);
        let n = this.getN(experiment);
        // console.log(n);
        let expermentInfo : ExperimentInfo = {
          id : keys[i],
          n : n,
          bandit : dName
        };
        this.experiments.push(expermentInfo);
      }
    });
  }

  getN(experiment : any) {
    let datapoints = experiment['dataPointMaps'];
    let keys = Object.keys(datapoints);
    let key1 = keys[0];
    return datapoints[key1].length;
  }

  getDistributionName(experiment : any) {
    let str = "";
    let d = experiment['banditEntity']['distributions'];
    let keys = Object.keys(d);
    for (let i = 0; i < keys.length; i++) {
      let dName = d[keys[i]]['distributionName'];
      let parameters = d[keys[i]]['parameters'];
      let parameterStr = "";
      for (let j = 0; j < parameters.length; j++) {
        let parameter = parameters[j]['parameterName'] + ": " + parameters[j]['parameterValue'];
        parameterStr += parameter + ", ";
      }
      parameterStr = parameterStr.slice(0, parameterStr.length - 2);
      str += "(" + dName + " " + parameterStr + ") ";
    }
    return str;
  }

}

export class Experiment {

  jsonObject : any;
  n : number = 0;
  distributionInfo : any[] = [];
  algorithmMap : any;
  dataMap : any;

  constructor(jsonObject : any) {
    this.jsonObject = jsonObject;
    this.n = this.calculateN();
    this.distributionInfo = this.calculateDistributionInfo();
    this.algorithmMap = this.calculateAlgorithmMap();
    this.dataMap = this.calculateDataMap();
  }

  calculateAlgorithmMap() {
    let map : any = {};
    let keys = Object.keys(this.jsonObject['dataPointMaps']);
    let dpMaps = this.jsonObject['dataPointMaps'];
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      let dp = dpMaps[k];
      let algorithm = dp[0]['experimentParameter']['algorithm'];
      let str = "";
      let algorithmName = algorithm['algorithmName'];
      let params = algorithm['parameters'];
      for (let i = 0; i < params.length; i++) {
        str += params[i]['parameterName'] + ": " + params[i]['value'] + ", ";
      }
      str = str.slice(0, str.length - 2);
      map[k] =  algorithmName + "(" + str + ")";
    }
    return map;
  }

  calculateDataMap() {
    let map : any = {};
    let dpMaps = this.jsonObject['dataPointMaps'];
    let keys = Object.keys(this.jsonObject['dataPointMaps']);
    for (let i = 0; i < keys.length; i++) {
      map[keys[i]] = dpMaps[keys[i]];
    }
    return map;
  }

  calculateN() {
    let datapoints = this.jsonObject['dataPointMaps'];
    let keys = Object.keys(datapoints);
    let key1 = keys[0];
    return datapoints[key1].length;
  }

  calculateDistributionInfo() {
    let result = [];
    let d = this.jsonObject['banditEntity']['distributions'];
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
      result.push(dName + " " + parameterStr);
    }
    return result;
  }
}

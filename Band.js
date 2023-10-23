export default class Band{
  bandName;
  bandInfo;
  foundedYear;
  disolvedYear;
  currentMembers=[]
  previousMembers=[]
  constructor(newBandName, newBandInfo, founded, disolved) {
    this.bandName = newBandName;
    this.bandInfo = newBandInfo;
    this.foundedYear = founded;
    this.disolvedYear = disolved;
  }
} 
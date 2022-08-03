class Speed {
  connectionType: string;
  speed: number;
  unit: string;
  readonly id: Date;

  constructor(connectionType : string, speed : number, unit : string) {
    this.connectionType = connectionType;
    this.speed = speed;
    this.unit = unit;
    this.id = new Date();
  }

  

  getAllData(): object {
    return {
      id: this.id,
      connectionType: this.connectionType,
      unit: this.unit,
      speed: this.speed,
    };
    }
   
}


export default Speed;
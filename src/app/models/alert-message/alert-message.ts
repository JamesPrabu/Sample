export enum AlertType {
    success,
    info,
    warning,
    danger,
    primary,
    secondary,
    light,
    dark
  }
  
  export type AlertTypeString = keyof typeof AlertType;
  
  export class Alert {
    public type: AlertTypeString;
    public message: string;
    public duration: number;
    constructor() {
    }
  }
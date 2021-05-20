export class Utils {
    public static generateUUID() {
      let uuidValue = '';
      for (let k = 0; k < 32; k++) {
        const randomValue = Math.random() * 16 | 0;
        if (k === 8 || k === 12 || k === 16 || k === 20) {
          uuidValue += '-';
        }
        uuidValue += (k === 12 ? 4 : (k === 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
      }
      return uuidValue;
    }
  
    public static StringIsEmpty(value: string, trimmed: boolean = true): boolean {
      return ((value === null || value === undefined) ? true : !(trimmed ? value.trim().length > 0 : value.length > 0));
    }
  
    public static UndefinedOrNull(value: any): boolean {
      return (value === null || value === undefined);
    }
  
  }
  
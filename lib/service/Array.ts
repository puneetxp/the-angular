class _Array {
 static mergeArray(data: any[], arrayarray: Record<string, any>): any {
  return data.map((element) => {
   arrayarray[element.key] && element.Validators.push(...arrayarray[element.key]);
   return element
  });
 }
 static replaceArray(data: any[], values: Record<string, any>): any {
  return data.map((element) => {
   values[element.key] && (element.value = values[element.key]);
   return element
  });
 }
 static setArray(data: any[], arrayarray: Record<string, any>, value1: Record<string, any> = {}, value2: Record<string, any> = {}): any {
  return data.map((element) => {
   arrayarray[element.key] && element.Validators.push(...arrayarray[element.key]);
   value1[element.key] && (element.value = value1[element.key]);
   value2[element.key] && (element.value = value2[element.key]);
   return element;
  });
 }
}
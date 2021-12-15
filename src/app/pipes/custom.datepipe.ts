import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe extends
    DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, "dd/MM/y");
    }
}

@Pipe({
    name: 'customDateAndTime'
  })
  export class CustomDateAndTimePipe extends 
               DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
      return super.transform(value, "d MMMM y HH:mm:ss");
    }
  }
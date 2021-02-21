import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'employee'
})
export class EmployeeCapabilityPipe implements PipeTransform {
    protected values: [] = [];

    transform(value: [], ...args: unknown[]): Array<string> {
        return this.getOnlyEmployees(value);
    }

    protected getOnlyEmployees(caps: []): Array<string> {
        return caps.filter((cap: string): boolean => cap.includes('employee')).map((cap: string) => cap.replace('employee_', ''));
    }
}

export class Employee {
  public id: number | undefined;
  public name: string | undefined;
  public empId: string | undefined;
  public email: string | undefined;
  public position: string | undefined;
  public team: string | undefined;
  public roleId: number;
  public phone: string | undefined;

  constructor(employee: {
    id: number,
    name: string,
    emp_id: string,
    email: string,
    position: string,
    team: string,
    role_id: number,
    phone: string,
  }) {
    this.id = employee.id;
    this.name = employee.name;
    this.empId = employee.emp_id;
    this.email = employee.email;
    this.position = employee.position;
    this.team = employee.team;
    this.roleId = employee.role_id;
    this.phone = employee.phone;
  }
}

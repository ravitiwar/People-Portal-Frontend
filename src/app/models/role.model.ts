export class Role {
    public title: string;
    public id: number;
    public capabilities: [string];

    constructor(role: { id: number; title: string; capabilities: [string] }) {
        this.id = role.id;
        this.title = role.title;
        this.capabilities = role.capabilities;
    }
}
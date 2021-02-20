export class User {
    public capabilities: [string];
    public details: { name: string; } | undefined;
    public role: string | undefined;

    constructor(res: {
        id: number,
        name: string,
        emp_id: string,
        email: string,
        position: string,
        team: string,
        role_id: number,
        phone: string,
        role: {
            id: number,
            title: string,
            capabilities: [string]
        }
    }) {
        this.capabilities = res.role.capabilities;
        this.role = res.role.title;
        this.details = {name: res.name};

    }


    public getCapabilities(): [string] {
        return this.capabilities;
    }


    public getName(): string {
        return (this.details?.name) as string;
    }

    public getRole(): string {
        return this.role as string;
    }

}

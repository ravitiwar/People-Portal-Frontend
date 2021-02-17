export class User {
    public accessToken: string | undefined;
    public refreshToken: string | undefined;
    public expiresIn: number;
    public capabilities: [] | undefined;
    public details: { name: string, role: { title: string, capabilities: [] } } | undefined;
    public role: string | undefined;

    // tslint:disable-next-line:max-line-length
    constructor(res: { success: boolean, data: { access_token: string, refresh_token: string, expires_in: number, details: { name: string, role: { title: string, capabilities: [] } } } }) {
        this.refreshToken = res.data.refresh_token;
        this.accessToken = res.data.access_token;
        this.expiresIn = res.data.expires_in;
        this.details = res.data.details;
        this.capabilities = res.data.details.role.capabilities;
        this.role = res.data.details.role.title;

    }

    public getRefreshToken(): string | undefined {
        return this.refreshToken;
    }

    public getAccessToken(): string | undefined {
        return this.accessToken;
    }

    public getCapabilities(): [] | undefined {
        return this.capabilities;
    }

    public isUserLoggedIn(): boolean {
        return (this.accessToken !== undefined);
    }

    public getName(): string {
        return (this.details?.name) as string;
    }

    public getRole(): string {
        return this.details?.role.title as string;
    }

}

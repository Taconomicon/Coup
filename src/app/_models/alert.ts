export class Alert {
    id: number;
    message: string;
    success: boolean;

    constructor(message: string, success: boolean) {
        this.id = new Date().getMilliseconds();
        this.message = message;
        this.success = success;
    }
}

export interface Controller {
    (...args: string[]): Promise<void>;
}

export interface Routes {
    [routeName: string]: Controller;
}

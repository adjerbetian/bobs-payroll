export class RoutingError extends Error {
    public constructor(route: string) {
        super(`Routing error: no route matching "${route}"`);
    }
}

import * as _ from "lodash";
import { RoutingError } from "./errors";

export interface Router {
    processCommand(...args: string[]): Promise<void>;
}

export type Controller = (...args: string[]) => Promise<void>;
export interface Routes {
    [routeName: string]: Controller;
}
export interface Logger {
    log: (...args: any) => Promise<void> | void;
}

export function makeRouter(routes: Routes, logger: Logger): Router {
    return {
        async processCommand(routeName: string, ...routeParams: string[]) {
            try {
                assertRouteExists(routeName);
                await routes[routeName as keyof Routes](...routeParams);
            } catch (err) {
                await logger.log("AN ERROR HAS OCCURRED", err);
            }
        }
    };

    function assertRouteExists(routeName: string): void {
        if (!_.has(routes, routeName)) {
            throw new RoutingError(routeName);
        }
    }
}

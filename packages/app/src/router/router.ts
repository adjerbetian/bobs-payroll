import * as _ from "lodash";
import { RoutingError } from "../errors";

export interface Router {
    addRoutes(routes: Routes): void;
    processCommand(...args: string[]): Promise<void>;
}

type Controller = (...args: string[]) => Promise<void>;
export interface Routes {
    [routeName: string]: Controller;
}
export interface Logger {
    log: (...args: any) => Promise<void> | void;
}

export function buildRouter(logger: Logger): Router {
    const routes: Routes = {};

    return {
        addRoutes(newRoutes) {
            Object.assign(routes, newRoutes);
        },
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

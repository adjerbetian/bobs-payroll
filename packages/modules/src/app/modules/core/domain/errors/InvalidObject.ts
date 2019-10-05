export class InvalidObject extends Error {
    public constructor(object: any) {
        super(`Invalid object "${JSON.stringify(object)}"`);
    }
}

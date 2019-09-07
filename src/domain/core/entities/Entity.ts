export interface Entity<T> {
    toJSON(): any;
    equals(entity: T): boolean;
}

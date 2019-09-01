import { CreateUnionMember } from "./createUnionMember";
import { RemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";

export interface CoreUnionActions {
    createUnionMember: CreateUnionMember;
    removeEmployeeFromUnion: RemoveEmployeeFromUnion;
}

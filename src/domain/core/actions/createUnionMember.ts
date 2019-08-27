import { UnionMember } from "../entities";
import { UnionMemberRepository } from "../repositories";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
}

export type CreateUnionMemberAction = (unionMember: UnionMember) => Promise<void>;

export function buildCreateUnionMemberAction({ unionMemberRepository }: Dependencies) {
    return async function(unionMember: UnionMember): Promise<void> {
        await unionMemberRepository.insert(unionMember);
    };
}

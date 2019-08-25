import { ServiceCharge } from "../entities";

export interface ServiceChargeRepository {
    fetchAll(): Promise<ServiceCharge[]>;
    fetchAllOfMember(memberId: string): Promise<ServiceCharge[]>;
    insert(serviceCharge: ServiceCharge): Promise<void>;
}

import { CoreEmployeeActions } from "./employees";
import { CorePaymentMethodActions } from "./paymentMethod";
import { CoreSalesReceiptActions } from "./salesReceipts";
import { CoreServiceChargeActions } from "./serviceCharges";
import { CoreTimeCardActions } from "./timeCards";
import { CoreUnionActions } from "./union";

export type CoreActions = CoreEmployeeActions &
    CorePaymentMethodActions &
    CoreSalesReceiptActions &
    CoreServiceChargeActions &
    CoreTimeCardActions &
    CoreUnionActions;

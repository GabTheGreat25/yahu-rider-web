import { AkitaNgEffectsModule } from "@datorama/akita-ng-effects";
import { AuthEffects } from "./auth";
import { DeliveriesEffects } from "./deliveries";
import { OrdersEffects } from "./orders";
import { ParcelsEffects } from "./parcels";
import { RidersEffects } from "./riders";

export * from "./query";
export * from "./services";
export * from "./store";

export const AkitaStateEffects = AkitaNgEffectsModule.forFeature([
  RidersEffects,
  OrdersEffects,
  AuthEffects,
  DeliveriesEffects,
  ParcelsEffects,
]);

import type { Dong } from "~/models/dong";

export interface InventoryShortageSituation {
  dong: Dong;
  shortageCount: number;
}

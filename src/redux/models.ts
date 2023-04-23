import { Models } from "@rematch/core";

/* ENTITIES */

/* MODELS */
import {
  layoutModel,
  storeName as layoutModelStoreName,
} from "./models/layout.model";

export interface RootModel extends Models<RootModel> {
  /* ENTITIES */

  // [userContactStoreName]: typeof userContactEntity;

  /* MODELS */

  [layoutModelStoreName]: typeof layoutModel;
}

export const models: RootModel = {
  /* ENTITIES */

  /* MODELS */

  [layoutModelStoreName]: layoutModel,
};

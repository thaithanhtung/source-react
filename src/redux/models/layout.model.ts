import { createModel } from "@rematch/core";
import produce from "immer";

import { RootModel } from "../models";

export const storeName = "layoutModel";

type LayoutModelTypes = {
  isMobileDevice: boolean;
};

const initialState: LayoutModelTypes = {
  isMobileDevice: false,
};

export const layoutModel: any = createModel<RootModel>()({
  name: storeName,
  state: initialState,
  reducers: {
    setMobileDevice: produce((state, payload: boolean) => {
      state.isMobileDevice = payload;
    }),
  },
});

export default layoutModel;

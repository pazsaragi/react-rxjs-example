import { Action } from "redux";
import { MetaActions } from "./types";

export function appBootstrap(): Action {
  return {
    type: MetaActions.APP_BOOTSTRAP
  };
}

export function appBootstrapSuccess(): Action {
  return {
    type: MetaActions.APP_BOOTSTRAP_SUCCESS
  };
}

export function appBootstrapFailed(): Action {
  return {
    type: MetaActions.APP_BOOTSTRAP_FAILED
  };
}

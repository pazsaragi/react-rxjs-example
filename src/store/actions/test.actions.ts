import { Action, AnyAction } from "redux";
import { TestActions } from "./types";
import { Fake } from "models/Fake";

export function fetchFake(): Action {
  return {
    type: TestActions.INCREMENT
  };
}

export function fetchFakeFailed(reason: string): AnyAction {
  return {
    type: TestActions.INCREMENT_FAILURE,
    payload: {
      error: reason
    }
  };
}

export function fetchFakeSuccess(fake: Fake): AnyAction {
  return {
    type: TestActions.INCREMENT,
    payload: {
      fake
    }
  };
}

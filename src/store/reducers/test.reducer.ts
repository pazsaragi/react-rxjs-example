import { AnyAction } from "redux";
import { TestActions } from "store/actions/types";
import { Fake } from "models/Fake";

interface State {
  loading: boolean;
  fake: Fake;
  error: string;
}

const initialState: State = {
  loading: false,
  fake: null,
  error: null
};

export function testReducer(
  state: State = initialState,
  action: AnyAction
): State {
  switch (action.type) {
    case TestActions.INCREMENT: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case TestActions.INCREMENT_FAILURE: {
      const { reason } = action.payload;
      return {
        ...state,
        loading: false,
        error: reason
      };
    }

    case TestActions.INCREMENT_SUCCESS: {
      const { fake } = action.payload;
      return {
        ...state,
        loading: false,
        fake: fake
      };
    }

    default:
      return state;
  }
}

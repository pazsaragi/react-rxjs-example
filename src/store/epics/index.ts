import { combineEpics } from "redux-observable";
import { fetchFakeEpic } from "./testEpic";

export const rootEpic = combineEpics(fetchFakeEpic);

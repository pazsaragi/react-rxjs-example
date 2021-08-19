import { AnyAction } from "redux";
import { Observable, of, from } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { ServiceProvider } from "lib/service-provider";

import { AppState } from "store/reducers";
import { TestActions } from "store/actions/types";
import { fetchFakeFailed, fetchFakeSuccess } from "store/actions/test.actions";
import { TestService } from "services/test-service";

export const fetchFakeEpic = (
  action$: Observable<AnyAction>,
  state$: Observable<AppState>,
  di: ServiceProvider
): Observable<AnyAction> => {
  return action$.pipe(
    ofType(TestActions.INCREMENT),
    mergeMap(() => {
      const testService: TestService = di.get("test-service");
      return from(testService.list()).pipe(
        mergeMap((resp: Response) => {
          if (!/2\d\d/.test(resp.status.toString())) {
            return of(fetchFakeFailed("Failed fetch fake"));
          }
          return from(resp.json()).pipe(
            map(resp => {
              return fetchFakeSuccess(resp.data);
            })
          );
        }),
        catchError(err => {
          return of(fetchFakeFailed("Failed fetch fake"));
        })
      );
    })
  );
};

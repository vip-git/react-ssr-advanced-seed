import { Observable, of, concat, throwError } from 'rxjs';
import { skipWhile, catchError, forkJoin } from 'rxjs/operators';

// This should be a library eventually
export class RulesEngine {
  static applyRule = (action$, actionType, rules, successCallback) => 
    action$.ofType(actionType)
      .pipe(
        skipWhile((action) => {
          const processRules = rules(action);
          return processRules && processRules.error;
        }),
        ...successCallback(),
        catchError(err => throwError(`Some Rules are failing - ${err.message}`)),
      );
}

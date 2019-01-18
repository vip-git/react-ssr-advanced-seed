import _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

// This should be a library eventually
export class RulesEngine {
  static applyRule = (action$, actionType, rules, successCallback) => 
    action$.ofType(actionType)
      .pipe(
        filter((action) => {
          const processRules = rules(action);
          const processedRuleErrors = _.filter(processRules, { error: true });
          if (process.env.NODE_ENV === 'development' && processRules && processedRuleErrors.length) {
            processedRuleErrors.map(err => console.warn('Some Rules are failing - ', err.message));
          }
          return processRules && processedRuleErrors.length === 0;
        }),
        ...successCallback(),
        catchError(err => throwError(`Some Rules are failing - ${err.stack}`)),
      );
}

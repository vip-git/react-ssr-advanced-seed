// Library
import { iif } from 'rxjs';
import { catchError, map, mergeMap, distinctUntilChanged } from 'rxjs/operators';
import { useObservableState } from 'observable-hooks';

// Temp vars
let payload = {};

// This should be a library eventually
export const RulesEngine = {
    applyRule: ({rules, successCallback, failureCallback, errorCallback }) => useObservableState(
        event$ => (event$ as any).pipe(
            distinctUntilChanged(),
            map((action): any => {
                payload = action;
                if (rules.length) {
                    const processedRuleErrors = [];
                    rules.map((rule: (arg0: unknown) => any) => {
                        const processRules = rule(action);
                        if(processRules && processRules.error) {
                            processedRuleErrors.push(processRules);
                        }
                        return rule;
                    });
                    return processedRuleErrors;
                }
                return [];
            }),
            mergeMap((processedErrors: Array<any>) => iif(() => processedErrors.length === 0, 
                successCallback(payload), 
                failureCallback(processedErrors)
            )),
            catchError(error => errorCallback(error)),
        ),
    ),
};

import _ from 'lodash';
/* ignore coverage */
export class DocGenEngine {
    static stringifyJson(data: any) {
        let cache = [];
        const stringifyData = JSON.stringify(data, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Duplicate reference found
                    try {
                        // If this value does not reference a parent it can be deduped
                        return JSON.parse(JSON.stringify(value));
                    } catch (error) {
                        // discard key if value cannot be deduped
                        return;
                    }
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
        cache = null; // Enable garbage collection

        return stringifyData;
    }
    static process(data: ArrayLike<any>) {
        _.map(data, (val: { modelName: number | string }, key) => {
            val.modelName = key;
            return val;
        });
        return {
            rootModel: _.find(data, ['modelName', 'RootModel']),
            models: _.keys(data),
            containers: _.filter(data, 'container'),
        };
    }
}

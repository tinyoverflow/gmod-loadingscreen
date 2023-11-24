/**
 * The DataMapper simply provides a one-to-one mapping of data.
 *
 * It can be used to, for example, map file extensions to media types or
 * game-mode names to their human-readable names.
 */
export default class DataMapper {
    /**
     * @param {Object.<String, String>} data
     */
    constructor(data) {
        this.data = data;
    }

    /**
     * Return the value by the given string key.
     *
     * @param {String} key
     * @return {String}
     */
    get(key) {
        return this.data[key];
    }
}

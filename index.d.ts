import { queries } from "@testing-library/dom";

type Queries = typeof queries;

// Extract the return type and wrap it correctly for JQuery. In JQuery, `HTMLElement` and `HTMLElement[]` are the same
type RemapReturnType<T> = T extends Array<infer E> // test if `T` is an array
  ? JQuery<E> // `T` is an array, use inferred `E`
  : T extends Promise<Array<infer E>> // test if `T` is a promise of an array
  ? Promise<JQuery<E>> // `T` is a promise of an array, use inferred `E`
  : T extends Promise<infer E> // test if `T` is a promise
  ? Promise<JQuery<E>> // `T` is a promise, use inferred `E`
  : JQuery<T>; // `T` wasn't an array or promise, use `T`

// Remap the query function type to remove the `container` argument
type RemapQuery<T> = T extends (
  container: HTMLElement,
  ...args: infer A // infer is great here. It removes the need for multiple `extends` tests to get an accurate arg interface
) => infer R
  ? (...args: A) => RemapReturnType<R>
  : never;

type JQueryQueries = {
  [K in keyof Queries]: RemapQuery<Queries[K]>;
};

// use `declare global` because of the `import` in the file since `JQuery` is a global interface.
// If you remove the import, the `declare global` is implied
declare global {
  interface JQuery<TElement = HTMLElement> {
    queryAllByLabelText: JQueryQueries["queryAllByLabelText"];
    queryByLabelText: JQueryQueries["queryByLabelText"];
    getAllByLabelText: JQueryQueries["getAllByLabelText"];
    getByLabelText: JQueryQueries["getByLabelText"];
    findAllByLabelText: JQueryQueries["findAllByLabelText"];
    findByLabelText: JQueryQueries["findByLabelText"];
    queryByPlaceholderText: JQueryQueries["queryByPlaceholderText"];
    queryAllByPlaceholderText: JQueryQueries["queryAllByPlaceholderText"];
    getByPlaceholderText: JQueryQueries["getByPlaceholderText"];
    getAllByPlaceholderText: JQueryQueries["getAllByPlaceholderText"];
    findAllByPlaceholderText: JQueryQueries["findAllByPlaceholderText"];
    findByPlaceholderText: JQueryQueries["findByPlaceholderText"];
    queryByText: JQueryQueries["queryByText"];
    queryAllByText: JQueryQueries["queryAllByText"];
    getByText: JQueryQueries["getByText"];
    getAllByText: JQueryQueries["getAllByText"];
    findAllByText: JQueryQueries["findAllByText"];
    findByText: JQueryQueries["findByText"];
    queryByDisplayValue: JQueryQueries["queryByDisplayValue"];
    queryAllByDisplayValue: JQueryQueries["queryAllByDisplayValue"];
    getByDisplayValue: JQueryQueries["getByDisplayValue"];
    getAllByDisplayValue: JQueryQueries["getAllByDisplayValue"];
    findAllByDisplayValue: JQueryQueries["findAllByDisplayValue"];
    findByDisplayValue: JQueryQueries["findByDisplayValue"];
    queryByAltText: JQueryQueries["queryByAltText"];
    queryAllByAltText: JQueryQueries["queryAllByAltText"];
    getByAltText: JQueryQueries["getByAltText"];
    getAllByAltText: JQueryQueries["getAllByAltText"];
    findAllByAltText: JQueryQueries["findAllByAltText"];
    findByAltText: JQueryQueries["findByAltText"];
    queryByTitle: JQueryQueries["queryByTitle"];
    queryAllByTitle: JQueryQueries["queryAllByTitle"];
    getByTitle: JQueryQueries["getByTitle"];
    getAllByTitle: JQueryQueries["getAllByTitle"];
    findAllByTitle: JQueryQueries["findAllByTitle"];
    findByTitle: JQueryQueries["findByTitle"];
    queryByRole: JQueryQueries["queryByRole"];
    queryAllByRole: JQueryQueries["queryAllByRole"];
    getAllByRole: JQueryQueries["getAllByRole"];
    getByRole: JQueryQueries["getByRole"];
    findAllByRole: JQueryQueries["findAllByRole"];
    findByRole: JQueryQueries["findByRole"];
    queryByTestId: JQueryQueries["queryByTestId"];
    queryAllByTestId: JQueryQueries["queryAllByTestId"];
    getByTestId: JQueryQueries["getByTestId"];
    getAllByTestId: JQueryQueries["getAllByTestId"];
    findAllByTestId: JQueryQueries["findAllByTestId"];
    findByTestId: JQueryQueries["findByTestId"];
  }
}

/**
 * Extend the jQuery function.
 * @param $ Any valid jQuery fn with an 'fn' or `prototype` property. Normally this is `$` returned from `jquery`. If using Cypress, this should be `cy.$$`
 * @example
 * // jquery
 * import $ from 'jquery'
 * import {extendJQuery} from 'testing-library-jquery'
 *
 * extendJQuery($)
 *
 * // Cypress, in a `support.ts` or `support.js` file
 * import {extendJQuery} from 'testing-library-jquery'
 *
 * // Cypress uses it's own internal jQuery
 * extendJQuery(Cypress.$)
 */
export declare function extendJQuery($: Function): void;

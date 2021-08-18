## Testing Library jQuery

This package adds Testing Library support to jQuery. This brings the suite of Testing Libraries queries to the jQuery function.

```js
$("html").getByRole("button", { name: "Submit" }).click();
```

### Usage

```js
import $ from "jquery";
import { extendJQuery } from "testing-library-jquery";

// extend the jQuery prototype with Testing Library DOM queries
extendJQuery($);
```

### Use with Cypress

```js
// in support/index.ts or support/index.js
import { extendJQuery } from "testing-library-jquery";

extendJQuery(Cypress.$);
```

If you want Typescript types using this library, you'll either have to use a `support/index.ts` file or add the following to
the `cypress/tsconfig.json` file:

```json
{
  "types": ["testing-library-jquery"]
}
```

Cypress uses jQuery internally and all commands that query the DOM are `JQuery` subjects. This library makes working with
a Cypress command chain and jQuery elements more similar.

For example, with both `@testing-library/cypress` and `testing-library-jquery`, the following is possible:

```js
// Cypress only supports `find*` queries because it is always asynchronous
cy.findByRole("form", { name: "Login" }).then(($el) => {
  // $el is a JQuery object, NOT a Cypress chain
  // Use `get*` and `query*` queries
  $el.getByRole("textbox", { name: "Username" }).val("My Name");
});
```

`testing-library-jquery` can be a great addition to the `cypress-pipe` plugin since `.pipe` will automatically retry, making `get*`
queries very useful and easy to make semantic helper functions in your application tests.

```ts
const getUsernameField = ($el: JQuery) =>
  $el.getByRole("textbox", { name: "Username" });

cy.pipe(getUsernameField).type("My Name");
```

This methods keeps the Cypress command log clean vs using `cy` commands directly in functions like `getUsernameField`. The `.pipe`
command will show the name of the function being called `getUsernameField` and any arguments passed.

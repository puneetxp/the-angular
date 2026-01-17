# the-angular

Angular-ready UI primitives and utilities extracted from the Rentzoma admin surface. The package bundles:

- Standalone layout building blocks (sidenav, headers, skeletons, footers)
- Form builders and dynamic form controllers
- Data tables, upload flows, and dialog helpers
- Shared services (authentication, IndexedDB, REST helpers, Paytm checkout, etc.)
- Typed interfaces for menus, dialogs, login state, and NGXS actions

Use it to bootstrap a dashboard/Admin app without re-building the same UX scaffolding.

## Installation

```bash
npm install the-angular
# or
yarn add the-angular
```

### Peer dependencies

`the-angular` assumes you already ship with Angular & Angular Material:

| Package | Tested version |
| --- | --- |
| `@angular/core`, `@angular/common`, `@angular/router`, `@angular/forms` | ^21.0.0 |
| `@angular/material` | ^17.0.0 |
| `@ngxs/store` (if you use the NGXS helpers) | ^4.0.0 |

> If your Angular workspace already exposes a path alias for the library, nothing else is required. Otherwise add `"paths": {"the-angular": ["./node_modules/the-angular/public-api"]}` inside your `tsconfig`.

## What's inside?

| Area | Highlights |
| --- | --- |
| Layout | `SidenavComponent`, `PageTitleComponent`, `HeaderComponent`, `FooterComponent`, skeleton loaders, sticky action bar |
| Forms | `FormDynamicComponent`, `InputDynamicComponent`, helpers for dropdowns, chip inputs, validation binding and dialog-driven forms |
| Dialogs | Login dialog, confirm/select image dialogs powered by Angular Material |
| Tables & Lists | `TableMaterialComponent`, paginator helpers, sort utility |
| Uploads | Opinionated image picker + drag-n-drop directive, snack-bar feedback |
| Services | `AuthService`, `DialogService`, `DynamicFormService`, `FormDataService`, `IndexedDBService`, Paytm checkout client, etc. |
| Interfaces | Menu + action contracts, dialog payloads, login state, NGXS actions |

Everything is exported via [`public-api.ts`](./public-api.ts), so consumers can cherry-pick what they need:

```ts
import { SidenavComponent, Menu, FormDynamicComponent } from 'the-angular';
```

## Quick start

### 1. Admin shell with sidenav

```ts
// app.component.ts
import { Component } from '@angular/core';
import { SidenavComponent, Menu } from 'the-angular';

@Component({
  standalone: true,
  imports: [SidenavComponent],
  template: `<the-sidenav [menus]="menus"><router-outlet /></the-sidenav>`
})
export class AppComponent {
  menus: Menu[] = [
    { name: 'Dashboard', route: '/' },
    { name: 'Clients', route: '/clients', child: [{ name: 'Add', route: '/clients/add' }] },
  ];
}
```

### 2. Dynamic form workflow

```ts
import { Component } from '@angular/core';
import { FormDynamicComponent, FormBase } from 'the-angular';

@Component({
  standalone: true,
  imports: [FormDynamicComponent],
  template: `<the-form-dynamic [inputs]="fields" (formOutput)="save($event)"></the-form-dynamic>`
})
export class ProfileFormComponent {
  fields: FormBase[] = [
    { key: 'name', controlType: 'textbox', label: 'Full name', validators: ['required'] },
    { key: 'active', controlType: 'toggle', label: 'Active user', value: true },
  ];

  save(payload: Record<string, unknown>): void {
    // send to API
  }
}
```

## Development & publishing

1. Install workspace dependencies
   ```bash
   npm install
   ```
2. Build the library (outputs to `dist/the-angular`)
   ```bash
   npx ng build the-angular
   ```
3. Test any consuming Angular app via the workspace path alias (see `angular/tsconfig.json`).
4. Publish when ready
   ```bash
   cd dist/the-angular
   npm publish --access public
   ```

## Contributing / extending

- Keep exports curated in [`public-api.ts`](./public-api.ts) – anything not exported is considered internal.
- Add usage notes or API docs for new modules to this README.
- Prefer standalone components to cut down on extra NgModule wiring.

Issues & PRs are welcome via the GitHub project referenced in `package.json`.

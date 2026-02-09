# Merchant Marketplace

A minimal, modern Angular marketplace application where users can browse offers, vote on them, and make purchases.

## Tech Stack

- **Angular 21.0.3** - Standalone components with Signals
- **TypeScript** - Type-safe development
- **SCSS** - Styling with design tokens
- **FakeStore API** - Product data source

---

## Quick Start

### Installation

```bash
npm install
```

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload on file changes.

### Build

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

---

## Features

✅ **Browse Offers** - View all available offers sorted by votes  
✅ **Offer Details** - See detailed information about each offer  
✅ **Voting System** - Upvote/downvote offers (login required)  
✅ **Purchase Flow** - Mock purchase functionality  
✅ **User Authentication** - Simple session-based login

---

## Technical Decisions

### Architecture & Patterns

- **KISS Principle** - Kept implementation simple and focused on core MVP requirements
- **Standalone Components** - Modern Angular architecture (no NgModules)
- **Signals** - Reactive state management using Angular Signals
- **Design Tokens** - CSS custom properties for consistent theming
- **Path Aliases** - Clean imports using `@core/*`, `@shared/*`, `@features/*`

### State Management

- **Services with Signals** - Lightweight reactive state without external libraries
- **LocalStorage** - Client-side persistence for votes and user sessions
- **Computed Signals** - Derived state (e.g., sorted offers, login status)

### Data & API

- **External API** - https://fakestoreapi.com/products for product data
- **Data Enhancement** - Random merchant assignment (API doesn't provide merchant info)
- **Mock Authentication** - Predefined users for demo purposes (no backend validation)

### Simplifications for MVP

Since the goal is to enter the market quickly with a minimal product, the following simplifications were made:

1. **Client-Side Vote Storage** - Votes stored in localStorage instead of API calls. Easy to migrate to server-side later.

2. **Mock Authentication** - Simple session-based login with predefined users. No password validation added.

3. **Mock Purchase Flow** - Success toast notification instead of payment gateway integration.

4. **No Vote Count Updates** - Vote counts from API remain static. Real-time updates can be added when backend is ready.

5. **Minimal Testing** - Basic test setup without comprehensive coverage (can be expanded post-MVP).

---

## Project Structure

```
src/app/
├── core/
│   ├── models/          # Data interfaces
│   ├── services/        # Business logic & state
│   └── guards/          # Route protection
├── shared/
│   └── components/      # Reusable UI components
├── features/
│   └── offers/          # Offer-related pages & components
└── app.routes.ts        # Route configuration
```

---

## Design System

The app uses a token-based design system defined in `styles.scss`:

- **Colors** - Semantic color tokens (primary, success, danger, etc.)
- **Typography** - Consistent font scales and weights
- **Spacing** - 8px base grid system
- **Shadows & Borders** - Reusable visual styles

To change the theme, we can simply update the color primitives in `styles.scss`.

---

## Future Enhancements

When moving beyond MVP, consider:

- **Backend Integration** - Real API for offers, votes, and authentication
- **Real-Time Updates** - WebSocket for live vote counts
- **Payment Gateway** - Actual purchase flow
- **User Profiles** - Registration, profiles, order history
- **Search & Filters** - Enhanced product discovery
- **Comprehensive Tests** - Unit, integration, and e2e testing

---

## Tested Browser

- Chrome (latest)
- Safari (latest)

---

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI](https://github.com/angular/angular-cli)
- [FakeStore API](https://fakestoreapi.com)

---

# This Week In Za - Frontend Application

A modern Angular-based frontend application for managing and displaying content with user authentication, admin functionality, and multi-tenant support.

## 🚀 Features

- **User Authentication**: Support for Microsoft Azure AD and AWS Cognito authentication
- **Multi-tenant Architecture**: Tenant-based user management and content organization
- **Admin Dashboard**: Comprehensive admin interface for user and tenant management
- **Content Management**: Post/episode management with rich text editing
- **Responsive Design**: Modern UI built with PrimeNG components and PrimeFlex
- **Mock Data Support**: Development mode with mock services for testing
- **Breadcrumb Navigation**: Intuitive navigation with breadcrumb trails
- **Role-based Access Control**: Protected routes with authentication guards

## 🏗️ Architecture

### Project Structure

```
src/app/
├── components/          # Reusable UI components
│   ├── dashboard/       # Dashboard components
│   ├── data-grid/       # Data grid components
│   ├── header/          # Header component
│   ├── item-detail/     # Item detail components
│   ├── item-list/       # List components
│   ├── item-selector/   # Selection components
│   ├── page-toolbar/    # Toolbar components
│   └── select-dialog/   # Dialog components
├── pages/               # Page components
│   ├── admin/           # Admin pages
│   ├── auth/            # Authentication pages
│   ├── home/            # Home page
│   ├── posts/           # Content pages
│   ├── profile/         # User profile
│   └── users/           # User management
├── services/            # Application services
├── services-mock/       # Mock services for development
├── dto/                 # Data Transfer Objects
├── guards/              # Route guards
├── pipes/               # Custom pipes
└── config/              # Configuration files
```

### Key Technologies

- **Angular 19**: Latest Angular framework with standalone components
- **PrimeNG**: UI component library for Angular
- **PrimeFlex**: CSS utility library
- **RxJS**: Reactive programming library
- **TypeScript**: Type-safe JavaScript
- **SCSS**: Advanced CSS preprocessing

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **Angular CLI** (v19 or higher)

### Installing Angular CLI

```bash
npm install -g @angular/cli
```

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Development Mode

Start the application in development mode with live backend:

```bash
npm start
```

The application will be available at: `http://localhost:5201`

### Mock Mode

Start the application with mock data (no backend required):

```bash
npm run start:mock
```

The application will be available at: `http://localhost:5202`

### Production Build

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/thisweekinza` directory.

### Watch Mode

Build the application in watch mode for development:

```bash
npm run watch
```

### Testing

Run the test suite:

```bash
npm test
```

## 🔧 Configuration

### Environment Configuration

The application supports multiple environments:

- **Production**: Uses production API endpoints
- **Development**: Uses development API endpoints with source maps
- **Mock**: Uses mock services for development without backend

Environment files are located in `src/environments/`:

- `environment.ts` - Default environment
- `environment.development.ts` - Development environment
- `environment.mock.ts` - Mock environment

### Authentication Configuration

The application supports two authentication providers:

1. **Microsoft Azure AD**

   - Configure `microsoftClientId` and `microsoftTenantId` in environment files
   - Route: `/authmicrosoft`

2. **AWS Cognito**
   - Configure Cognito settings in environment files
   - Route: `/authcognito`

## 📱 Available Routes

- `/` - Home page
- `/auth` - Authentication page
- `/authmicrosoft` - Microsoft authentication
- `/authcognito` - AWS Cognito authentication
- `/profile` - User profile
- `/users` - User management
- `/users/:id` - User details
- `/admin` - Admin dashboard
- `/admin/tenants` - Tenant management
- `/admin/users` - Admin user management
- `/posts` - Content/posts management
- `/notifications` - User notifications

## 🎨 UI Components

The application uses PrimeNG components for a consistent and modern UI:

- **Data Tables**: For displaying user and content lists
- **Forms**: For data input and editing
- **Dialogs**: For confirmations and selections
- **Navigation**: Breadcrumbs and menus
- **Icons**: PrimeIcons for visual elements

## 🔒 Security

- **Route Guards**: Protected routes require authentication
- **Role-based Access**: Different access levels for users and admins
- **Secure Authentication**: OAuth 2.0 flows for Microsoft and Cognito

## 🧪 Development

### Adding New Components

```bash
ng generate component components/your-component-name
```

### Adding New Services

```bash
ng generate service services/your-service-name
```

### Adding New Pages

```bash
ng generate component pages/your-page-name
```

## 📦 Dependencies

### Main Dependencies

- `@angular/*` - Angular framework packages
- `@primeng/themes` - PrimeNG themes
- `primeng` - PrimeNG UI components
- `primeflex` - CSS utility classes
- `primeicons` - Icon library
- `ngx-quill` - Rich text editor
- `rxjs` - Reactive programming

### Development Dependencies

- `@angular/cli` - Angular CLI
- `typescript` - TypeScript compiler
- `jest` - Testing framework
- `karma` - Test runner

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for type safety
3. Implement proper error handling
4. Add tests for new features
5. Update documentation as needed

## 📄 License

This project is part of the "This Week In Za" application suite.

## 🆘 Support

For issues and questions, please refer to the project documentation or contact the development team.

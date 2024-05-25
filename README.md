## Project Overview

This project is a React application bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It includes components for managing and displaying lists of inventory, shipments, and suppliers, with functionalities for adding, editing, and deleting items. The application leverages Redux for state management and integrates a unified component for pagination and multi-search input to reduce code duplication. It also supports user authentication with different access levels for normal users and administrators. The project uses TypeScript for type safety and Tailwind CSS for styling.

## Features

### 1. **Authentication**

- **Sign Up**:

  - Users can sign up by clicking the "Login" button and entering their details in the sign-up form.
  - Upon successful sign-up, users can log in to access the application's features.

- **Login**:
  - Users can log in using their credentials.
  - Admin credentials for testing:
    - Email: `admin@gmail.com`
    - Password: `Admin@123`

### 2. **User Roles and Permissions**

- **Normal Users**:

  - Can view inventory, supply, and shipment details.
  - Do not have permissions to add, edit, or delete items.

- **Admin Users**:
  - Can view, add, edit, and delete inventory, supply, and shipment details.
  - Have access to admin controls in the `DataTable` component for performing CRUD operations.

### 3. **DataTable Component**

- **Dynamic Table Rendering**: The `DataTable` component dynamically renders a table based on the provided data and columns. It supports various data types including `ShipmentItem`, `InventoryItem`, and `SupplierItem`.

- **CRUD Operations**:

  - **Add**: Allows adding new items to the table.
  - **Edit**: Enables editing existing items directly within the table cells.
  - **Delete**: Provides functionality to delete items from the table.

- **Pagination**: The component includes pagination to handle large data sets, allowing users to navigate through pages of data.

- **Admin Controls**: Conditional rendering of action buttons (edit, delete) based on admin status.

- **Popup for Adding Items**: A modal popup for adding new items to the table, which includes form inputs generated based on the initial state and column configuration.

### 4. **InventoryList Component**

- **State Management**: Uses React hooks (`useState`, `useEffect`) and Redux (`useDispatch`, `useSelector`) to manage component state and global state respectively.

- **Filtering and Searching**: Integrates a unified `MultiSearchInput` component to filter and search through the inventory list based on specified columns.

- **Integration with DataTable**: Passes the filtered inventory data to the `DataTable` component for rendering.

- **Dispatching Actions**: Handles dispatching Redux actions for adding, updating, and deleting shipment items.

### 5. **Unified Search Functionality**

- **MultiSearchInput Component**:

  - **Dynamic Search**: Allows users to search and filter data across multiple columns dynamically.
  - **Integration with DataTable**: Works seamlessly with the `DataTable` component to filter the displayed data based on search input.

- **Reuse Across Pages**: This component is used across inventory, shipment, and supplier pages to reduce code duplication and provide a consistent search experience.

### 6. **Redux Integration**

- **Actions**:

  - `ADD_SHIPMENT`: Adds new shipment items to the state.
  - `UPDATE_SHIPMENT`: Updates existing shipment items in the state.
  - `REMOVE_SHIPMENT`: Removes shipment items from the state.
  - Similar actions exist for inventory, supplier, shipment items .

- **Selectors**: Selectors to retrieve inventory items, shipment items, and supplier items from the state.

### 7. **TypeScript for Type Safety**

- **Type Definitions**:

  - **InventoryItem**: Represents items in the inventory with properties like `id`, `name`, `sku`, `quantity`, and `warehouse`.
  - **ShipmentItem**: Represents shipment items with properties like `id`, `origin`, `destination`, `status`, and `estimatedDelivery`.
  - **SupplierItem**: Represents supplier items with properties like `id`, `name`, `contact`, and `location`.

- **Interfaces for Components**: Ensures type safety for props and state in React components, reducing runtime errors and improving code readability.

### 8. **Tailwind CSS for Styling**

- **Utility-First CSS Framework**: Tailwind CSS is used to style the application with a utility-first approach, allowing for rapid and responsive design without writing custom CSS.

- **Responsive Design**: Utilizes Tailwind CSS classes to create a responsive layout that works across different screen sizes.

### 9. **Code Quality and Maintenance**

- **Prettier**: Used for code formatting to ensure consistent code style across the project.
- **ESLint**: Used for linting to catch potential errors and enforce coding standards.
- **Husky**: Integrated to run pre-commit hooks ensuring code quality checks (Prettier fixes, ESLint fixes) before code is committed.

## Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/maharajuyamala/supply-chain-management.git
   cd supply-chain-management
   git checkout develop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits, and you will see any lint errors in the console.

### Building for Production

To build the app for production, run:

```bash
npm run build
```

This creates an optimized production build in the `build` folder. The build is minified, and the filenames include the hashes.

### Ejecting

If you need to customize the configuration, you can eject from Create React App by running:

```bash
npm run eject
```

**Note**: Ejecting is a one-way operation and cannot be undone.

## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)

This project structure and its features provide a robust starting point for managing and displaying tabular data with full CRUD capabilities, state management using React and Redux, and user authentication with role-based access control. The unified search component ensures a consistent and efficient search experience across different data sets, reducing code duplication and maintenance efforts. The use of TypeScript enhances code quality and maintainability, while Tailwind CSS ensures a responsive and modern design. The integration of Prettier, ESLint, and Husky ensures code quality and maintainability through automated code formatting and linting checks before each commit.

import { Provider } from "react-redux"; // Provides the Redux store to the entire React app
import { store } from "./store/store"; // Import the configured Redux store
import { TodoList } from "./components/TodoList"; // Import the main TodoList component

function App() {
  return (
    // Wrap the application with Redux <Provider> to make the store accessible in all components
    <Provider store={store}>
      {/* App layout styling */}
      <div className="min-h-screen bg-gray-100 py-8">
        {/* Render the TodoList component */}
        <TodoList />
      </div>
    </Provider>
  );
}

export default App; // Export the App component as default

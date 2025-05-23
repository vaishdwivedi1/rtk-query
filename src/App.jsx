import { Provider } from "react-redux";
import { store } from "./store/store";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 py-8">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;

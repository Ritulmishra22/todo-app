import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Completed from "./pages/Completed";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <Navbar />

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/add"
              element={<AddTask />}
            />

            <Route
              path="/edit/:id"
              element={<EditTask />}
            />

            <Route
              path="/completed"
              element={<Completed />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;
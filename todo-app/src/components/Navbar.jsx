import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">✓</span>
        <span>MyTodo</span>
      </div>

      <nav className="navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
          end
        >
          <span>⌂</span>
          Home
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          <span>⊕</span>
          Add Task
        </NavLink>

        <NavLink
          to="/completed"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          <span>✓</span>
          Completed
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <span>ⓘ</span>
        About
      </div>
    </aside>
  );
}

export default Navbar;
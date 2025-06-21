import NavBar from './Components/NavBar';
function Drawer() {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
            <NavBar/>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-white text-base-content min-h-full w-80 p-4">
          <li>
            <a className='hover:bg-gray-300 rounded'>Sidebar Item 1</a>
          </li>
          <li>
            <a className='hover:bg-gray-300 rounded'>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Drawer;

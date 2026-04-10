"use client";

export const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 p-4 text-white">
      <h2 className="mb-4 text-2xl font-bold">Sidebar</h2>
      <ul>
        <li className="mb-2">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="hover:text-gray-400">
            Profile
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="hover:text-gray-400">
            Settings
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="hover:text-gray-400">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

// app/Navbar.tsx

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">
          <span className="text-white">Blood</span>
          <span className="text-red-600">X</span>
        </div>
       
   
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-white">Abdul Malik</span>
        <button className="text-white bg-red-600 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
}

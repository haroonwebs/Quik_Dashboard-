"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleProfileMouseEnter = () => {
    setIsProfileDropdownOpen(true);
  };

  const handleProfileMouseLeave = () => {
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="bg-[#FFFFFF] w-full flex justify-between items-center px-10  min-h-16 shadow-sm">
      <div className="w-[50%] flex gap-8">
        <div className="w-[80px] h-[28px]">
          <img src="/images/Group.png" alt="Not found" />
        </div>

        <ul className="flex gap-6 font-[400px] text-[#7E8299]">
          <li className="hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            Dashboard
          </li>
          <li className="hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            Users
          </li>
          <li className="hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            Orders
          </li>
          <li className="hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            Buyers
          </li>
          <li
            className="relative hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Finance
            {isDropdownOpen && (
              <ul className="absolute left-[-10px] bg-white shadow-2xl text-black rounded-md w-72">
                <li className="px-10 py-3 hover:bg-[#f5f6f8] ">Transactions</li>
                <li className="px-10 py-3 hover:bg-[#f5f6f8] ">Payouts</li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div
        className="relative"
        onMouseEnter={handleProfileMouseEnter}
        onMouseLeave={handleProfileMouseLeave}
      >
        <img src="/images/profile 96.png" alt="Not found" />
        {isProfileDropdownOpen && (
          <div
            className="absolute right-0  bg-white shadow-2xl text-black rounded-md w-72 p-4"
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <div className="flex items-center mb-2 border-b pb-2">
              <img
                src="/images/profile 96.png"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <p className="font-bold">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <button className="w-full text-left px-4 py-2 hover:bg-[#f5f6f8] rounded-md">
              Account Settings
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-[#f5f6f8] rounded-md mt-2">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

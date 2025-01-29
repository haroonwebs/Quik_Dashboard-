"use client";
import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isdropDownLinke, setDropDownLinks] = useState(false);

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
  const handleDropLinks = () => {
    setDropDownLinks((prev) => !prev);
  };

  return (
    <nav className="bg-[#FFFFFF] w-full flex justify-between items-center px-4 lg:px-10  min-h-16 shadow-sm">
      <div className="w-[50%]  flex gap-8">
        <div className=" flex w-[80px] h-[28px] gap-2 relative">
          <Image
            onClick={handleDropLinks}
            className="flex md:hidden"
            src="/images/Group 1923.png" // Path to your image
            alt="img no found "
            width={20}
            height={20}
            layout="responsive" // Optional: can be 'fixed', 'intrinsic', 'responsive', or 'fill'
          />
          <img src="/images/Group.png" alt="Not found" />
        </div>
        {isdropDownLinke && (
          <div className="absolute sm:hidden w-36 h-80 top-14 left-6 bg-blue-400  rounded-t-sm rounded-b-lg shadow-lg ">
            <ul className="flex flex-col gap-6 font-[400px] text-[#7E8299] ">
              <li className=" flex justify-center text-white font-bold text-[16px] items-center hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
                Dashboard
              </li>

              <li className=" flex justify-center items-center  text-white font-bold text-[16px] hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
                Users
              </li>

              <li className=" flex justify-center items-center text-white font-bold text-[16px]  hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
                Orders
              </li>

              <li className="flex justify-center items-center text-white font-bold text-[16px] hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
                Finance
              </li>
              <li className="flex justify-center items-center text-white font-bold text-[16px] hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
                Transactions
              </li>
              <li className="flex justify-center items-center text-white font-bold text-[16px] hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
                Payouts
              </li>
              <li className="flex justify-center items-center text-white font-bold text-[16px] hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
                Buyers
              </li>
            </ul>
          </div>
        )}
        <ul className="md:flex hidden gap-6 font-[400px] text-[#7E8299] ">
          <li className=" flex justify-center items-center hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            Dashboard
          </li>

          <li className=" flex justify-center items-center  hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            Users
          </li>

          <li className=" flex justify-center items-center  hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            Orders
          </li>

          <li className="flex justify-center items-center hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
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

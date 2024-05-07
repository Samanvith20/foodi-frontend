import React, { useEffect, useState } from 'react';
import Card from '../../components/Home/Card';
import { FaFilter } from "react-icons/fa";

const Menu = () => {
   const [menu, setMenu] = useState([]);
   const [filtereditems, setFilteredItems] = useState();
   const [category, setCategory] = useState("all");
   const [sortOption, setSortOption] = useState("default");
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage] = useState(8); // Number of items to display per page
   
   useEffect(() => {
      const fetchdata = async () => {
         try {
            const response = await fetch("https://foodi-backend-1.onrender.com/api/v1/menu");
            const data = await response.json();
            //console.log(data?.data);
            setMenu(data?.data);
            setFilteredItems(data);
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };
      
      fetchdata();
   }, []);
   
   const showAll = () => {
      setFilteredItems(menu);
      setCategory("all");
      setCurrentPage(1);
   };
   
   const filterItems = (category) => {
    if (!Array.isArray(menu)) {
       console.error("Menu is not initialized as an array.");
       return;
    }
 
    const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setCategory(category);
    setCurrentPage(1);
 };
 
   
   const sortedOptions = (options) => {
      setSortOption(options);
      let sortedItems = [...filtereditems];
      
      switch (options) {
         case "A-Z":
            sortedItems.sort((a, b) => a.name.localeCompare(b.name));
            break;
         case "Z-A":
            sortedItems.sort((a, b) => b.name.localeCompare(a.name));
            break;
         case "low-to-high":
            sortedItems.sort((a, b) => a.price - b.price);
            break;
         case "high-to-low":
            sortedItems.sort((a, b) => b.price - a.price);
            break;
         default:
            break;
      }
      
      setFilteredItems(sortedItems);
      setCurrentPage(1);
   };
   
   // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtereditems && Array.isArray(filtereditems) ? filtereditems.slice(indexOfFirstItem, indexOfLastItem) : [];



  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Inline style for all buttons
  const buttonStyle = {
    textDecoration: 'underline',
    textUnderlineOffset: '5px',
    color: '#39DB4A'
  };

  return (
    <div>
      {/* menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>
            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Order Now
            </button>
          </div>
        </div>
        <div className="section-container">
          <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
            {/* all category buttons */}
            <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
              <button
                onClick={showAll}
                style={category === "all" ? buttonStyle : {}}
              >
                All
              </button>
              <button
                onClick={() => filterItems("salad")}
                style={category === "salad" ? buttonStyle : {}}
              >
                Salad
              </button>
              
              <button
                onClick={() => filterItems("pizza")}
                style={category === "pizza" ? buttonStyle : {}}
              >
                Pizza
              </button>
              <button
                onClick={() => filterItems("soup")}
                style={category === "soup" ? buttonStyle : {}}
              >
                Soups
              </button>
              <button
                onClick={() => filterItems("dessert")}
                style={category === "dessert" ? buttonStyle : {}}
              >
                Desserts
              </button>
              <button
                onClick={() => filterItems("drinks")}
                style={category === "drinks" ? buttonStyle : {}}
              >
                Drinks
              </button>
            </div>

            {/* filter options */}
            <div className="flex justify-end mb-4 rounded-sm">
              <div className="bg-black p-2 ">
                <FaFilter className="text-white h-4 w-4" />
              </div>
              <select
                id="sort"
                onChange={(e) => sortedOptions(e.target.value)}
                value={sortOption}
                className="bg-black text-white px-2 py-1 rounded-sm"
              >
                <option value="default"> Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>

          {/* product card */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 ">
            {currentItems && currentItems.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
             {/* Pagination */}
             <div className="flex justify-center my-8 flex-wrap gap-2">
        {Array.from({ length: Math.ceil( filtereditems&&filtereditems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

    </div>
  );
};

export default Menu;

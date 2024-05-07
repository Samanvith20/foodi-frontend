import React from 'react';
import image1 from "../../assets/category/img1.png";
import image2 from "../../assets/category/img2.png";
import image3 from "../../assets/category/img3.png";
import image4 from "../../assets/category/img4.png";

const categoryItems = [
    {id: 1, title: "Main Dish", description: "(86 dishes)", image: image1},
    {id: 2, title: "Breakfast", description: "(12 breakfast)", image: image2},
    {id: 3, title: "Dessert", description: "(48 desserts)", image: image3},
    {id: 4, title: "Browse All", description: "(255 Items)", image: image4}
];

const Categories = () => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16'>
        <div className='text-center'>
            <p className='text-red-500 uppercase tracking-wide font-semibold text-lg'>Customer Favorites</p>
            <h2 className='text-4xl md:text-5xl md:leading-snug font-bold my-2'>Popular Categories</h2>
        </div>

        {/* category cards */}
        <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12'>
            {categoryItems.map((item, i) => (
                <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10'>
                    <div className='w-full mx-auto flex items-center justify-center'><img src={item.image} alt="" className='bg-[#C1F1C6] p-5 rounded-full w-28 h-28' /></div>
                    <div className='mt-5 space-y-1'>
                        <h5 className='text-[#1E1E1E] font-semibold'>{item.title}</h5>
                        <p className='text-secondary text-sm'>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Categories;

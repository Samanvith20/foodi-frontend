import React, { useContext } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Order = () => {
    const { user } = useContext(AuthContext);
    // console.log(user?.email);
    const token = localStorage.getItem('access-token');
    // console.log(token);

    const {  data: Orders = [] } = useQuery({
        queryKey: ['Orders', user?.email],
        queryFn: async () => { 
            const res = await fetch(`https://foodi-backend-1.onrender.com/api/v1/payment/orders?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.json();
        },
    });
   console.log(Orders);
    const formatdata=(createdAt)=>{
        const date= new Date(createdAt)
        return date.toLocaleDateString()
    }
    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            {/* banner */}
            <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
                <div className="py-28 flex flex-col items-center justify-center">
                    {/* content */}
                    <div className=" text-center px-4 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            Track All Your <span className="text-green"> Orders</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Order Table */}
            {Orders?.message?.length > 0 && (
                <div>
                    <div className="">
                        <div className="overflow-x-auto">
                            <table className="table overflow-hidden">
                                {/* head */}
                                <thead className="bg-green text-white rounded-sm">
                                    <tr>
                                        <th>#</th>
                                        <th>Order Date</th>
                                        <th>Transition ID</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Orders?.message?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{formatdata(item.createdAt)}</td>
                                            <td>{item._id}</td>
                                            <td>${item.price}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                {/* Your action button */}
                                                <Link to ="/contact">Contact</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                               
                            </table>
                        </div>
                    </div>
                    <hr />
                </div>
            )}
        </div>
    );
};

export default Order;

import React, { useContext } from 'react'
import { AuthContext } from '../../../Firebase/AuthProvider'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { FaBook, FaDollarSign, FaShoppingCart, FaUsers } from 'react-icons/fa'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const Dashboard = () => {
  const {user} = useContext(AuthContext)
   
  const axiosSecure=useAxiosSecure()
  const{refetch,data:dashboard=[]}=useQuery({
    queryKey:['dashboard'],
    queryFn:async()=>{
      const res= await axiosSecure("/dashboard")
      return res.data
    }
   
  })
  const{data:dashboardstats=[]}=useQuery({
    queryKey:['dashboardstats'],
    queryFn:async()=>{
      const res= await axiosSecure("/dashboard/status")
      return res.data
    }
   
  })
  console.log(dashboardstats.data);


  return (
    <div className='w-full md:w-[870px] mx-auto px-4'>
      <h2 className='text-2xl font-semibold my-4'>
         Hi,{user?.displayName}
          </h2>

           {/* stas div */}
          <div className="stats stats-vertical w-full lg:stats-horizontal shadow">
     
  <div className="stat bg-emerald-200">
    <div className='stat-figure text-secondary text-3xl'>
      <FaDollarSign/>
      </div>
    <div className="stat-title">Revenue</div>
    <div className="stat-value">{dashboard.revenue}</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>
  
  <div className="stat bg-orange-200">
  <div className='stat-figure text-secondary text-3xl'>
      <FaUsers/>
      </div>
    <div className="stat-title"> Users</div>
    <div className="stat-value">{dashboard.user}</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>
  
  <div className="stat bg-indigo-400">
  <div className='stat-figure text-secondary text-3xl'>
      <FaBook/>
      </div>
    <div className="stat-title">Menu Items</div>
    <div className="stat-value">{dashboard.menuItems}</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>

  <div className="stat bg-purple-300">
  <div className='stat-figure text-secondary text-3xl'>
      <FaShoppingCart/>
      </div>
    <div className="stat-title">Orders</div>
    <div className="stat-value">{dashboard.Orders}</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
  
</div>
    {/*picharts */}
    <div className='mt-16'>
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={dashboardstats}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      </div>

    </div>

  )
}

export default Dashboard

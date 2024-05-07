import React, { useContext } from 'react'
import { AuthContext } from '../Firebase/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

const useAdmin = () => {
  const {user} = useContext(AuthContext)
  //console.log(user?.email);
  const axiosSecure=useAxiosSecure()
  const{refetch,data:isAdmin,pending:isadminloading}= useQuery({
    queryKey:[user?.email, 'isAdmin',],
    queryFn:async()=>{
           const response= await axiosSecure(`/user/admin/${user?.email}`)
          //  console.log(response)
           return response
    }
     
  }
  
  )
  return[isAdmin,isadminloading]
}

export default useAdmin

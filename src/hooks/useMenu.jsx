import React from 'react'
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
    const axiosPublic = useAxiosSecure();

    const {data: menu =[], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            //console.log(res.data?.data)
            return res.data?.data
          },
    })

  return [menu, loading, refetch]
}

export default useMenu
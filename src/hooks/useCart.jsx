import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';

const useCart = () => {
    const { user } = useContext(AuthContext);
    // console.log(user.email)
    const token = localStorage.getItem('access-token')
    //console.log(token);

    const { refetch, data: cart = [] } = useQuery({
        
        queryKey: ['carts', user?.email],
       
        queryFn: async () => {
            const res = await fetch(`https://foodi-backend-1.onrender.com/api/v1/cart/email?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res.json();
        },
    })

    return [cart, refetch]

}
export default useCart;
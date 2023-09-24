import { useAppSelector } from "@/redux/hook"
import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

interface IChieldren{
    children:ReactNode
}
const PrivateRoute = ({children}:IChieldren) => {
    const {user,isLoading}=useAppSelector(state=>state.user)
    const pathname=useLocation()
  return (
   isLoading?<div>loading..</div>:!user.email && !isLoading?<Navigate to={"/login"} state={{path:pathname}}/> :children
  )
}

export default PrivateRoute
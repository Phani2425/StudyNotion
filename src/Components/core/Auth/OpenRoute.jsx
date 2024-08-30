// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  if (token === null) {
    return children
  } else {
    return <Navigate to="/dashboard/my-profile" />
  }
}

export default OpenRoute


//the elemnts wrapped by the opennroute componenet was only getting rendered only when the open route was recieving them as children and also returning the chilldren

//and it is returning the children if and only if the user is not loged in .....more specifically there is no user data or token data stored in slices and localstorage....

//when there is no data is stored then it can return something else except the children or navigate the user to some other route by using <Navigate/> tag

//it is like parent who is hiding her child from the boys with whom she doesnot want her child to play... so if the boy is from bad boys then mother says something to him or navigate to other vhild house..... but if the boy is good then she let her child to play with him
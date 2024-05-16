import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";


const CountContext = createContext();

const Counter = ({ children }) => {

  const { isAuthenticated } = useAuth0();


  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"))
    if (user) {
      setCartCounter(user.num_of_cart_items || 0)
    }
  }, [])

  const handleIncrease = (newCounter) => {
    // setCartCounter(cartCounter+1)
    setCartCounter(newCounter)
    const userData = JSON.parse(localStorage.getItem("userData")) ;
    localStorage.setItem("userData", JSON.stringify({
        ...userData,
        num_of_cart_items: newCounter
    }))
  }


  //   useEffect(()=>{
  //     // toast.success("Item Added to Cart")
  //  },[cartCounter])



  return <CountContext.Provider value={{ cartCounter, setCartCounter, handleIncrease }}>
    {children}
  </CountContext.Provider>
}

const MyContext = () => {

  return useContext(CountContext);
}

export { MyContext, Counter, CountContext };

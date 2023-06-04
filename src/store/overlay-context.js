import React, { useContext, useEffect, useState } from "react";
import Cart from "../components/Cart/Cart";

const AuthContext = React.createContext({
    cartIsShown: false,
    onShowCart: () => {},
    onHideCart: () => {}
})

export const AuthContextProvider = props => {
    const [cartIsShown, setCartIsShown] = useState(false)

    useEffect(() => {
        if (cartIsShown === true) {
           return <Cart></Cart>
        }
    }, [])

    const hideCartHandler = () => {
        setCartIsShown(false)
    }

    const showCartHandler = () => {
        setCartIsShown(true)
    }

    return <AuthContext.Provider value={{
        cartIsShown: cartIsShown,
        onShowCart: showCartHandler,
        onHideCart: hideCartHandler
    }}
    >{props.children}</AuthContext.Provider>
}

export default AuthContext
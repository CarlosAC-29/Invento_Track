"use client";
import react, { createContext, useState, useContext } from "react";

const Context = createContext();

export function AppWrapper({ children }) {

    const [user, setUser] = useState({
        userdID : null,
        role : null,
    })

    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    )
}

export function useAppContext() {
    return useContext(Context)
}
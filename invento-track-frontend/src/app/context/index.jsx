"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto
const Context = createContext();

export function AppWrapper({ children }) {
    const [user, setUser] = useState({
        userID: null,
        role: null,
    });

    // Efecto para cargar el estado inicial desde localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                localStorage.removeItem('user'); // Limpiar el almacenamiento si hay un error
            }
        }
    }, []);

    // Efecto para guardar el estado en localStorage cuando cambie
    useEffect(() => {
        if (user.userID !== null) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    );
}

export function useAppContext() {
    return useContext(Context);
}

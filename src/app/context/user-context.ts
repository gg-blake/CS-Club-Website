import React from "react";

interface User {
    username: string | null;
    password: string | null;
    email: string | null;
    sessionStartDate: Date;
}

const UserContext = React.createContext({
    user: {
        username: null,
        password: null,
        email: null,
        sessionStartDate: new Date(Date.now()),
    },
    setUser: (user: User) => {},
});

export default UserContext;
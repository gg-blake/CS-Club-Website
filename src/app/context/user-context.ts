import React from "react";

interface User {
    username: string;
    password: string;
    email: string;
    sessionStartDate: Date;
}

const UserContext = React.createContext({
    user: {
        username: "test_user123",
        password: "password123",
        email: "john.doe001@umb.edu",
        sessionStartDate: new Date(Date.now()),
    },
    setUser: (user: User) => {},
});

export default UserContext;
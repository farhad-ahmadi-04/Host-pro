import React from "react";

function Header({ children }: { children: React.ReactNode }) {
    return (
        <header className="w-full">{children}</header>
    );
}

export default Header;
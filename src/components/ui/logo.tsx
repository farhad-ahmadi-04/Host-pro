import { useEffect, useState } from "react";
import { useTheme } from "../theme-provider";

function Logo({ className }: { className?: string }) {
    const { theme } = useTheme()
    const [logoStyle, setLogoStyle] = useState(
        window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "logo_dark-mode.png"
            : "logo.png")

    useEffect(() => {
        if (theme === "dark") setLogoStyle("logo_dark-mode.png")
        if (theme === "light") setLogoStyle("logo.png")
    }, [theme])


    return (
        <img src={logoStyle} alt="host pro logo" className={className} />
    );
}

export default Logo;
import React, {useState} from 'react';

type ThemeContextType = {
    theme: "dark" | "light"
    toggleTheme: () => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => null
})

const ThemeProvider = ({children}: { children: React.ReactNode }) => {
    const storedTheme = localStorage.getItem('theme')
    const currentTheme = storedTheme ? storedTheme as 'dark' | 'light' : 'light'

    const [theme, setTheme] = useState(currentTheme)

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', newTheme)

            return newTheme
        })
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <main className={`${theme} text-foreground bg-background`}>
                {children}
            </main>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

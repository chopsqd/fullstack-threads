import type React from 'react';
import {Button as NextButton} from '@nextui-org/react';

interface IButtonProps {
    children: React.ReactNode
    icon?: JSX.Element
    className?: string
    type?: "button" | "submit" | "reset"
    fullWidth?: boolean
    color?:
        "default" |
        "primary" |
        "secondary" |
        "success" |
        "warning" |
        "danger" |
        undefined
}

const Button: React.FC<IButtonProps> = ({
                                            children,
                                            icon,
                                            className,
                                            fullWidth,
                                            color,
                                            type
                                        }) => {
    return (
        <NextButton
            startContent={icon}
            size={'lg'}
            color={color}
            variant={'light'}
            className={className}
            type={type}
            fullWidth={fullWidth}
        >
            {children}
        </NextButton>
    );
};

export default Button;

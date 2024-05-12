import type React from 'react';

interface ITypographyProps {
    children: string
    size?: string
}

const Typography: React.FC<ITypographyProps> = ({
                                                    children,
                                                    size = 'text-xl'
                                                }) => {
    return (
        <p className={size}>{children}</p>
    );
};

export default Typography;

import type React from 'react';

interface IContainerProps {
    children: React.ReactElement[] | React.ReactElement
}

const Container: React.FC<IContainerProps>= ({children}) => {
    return (
        <div className={"flex max-w-screen-xl mx-auto mt-10"}>
            {children}
        </div>
    );
};

export default Container;

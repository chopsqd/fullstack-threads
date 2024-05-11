import type React from 'react';

interface IErrorMessageProps {
    error: string
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({error = ''}) => {
    return error && (
        <p className={'text-red-500 mt-2 mb-5 text-small text-center'}>
            {error}
        </p>
    );
};

export default ErrorMessage;

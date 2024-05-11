import type React from 'react';
import type {Control} from "react-hook-form";
import { useController} from "react-hook-form";
import {Input as NextInput} from "@nextui-org/react";

interface IInputProps {
    name: string
    label: string
    placeholder?: string
    type?: string
    control: Control<any>
    required?: string
    endContent?: JSX.Element
}

const Input: React.FC<IInputProps> = ({
                                          name,
                                          label,
                                          placeholder,
                                          type,
                                          control,
                                          required = '',
                                          endContent
                                      }) => {
    const {
        field,
        fieldState: {invalid},
        formState: {errors}
    } = useController({
        name,
        control,
        rules: {
            required
        }
    })
    return (
        <NextInput
            id={name}
            label={label}
            type={type}
            placeholder={placeholder}
            value={field.value}
            name={field.name}
            isInvalid={invalid}
            onChange={field.onChange}
            onBlur={field.onBlur}
            endContent={endContent}
            errorMessage={`${errors[name]?.message ?? ''}`}
        />
    );
};

export default Input;

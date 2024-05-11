import type React from 'react';
import {useState} from 'react';
import Input from "../components/Input";
import {Button, Link} from "@nextui-org/react";
import {useRegisterMutation} from "../store/services/user.api";
import {useForm} from "react-hook-form";
import {hasErrorField} from "../utils/hasErrorField";
import ErrorMessage from "../components/ErrorMessage";

interface IRegisterForm {
    email: string
    name: string
    password: string
}

interface IRegisterProps {
    setSelected: (value: string) => void
}

const Register: React.FC<IRegisterProps> = ({setSelected}) => {
    const [error, setError] = useState<string>('')
    const [register, {isLoading}] = useRegisterMutation()

    const {
        handleSubmit,
        control
    } = useForm<IRegisterForm>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            name: '',
            password: ''
        }
    })

    const onSubmit = async (data: IRegisterForm) => {
        try {
            await register(data).unwrap()
            setSelected('login')
        } catch (error) {
            if (hasErrorField(error)) {
                setError(error.data.message)
            }
        }
    }

    return (
        <form
            className={'flex flex-col gap-4'}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                control={control}
                name={'name'}
                label={'Имя'}
                type={'text'}
                required={'Обязательное поле'}
            />
            <Input
                control={control}
                name={'email'}
                label={'Email'}
                type={'email'}
                required={'Обязательное поле'}
            />
            <Input
                control={control}
                name={'password'}
                label={'Пароль'}
                type={'password'}
                required={'Обязательное поле'}
            />

            <ErrorMessage error={error}/>

            <p className={'text-center text-small'}>
                Уже есть аккаунт? -
                <Link
                    size={'sm'}
                    className={'cursor-pointer'}
                    onPress={() => setSelected('login')}
                >
                    Войдите
                </Link>
            </p>

            <div className={'flex gap-2 justify-end'}>
                <Button
                    fullWidth
                    color={'primary'}
                    type={'submit'}
                    isLoading={isLoading}
                >
                    Зарегистрироваться
                </Button>
            </div>
        </form>
    );
};

export default Register;

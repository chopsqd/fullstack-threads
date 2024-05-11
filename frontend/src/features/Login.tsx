import type React from 'react';
import {useState} from 'react';
import {useForm} from "react-hook-form";
import Input from "../components/Input";
import {Link, Button} from "@nextui-org/react";
import {useLazyCurrentQuery, useLoginMutation} from "../store/services/user.api";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import {hasErrorField} from "../utils/hasErrorField";

interface ILoginForm {
    email: string
    password: string
}

interface ILoginProps {
    setSelected: (value: string) => void
}

const Login: React.FC<ILoginProps> = ({setSelected}) => {
    const navigate = useNavigate()
    const [error, setError] = useState<string>('')

    const [triggerCurrentQuery] = useLazyCurrentQuery()
    const [login, {isLoading}] = useLoginMutation()

    const {
        handleSubmit,
        control
    } = useForm<ILoginForm>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: ILoginForm) => {
        try {
            await login(data).unwrap()
            await triggerCurrentQuery().unwrap()
            navigate('/')
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
                Нет аккаунта? -
                <Link
                    size={'sm'}
                    className={'cursor-pointer'}
                    onPress={() => setSelected('register')}
                >
                    Зарегистрируйтесь
                </Link>
            </p>

            <div className={'flex gap-2 justify-end'}>
                <Button
                    fullWidth
                    color={'primary'}
                    type={'submit'}
                    isLoading={isLoading}
                >
                    Войти
                </Button>
            </div>
        </form>
    );
};

export default Login;

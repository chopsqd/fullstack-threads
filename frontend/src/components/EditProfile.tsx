import type React from 'react';
import {useContext, useState} from 'react';
import type {IUser} from "../store/types";
import {ThemeContext} from "../providers/ThemeProvider";
import {useUpdateUserMutation} from "../store/services/user.api";
import {useParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea} from "@nextui-org/react";
import Input from "./Input";
import {MdOutlineEmail} from "react-icons/md";
import ErrorMessage from "./ErrorMessage";
import {hasErrorField} from "../utils/hasErrorField";

interface IEditProfileProps {
    isOpen: boolean
    onClose: () => void
    user?: IUser
}

const EditProfile: React.FC<IEditProfileProps> = ({
                                                      isOpen,
                                                      onClose,
                                                      user
                                                  }) => {
    const {id} = useParams<{ id: string }>()
    const {theme} = useContext(ThemeContext)
    const [updateUser, {isLoading}] = useUpdateUserMutation()
    const [error, setError] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const {
        handleSubmit,
        control
    } = useForm<IUser>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: user?.email,
            name: user?.name,
            birthDate: user?.birthDate,
            bio: user?.bio,
            location: user?.location
        }
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            setSelectedFile(event.target.files[0])
        }
    }

    const onSubmit = async (data: IUser) => {
        if (id) {
            try {
                const formData = new FormData()
                data.name && formData.append('name', data.name)
                data.email && data.email !== user?.email && formData.append('email', data.email)
                data.birthDate &&
                formData.append(
                    'birthDate',
                    new Date(data.birthDate).toISOString(),
                )
                data.bio && formData.append('bio', data.bio)
                data.location && formData.append('location', data.location)
                selectedFile && formData.append('avatar', selectedFile)

                await updateUser({userData: formData, id}).unwrap()
                onClose()
            } catch (error) {
                if (hasErrorField(error)) {
                    setError(error.data.message)
                }
            }
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={`${theme} text-foreground`}
        >
            <ModalContent>
                {
                    (onClose) => (
                        <>
                            <ModalHeader className={'flex flex-col gap-1'}>
                                Изменение профиля
                            </ModalHeader>
                            <ModalBody>
                                <form
                                    className={'flex flex-col gap-4'}
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Input
                                        control={control}
                                        name={'email'}
                                        label={'Email'}
                                        type={'email'}
                                        endContent={<MdOutlineEmail/>}
                                    />
                                    <Input
                                        control={control}
                                        name={'name'}
                                        label={'Имя'}
                                        type={'text'}
                                    />
                                    <input
                                        type="file"
                                        name={'avatarUrl'}
                                        placeholder={'Выберите файл'}
                                        onChange={handleFileChange}
                                    />
                                    <Input
                                        control={control}
                                        name={'birthDate'}
                                        label={'Дата Рождения'}
                                        type={'date'}
                                        placeholder={'Дата Рождения'}
                                    />
                                    <Controller
                                        name={'bio'}
                                        control={control}
                                        render={({field}) => (
                                            <Textarea
                                                {...field}
                                                rows={4}
                                                placeholder={'Обо мне...'}
                                            />
                                        )}
                                    />
                                    <Input
                                        control={control}
                                        name={'location'}
                                        label={'Местоположение'}
                                        type={'text'}
                                    />

                                    <ErrorMessage error={error}/>

                                    <div className={'flex gap-2 justify-between'}>
                                        <Button
                                            fullWidth
                                            color={'primary'}
                                            type={'submit'}
                                            isLoading={isLoading}
                                        >
                                            Обновить
                                        </Button>

                                        <Button
                                            color={'danger'}
                                            variant="light"
                                            onPress={onClose}
                                        >
                                            Закрыть
                                        </Button>
                                    </div>
                                </form>
                            </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
    );
};

export default EditProfile;

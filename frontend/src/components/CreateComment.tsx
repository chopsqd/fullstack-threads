import React from 'react';
import {useLazyGetPostByIdQuery} from "../store/services/post.api";
import type {FieldValues} from "react-hook-form";
import {Controller, useForm} from "react-hook-form";
import {Button, Textarea} from "@nextui-org/react";
import ErrorMessage from "./ErrorMessage";
import {IoMdCreate} from "react-icons/io";
import {useParams} from "react-router-dom";
import {useCreateCommentMutation} from "../store/services/comment.api";

const CreateComment = () => {
    const {id} = useParams<{ id: string }>()
    const [createComment] = useCreateCommentMutation()
    const [getPostById] = useLazyGetPostByIdQuery()

    const {
        handleSubmit,
        control,
        formState: {errors},
        setValue
    } = useForm()

    const error = errors?.post?.message as string

    const onSubmit = async (data: FieldValues) => {
        try {
            if (id) {
                await createComment({content: data.comment, postId: id}).unwrap()
                setValue('comment', '')
                await getPostById(id).unwrap()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            className={'flex-grow'}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                name={'comment'}
                control={control}
                defaultValue={''}
                rules={{
                    required: 'Обязательное поле'
                }}
                render={({field}) => (
                    <Textarea
                        {...field}
                        labelPlacement={'outside'}
                        placeholder={'Напишите свой комментарий'}
                        className={'mb-5'}
                    />
                )}
            />

            {errors && (
                <ErrorMessage error={error}/>
            )}

            <Button
                color={'primary'}
                className={'flex-end'}
                endContent={<IoMdCreate/>}
                type={'submit'}
            >
                Ответить
            </Button>
        </form>
    );
};

export default CreateComment;

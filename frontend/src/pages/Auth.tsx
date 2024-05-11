import React, {useState} from 'react';
import {Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import Login from "../features/Login";
import Register from "../features/Register";

const Auth = () => {
    const [selected, setSelected] = useState('login')

    return (
        <div className={'flex items-center justify-center h-screen'}>
            <div className={'flex flex-col'}>
                <Card className={'max-w-full w-[340px] h-[450px]'}>
                    <CardBody className={'overflow-hidden'}>
                        <Tabs
                            fullWidth
                            size={'md'}
                            selectedKey={selected}
                            onSelectionChange={key => setSelected(key as string)}
                        >
                            <Tab key={'login'} title={'Вход'}>
                                <Login setSelected={setSelected}/>
                            </Tab>
                            <Tab key={'register'} title={'Регистрация'}>
                                <Register setSelected={setSelected}/>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Auth;

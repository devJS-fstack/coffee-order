import { Modal, AutoComplete, Form, Input, Button, } from "antd";
import { useState, Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { getListAddress } from "../../apis/coffee-house";
import { IUser } from "../../apis/user";
import { isEqual } from "lodash";

export interface IDeliveryInfo {
    titleAddress: string;
    fullAddress: string;
    date: string,
    time: string,
}

const UserModal = ({ 
    isOpen,
    setIsOpen,
    user,
    setUserInfo,
 }: { 
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setUserInfo: Dispatch<SetStateAction<IUser | undefined>>
    user?: IUser
}) => {
    const [form] = Form.useForm();
    const [newUserInfo, setNewUserInfo] = useState(user);
    const isDisabledSave = useMemo(() => {
        return isEqual(user, newUserInfo);
      }, [user, newUserInfo]);

    const handleOk = () => {
        setIsOpen(false);
      };
    
    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleUserInfoChange = (key: string, value: string) => {
        setNewUserInfo((pre: any) => {
            const newObj = {
                ...pre,
                [key]: value,
            }
            return newObj;
        });
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleUserInfoChange(name, value);
    }

    useEffect(() => {
        setNewUserInfo(user);
        form.setFieldsValue({
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
        })
    }, [user, isOpen]);

    return (
        <Modal
            title="Edit User"
            open={isOpen}
            // className="text-center"
            onOk={handleOk}
            okText="Save Changes"
            onCancel={handleCancel}
            okButtonProps={{ style: { backgroundColor: isDisabledSave ?  "#ccc" : "var(--orange-4)" }, disabled: isDisabledSave }}
            cancelButtonProps={{ style: { backgroundColor: "transparent" } }}
        >
            <Form
                {...{
                    labelCol: {
                        xs: { span: 12 },
                        sm: { span: 12 },
                        },
                    wrapperCol: {
                        xs: { span: 12 },
                        sm: { span: 24 },
                    },
                }}
                layout="vertical"
                form={form}
                name="register"
                // onFinish={handleOnFinish}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="firstName"
                    label="First Name"
                    className="mt-4"
                    initialValue={user?.firstName}
                    rules={[
                        {
                        required: true,
                        message: "Please input your first name!",
                        },
                    ]}
                    hasFeedback
                    >
                    <Input onChange={handleOnChangeInput} name="firstName"/>
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    initialValue={user?.lastName}
                    rules={[
                        {
                        required: true,
                        message: "Please input your last name!",
                        },
                    ]}
                    hasFeedback
                    >
                    <Input onChange={handleOnChangeInput} name="lastName"/>
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    initialValue={user?.phoneNumber}
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                    hasFeedback
                    >
                    <Input onChange={handleOnChangeInput} name="phoneNumber" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    initialValue={user?.email}
                    rules={[
                        {
                            type: "email",
                            message: "Please input your correct E-mail",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input onChange={handleOnChangeInput} name="email" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UserModal;
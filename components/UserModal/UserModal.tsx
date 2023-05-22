import { Modal, AutoComplete, Form, Input, Button, Select, } from "antd";
import { useState, Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { getListAddress } from "../../apis/coffee-house";
import { IUser, useRolesQuery } from "../../apis/user";
import { isEmpty, isEqual, toNumber } from "lodash";

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
    isEdit = false
 }: { 
    isOpen: boolean,
    isEdit?: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setUserInfo: Dispatch<SetStateAction<IUser | undefined>>
    user?: IUser
}) => {
    const [form] = Form.useForm();
    const [newUserInfo, setNewUserInfo] = useState(user);
    const { data: roles } = useRolesQuery({});
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
        if (isOpen) {
            if (isEdit) {
                setNewUserInfo(user);
                form.setFieldsValue({
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber,
                    roleId: toNumber(user?.roleId),
                });
            } else {
                form.setFieldsValue({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    roleId: roles?.[0].id,
                });
            }
        }
    }, [user, isOpen]);

    return (
        <Modal
            title={isEdit ? "Edit User" : "Add User"}
            open={isOpen}
            // className="text-center"
            onOk={handleOk}
            okText={isEdit ? "Save changes" : "Create"}
            onCancel={handleCancel}
            okButtonProps={{ style: { backgroundColor: isDisabledSave && isEdit ?  "#ccc" : "var(--orange-4)" }, disabled: isDisabledSave && isEdit  }}
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
                    >
                    <Input style={{  padding: "4px 10px" }} onChange={handleOnChangeInput} name="firstName"/>
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
                    >
                    <Input style={{  padding: "4px 10px" }} onChange={handleOnChangeInput} name="lastName"/>
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
                    >
                    <Input onChange={handleOnChangeInput} name="phoneNumber" style={{  padding: "4px 10px" }} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    initialValue={user?.email}
                    rules={isEdit ? [] : [
                        {
                            type: "email",
                            message: "Please input your correct E-mail",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!",
                        },
                    ]}
                >
                    <Input style={{  padding: "4px 10px" }} disabled={isEdit} onChange={handleOnChangeInput} name="email" />
                </Form.Item>
                <Form.Item
                    name="roleId"
                    label="Role"
                    required
                >
                    <Select placement="topRight" onChange={(value) => handleUserInfoChange("roleId", value)}>
                        {
                            roles?.map(role => (
                                <Select.Option value={role.id} key={role.id}>{role.roleName}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UserModal;
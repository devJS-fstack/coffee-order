import { Modal, AutoComplete, Form, Input, Button, Select } from "antd";
import { useState, Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { getListAddress } from "../../apis/coffee-house";
import {
    IUser,
    useRegisMutation,
    useRolesQuery,
    useUpdateProfileMutation,
} from "../../apis/user";
import { isEmpty, isEqual, toNumber } from "lodash";
import { delay, validatePassword } from "../../utils/helper";
import ScrollbarsV1 from "../Scrollbar";
import { ToastContainer, toast } from "react-toastify";

export interface IDeliveryInfo {
    titleAddress: string;
    fullAddress: string;
    date: string;
    time: string;
}

const UserModal = ({
    isOpen,
    setIsOpen,
    user,
    setUserInfo,
    isEdit = false,
    refetchUsers,
}: {
    isOpen: boolean;
    isEdit?: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setUserInfo: Dispatch<SetStateAction<IUser | undefined>>;
    user?: IUser;
    refetchUsers: any;
}) => {
    const [form] = Form.useForm();
    const [isOpenSb, setIsOpenSb] = useState(isOpen);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [mCreateUser] = useRegisMutation();
    const [mUpdateUser] = useUpdateProfileMutation();
    const [newUserInfo, setNewUserInfo] = useState(user);
    const { data: roles } = useRolesQuery({});
    const isDisabledSave = useMemo(() => {
        return isEqual(user, newUserInfo);
    }, [user, newUserInfo]);

    const handleOk = () => {
        form.submit();
        // setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleUserInfoChange = (key: string, value: string) => {
        setNewUserInfo((pre: any) => {
            const newObj = {
                ...pre,
                [key]: value,
            };
            return newObj;
        });
    };

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleUserInfoChange(name, value);
    };

    const handleOnFinish = async ({
        firstName,
        lastName,
        password,
        email,
        phoneNumber,
        roleId,
    }: IUser) => {
        setIsLoadingBtn(true);
        await delay(1000);
        if (isEdit) {
            try {
                await mUpdateUser({
                    firstName,
                    lastName,
                    phoneNumber,
                    roleId,
                    id: user?.id,
                }).unwrap();
                setIsOpen(false);
                toast.success("Update user successfully");
                await refetchUsers();
            } catch (error: any) {
                toast.error(error.message);
            }
        } else {
            try {
                await mCreateUser({
                    firstName,
                    lastName,
                    password,
                    email,
                    phoneNumber,
                    roleId,
                }).unwrap();
                setIsOpen(false);
                toast.success("Create user successfully");
                await refetchUsers();
            } catch (error: any) {
                toast.error(error.message);
            }
        }

        setIsLoadingBtn(false);
    };

    useEffect(() => {
        setIsOpenSb(isOpen);
        if (isOpen) {
            form.resetFields();
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
                    password: "",
                    confirm: "",
                });
            }
        }
    }, [user, isOpen]);

    return (
        <Modal
            title={isEdit ? "Edit User" : "Add User"}
            open={isOpenSb}
            onOk={handleOk}
            okText={isEdit ? "Save changes" : "Create"}
            onCancel={handleCancel}
            okButtonProps={{
                style: {
                    backgroundColor:
                        isDisabledSave && isEdit ? "#ccc" : "var(--orange-4)",
                },
                disabled: isDisabledSave && isEdit,
                loading: isLoadingBtn,
            }}
            cancelButtonProps={{ style: { backgroundColor: "transparent" } }}
            style={{ top: 0 }}
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
                onFinish={handleOnFinish}
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
                    <Input
                        style={{ padding: "4px 10px" }}
                        onChange={handleOnChangeInput}
                        name="firstName"
                    />
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
                    <Input
                        style={{ padding: "4px 10px" }}
                        onChange={handleOnChangeInput}
                        name="lastName"
                    />
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
                    <Input
                        onChange={handleOnChangeInput}
                        name="phoneNumber"
                        style={{ padding: "4px 10px" }}
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    initialValue={user?.email}
                    rules={
                        isEdit
                            ? []
                            : [
                                  {
                                      type: "email",
                                      message:
                                          "Please input your correct E-mail",
                                  },
                                  {
                                      required: true,
                                      message: "Please input your E-mail!",
                                  },
                              ]
                    }
                >
                    <Input
                        style={{ padding: "4px 10px" }}
                        disabled={isEdit}
                        onChange={handleOnChangeInput}
                        name="email"
                    />
                </Form.Item>
                <Form.Item
                    hidden={isEdit}
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: !isEdit,
                            message: "Please input your password!",
                        },
                        {
                            validator: validatePassword,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    hidden={isEdit}
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: !isEdit,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "The two passwords that you entered do not match!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="roleId" label="Role" required>
                    <Select
                        placement="topRight"
                        onChange={(value) =>
                            handleUserInfoChange("roleId", value)
                        }
                    >
                        {roles?.map((role) => (
                            <Select.Option value={role.id} key={role.id}>
                                {role.roleName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;

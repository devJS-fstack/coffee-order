import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { isEmpty, isEqual } from "lodash";
import NoData from "../components/NoData";
import { useEffect, useState, useMemo } from "react";
import { delay } from "../utils/helper";
import CustomSpin from "../components/Spin";
import { IUser, useUpdateProfileMutation } from "../apis/user";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

const ProfilePage = () => {
    const [form] = Form.useForm();
    const currentUser = useSelector(selectCurrentUser);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(currentUser);
    const [isLoadingBtn, setBtnLoading] = useState(false);
    const [updateProfile] = useUpdateProfileMutation();

    const isDisabledSave = useMemo(() => {
        return isEqual(currentUser, userInfo);
    }, [userInfo, currentUser]);

    useEffect(() => {
        delay(1000).then(() => {
            setIsLoading(false);
            injectStyle();
        });
    }, []);

    const handleUserInfoChange = (key: string, value: string) => {
        setUserInfo((pre: any) => {
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
        phoneNumber,
    }: IUser) => {
        setBtnLoading(true);
        try {
            await updateProfile({
                id: currentUser?.id || 0,
                firstName,
                lastName,
                phoneNumber,
            }).unwrap();
            toast.success("Update your profile successfully");
        } catch (error: any) {
            toast.error(error.message);
        }
        setBtnLoading(false);
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {!isLoading ? (
                isEmpty(currentUser) ? (
                    <NoData
                        title="No Account Available"
                        subTitle={
                            <div>
                                You must be sign in to see your personal
                                information, Let's click{" "}
                                <span
                                    className="cursor-pointer"
                                    style={{
                                        color: "#0084ff",
                                        textDecoration: "underline",
                                    }}
                                >
                                    here
                                </span>{" "}
                                to sign in
                            </div>
                        }
                        className="mt-40"
                    />
                ) : (
                    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <img
                                    className="mx-auto h-12 w-auto"
                                    src="https://order.thecoffeehouse.com/_nuxt/img/user-icon-gold.5f2886d.svg"
                                    alt="Workflow"
                                />
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                    Your personal account
                                </h2>
                            </div>
                            <input
                                type="hidden"
                                name="remember"
                                defaultValue="true"
                            />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <Form
                                    {...{
                                        labelCol: {
                                            xs: { span: 24 },
                                            sm: { span: 8 },
                                        },
                                        wrapperCol: {
                                            xs: { span: 24 },
                                            sm: { span: 16 },
                                        },
                                    }}
                                    form={form}
                                    name="register"
                                    onFinish={handleOnFinish}
                                    style={{ maxWidth: 600 }}
                                    scrollToFirstError
                                    initialValues={{
                                        prefixPhone: "84",
                                    }}
                                >
                                    <Form.Item
                                        name="firstName"
                                        label="First Name"
                                        initialValue={userInfo?.firstName}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your first name!",
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input
                                            name="firstName"
                                            onChange={(e) => {
                                                handleOnChangeInput(e);
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="lastName"
                                        label="Last Name"
                                        initialValue={userInfo?.lastName}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your last name!",
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input
                                            name="lastName"
                                            onChange={(e) => {
                                                handleOnChangeInput(e);
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="phoneNumber"
                                        label="Phone Number"
                                        initialValue={userInfo?.phoneNumber}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your phone number!",
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input
                                            name="phoneNumber"
                                            onChange={(e) => {
                                                handleOnChangeInput(e);
                                            }}
                                            style={{ width: "100%" }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        label="E-mail"
                                        initialValue={userInfo?.email}
                                        // rules={[
                                        // {
                                        //     type: "email",
                                        //     message: "Please input your correct E-mail",
                                        // },
                                        // {
                                        //     required: true,
                                        //     message: "Please input your E-mail!",
                                        // },
                                        // ]}
                                        hasFeedback
                                    >
                                        <Input name="email" disabled />
                                    </Form.Item>
                                    <div>
                                        <Button
                                            loading={isLoadingBtn}
                                            onClick={() => {
                                                form.submit();
                                            }}
                                            disabled={isDisabledSave}
                                            style={{
                                                height: "37.6px",
                                                background: isDisabledSave
                                                    ? "#ccc"
                                                    : "var(--radial-gradient-orange-4)",
                                            }}
                                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                    <div className="text-sm flex justify-center mt-4 cursor-pointer">
                                        <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Change password
                                        </span>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <CustomSpin />
            )}
        </div>
    );
};

export default ProfilePage;

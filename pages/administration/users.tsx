import { Avatar, Button, Dropdown, MenuProps, Tag } from "antd";
import {
    useDeleteUserMutation,
    useUpdateStatusMutation,
    useUsersQuery,
} from "../../apis/user";
import TableV1 from "../../components/TableV1";
import { STATUS_COLOR, STATUS_USERS } from "../../utils/variable";
import { FiMoreVertical, FiTrash } from "react-icons/fi";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { BsFillPencilFill, BsCaretRightFill } from "react-icons/bs";
import { RiMoreFill } from "react-icons/ri";
import UserModal from "../../components/UserModal/UserModal";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { delay } from "../../utils/helper";
import { toast } from "react-toastify";

const UserPage = ({ collapsed }: { collapsed: boolean }) => {
    const {
        data: users,
        isFetching,
        refetch: refetchUsers,
    } = useUsersQuery({});
    const [isOpenUserModal, setIsOpenUserModal] = useState(false);
    const [isOpenConfirmActive, setIsOpenConfirmActive] = useState(false);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [mUpdateStatus] = useUpdateStatusMutation();
    const [mDeleteUser] = useDeleteUserMutation();
    const [userInfo, setUserInfo] = useState(users?.[0]);
    const [isActiveCurrUser, setIsActiveCurrUser] = useState(false);
    const commonHandler = (id: number) => {
        const user = users?.find((user) => user.id === id);
        setIsEdit(true);
        setUserInfo(user);
    };

    const handleOnClickModify = (id: number) => {
        commonHandler(id);
        setIsOpenUserModal(true);
    };

    const handleCancelConfirmActive = () => {
        setIsOpenConfirmActive(false);
    };

    const handleOnOkActive = async () => {
        setIsLoadingBtn(true);
        await delay(1000);
        const status = isActiveCurrUser
            ? STATUS_USERS.DISABLED
            : STATUS_USERS.ACTIVE;
        try {
            await mUpdateStatus({ status, userId: userInfo?.id || 0 }).unwrap();
            await refetchUsers();
            toast.success(
                `${isActiveCurrUser ? "Disable" : "Enable"} user successfully`
            );
        } catch (error: any) {
            toast.error(error.message);
        }
        setIsLoadingBtn(false);
        setIsOpenConfirmActive(false);
    };

    const handleOnDeleteUser = async () => {
        setIsLoadingBtn(true);
        await delay(1000);
        try {
            await mDeleteUser({ userId: userInfo?.id || 0 }).unwrap();
            toast.success(`Delete user successfully`);
            await refetchUsers();
        } catch (error: any) {
            toast.error(error.message);
        }
        setIsLoadingBtn(false);
        setIsOpenConfirmDelete(false);
    };

    useEffect(() => {
        refetchUsers();
    }, []);

    useEffect(() => {
        setIsActiveCurrUser(userInfo?.status === STATUS_USERS.ACTIVE);
    }, [userInfo]);

    return (
        <div className="w-full py-4">
            <UserModal
                setUserInfo={setUserInfo}
                user={userInfo}
                isOpen={isOpenUserModal}
                setIsOpen={setIsOpenUserModal}
                isEdit={isEdit}
                refetchUsers={refetchUsers}
            />
            <ConfirmModal
                isOpen={isOpenConfirmActive}
                handleCancel={handleCancelConfirmActive}
                handleOk={handleOnOkActive}
                title={`Confirm ${isActiveCurrUser ? "Disable" : "Enable"}`}
                okText={isActiveCurrUser ? "Disable" : "Enable"}
                okButtonProps={{ loading: isLoadingBtn }}
                children={
                    <div className="flex flex-col justify-center pl-2 pt-2">
                        <span>
                            Are you sure you want to{" "}
                            {isActiveCurrUser ? "disable" : "enable"} user{" "}
                            <span className="font-bold">
                                {userInfo?.firstName} {userInfo?.lastName}
                            </span>
                        </span>
                    </div>
                }
            />
            <ConfirmModal
                okText="Remove"
                okButtonProps={{ loading: isLoadingBtn }}
                isOpen={isOpenConfirmDelete}
                title="Confirm Remove Order"
                handleCancel={() => {
                    setIsOpenConfirmDelete(false);
                }}
                handleOk={handleOnDeleteUser}
                children={
                    <div className="flex flex-col justify-center pl-2 pt-2">
                        <span>
                            Are you sure you want to delete user{" "}
                            <span className="font-bold">
                                {userInfo?.firstName} {userInfo?.lastName}
                            </span>
                        </span>
                        <span style={{ color: "#ef4444" }}>
                            This action cannot be undone. Are you sure to
                            proceed?
                        </span>
                    </div>
                }
            />
            <span className="flex justify-end pr-4 pb-4">
                <Button
                    onClick={() => {
                        setIsEdit(false);
                        setIsOpenUserModal(true);
                    }}
                    className="hover-btn-custom"
                    icon={<PlusOutlined />}
                    style={{ backgroundColor: "var(--orange-1)" }}
                >
                    New User
                </Button>
            </span>
            <TableV1
                columns={[
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                        render: (_, record) => {
                            const { firstName, lastName } = record;
                            return (
                                <div className="flex items-center gap-x-2">
                                    <Avatar
                                        style={{ backgroundColor: "#f56a00" }}
                                        size={24}
                                        className="text-center"
                                    >
                                        <div
                                            className="text-center"
                                            style={{ fontSize: "10px" }}
                                        >
                                            {firstName.charAt(0) +
                                                lastName?.charAt(0)}
                                        </div>
                                    </Avatar>
                                    <div>
                                        {firstName} {lastName}
                                    </div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Phone",
                        dataIndex: "phoneNumber",
                        key: "phoneNumber",
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                        key: "email",
                    },
                    {
                        title: "Role",
                        dataIndex: "Role",
                        key: "Role",
                        render: (value, record) => {
                            const { roleName } = value;
                            return <span>{roleName}</span>;
                        },
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        render: (value, _) => {
                            return (
                                <Tag
                                    color={
                                        STATUS_COLOR[
                                            value as keyof typeof STATUS_COLOR
                                        ]
                                    }
                                >
                                    {value}
                                </Tag>
                            );
                        },
                    },
                    {
                        title: "Action",
                        dataIndex: "id",
                        key: "id",
                        render: (value, record) => {
                            const { status } = record;
                            const isActive = status === STATUS_USERS.ACTIVE;
                            return (
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: "1",
                                                label: (
                                                    <span
                                                        className="flex justify-space-between items-center gap-2"
                                                        onClick={() => {
                                                            handleOnClickModify(
                                                                value
                                                            );
                                                        }}
                                                    >
                                                        <BsFillPencilFill />
                                                        <span>Modify</span>
                                                    </span>
                                                ),
                                            },
                                            {
                                                key: "2",
                                                label: (
                                                    <span
                                                        className="flex justify-space-between items-center gap-2"
                                                        onClick={() => {
                                                            commonHandler(
                                                                value
                                                            );
                                                            setIsOpenConfirmActive(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        {isActive ? (
                                                            <GrStatusDisabledSmall
                                                                style={{
                                                                    color: "#F87171",
                                                                }}
                                                            />
                                                        ) : (
                                                            <BsCaretRightFill
                                                                style={{
                                                                    color: "green",
                                                                    fontSize: 17,
                                                                }}
                                                            />
                                                        )}
                                                        <span>
                                                            {isActive
                                                                ? "Disable"
                                                                : "Enable"}
                                                        </span>
                                                    </span>
                                                ),
                                            },
                                            {
                                                key: "3",
                                                label: (
                                                    <span
                                                        onClick={() => {
                                                            commonHandler(
                                                                value
                                                            );
                                                            setIsOpenConfirmDelete(
                                                                true
                                                            );
                                                        }}
                                                        className="flex justify-space-between items-center gap-2"
                                                    >
                                                        <FiTrash color="red" />
                                                        <span>Delete</span>
                                                    </span>
                                                ),
                                            },
                                        ],
                                    }}
                                    placement="topRight"
                                    className="cursor-pointer"
                                >
                                    <span>
                                        <RiMoreFill />
                                    </span>
                                </Dropdown>
                            );
                        },
                    },
                ]}
                dataSource={users}
                loading={isFetching}
                rowKey={"email"}
                pagination={{
                    className: "pr-6",
                    total: users?.length || 0,
                    defaultPageSize: 10,
                    showTotal: (total) => (
                        <span className="antd-total-item">
                            Total {total} user(s)
                        </span>
                    ),
                    showQuickJumper: true,
                    showSizeChanger: true,
                }}
            />
        </div>
    );
};

export default UserPage;

import { Avatar, Button, Dropdown, MenuProps, Tag } from "antd";
import { useUsersQuery } from "../../apis/user"
import TableV1 from "../../components/TableV1"
import { STATUS_COLOR } from "../../utils/variable";
import { FiMoreVertical, FiTrash } from "react-icons/fi"
import { GrStatusDisabledSmall } from "react-icons/gr"
import { BsFillPencilFill } from "react-icons/bs";
import { RiMoreFill } from "react-icons/ri";
import UserModal from "../../components/UserModal/UserModal";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const UserPage = ({ collapsed }: { collapsed: boolean }) => {
    const { data: users, isFetching } = useUsersQuery({});
    const [isOpenUserModal, setIsOpenUserModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [userInfo, setUserInfo] = useState(users?.[0]);

    const handleOnClickModify = (id: number) => {
        const user = users?.find(user => user.id === id);
        setIsEdit(true);
        setIsOpenUserModal(true);
        setUserInfo(user);
    }

    return (
        <div className="w-full py-4">
            <UserModal setUserInfo={setUserInfo} user={userInfo} isOpen={isOpenUserModal} setIsOpen={setIsOpenUserModal} isEdit={isEdit}/>
            <span className="flex justify-end pr-4 pb-4">
                <Button onClick={() => { setIsEdit(false); setIsOpenUserModal(true) }} className="hover-btn-custom" icon={<PlusOutlined />} style={{ backgroundColor: "var(--orange-1)" }}>
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
                            const {  firstName, lastName } = record;
                            return (
                                <div className="flex items-center gap-x-2">
                                    <Avatar style={{ backgroundColor: "#f56a00" }} size={24} className="text-center">
                                        <div className="text-center" style={{ fontSize: "10px" }}>
                                            {firstName.charAt(0) + lastName?.charAt(0)}
                                        </div>
                                    </Avatar>
                                    <div>
                                        {firstName} {lastName}
                                    </div>
                                </div>
                            )
                        }
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
                            return (
                                <span>{roleName}</span>
                            )
                        }
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        render: (value, _) => {
                            return (
                                <Tag color={STATUS_COLOR[value]}>
                                    {value}
                                </Tag>
                            )
                        }
                    },
                    {
                        title: "Action",
                        dataIndex: "id",
                        key: "id",
                        render: (value, _) => {
                            return (
                                <Dropdown menu={{ items: [
                                    {
                                        key: "1",
                                        label: (
                                          <span className="flex justify-space-between items-center gap-2" onClick={() => { handleOnClickModify(value) }}>
                                            <BsFillPencilFill/>
                                            <span>Modify</span>
                                          </span>
                                        ),
                                      },
                                      {
                                        key: "2",
                                        label: (
                                          <span className="flex justify-space-between items-center gap-2">
                                            <GrStatusDisabledSmall style={{ color: "#F87171" }}/>
                                            <span>Disabled</span>
                                          </span>
                                        ),
                                      },
                                      {
                                        key: "3",
                                        label: (
                                          <span className="flex justify-space-between items-center gap-2">
                                            <FiTrash color="red"/>
                                            <span>Delete</span>
                                          </span>
                                        ),
                                      },
                                ] }} placement="topRight" className="cursor-pointer">
                                    <span>
                                        <RiMoreFill/>
                                    </span>
                                </Dropdown>
                            )
                        }
                    }
                ]}
                dataSource={users}
                loading={isFetching}
                rowKey={"email"}
            />
        </div>
    )
}

export default UserPage
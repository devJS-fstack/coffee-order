import { Avatar, Button, Dropdown, Tag } from "antd";
import {
    ICategory,
    useCategoriesQuery,
    useUpdateStatusCategoryMutation,
} from "../../../apis/category";
import TableV1 from "../../../components/TableV1";
import { FiTrash } from "react-icons/fi";
import { RiMoreFill } from "react-icons/ri";
import { BsCaretRightFill, BsFillPencilFill } from "react-icons/bs";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { useEffect } from "react";
import { STATUS_COLOR, STATUS_USERS } from "../../../utils/variable";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CategoryModal from "../../../components/CategoryModal/CategoryModal";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";

const CategoryAdmin = ({}: {}) => {
    const {
        data: categories,
        isFetching,
        refetch: refetchCategories,
    } = useCategoriesQuery({});
    const [mUpdateStatus] = useUpdateStatusCategoryMutation();
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
    const [category, setCategory] = useState({} as ICategory);
    const [isOpenConfirmActive, setIsOpenConfirmActive] = useState(false);

    const handleCancelConfirmActive = () => {
        setIsOpenConfirmActive(false);
    };

    const handleOnOkActive = async () => {
        const status = category.enable
            ? STATUS_USERS.DISABLED
            : STATUS_USERS.ACTIVE;
        try {
            await mUpdateStatus({ status, id: category.id }).unwrap();
            await refetchCategories();
            toast.success(
                `${
                    category.enable ? "Disable" : "Enable"
                } category successfully`
            );
        } catch (error: any) {
            toast.error(error.message);
        }
        setIsOpenConfirmActive(false);
    };

    useEffect(() => {
        refetchCategories();
    }, []);

    return (
        <div className="w-full py-4">
            <CategoryModal
                isOpen={isOpenCategoryModal}
                refetchCategories={refetchCategories}
                setIsOpen={setIsOpenCategoryModal}
                category={category}
                isEdit={isEdit}
            />
            <ConfirmModal
                isOpen={isOpenConfirmActive}
                handleCancel={handleCancelConfirmActive}
                handleOk={handleOnOkActive}
                title={`Confirm ${category.enable ? "Disable" : "Enable"}`}
                okText={category.enable ? "Disable" : "Enable"}
                children={
                    <div className="flex flex-col justify-center pl-2 pt-2">
                        <span>
                            Are you sure you want to{" "}
                            {category.enable ? "disable" : "enable"} category{" "}
                            <span className="font-bold">
                                {category.nameCategory}
                            </span>{" "}
                            ?
                        </span>
                    </div>
                }
            />
            <span className="flex justify-end pr-4 pb-4">
                <Button
                    onClick={() => {
                        setIsEdit(false);
                        setIsOpenCategoryModal(true);
                    }}
                    className="hover-btn-custom"
                    icon={<PlusOutlined />}
                    style={{ backgroundColor: "var(--orange-1)" }}
                >
                    New Category
                </Button>
            </span>
            <TableV1
                dataSource={categories}
                loading={isFetching}
                rowKey="id"
                columns={[
                    {
                        title: "Name Category",
                        dataIndex: "nameCategory",
                        key: "nameCategory",
                        render: (value, record) => {
                            const { favIcon } = record;
                            return (
                                <div className="flex items-center gap-x-2">
                                    <Avatar
                                        style={{ borderColor: "#f56a00" }}
                                        size={24}
                                        src={favIcon}
                                        className="text-center"
                                    >
                                        <div
                                            className="text-center"
                                            style={{ fontSize: "10px" }}
                                        ></div>
                                    </Avatar>
                                    <div>{value}</div>
                                </div>
                            );
                        },
                    },
                    {
                        title: "Description",
                        dataIndex: "description",
                        key: "description",
                        width: 300,
                        ellipsis: {
                            showTitle: true,
                        },
                        render: (value, record) => {
                            return (
                                <span
                                    style={{ maxWidth: 20 }}
                                    className="text-ellipsis"
                                >
                                    {value || "__"}
                                </span>
                            );
                        },
                    },
                    {
                        title: "Total Product",
                        dataIndex: "totalProduct",
                        key: "totalProduct",
                        width: 150,
                        render: (value, record) => {
                            return (
                                <span className="text-center">
                                    {value || "__"}
                                </span>
                            );
                        },
                    },
                    {
                        title: "Status",
                        dataIndex: "enable",
                        key: "enable",
                        render: (value, _) => {
                            return (
                                <Tag
                                    color={
                                        value
                                            ? STATUS_COLOR.ACTIVE
                                            : STATUS_COLOR.DISABLED
                                    }
                                >
                                    {value ? "ACTIVE" : "DISABLED"}
                                </Tag>
                            );
                        },
                    },
                    {
                        title: "Action",
                        dataIndex: "id",
                        key: "id",
                        render: (value, record) => {
                            const { enable } = record;
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
                                                            setIsEdit(true);
                                                            setCategory(record);
                                                            setIsOpenCategoryModal(
                                                                true
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
                                                            setCategory(record);
                                                            setIsOpenConfirmActive(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        {enable ? (
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
                                                            {enable
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
                                                            // commonHandler(
                                                            //     value
                                                            // );
                                                            // setIsOpenConfirmDelete(
                                                            //     true
                                                            // );
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
                pagination={{
                    className: "pr-6",
                    total: categories?.length || 0,
                    defaultPageSize: 10,
                    showTotal: (total) => (
                        <span className="antd-total-item">
                            Total {total} categories
                        </span>
                    ),
                    showQuickJumper: true,
                    showSizeChanger: true,
                }}
            />
        </div>
    );
};

export default CategoryAdmin;

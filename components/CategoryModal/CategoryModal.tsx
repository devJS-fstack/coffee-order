import { Modal, Form, Input, Upload, UploadFile } from "antd";
import {
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    memo,
} from "react";
import { isEmpty, isEqual } from "lodash";
import { toast } from "react-toastify";
import {
    ICategory,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
} from "../../apis/category";
import { UploadChangeParam } from "antd/es/upload";

const { Dragger } = Upload;

export interface IDeliveryInfo {
    titleAddress: string;
    fullAddress: string;
    date: string;
    time: string;
}

const CategoryModal = ({
    isOpen,
    setIsOpen,
    category,
    isEdit = false,
    refetchCategories,
}: {
    isOpen: boolean;
    isEdit?: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    category?: ICategory;
    refetchCategories: any;
}) => {
    const [form] = Form.useForm();
    const [categoryInfo, setCategoryInfo] = useState(category as ICategory);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [mCreateCategory] = useCreateCategoryMutation();
    const [mUpdateCategory] = useUpdateCategoryMutation();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const isDisabledSave = useMemo(() => {
        return (
            isEqual(category, categoryInfo) &&
            fileList[0]?.url === category?.favIcon
        );
    }, [category, categoryInfo, fileList]);

    const handleOk = () => {
        form.submit();
        // setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleCategoryInfoChange = (key: string, value: string) => {
        setCategoryInfo((pre: any) => {
            return {
                ...pre,
                [key]: value,
            };
        });
    };

    const handleOnChangeInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        handleCategoryInfoChange(name, value);
    };

    const handleOnChangeFile = ({
        fileList,
        file,
    }: UploadChangeParam<UploadFile>) => {
        setFileList(fileList);
    };

    const handleOnFinish = async () => {
        if (!fileList.length) {
            toast.error("Please try to upload one image");
            return;
        }
        setIsLoadingBtn(true);
        const formData = new FormData();
        const params: any = { ...categoryInfo };
        Object.keys(params).forEach((key: any) =>
            formData.append(key, params[key]),
        );

        formData.append("favIcon", fileList[0]?.originFileObj as Blob);
        let message = "Create category successfully";
        try {
            if (isEdit) {
                message = "Update category successfully";
                await mUpdateCategory({
                    formData,
                    id: categoryInfo.id,
                }).unwrap();
            } else {
                await mCreateCategory(formData as any).unwrap();
            }
        } catch (error: any) {
            toast.error(
                error?.data?.message || "Sorry. Some thing went wrong!",
            );
            setIsLoadingBtn(false);
            return;
        }
        setIsLoadingBtn(false);
        setIsOpen(false);
        await refetchCategories();
        toast.success(message);
    };

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (isEdit && !isEmpty(category)) {
                form.setFieldsValue({
                    nameCategory: category.nameCategory,
                    description: category.description,
                });
                setCategoryInfo(category);
                setFileList([
                    {
                        url: category.favIcon,
                        uid: category.favIcon,
                        name: category.nameCategory,
                    },
                ]);
            } else {
                setFileList([]);
                form.setFieldsValue({
                    nameCategory: "",
                    description: "",
                });
            }
        }
    }, [category, isOpen]);

    return (
        <Modal
            title={isEdit ? "Edit Category" : "Add Category"}
            open={isOpen}
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
            bodyStyle={{
                height: 380,
                overflowY: "auto",
                padding: "0 12px",
            }}
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
                    name="nameCategory"
                    label="Name"
                    className="mt-4"
                    initialValue={category?.nameCategory}
                    rules={[
                        {
                            required: true,
                            message: "Please input name category.",
                        },
                    ]}
                >
                    <Input
                        style={{ padding: "4px 10px" }}
                        onChange={handleOnChangeInput}
                        name="nameCategory"
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    initialValue={category?.description}
                >
                    <Input.TextArea
                        style={{ padding: "4px 10px" }}
                        onChange={handleOnChangeInput}
                        name="description"
                    />
                </Form.Item>
                <Form.Item
                    label="Upload"
                    valuePropName="fileList"
                    rules={[
                        { required: true, message: "Please try to upload one" },
                    ]}
                >
                    <Upload
                        className="coffee-dragger"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={(e) => handleOnChangeFile(e)}
                        accept="image/png, image/jpeg"
                        showUploadList={{
                            showPreviewIcon: false,
                        }}
                    >
                        {fileList.length < 1 && "+ Upload"}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default memo(CategoryModal);

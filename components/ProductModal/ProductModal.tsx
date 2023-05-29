import {
    Modal,
    Form,
    Input,
    Upload,
    UploadFile,
    InputNumber,
    Select,
    Button,
    Space,
    FormListFieldData,
} from "antd";
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
import { UploadChangeParam } from "antd/es/upload";
import {
    IProduct,
    ISizeProduct,
    useCreateProductMutation,
    useUpdateProductMutation,
} from "../../apis/product";
import { ICategory } from "../../apis/category";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export interface IDeliveryInfo {
    titleAddress: string;
    fullAddress: string;
    date: string;
    time: string;
}

const ProductModal = ({
    isOpen,
    setIsOpen,
    product,
    categories,
    isEdit = false,
    refetchData,
}: {
    isOpen: boolean;
    isEdit?: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    product?: IProduct;
    categories?: ICategory[];
    refetchData: any;
}) => {
    const [form] = Form.useForm();
    const [mCreateProduct] = useCreateProductMutation();
    const [mUpdateProduct] = useUpdateProductMutation();
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsOpen(false);
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

        // setIsLoadingBtn(true);
        const formData = new FormData();
        const params: any = { ...form.getFieldsValue() };
        Object.keys(params).forEach((key: any) =>
            formData.append(key, params[key])
        );

        formData.append("favIcon", fileList[0]?.originFileObj as Blob);
        const sizes = form.getFieldValue("sizes");
        formData.delete("sizes");
        formData.append("sizes", JSON.stringify(sizes));
        let message = "Create product successfully";
        try {
            if (isEdit) {
                message = "Update product successfully";
                await mUpdateProduct({
                    payload: formData,
                    id: product?.id || 0,
                }).unwrap();
            } else {
                await mCreateProduct(formData as any).unwrap();
            }
        } catch (error: any) {
            toast.error(
                error?.data?.message || "Sorry. Some thing went wrong!"
            );
            setIsLoadingBtn(false);
            return;
        }
        toast.success(message);
        setIsLoadingBtn(false);
        setIsOpen(false);
        refetchData();
    };

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (isEdit && !isEmpty(product)) {
                const newProduct = {
                    ...product,
                    sizes: (product.sizes || []).map(
                        (size: ISizeProduct, index: number) => ({
                            name: size.size,
                            price: size.price,
                            id: index,
                            size: size.size,
                        })
                    ),
                };
                form.setFieldsValue(newProduct);
                setFileList([
                    {
                        url: product.favIcon,
                        uid: product.favIcon,
                        name: product.nameProduct,
                    },
                ]);
            } else {
                setFileList([]);
            }
        }
    }, [product, isOpen]);

    return (
        <Modal
            title={isEdit ? "Edit Product" : "Add Product"}
            open={isOpen}
            onOk={handleOk}
            okText={isEdit ? "Save changes" : "Create"}
            onCancel={handleCancel}
            okButtonProps={{
                style: {
                    backgroundColor: "var(--orange-4)",
                },
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
                    name="nameProduct"
                    label="Name"
                    className="mt-4"
                    rules={[
                        {
                            required: true,
                            message: "Please input name product.",
                        },
                    ]}
                >
                    <Input style={{ padding: "4px 10px" }} name="nameProduct" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea
                        style={{ padding: "4px 10px" }}
                        name="description"
                    />
                </Form.Item>
                <div className="flex">
                    <Form.Item
                        style={{ width: 150 }}
                        name="price"
                        label="Price"
                        className="mt-4 mr-6"
                        rules={[
                            {
                                required: true,
                                message: "Please input price.",
                            },
                        ]}
                    >
                        <InputNumber
                            addonAfter="$"
                            stringMode={false}
                            name="price"
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ width: "100%" }}
                        name="categoryId"
                        label="Category"
                        className="mt-4"
                        rules={[
                            {
                                required: true,
                                message: "Please choose an category.",
                            },
                        ]}
                    >
                        <Select optionLabelProp="label" listHeight={200}>
                            {categories?.map((category) => (
                                <Select.Option
                                    value={category.id}
                                    label={category.nameCategory}
                                    key={category.id}
                                >
                                    <div className="flex">
                                        <img
                                            className="mr-3"
                                            style={{ width: 24 }}
                                            src={category.favIcon}
                                        />
                                        <span>{category.nameCategory}</span>
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <Form.List name="sizes">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <Space key={field.key} align="baseline">
                                    <Form.Item
                                        style={{ width: "250px" }}
                                        name={[field.name, "name"]}
                                        label="Name Size"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input name product.",
                                            },
                                        ]}
                                    >
                                        <Input
                                            style={{ padding: "4px 10px" }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ width: 150 }}
                                        name={[field.name, "price"]}
                                        label="Price Size"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input price.",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            addonAfter="$"
                                            stringMode={false}
                                        />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                        style={{ marginRight: 10 }}
                                        onClick={() => remove(field.name)}
                                    />
                                </Space>
                            ))}

                            <Form.Item key={1}>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    className="hover-btn-custom"
                                    icon={<PlusOutlined />}
                                    style={{
                                        backgroundColor: "var(--orange-1)",
                                    }}
                                >
                                    Add Size
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
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

export default memo(ProductModal);

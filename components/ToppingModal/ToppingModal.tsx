import {
    Modal,
    Form,
    Input,
    Upload,
    UploadFile,
    InputNumber,
    Select,
    SelectProps,
} from "antd";
import {
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    memo,
    UIEvent,
} from "react";
import { isEmpty, isEqual } from "lodash";
import { toast } from "react-toastify";
import { useProductsQuery } from "../../apis/product";
import {
    ITopping,
    useCreateToppingMutation,
    useUpdateToppingMutation,
} from "../../apis/topping";

const ToppingModal = ({
    isOpen,
    setIsOpen,
    topping,
    isEdit = false,
    refetchData,
}: {
    isOpen: boolean;
    isEdit?: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    topping?: ITopping;
    refetchData: any;
}) => {
    const [form] = Form.useForm();
    const [toppingInfo, setToppingInfo] = useState(topping as ITopping);
    const [mCreateTopping] = useCreateToppingMutation();
    const [mUpdateTopping] = useUpdateToppingMutation();
    const [selectedItems, setSelectedItems] = useState<number[]>(
        topping?.productIds || []
    );
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const {
        data: dataProducts,
        refetch: refetchProducts,
        isFetching: isFetchingProducts,
    } = useProductsQuery({ enable: true }, { refetchOnMountOrArgChange: true });
    const isDisabledSave = useMemo(() => {
        // console.log(topping?.prod
        return (
            isEqual(topping, toppingInfo) &&
            topping?.productIds?.length === selectedItems.length &&
            topping?.productIds?.every((item) =>
                selectedItems.some((productId) => productId === item)
            )
        );
    }, [topping, toppingInfo, selectedItems]);

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleToppingInfoChange = (key: string, value: any) => {
        setToppingInfo((pre: any) => {
            return {
                ...pre,
                [key]: value,
            };
        });
    };

    const handleOnChangeInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        handleToppingInfoChange(name, value);
    };
    const handleOnFinish = async () => {
        setIsLoadingBtn(true);
        const payload = form.getFieldsValue();
        let message = "Create topping successfully";
        try {
            if (isEdit) {
                message = "Update topping successfully";
                await mUpdateTopping({
                    ...payload,
                    toppingId: topping?.id,
                }).unwrap();
            } else {
                await mCreateTopping(payload).unwrap();
            }
        } catch (error: any) {
            toast.error(error.message || "Sorry something went wrong !");
            setIsLoadingBtn(false);
            return;
        }
        setIsLoadingBtn(false);
        setIsOpen(false);
        toast.success(message);
        refetchData();
    };

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (isEdit && !isEmpty(topping)) {
                form.setFieldsValue({
                    nameTopping: topping.nameTopping,
                    price: topping.price,
                    productIds: topping.productIds.filter((productId) =>
                        dataProducts?.products.find(
                            (product) => product.id === productId
                        )
                    ),
                });
                setSelectedItems(topping.productIds);
                setToppingInfo(topping);
            } else {
                form.setFieldsValue({
                    nameTopping: "",
                    price: "",
                });
            }
        }
    }, [topping, isOpen]);

    const handleOnSelectItems = (value: any) => {
        if (value.some((v: any) => v === 0)) {
            const newData =
                dataProducts?.products.map((product) => product.id) || [];
            form.setFieldValue("productIds", newData);
            setSelectedItems(newData);
            return;
        }

        setSelectedItems(value);
        form.setFieldValue("productIds", value);
    };

    return (
        <Modal
            title={isEdit ? "Edit Topping" : "Add Topping"}
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
                height: 240,
                overflowY: "auto",
                padding: "0 12px",
            }}
            destroyOnClose
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
                    name="nameTopping"
                    label="Name"
                    className="mt-4"
                    rules={[
                        {
                            required: true,
                            message: "Please input name topping.",
                        },
                    ]}
                >
                    <Input
                        style={{ padding: "4px 10px" }}
                        onChange={handleOnChangeInput}
                        name="nameTopping"
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
                            onChange={(value) => {
                                handleToppingInfoChange("price", value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ width: "100%" }}
                        name="productIds"
                        label="Products"
                        className="mt-4"
                    >
                        <Select
                            placeholder="Choose products"
                            listHeight={200}
                            showSearch
                            optionFilterProp="label"
                            optionLabelProp="label"
                            loading={isFetchingProducts}
                            mode="multiple"
                            placement="topRight"
                            allowClear
                            maxTagCount="responsive"
                            value={selectedItems}
                            onChange={(value) => {
                                handleOnSelectItems(value);
                            }}
                        >
                            {!isFetchingProducts && (
                                <>
                                    <Select.Option
                                        value={0}
                                        label={"All Product"}
                                        key={0}
                                    >
                                        <div className="flex justify-center">
                                            <span>Select All</span>
                                        </div>
                                    </Select.Option>
                                    {dataProducts?.products?.map((product) => (
                                        <Select.Option
                                            value={product.id}
                                            label={product.nameProduct}
                                            key={product.id}
                                        >
                                            <div className="flex">
                                                <img
                                                    className="mr-3"
                                                    style={{ width: 24 }}
                                                    src={product.favIcon}
                                                />
                                                <span>
                                                    {product.nameProduct}
                                                </span>
                                            </div>
                                        </Select.Option>
                                    ))}
                                </>
                            )}
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default memo(ToppingModal);

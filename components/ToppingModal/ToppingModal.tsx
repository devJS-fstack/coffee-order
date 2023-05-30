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
import { IProduct, ITopping, useProductsQuery } from "../../apis/product";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}

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
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const {
        data: dataProducts,
        refetch: refetchProducts,
        isFetching: isFetchingProducts,
    } = useProductsQuery({ enable: true }, { refetchOnMountOrArgChange: true });
    const isDisabledSave = useMemo(() => {
        return isEqual(topping, toppingInfo);
    }, [topping, toppingInfo]);

    const handleOk = () => {
        form.submit();
        // setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleToppingInfoChange = (key: string, value: string) => {
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
    const handleOnFinish = async () => {};

    useEffect(() => {
        if (isOpen) {
            refetchProducts();
            form.resetFields();
            if (isEdit && !isEmpty(topping)) {
                form.setFieldsValue({
                    nameTopping: topping.nameTopping,
                    price: topping.price,
                });
                setToppingInfo(topping);
            } else {
                form.setFieldsValue({
                    nameTopping: "",
                    price: "",
                });
            }
        }
    }, [topping, isOpen]);

    // const [selectedItems, setSelectedItems] = useState<string[]>([]);
    // const handleOnSelectItems = (value: any) => {
    //     if (value.some((v: any) => v === 0)) {
    //         const newData =
    //             dataProducts?.products.map((product) => product.nameProduct) ||
    //             [];
    //         console.log(newData);
    //         setSelectedItems(newData);
    //         return;
    //     }

    //     setSelectedItems(value);
    // };

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
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ width: "100%" }}
                        name="productId"
                        label="Products"
                        className="mt-4"
                    >
                        <Select
                            listHeight={200}
                            showSearch
                            optionFilterProp="label"
                            optionLabelProp="label"
                            loading={isFetchingProducts}
                            mode="multiple"
                            placement="topRight"
                            allowClear
                            maxTagCount="responsive"
                            // value={selectedItems}
                            // onChange={(value) => {
                            //     handleOnSelectItems(value);
                            // }}
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
                                            value={product.nameProduct}
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

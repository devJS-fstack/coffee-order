import {
    Modal,
    Form,
    Input,
    Upload,
    UploadFile,
    DatePicker,
    Select,
    InputNumber,
} from "antd";
import { useState, Dispatch, SetStateAction, useEffect, memo } from "react";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { UploadChangeParam } from "antd/es/upload";
import {
    IVoucher,
    useCreateVoucherMutation,
    useUpdateVoucherMutation,
} from "../../apis/voucher";
import { delay, disablePastDate } from "../../utils/helper";
import { VOUCHER_TYPES } from "../../utils/variable";
import dayjs, { Dayjs } from "dayjs";

const VoucherAdminModal = ({
    isOpen,
    setIsOpen,
    voucher,
    isEdit = false,
    refetchData,
}: {
    isOpen: boolean;
    isEdit?: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    voucher?: IVoucher;
    refetchData: any;
}) => {
    const [form] = Form.useForm();
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [typeVoucher, setTypeVoucher] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleOk = () => {
        form.submit();
    };
    const [mCreateVoucher] = useCreateVoucherMutation();
    const [mUpdateVoucher] = useUpdateVoucherMutation();

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
        setIsLoadingBtn(true);

        const params = form.getFieldsValue();
        const rangeDate = params.rangeDate as Dayjs[];
        params.dateStart = rangeDate[0].format("YYYY-MM-DD");
        params.dateExpired = rangeDate[1].format("YYYY-MM-DD");

        const formData = new FormData();
        Object.keys(params).forEach((key: any) =>
            formData.append(key, params[key])
        );
        formData.append("image", fileList[0]?.originFileObj as Blob);
        let message = "Create voucher successfully";
        console.log(params);
        await delay(500);
        try {
            if (isEdit) {
                message = "Update voucher successfully";
                await mUpdateVoucher({
                    payload: formData,
                    id: voucher?.id || 0,
                }).unwrap();
            } else {
                await mCreateVoucher(formData).unwrap();
            }
        } catch (error: any) {
            toast.error(
                error?.data?.message || "Sorry. Some thing went wrong!"
            );
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
            if (isEdit && !isEmpty(voucher)) {
                form.setFieldsValue({
                    ...voucher,
                    discount:
                        voucher.type === VOUCHER_TYPES.PRICE_DISCOUNT
                            ? voucher.priceDiscount
                            : voucher.percentDiscount,
                    rangeDate: [
                        dayjs(voucher.dateStart),
                        dayjs(voucher.dateExpired),
                    ],
                });
                setTypeVoucher(voucher.type);
                setFileList([
                    {
                        url: voucher.imageUrl,
                        uid: voucher.imageUrl,
                        name: voucher.nameVoucher,
                    },
                ]);
            } else {
                setFileList([]);
                form.setFieldsValue({
                    nameVoucher: "",
                    description: "",
                });
            }
        }
    }, [voucher, isOpen]);

    return (
        <Modal
            title={isEdit ? "Edit Voucher" : "Add Voucher"}
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
            bodyStyle={{
                height: 380,
                overflowY: "auto",
                padding: "0 12px",
            }}
            destroyOnClose
        >
            <Form
                layout="vertical"
                form={form}
                name="register"
                onFinish={handleOnFinish}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="nameVoucher"
                    label="Name"
                    className="mt-4"
                    rules={[
                        {
                            required: true,
                            message: "Please input name voucher.",
                        },
                    ]}
                >
                    <Input style={{ padding: "4px 10px" }} name="nameVoucher" />
                </Form.Item>
                <Form.Item
                    name="rangeDate"
                    label="Time Range"
                    rules={[
                        {
                            required: true,
                            message: "Please select range date",
                        },
                    ]}
                >
                    <DatePicker.RangePicker
                        format="MMMM.DD.YYYY"
                        placeholder={["Start Date", "Expired Date"]}
                        className="w-full"
                        disabledDate={disablePastDate}
                    />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Type"
                    rules={[
                        {
                            required: true,
                            message: "Please select type.",
                        },
                    ]}
                >
                    <Select
                        onChange={(value) => {
                            setTypeVoucher(value);
                            form.setFieldValue("maxDiscount", null);
                            form.setFieldValue("discount", null);
                        }}
                        value={typeVoucher}
                        options={[
                            {
                                label: "Price",
                                value: VOUCHER_TYPES.PRICE_DISCOUNT,
                            },
                            {
                                label: "Percent",
                                value: VOUCHER_TYPES.PERCENT_DISCOUNT,
                            },
                        ]}
                    />
                </Form.Item>
                {typeVoucher && (
                    <Form.Item
                        name="discount"
                        label={
                            typeVoucher === VOUCHER_TYPES.PERCENT_DISCOUNT
                                ? "Percent Discount"
                                : "Price Discount"
                        }
                        rules={[
                            {
                                required: true,
                                message: "Please input discount.",
                            },
                        ]}
                    >
                        <InputNumber
                            onChange={(value: any) => {
                                if (
                                    typeVoucher === VOUCHER_TYPES.PRICE_DISCOUNT
                                ) {
                                    form.setFieldValue("maxDiscount", value);
                                }
                            }}
                            className="w-full"
                            addonAfter={
                                typeVoucher === VOUCHER_TYPES.PERCENT_DISCOUNT
                                    ? "%"
                                    : "$"
                            }
                        />
                    </Form.Item>
                )}
                <div className="flex">
                    <Form.Item
                        name="minPayment"
                        label="Minimum Payment"
                        style={{ width: "50%", paddingRight: 10 }}
                        rules={[
                            {
                                required: true,
                                message: "Please input min payment.",
                            },
                        ]}
                    >
                        <InputNumber className="w-full" addonAfter="$" />
                    </Form.Item>
                    <Form.Item
                        name="maxDiscount"
                        label="Maximum Discount"
                        style={{
                            width: "50%",
                            paddingLeft: 10,
                        }}
                        rules={[
                            {
                                required: true,
                                message: "Please input max discount.",
                            },
                        ]}
                    >
                        <InputNumber
                            disabled={
                                typeVoucher === VOUCHER_TYPES.PRICE_DISCOUNT
                            }
                            className="w-full"
                            addonAfter="$"
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    name="limitUse"
                    label="Limited Usage"
                    rules={[
                        {
                            required: true,
                            message: "Please input limit for using.",
                        },
                    ]}
                >
                    <InputNumber className="w-full" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea
                        style={{ padding: "4px 10px" }}
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

export default memo(VoucherAdminModal);

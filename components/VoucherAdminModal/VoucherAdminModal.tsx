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
import { IVoucher } from "../../apis/voucher";
import { disablePastDate } from "../../utils/helper";
import { VOUCHER_TYPES } from "../../utils/variable";

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
        const value = form.getFieldsValue();
        console.log(value);
        if (!fileList.length) {
            toast.error("Please try to upload one image");
            return;
        }
    };

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (isEdit && !isEmpty(voucher)) {
                form.setFieldsValue({
                    nameVoucher: voucher.nameVoucher,
                    description: voucher.description,
                });
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
                        <InputNumber className="w-full" />
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
                        <InputNumber className="w-full" />
                    </Form.Item>
                </div>
                <Form.Item
                    name="limitUser"
                    label="Use Limit"
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

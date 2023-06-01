import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Tag } from "antd";
import {
    useDeleteToppingMutation,
    useToppingsQuery,
    useUpdateStatusToppingMutation,
} from "../../../apis/topping";
import TableV1 from "../../../components/TableV1";
import { STATUS_COLOR, STATUS_USERS } from "../../../utils/variable";
import { BsCaretRightFill, BsFillPencilFill } from "react-icons/bs";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { FiTrash } from "react-icons/fi";
import { RiMoreFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { ITopping } from "../../../apis/topping";
import ToppingModal from "../../../components/ToppingModal/ToppingModal";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { delay } from "../../../utils/helper";
import { toast } from "react-toastify";

const VoucherAdmin = ({}: {}) => {
    return <div className="w-full py-4">Voucher Hello</div>;
};

export default VoucherAdmin;
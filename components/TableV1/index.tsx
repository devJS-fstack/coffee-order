import cx from "classnames";
import React, { FC } from "react";
import { Table, TableProps } from "antd";

interface TableV1Props extends TableProps<any> {}

const TableV1: FC<TableV1Props> = ({ className, ...rest }) => {
  return <Table className={cx("", className)} {...rest} />;
};

export default TableV1;

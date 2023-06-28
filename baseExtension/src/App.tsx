import { bitable,setCellValue } from "@lark-opdev/block-bitable-api";
import { FC, useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import { getCurrentTask, setCompleted } from "./utils";
import { bitableApp } from "@bitable/open-client-isv";
import {
  Typography,
  Tag,
  Button,
  Divider,
  Space,
  Toast,
  TextArea,
  Input,
} from "@douyinfe/semi-ui";

const { Title, Text } = Typography;

const defaultTask = {
  prompt: "",
  // imgac:""
};

export const App = () => {
  const task = useAsync(getCurrentTask, []);
  const { prompt } = task.result ?? defaultTask;

  console.log(task);

  // 切换上下一条记录时，触发 SelectionChange
  useEffect(() => {
    return bitable.base.onSelectionChange(({ data }) =>
      task.execute()
    );
  }, [task]);

  return (
    <PureTaskComponment
      prompt={prompt}
    />
  );
};

interface PureTaskComponmentProps {
  prompt: string;
}

const PureTaskComponment: FC<PureTaskComponmentProps> = ({
  prompt,
}) => {

  return (
    <Space vertical align="start">
      <div>
        <TextArea
          autosize
          style={{ width: "36rem",padding:"5px",margin:"10px" }}
          value={prompt}>
        </TextArea>
      </div>
    </Space>
  );
};

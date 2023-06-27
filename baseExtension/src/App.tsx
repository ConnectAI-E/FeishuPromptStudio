import { bitable } from "@lark-opdev/block-bitable-api";
import { FC, useEffect } from "react";
import { useAsync } from "react-async-hook";
import { getCurrentTask, setCompleted } from "./utils";
import {
  Typography,
  Tag,
  Button,
  Divider,
  Space,
  Toast,
} from "@douyinfe/semi-ui";

const { Title, Text } = Typography;

const defaultTask = {
  description: "",
  userName: "",
  completed: false,
};

export const App = () => {
  const task = useAsync(getCurrentTask, []);
  const { description, userName, completed } = task.result ?? defaultTask;

  // 切换上下一条记录时，触发 SelectionChange
  useEffect(() => {
    return bitable.base.onSelectionChange(({ data }) =>
      task.execute()
    );
  }, []);

  const toggleCompleted = () => {
    setCompleted(!completed)
      .then(() => task.execute())
      .then(() => Toast.success("更新任务状态成功"))
      .catch(() => Toast.error("更新任务状态失败"));
  };

  // if (task.loading) return <div>loading</div>;
  // if (task.error) return <div>error: {task.error.message}</div>;

  return (
    <PureTaskComponment
      description={description}
      userName={userName}
      completed={completed}
      toggleCompleted={toggleCompleted}
    />
  );
};

interface PureTaskComponmentProps {
  description: string;
  userName: string;
  completed: boolean;
  toggleCompleted: () => void;
}

const PureTaskComponment: FC<PureTaskComponmentProps> = ({
  description,
  userName,
  completed,
  toggleCompleted,
}) => {
  return (
    <Space vertical align="start">
      <div>
        <Title heading={2}>任务管小应用</Title>
      </div>
      <div>
        <Text>描述：</Text>
        <Text>{description}</Text>
      </div>
      <div>
        <Text>执行人：</Text>
        <Text>{userName}</Text>
      </div>
      <div>
        <Text>完成状态：</Text>
        <Tag color={completed ? "green" : "blue"}>
          {completed ? "已完成" : "未完成"}
        </Tag>
      </div>
      <Divider />
      <div>
        <Button
          type={completed ? "danger" : "primary"}
          onClick={toggleCompleted}
        >
          {completed ? "撤销完成任务" : "完成任务"}
        </Button>
      </div>
    </Space>
  );
};

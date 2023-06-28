import {
  AtlassianNavigation,
  CustomProductHome,
  PrimaryButton,
  Settings
} from "@atlaskit/atlassian-navigation";
import {
  Content,
  PageLayout,
  TopNavigation
} from "@atlaskit/page-layout";
import TextArea from "@atlaskit/textarea";
import {
  Toast,
  Typography
} from "@douyinfe/semi-ui";
import { bitable } from "@lark-opdev/block-bitable-api";
import { useEffect } from "react";
import { useAsync } from "react-async-hook";
import iconLogo from "./asset/logo2.svg";
import { getCurrentTask, setCompleted } from "./utils";
const { Title, Text } = Typography;


const AtlassianProductHome = () => (
  <CustomProductHome
    href="#"
    siteTitle="FPS"
    iconUrl={iconLogo}
    iconAlt="Feishu Prompt Studio"
    logoUrl={iconLogo}
    logoAlt="Feishu Prompt Studio"
  />
);

const defaultTask = {
  description: "",
  userName: "",
  completed: false,
};
const DefaultSettings = () => <Settings tooltip="Product settings" />;

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
    <PageLayout>
      <TopNavigation>
        <AtlassianNavigation
          label="site"
          renderSettings={DefaultSettings}
          primaryItems={[
            <PrimaryButton>Feishu Prompt Studio</PrimaryButton>
          ]}
          renderProductHome={AtlassianProductHome}
        />
      </TopNavigation>
      <Content>
        <TextArea
          minimumRows={3}
          resize="auto"
          maxHeight="20vh"
          name="area"
          defaultValue="Add a message here"
        />
      </Content>
    </PageLayout>
  );
};

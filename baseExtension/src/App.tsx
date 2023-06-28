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
import iconLogo from "./asset/logo.svg";
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
  prompt: "",
  // imgac:""
};
const DefaultSettings = () => <Settings tooltip="Product settings" />;

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

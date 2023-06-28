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
import Tag from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';
import TextArea from "@atlaskit/textarea";
import {
  Typography
} from "@douyinfe/semi-ui";
import { bitable } from "@lark-opdev/block-bitable-api";
import { useEffect } from "react";
import { useAsync } from "react-async-hook";
import iconLogo from "./asset/logo.svg";
import { getCurrentTask } from "./utils";
import "./index.css";
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

  // console.log(prompt)

  // 切换上下一条记录时，触发 SelectionChange
  useEffect(() => {
    return bitable.base.onSelectionChange(({ data }) =>
      task.execute()
    );
  }, []);

  return (
    <PageLayout>
      <TopNavigation>
        <AtlassianNavigation
          label="site"
          renderSettings={DefaultSettings}
          primaryItems={[<PrimaryButton>Feishu Prompt Studio</PrimaryButton>]}
          renderProductHome={AtlassianProductHome}
        />
      </TopNavigation>
      <Content>
        <div className="flex-1 py-2 px-4">
          <div>
            <div className="text-red pb-1 font-bold">提示词</div>
          </div>
          <div>
            <TextArea
              minimumRows={3}
              resize="auto"
              maxHeight="20vh"
              name="area"
              defaultValue={prompt}
            />
          </div>
        </div>
      </Content>
    </PageLayout>
  );
};

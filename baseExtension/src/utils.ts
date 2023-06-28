import {
  IOpenAttachment,
  IOpenCheckbox,
  IOpenSegment,
  IOpenCellValue,
  getAttachmentUrl,
  bitable
} from "@lark-opdev/block-bitable-api";

/**
 * 从模板创建的多维表格
 * 可以保证字段 ID 与模板一致
 */

/** prompt  */
const userFieldPrompt = "fldUq3olTt";

const imageAction = "fldR6gtMRo";

const Scenario = "fldRE5v2kY";

export async function getCurrentTask() {
  // 1. 读取选中的表和记录 //
  const { tableId, recordId } = await bitable.base.getSelection();
  console.log(tableId, recordId);
  if (!tableId || !recordId) throw new Error("选区状态读取失败");
  const table = await bitable.base.getTableById(tableId);

  // 2. 读取单元格 //

  const prompt = (await table.getCellValue(
    userFieldPrompt,
    recordId
  )) as IOpenSegment[];

  const imgac = (await table.getCellValue(
    imageAction,
    recordId
  )) as IOpenSegment[];
console.log(imgac);


  // 3. 将单元格结构体转换成业务所需数据 //
  return {
    prompt: prompt[0].text
    // imgac: imgac.text
  };
}


import {
  IOpenCheckbox,
  IOpenSegment,
  IOpenUser,
  bitable
} from "@lark-opdev/block-bitable-api";

/**
 * 从模板创建的多维表格
 * 可以保证字段 ID 与模板一致
 */

/** 任务描述字段 ID */
const descriptionFieldId = "fldaxqIJ1m";

/** 任务执行人字段名称 */
const userFieldName = "任务执行人";

/** 是否完成字段 ID */
const completedFieldId = "fld9cvGzic";

/** 尝试一下：接入是否延期字段 ID */
// const exceedingFieldId = "todo"

function getUserName(userValue: IOpenUser[] | null) {
  if (!userValue || userValue.length === 0) {
    return "任务执行人不存在";
  }
  return userValue[0].name ?? "用户没有设置姓名";
}

function getDescription(descriptionValue: IOpenSegment[] | null) {
  if (!descriptionValue || descriptionValue.length === 0) {
    return "任务描述不存在";
  }
  return descriptionValue.map((segment) => segment.text).join("");
}

export async function getCurrentTask() {
  // 1. 读取选中的表和记录 //
  const { tableId, recordId } = await bitable.base.getSelection();
  if (!tableId || !recordId) throw new Error("选区状态读取失败");
  const table = await bitable.base.getTableById(tableId);

  // 2. 读取单元格 //
  const completedValue = (await table.getCellValue(
    completedFieldId,
    recordId
  )) as IOpenCheckbox;
  const userField = await table.getFieldByName(userFieldName);
  const userValue = (await table.getCellValue(
    userField.id,
    recordId
  )) as IOpenUser[];
  const descriptionValue = (await table.getCellValue(
    descriptionFieldId,
    recordId
  )) as IOpenSegment[];

  // 尝试一下：读取是否延期字段
  // 单选的值类型为 IOpenSingleSelect
  // const exceedingValue = (await table.getCellValue(exceedingFieldId, recordId)) as IOpenSingleSelect;

  // 尝试一下：将 exceedingValue 转换成选中选项的字符串
  // const exceedingText = doYourCustomTransform(exceedingValue)

  // 3. 将单元格结构体转换成业务所需数据 //
  return {
    description: getDescription(descriptionValue),
    userName: getUserName(userValue),
    completed: completedValue,
    // 尝试一下：返回是否延期信息
    // exceeding: exceedingText
  };
}

export async function setCompleted(completed: boolean) {
  // 1. 读取选中的表和记录 //
  const { tableId, recordId } = await bitable.base.getSelection();
  if (!tableId || !recordId) throw new Error("选区状态读取失败");
  const table = await bitable.base.getTableById(tableId);

  // 2. 将业务数据转换成单元格结构，然后写入 //
  table.setCellValue(completedFieldId, recordId, completed as IOpenCheckbox);
}

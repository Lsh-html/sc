import type { EpPropMergeType } from "element-plus/es/utils/vue/props/types";

type T = EpPropMergeType<StringConstructor, "success" | "warning" | "info" | "error", unknown> | undefined

export function elMessage(message = '操作成功', type: number = 0) {
  // ElMessage({
  //   showClose: true,
  //   message,
  //   type: type == 0 ? 'info' : type == 200 ? 'success' : type != 200 ? 'warning' : 'info',
  // })
}
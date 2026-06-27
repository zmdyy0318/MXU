import { shouldSkipMxuScreenshot } from '@/types/specialTasks';
import type { SelectedTask } from '@/types/interface';

/** 三段式任务切分结果：前置特殊 / 中间游戏 / 收尾特殊 */
export interface ThreeSegmentSplit<T> {
  leading: T[];
  middle: T[];
  trailing: T[];
}

/**
 * 将任务列表切成最多三段：
 * - leading：队首连续 MXU 特殊任务
 * - middle：第一个游戏任务到最后一个游戏任务（含夹在游戏之间的特殊任务）
 * - trailing：队尾连续 MXU 特殊任务
 */
export function splitTasksIntoThreeSegments<T extends { taskName: string }>(
  tasks: T[],
): ThreeSegmentSplit<T> {
  if (tasks.length === 0) {
    return { leading: [], middle: [], trailing: [] };
  }

  let leadingEnd = 0;
  while (leadingEnd < tasks.length && shouldSkipMxuScreenshot(tasks[leadingEnd].taskName)) {
    leadingEnd += 1;
  }

  let trailingStart = tasks.length;
  while (
    trailingStart > leadingEnd &&
    shouldSkipMxuScreenshot(tasks[trailingStart - 1].taskName)
  ) {
    trailingStart -= 1;
  }

  return {
    leading: tasks.slice(0, leadingEnd),
    middle: tasks.slice(leadingEnd, trailingStart),
    trailing: tasks.slice(trailingStart),
  };
}

/** 是否存在需要 Dummy 空 controller 的特殊段（前置或收尾） */
export function hasSpecialSegments(segments: ThreeSegmentSplit<unknown>): boolean {
  return segments.leading.length > 0 || segments.trailing.length > 0;
}

/** 是否应走分段运行（存在特殊段且与游戏段组合） */
export function needsSegmentedRun(segments: ThreeSegmentSplit<unknown>): boolean {
  return hasSpecialSegments(segments);
}

export type { SelectedTask };

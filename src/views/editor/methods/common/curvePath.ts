import { Vector3, Curve3 } from "@babylonjs/core/Legacy/legacy";

/**
 * 创建一条平滑的 Catmull-Rom 曲线路径
 * @param points 控制点数组 [x, y, z][]
 * @param nbPointsPerSegment 每个线段细分的点数
 * @returns Vector3[] 曲线上的所有点
 */
export function createBezierPath(
  points: [number, number, number][],
  nbPointsPerSegment = 20
): Vector3[] {
  if (!Array.isArray(points) || points.length === 0) {
    return [];
  }

  // 转换为 Vector3 数组
  const controlPoints = points.map((p) => new Vector3(p[0], p[1], p[2]));

  // 如果只有1个点，直接返回
  if (controlPoints.length === 1) {
    return controlPoints;
  }

  // 使用 Catmull-Rom 样条插值
  const curve = Curve3.CreateCatmullRomSpline(controlPoints, nbPointsPerSegment);

  // 获取所有插值点
  const curvePoints = curve.getPoints();

  return curvePoints;
}
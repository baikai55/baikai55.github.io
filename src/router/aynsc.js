//系统管理
const dept = {
  path: "/system/dept",
  component: () => import("@/views/system/dept"),
  meta: { title: "机构管理", father: "系统管理" },
};
const menu = {
  path: "/system/menuManagement",
  component: () => import("@/views/system/menu"),
};
const user = {
  path: "/system/user",
  component: () => import("@/views/system/user"),
  meta: { title: "用户管理", father: "系统管理" },
};
const permission = {
  path: "/system/permission",
  component: () => import("@/views/system/permission"),
};
const roles = {
  path: "/system/roles",
  component: () => import("@/views/system/roles"),
};
const white = {
  path: "/system/white",
  component: () => import("@/views/system/white"),
};
//参数分值
const params = {
  path: "/assess/params",
  component: () => import("@/views/assess/params"),
};
const type = {
  path: "/assess/type",
  component: () => import("@/views/assess/type"),
};
const score = {
  path: "/assess/score",
  component: () => import("@/views/assess/score"),
};
//404
const NotFound = { path: "*", component: () => import("@/views/404") };
//警员管理
const deptP = {
  path: "/police/dept",
  component: () => import("@/views/police/dept"),
};
const scoreP = {
  path: "/police/score",
  component: () => import("@/views/police/score"),
};
const msg = {
  path: "/police/msg",
  component: () => import("@/views/police/msg"),
};
//任务、考核
const task = {
  path: "/assessment/task",
  component: () => import("@/views/assessment/task"),
};
const update = {
  path: "/assessment/update",
  component: () => import("@/views/assessment/update"),
};
const details = {
  path: "/assessment/details",
  component: () => import("@/views/assessment/details"),
};
const scoreA = {
  path: "/assessment/score",
  component: () => import("@/views/assessment/score"),
};
const appeal = {
  path: "/assessment/appeal",
  component: () => import("@/views/assessment/appeal"),
};
const spottest = {
  path: "/assessment/spottest",
  component: () => import("@/views/assessment/spottest"),
};

//公告
const control = {
  path: "/notice/control",
  component: () => import("@/views/notice/control"),
};
const updateN = {
  path: "/notice/update",
  component: () => import("@/views/notice/update"),
};
//排名
const detailsR = {
  path: "/ranking/details",
  component: () => import("@/views/ranking/details"),
};
const controlR = {
  path: "/ranking/control",
  component: () => import("@/views/ranking/control"),
};
const meanscore = {
  path: "/ranking/meanscore",
  component: () => import("@/views/ranking/meanscore"),
};
const scorerank = {
  path: "/ranking/scorerank",
  component: () => import("@/views/ranking/scorerank"),
};
const timing = {
  path: "/system/timing",
  component: () => import("@/views/system/timing"),
};
const important = {
  path: "/assessment/important",
  component: () => import("@/views/assessment/important"),
};
const log = {
  path: "/score/log",
  component: () => import("@/views/score/log"),
};
const asyncRouetr = {
  "/system/dept": dept,
  "/system/user": user,
  "/system/permission": permission,
  "/system/roles": roles,
  "/system/white": white,
  "/system/menuManagement": menu,
  "/system/timing": timing,
  "*": NotFound,
  "/assess/params": params,
  "/assess/type": type,
  "/assess/score": score,
  "/police/dept": deptP,
  "/police/score": scoreP,
  "/police/msg": msg,
  "/assessment/task": task,
  "/assessment/update": update,
  "/assessment/details": details,
  "/assessment/score": scoreA,
  "/assessment/appeal": appeal,
  "/assessment/spottest": spottest,
  "/assessment/important": important,
  "/notice/control": control,
  "/notice/update": updateN,
  "/ranking/details": detailsR,
  "/ranking/control": controlR,
  "/ranking/meanscore": meanscore,
  "/ranking/scorerank": scorerank,
  "/score/log": log,
};

export default asyncRouetr;

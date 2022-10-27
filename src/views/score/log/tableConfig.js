let headers = [
  { selection: true, width: "70px" },
  { prop: "score", label: "操作分值", minWidth: "120px" },
  //｜0:-｜1:+
  {
    prop: "operationType",
    label: "操作类型",
    minWidth: "120px",
    status: true,
    bgc: (val) => (val == 0 ? "red" : val == 1 ? "#5bdc5b" : val),
    filters: (val) => (val == 0 ? "扣分" : val == 1 ? "加分" : val),
  },
  {
    prop: "isAppeal",
    label: "申诉说明",
    minWidth: "150px",
    status: true,
    filters: (val) => (val == 0 ? "抽查扣分不可申诉" : val == 1 ? "可申诉" : val),
  },
  {
    prop: "bigTypeStr",
    label: "大类",
    minWidth: "120px",
  },
  {
    prop: "smallTypeStr",
    label: "小类",
    minWidth: "200px",
  },
  // {
  //   //（0:待办｜1:待审核｜2:待申诉｜3:申诉待审核｜98:完成待抽查|99完成）
  //   prop: "taskState",
  //   label: "任务状态",
  //   minWidth: "130px",
  //   status: true,
  //   filters: (val) => {
  //     if (val == 0) {
  //       return "待办";
  //     } else if (val == 1) {
  //       return "待审核";
  //     } else if (val == 2) {
  //       return "待申诉";
  //     } else if (val == 3) {
  //       return "申诉待审核";
  //     } else if (val == 98) {
  //       return "完成待抽查";
  //     } else if (val == 99) {
  //       return "完成";
  //     }
  //   },
  // },
  // { prop: "completeTime", label: "完成时间", minWidth: "120px" },

  {
    prop: "caozuo",
    label: "操作",
    control: true,
    fixed: "right",
    tableOption: [
      {
        type: "text",
        label: "申诉",
        size: "mini",
        role: (userType) =>
          userType == 5
            ? true
            : userType == 3
            ? false
            : userType == 4
            ? false
            : true,
        methods: "appeal",
        disabled: (val) => (val == 0 ? true : false),
      },
      {
        type: "text",
        label: "删除",
        title: "确定删除吗？",
        role: (userType) =>
          userType == 5 ? false : userType == 4 ? false : true,
        size: "mini",
        methods: "delete",
      },
    ],
  },
];
export default headers;

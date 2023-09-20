export const quickEntry = [
  {
    title: "仓库管理",
    icon: "fa fa-window-restore fa-2x fa-fw",
    router: "/user",
    permission: "warehouse-admin",
  },
  {
    title: "添加用户",
    icon: "fa fa-user-plus fa-fw fa-2x",
    router: "/post/review",
    permission: "user-admin",
  },
  {
    title: "权限管理",
    icon: "fa fa-lock fa-fw fa-2x",
    router: "/post/review",
    permission: "user-admin",
  },
  {
    title: "物料入库",
    icon: "fa fa-arrow-circle-right fa-fw fa-2x",
    router: "/post/review",
    permission: "user-admin",
  },
  {
    title: "物料出库",
    icon: "fa fa-arrow-circle-left fa-fw fa-2x",
    router: "/post/review",
    permission: "user-admin",
  },
  {
    title: "我的出库",
    icon: "fa  fa-paper-plane fa-2x fa-fw",
    router: "/post/edit",
    permission: "site-user",
  },
  {
    title: "我的入库",
    icon: "fa fa-truck fa-2x fa-fw",
    router: "/post/category",
    permission: "site-user",
  },
];

export function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

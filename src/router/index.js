import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router";
import Login from "@/views/login";
import Layout from "@/views/layout";
import Centre from "@/views/centre";
import User from "@/views/user/user";
import Review from "@/views/post/review";
import Post from "@/views/post/post";
import Edit from "@/views/post/edit";
import PostContent from "@/views/post/components/Content";
import Category from "@/views/post/category";
import Topic from "@/views/post/topic";
import CategoryDetail from "@/views/post/components/CategoryDetail";
import Comment from "@/views/comment/comment";
import Manage from "@/views/comment/manage";
import Report from "@/views/community/report";
import unreadReport from "@/views/community/unreadReport";
import readedReport from "@/views/community/readedReport";
import configure from "../views/community/configure";
import { getToken } from "@/util/token";
import { Message } from "element-ui";
import NProgress from "nprogress"; //引入nprogress

Vue.use(VueRouter);

// 解决路由redirect报错(redirect报错不会影响正常功能但是看着就是很烦)
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//     if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//     return originalPush.call(this, location).catch(err => err)
// }

const systemRouter = [
  {
    path: "user/manager",
    name: "UserManager",
    component: () => import("@/views/system/User.vue"),
    meta: {
      title: "用户管理",
      icon: "el-icon-user-solid",
      roles: ["admin"],
    },
  },
  {
    path: "permission/manager",
    name: "PermissionManager",
    component: () => import("@/views/system/Permission.vue"),
    meta: {
      title: "权限管理",
      icon: "el-icon-user-solid",
      roles: ["admin"],
    },
  },
  {
    path: "role/manager",
    name: "RoleManager",
    component: () => import("@/views/system/Role.vue"),
    meta: {
      title: "角色管理",
      icon: "el-icon-user-solid",
      roles: ["admin"],
    },
  },
];

const produceRouter = [
  {
    path: "Warehouse/manager",
    name: "WarehouseManager",
    component: () => import("@/views/produce/warehouse/Warehouse.vue"),
    meta: {
      title: "仓库管理",
      icon: "el-icon-user-solid",
      roles: ["admin"],
    },
  },
  {
    path: "material/stocking/:warehouseId?",
    name: "MaterialStocking",
    component: () => import("@/views/produce/material/Stocking.vue"),
    meta: {
      title: "物料入库",
      icon: "el-icon-user-solid",
      roles: ["admin"],
    },
  },
  {
    path: "material/list/:warehouseId?",
    name: "List",
    component: () => import("@/views/produce/material/List.vue"),
    meta: {
      title: "物料列表",
      icon: "el-icon-user-solid",
      roles: ["admin"],
    },
  },
  {
    path: "material/out/:materialId?",
    name: "MaterialOut",
    component: () => import("@/views/produce/material/Out.vue"),
    meta: {
      title: "物料出库",
      icon: "el-icon-user-solid",
      roles: ["admin"],
    },
  },
  {
    path: "material/spec",
    name: "MaterialSpec",
    component: () => import("@/views/produce/material/Spec.vue"),
    meta: {
      title: "规格管理",
      icon: "el-icon-user-solid",
      roles: ["admin"],
    },
  },
];
const ownerRouter = [
  {
    path: "owner/out",
    name: "OwnerOut",
    component: () => import("@/views/owner/Out.vue"),
    meta: {
      title: "我的出库记录",
      icon: "el-icon-user-solid",
      roles: ["admin"],
    },
  },
];
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "管理员登录",
    },
  },
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "index",
    children: [
      ...systemRouter,
      ...produceRouter,
      ...ownerRouter,
      {
        path: "index",
        name: "Centre",
        component: Centre,
        meta: {
          title: "后台管理主页",
        },
      },
      {
        path: "user",
        name: "User",
        component: User,
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "post",
        name: "Post",
        component: Post,
        children: [
          {
            path: "review",
            name: "Review",
            component: Review,
            meta: {
              title: "帖子审核",
            },
          },
          {
            path: "detail/:id",
            name: "Content",
            component: PostContent,
            meta: {
              title: "帖子详情",
            },
          },
          {
            path: "edit",
            name: "Edit",
            component: Edit,
            meta: {
              title: "帖子编辑",
              searchData: [
                { label: "标题", value: "title" },
                { label: "作者", value: "author" },
              ],
              searchTip: "搜索帖子",
              rules: [
                {
                  required: true,
                  message: "请输入搜索关键字",
                  trigger: "change",
                },
                {
                  min: 3,
                  max: 50,
                  message: "长度在 3 到 50 个字符",
                  trigger: "blur",
                },
              ],
            },
          },
          {
            path: "category",
            name: "Category",
            component: Category,
            meta: {
              title: "帖子类别",
              searchData: [{ label: "类别名", value: "name" }],
              searchTip: "搜索帖子类别",
            },
          },
          {
            path: "category/:action/:id?",
            name: "CategoryOpearator",
            component: CategoryDetail,
            meta: {
              title: "帖子类别操作",
            },
          },
          {
            path: "topic",
            name: "Topic",
            component: Topic,
            meta: {
              title: "帖子主题",
              searchData: [{ label: "主题名", value: "name" }],
              searchTip: "搜索帖子主题",
            },
          },
        ],
      },
      {
        path: "comment",
        name: "Comment",
        component: Comment,
        children: [
          {
            path: "manage",
            name: "Manage",
            component: Manage,
            meta: {
              title: "评论管理",
              searchData: [
                { label: "作者", value: "author" },
                { label: "内容", value: "body" },
              ],
              searchTip: "搜索评论",
            },
          },
          {
            path: "analysis",
            name: "Analysis",
            meta: {
              title: "评论分析",
            },
          },
        ],
      },
      {
        path: "report",
        name: "Report",
        component: Report,
        children: [
          {
            path: "unread",
            component: unreadReport,
            meta: {
              title: "未读举报信息",
            },
          },
          {
            path: "readed",
            component: readedReport,
            meta: {
              title: "已读举报消息",
            },
          },
        ],
      },
      {
        path: "visit/statistics",
        name: "VisitStatistics",
        meta: {
          title: "访问统计",
        },
      },
      {
        path: "community/configure",
        name: "Configure",
        component: configure,
        meta: {
          title: "系统配置",
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  let token = getToken("Access-Token");
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "后台管理页面";
  }
  if (to.name !== "Login" && !token) {
    next({ name: "Login" });
    Message({
      message: "请先登录！",
      type: "warning",
    });
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

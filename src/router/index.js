import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout"
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "Login",
    hidden: true
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "控制台",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/consoleIndex",
        name: "ConsoleIndex",
        meta: {
          title: "首页"
        },
        component: () => import("../views/Console/index.vue"),
      }
    ],
  },
  {
    path: "/parking",
    name: "Parking",
    meta: {
      title: "停车场",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/parkingIndex",
        name: "ParkingIndex",
        meta: {
          title: "列表管理"
        },
        component: () => import("../views/Parking/index.vue"),
      },
      {
        path: "/parkingAdd",
        name: "ParkingAdd",
        meta: {
          title: "新增停车场"
        },
        component: () => import("../views/Parking/parkingadd.vue"),
      }
    ],
  },
  {
    path: "/carsbrand",
    name: "Carsbrand",
    meta: {
      title: "车辆品牌",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/carsbrandIndex",
        name: "CarsbrandIndex",
        meta: {
          title: "品牌列表"
        },
        component: () => import("../views/Carsbrand/index.vue"),
      },
      // {
      //   path: "/parkingAdd",
      //   name: "ParkingAdd",
      //   meta: {
      //     title: "新增停车场"
      //   },
      //   component: () => import("../views/Parking/parkingadd.vue"),
      // }
    ],
  },
  {
    path: "/cars",
    name: "Cars",
    meta: {
      title: "车辆管理",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/carsaddIndex",
        name: "CarsaddIndex",
        meta: {
          title: "新增车辆"
        },
        component: () => import("../views/Cars/carsadd.vue"),
      },
      {
        path: "/carslist",
        name: "Carslist",
        meta: {
          title: "车辆列表"
        },
        component: () => import("../views/Cars/carslist.vue"),
      },
      {
        path: "/carsattr",
        name: "Carsattr",
        meta: {
          title: "车辆属性"
        },
        component: () => import("../views/Cars/carsattr.vue"),
      }
    ],
  },
  {
    path: "/sale",
    name: "Sale",
    meta: {
      title: "销售管理",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/leaseIndex",
        name: "LeaseIndexIndex",
        meta: {
          title: "租赁类型"
        },
        component: () => import("../views/lease/index.vue"),
      },
    ],
  },
  {
    path: "/member",
    name: "Member",
    meta: {
      title: "会员管理",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/memberIndex",
        name: "MemberIndex",
        meta: {
          title: "会员列表"
        },
        component: () => import("../views/Member/index.vue"),
      },
      {
        path: "/memberdetailed",
        name: "Memberdetailed",
        hidden: true,
        meta: {
          title: "会员详情"
        },
        component: () => import("../views/Member/memberdetaild.vue"),
      },
      {
        path: "/memberinfo",
        name: "Memberinfo",
        meta: {
          title: "会员编辑"
        },
        component: () => import("../views/Member/memberinfo.vue"),
      },
    ],
  },
  {
    path: "/order",
    name: "Order",
    meta: {
      title: "订单管理",
      icon: "console",
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/orderIndex",
        name: "OrderIndex",
        meta: {
          title: "订单列表"
        },
        component: () => import("../views/Order/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;

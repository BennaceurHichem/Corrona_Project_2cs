/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";

import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import TheatersIcon from '@material-ui/icons/Theaters';
import VideosList from 'views/VideosList/VideosList'
//article component 
import RedactionArticle from 'views/Article/RedactionArticle'
import ArticleValidation from 'views/Article/ArticleValidation'
import DashboardRedacteur from 'views/Dashboard/DashboardRedacteur'
import DashboardAgent from 'views/Dashboard/DashboardAgent'
import AgentForm from 'components/AgentForm/AgentForm'
import CreateIcon from '@material-ui/icons/Create';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    user:"admin"
  },
  /*{
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    user:"admin"
  },*/
/*{
    path: "/videos",
    name: "Videos Reçus",
    rtlName:" الفيديوهات ",
    icon: TheatersIcon,
    component: VideosList,
    layout: "/admin",
    user:"admin"
  },
  */
  {
    path: "/articlevalidation",
    name: "Validation des articles ",
    rtlName:" قبول المقالات ",
    icon: AssignmentTurnedInIcon,
    component: ArticleValidation,
    layout: "/admin",
    user:"admin"

  },
  {
    path: "/dashboardagent",
    name: "Dashboard Agent",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardAgent,
    layout: "/agent",
    user:"agent"
  },
  {
    path: "/dataentry",
    name: "Remplissage d'information",
    rtlName: "إدخال المعلومات ",
    icon: Person,
    //need to be changed 
    component: AgentForm,
    layout: "/agent",
    user:"agent"
  },
/*{
    path: "/videos",
    name: "Videos Reçus",
    rtlName:" الفيديوهات ",
    icon: TheatersIcon,
    component: VideosList,
    layout: "/admin",
    user:"admin"
  },
  */

  {
    path: "/dashboardredacteur",
    name: "Dashboard Redacteur",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardRedacteur,
    layout: "/redacteur",
    user:"redacteur",
    
  },

  {
    path: "/writearticle",
    name: "Writing article ",
    rtlName: "كتابة المقال",
    icon: CreateIcon,
    component: RedactionArticle,
    layout: "/redacteur",
    user:"redacteur",
    
  },
  
  /*{
    path: "/createarticle",
    name: "Redaction article",
    rtlName: "كتابة المقال",
    icon: Dashboard,
    //need to create a component for creating article 
    component: DashboardRedacteur,
    layout: "/redacteur",
    user:"redacteur"
  },*/







  /*{
    path: "/typography",
    name: "Typography",
    rtlName: "الخطوط",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },*/
 /* {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },*/
  /*{
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  }*/,
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  /*{
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "دعم اللغة العربية ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  },*/
 /* {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  }
  */
];

export default dashboardRoutes;

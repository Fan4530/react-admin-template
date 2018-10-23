/**
 * This is file is the index for all of the current components.
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import BasicForm from './forms/BasicForm';
import BasicTable from './tables/BasicTables';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Echarts from './charts/Echarts';
import Recharts from './charts/Recharts';
import Icons from './ui/Icons';
import Buttons from './ui/Buttons';
import Spins from './ui/Spins';
import Modals from './ui/Modals';
import Notifications from './ui/Notifications';
import Tabs from './ui/Tabs';
import Banners from './ui/banners';
import Drags from './ui/Draggable';
import Dashboard from './dashboard/Dashboard';
import Gallery from './ui/Gallery';
import BasicAnimations from './animation/BasicAnimations';
import ExampleAnimations from './animation/ExampleAnimations';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import Cssmodule from './cssmodule';
import MapUi from './ui/map';
import SortTable from "./tables/SortTable";
import SelectTable from "./tables/SelectTable";
import UserProfiles from "./user-profiles/user-profiles";
import UserCommissions from "./user-commissions/user-commissions";

const WysiwygBundle = Loadable({
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    BasicForm, BasicTable, AdvancedTable, AsynchronousTable,
    Echarts, Recharts, Icons, Buttons, Spins, Modals, Notifications,
    Tabs, Banners, Drags, Dashboard, Gallery, BasicAnimations,
    ExampleAnimations, AuthBasic, RouterEnter, WysiwygBundle,
    Cssmodule, MapUi, SortTable, SelectTable, UserProfiles,UserCommissions,
}

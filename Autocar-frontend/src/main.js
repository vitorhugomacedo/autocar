import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import AutoComplete from 'primevue/autocomplete';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import BlockUI from 'primevue/blockui';
import Button from 'primevue/button';
import Breadcrumb from 'primevue/breadcrumb';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import CascadeSelect from 'primevue/cascadeselect';
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Chips from 'primevue/chips';
import ColorPicker from 'primevue/colorpicker';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import ContextMenu from 'primevue/contextmenu';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import DeferredContent from 'primevue/deferredcontent';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice';
import Divider from 'primevue/divider';
import Dock from 'primevue/dock';
import Dropdown from 'primevue/dropdown';
import DynamicDialog from 'primevue/dynamicdialog';
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';
import InlineMessage from 'primevue/inlinemessage';
import Inplace from 'primevue/inplace';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Knob from 'primevue/knob';
import Listbox from 'primevue/listbox';
import MegaMenu from 'primevue/megamenu';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import OrderList from 'primevue/orderlist';
import OrganizationChart from 'primevue/organizationchart';
import OverlayPanel from 'primevue/overlaypanel';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import PanelMenu from 'primevue/panelmenu';
import Password from 'primevue/password';
import PickList from 'primevue/picklist';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import Rating from 'primevue/rating';
import RadioButton from 'primevue/radiobutton';
import Ripple from 'primevue/ripple';
import Row from 'primevue/row';
import SelectButton from 'primevue/selectbutton';
import ScrollPanel from 'primevue/scrollpanel';
import ScrollTop from 'primevue/scrolltop';
import Skeleton from 'primevue/skeleton';
import Slider from 'primevue/slider';
import Sidebar from 'primevue/sidebar';
import SpeedDial from 'primevue/speeddial';
import SplitButton from 'primevue/splitbutton';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Steps from 'primevue/steps';
import StyleClass from 'primevue/styleclass';
import TabMenu from 'primevue/tabmenu';
import TieredMenu from 'primevue/tieredmenu';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tag from 'primevue/tag';
import Terminal from 'primevue/terminal';
import Timeline from 'primevue/timeline';
import ToggleButton from 'primevue/togglebutton';
import Tooltip from 'primevue/tooltip';
import Tree from 'primevue/tree';
import TreeSelect from 'primevue/treeselect';
import TreeTable from 'primevue/treetable';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import VirtualScroller from 'primevue/virtualscroller';
import InputMasked from '@/components/InputMasked.vue'

import BlockViewer from '@/components/BlockViewer.vue';
import Axios from 'axios';

import { defineRule } from 'vee-validate';

import '@/assets/styles.scss';

const app = createApp(App);

const instance = Axios.create({
  baseURL: 'https://localhost:7247'
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem('auth');
  if (token) {
    const auth = JSON.parse(token);

    if (auth.token) {
      request.headers.Authorization = `Bearer ${auth.token}`;
    }
  }
  return request;
});

app.config.globalProperties.$axios = instance;

defineRule('required', value => {
  if (!value?.length) {
    return 'Campo obrigatório';
  }
  return true;
});

app.use(router);
app.use(PrimeVue, 
  { 
    ripple: true,
    locale: {
      'startsWith': 'Começa com',
      'contains': 'Contém',
      'notContains': 'Não Contém',
      'endsWith': 'Termina com',
      'equals': 'Igual',
      'notEquals': 'Diferente',
      'noFilter': 'Sem Filtro',
      'lt': 'Menor que',
      'lte': 'Menor ou Igual',
      'gt': 'Maior que',
      'gte': 'Maior ou Igual',
      'dateIs': 'Date is',
      'dateIsNot': 'Date is not',
      'dateBefore': 'Date is before',
      'dateAfter': 'Date is after',
      'clear': 'Limpar',
      'apply': 'Aplicar',
      'matchAll': 'Match All',
      'matchAny': 'Match Any',
      'addRule': 'Add Rule',
      'removeRule': 'Remove Rule',
      'accept': 'Yes',
      'reject': 'No',
      'choose': 'Choose',
      'upload': 'Upload',
      'cancel': 'Cancel',
      'completed': 'Completed',
      'pending': 'Pending',
      'fileSizeTypes': ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      'dayNames': ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      'dayNamesShort': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      'dayNamesMin': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      'monthNames': ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      'monthNamesShort': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      'chooseYear': 'Escolha o ano',
      'chooseMonth': 'Escolha o mês',
      'chooseDate': 'Escolha a data',
      'prevDecade': 'Década anterior',
      'nextDecade': 'Próxima década',
      'prevYear': 'Ano anterior',
      'nextYear': 'Próximo ano',
      'prevMonth': 'Mês anterior',
      'nextMonth': 'Próximo mês',
      'prevHour': 'Hora anterior',
      'nextHour': 'Próxima hora',
      'prevMinute': 'Minuto anterior',
      'nextMinute': 'Próximo minuto',
      'prevSecond': 'Segundo anterior',
      'nextSecond': 'Próximo segundo',
      'am': 'am',
      'pm': 'pm',
      'today': 'Hoje',
      'weekHeader': 'Wk',
      'firstDayOfWeek': '0',
      'showMonthAfterYear': 'false',
      'dateFormat': 'dd/mm/yy',
      'weak': 'Weak',
      'medium': 'Medium',
      'strong': 'Strong',
      'passwordPrompt': 'Enter a password',
      'emptyFilterMessage': 'No results found', // @deprecated Use 'emptySearchMessage' option instea',
      'searchMessage': '{0} results are available',
      'selectionMessage': '{0} items selected',
      'emptySelectionMessage': 'No selected item',
      'emptySearchMessage': 'No results found',
      'emptyMessage': 'Nenhuma opção disponível',
      'aria.trueLabel': 'True',
      'aria.falseLabel': 'False',
      'aria.nullLabel': 'Not Selected',
      'aria.star': '1 star',
      'aria.stars': '{star} stars',
      'aria.selectAll': 'All items selected',
      'aria.unselectAll': 'All items unselected',
      'aria.close': 'Close',
      'aria.previous': 'Previous',
      'aria.next': 'Next',
      'aria.navigation': 'Navigation',
      'aria.scrollTop': 'Scroll Top',
      'aria.moveTop': 'Move Top',
      'aria.moveUp': 'Move Up',
      'aria.moveDown': 'Move Down',
      'aria.moveBottom': 'Move Bottom',
      'aria.moveToTarget': 'Move to Target',
      'aria.moveToSource': 'Move to Source',
      'aria.moveAllToTarget': 'Move All to Target',
      'aria.moveAllToSource': 'Move All to Source',
      'aria.pageLabel': 'Page {page}',
      'aria.firstPageLabel': 'First Page',
      'aria.lastPageLabel': 'Last Page',
      'aria.nextPageLabel': 'Next Page',
      'aria.prevPageLabel': 'Previous Page',
      'aria.rowsPerPageLabel': 'Rows per page',
      'aria.jumpToPageDropdownLabel': 'Jump to Page Dropdown',
      'aria.jumpToPageInputLabel': 'Jump to Page Input',
      'aria.selectRow': 'Row Selected',
      'aria.unselectRow': 'Row Unselected',
      'aria.expandRow': 'Row Expanded',
      'aria.collapseRow': 'Row Collapsed',
      'aria.showFilterMenu': 'Show Filter Menu',
      'aria.hideFilterMenu': 'Hide Filter Menu',
      'aria.filterOperator': 'Filter Operator',
      'aria.filterConstraint': 'Filter Constraint',
      'aria.editRow': 'Row Edit',
      'aria.saveEdit': 'Save Edit',
      'aria.cancelEdit': 'Cancel Edit',
      'aria.listView': 'List View',
      'aria.gridView': 'Grid View',
      'aria.slide': 'Slide',
      'aria.slideNumber': '{slideNumber}',
      'aria.zoomImage': 'Zoom Image',
      'aria.zoomIn': 'Zoom In',
      'aria.zoomOut': 'Zoom Out',
      'aria.rotateRight': 'Rotate Right',
      'aria.rotateLeft': 'Rotate Left',
    }
  });
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);

app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);

app.component('BlockViewer', BlockViewer);

app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('AutoComplete', AutoComplete);
app.component('Avatar', Avatar);
app.component('AvatarGroup', AvatarGroup);
app.component('Badge', Badge);
app.component('BlockUI', BlockUI);
app.component('Breadcrumb', Breadcrumb);
app.component('Button', Button);
app.component('Calendar', Calendar);
app.component('Card', Card);
app.component('Chart', Chart);
app.component('Carousel', Carousel);
app.component('CascadeSelect', CascadeSelect);
app.component('Checkbox', Checkbox);
app.component('Chip', Chip);
app.component('Chips', Chips);
app.component('ColorPicker', ColorPicker);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ConfirmPopup', ConfirmPopup);
app.component('ContextMenu', ContextMenu);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('DeferredContent', DeferredContent);
app.component('Dialog', Dialog);
app.component('Divider', Divider);
app.component('Dock', Dock);
app.component('Dropdown', Dropdown);
app.component('DynamicDialog', DynamicDialog);
app.component('Fieldset', Fieldset);
app.component('FileUpload', FileUpload);
app.component('Galleria', Galleria);
app.component('Image', Image);
app.component('InlineMessage', InlineMessage);
app.component('Inplace', Inplace);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('Knob', Knob);
app.component('Listbox', Listbox);
app.component('MegaMenu', MegaMenu);
app.component('Menu', Menu);
app.component('Menubar', Menubar);
app.component('Message', Message);
app.component('MultiSelect', MultiSelect);
app.component('OrderList', OrderList);
app.component('OrganizationChart', OrganizationChart);
app.component('OverlayPanel', OverlayPanel);
app.component('Paginator', Paginator);
app.component('Panel', Panel);
app.component('PanelMenu', PanelMenu);
app.component('Password', Password);
app.component('PickList', PickList);
app.component('ProgressBar', ProgressBar);
app.component('ProgressSpinner', ProgressSpinner);
app.component('RadioButton', RadioButton);
app.component('Rating', Rating);
app.component('Row', Row);
app.component('SelectButton', SelectButton);
app.component('ScrollPanel', ScrollPanel);
app.component('ScrollTop', ScrollTop);
app.component('Slider', Slider);
app.component('Sidebar', Sidebar);
app.component('Skeleton', Skeleton);
app.component('SpeedDial', SpeedDial);
app.component('SplitButton', SplitButton);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('Steps', Steps);
app.component('TabMenu', TabMenu);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Tag', Tag);
app.component('Textarea', Textarea);
app.component('Terminal', Terminal);
app.component('TieredMenu', TieredMenu);
app.component('Timeline', Timeline);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);
app.component('ToggleButton', ToggleButton);
app.component('Tree', Tree);
app.component('TreeSelect', TreeSelect);
app.component('TreeTable', TreeTable);
app.component('TriStateCheckbox', TriStateCheckbox);
app.component('VirtualScroller', VirtualScroller);
app.component('InputMasked', InputMasked);

app.mount('#app');

const globals = app.config.globalProperties
export { globals }
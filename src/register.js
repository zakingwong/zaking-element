import Alert from "./components/alert/index.js";
import Aside from "./components/aside/index.js";
import ButtonGroup from "./components/button-group/index.js";
import Button from "./components/button/index.js";
import Col from "./components/col/index.js";
import Container from "./components/container/index.js";
import Footer from "./components/footer/index.js";
import Header from "./components/header/index.js";
import Link from "./components/link/index.js";
import Loading from "./components/loading/index.js";
import Main from "./components/main/index.js";
import MessageBox from "./components/message-box/index.js";
import Message from "./components/message/index.js";
import Notification from "./components/notification/index.js";
import RadioButton from "./components/radio-button/index.js";
import RadioGroup from "./components/radio-group/index.js";
import Radio from "./components/radio/index.js";
import Row from "./components/row/index.js";

const components = [
  Alert,
  Container,
  Footer,
  Header,
  Aside,
  Main,
  Row,
  Col,
  Link,
  Button,
  ButtonGroup,
  Message,
  MessageBox,
  Notification,
  Radio,
  RadioButton,
  RadioGroup,
];

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  Vue.use(Loading.directive);
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$message = Message;

  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;

  Vue.prototype.$notify = Notification;
};
export default { install, ...components };

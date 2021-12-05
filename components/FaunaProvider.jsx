import store from "../store";
import { Provider } from "react-redux";

export default function FaunaProvider(props) {
  return <Provider store={store}>{props.children}</Provider>;
}

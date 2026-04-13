import { ScaleLoader } from "react-spinners";
import css from "./loading.module.css";

export default function Loading() {
  return <div className={css.backdrop}>{<ScaleLoader color="blue" />}</div>;
}

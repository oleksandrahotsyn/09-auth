import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { tags } from "@/constans/tags";

const SidebarNotes = () => {
  return (
    <div>
      <ul className={css.menuList}>
        {tags.map((el) => (
          <li className={css.menuItem} key={el}>
            <Link
              href={el === "All" ? "/notes/filter/All" : `/notes/filter/${el}`}
              className={css.menuLink}
            >
              {el}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarNotes;

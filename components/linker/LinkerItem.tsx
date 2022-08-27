import Link from "next/link";
import styles from "./LinkerItem.module.css"
import { routes } from "@/data/content/linker"
import * as ga from '../../lib/ga'

export default function LinkerItems() {

    const analytics = (item: { title: string; link: string; }) => {
        ga.event({
            action: "linker",
            params : {
              link: item.link,
              title: item.title
            }
          })
    }

    return (
        <>
            <ul className="flex justify-center text-center flex-col items-center">
                {routes.map((item, index) => {
                    return (
                        <li
                            className="m-3 max-w-sm sm:max-w-none"
                            key={item.title}
                            style={{width:"530px"}}
                        >
                            <a href={item.link} rel="noopener noreferrer" target="_blank">
                                <button type="button" role="button" onClick={() => analytics(item)} className={styles.button}>
                                    {item.title}
                                </button>
                            </a>
                        </li>
                    );
                })}
            </ul>

        </>
    );
}
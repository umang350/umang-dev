import Link from "next/link";
import styles from "./LinkerItem.module.css"
import { routes } from "@/data/content/linker"

export default function LinkerItems() {
    return (
        <>
            <ul className="flex justify-center text-center flex-col items-center">
                {routes.map((item, index) => {
                    return (
                        <li
                            className="m-3 w-fit"
                            key={item.title}
                        >
                            <Link href={item.link}>
                                <button type="button" role="button" className={styles.button}>
                                    {item.title}
                                </button>
                            </Link>
                        </li>
                    );
                })}
            </ul>

        </>
    );
}
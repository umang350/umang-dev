import Link from "next/link"

import styles from "@/components/linker/Linkedin.module.css"

export const LinkedinButton = () => {
  return (
    <>
      <Link className={styles.libutton}
        href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=umang350"
        target="_blank">
        Follow on LinkedIn
      </Link>

    </>)
}
import Image from "next/image"
import LinkerItems from "@/components/linker/LinkerItem"
import {icons} from "@/data/content/linker"
import { LinkedinButton } from "@/components/linker/Linkedin"


const Linker = () => {
    return (
        <div>
            <Image src="/background-mobile.png" layout="fill" alt="background" objectFit="cover"></Image>
            <header>
                <div
                    className="relative heroElem w-full pt-20 m-auto flex justify-center text-center flex-col items-center z-1">
                    <Image className="sqD" src="/sq.png" alt="icon" height="140px" width="160px" ></Image>
                    <p className="text-xl font-bold heroShinyBg">Umang Chauhan</p>
                    <h1 className="heroTitle inline-block max-w-2xl lg:max-w-4xl  w-auto relative text-1x0 md:text-2x0 lg:text-3xl tracking-tighter mb-10 font-bold heroShinyBg">
                        Creator. <span className="heroShiny1 text-fun-pink">Developer.</span> Strategy.
                    </h1>
            <LinkedinButton />
                </div>
            </header>
            <LinkerItems />
            <footer className="text-center w-full m-auto mt-10 grid grid-cols-3 justify-between items-start fixed bottom-0 pb-5 pt-5"  >
            {icons.map((item, index) => {
                return (
                    <a className="hover:h-10" href={item.link} target="new" key={item.link}> 
                    <Image className="socialicon" src={item.img} height="50" width="50" alt=""/>
                    </a> 
                )
            })}
            </footer>
        </div>
    )

}

export default Linker
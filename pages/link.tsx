import Image from "next/image"
import LinkerItems from "@/components/linker/LinkerItem"


const Linker = () => {
    return (
        <div>
            <Image src="/background-mobile.png" layout="fill" alt="background"></Image>
            <header>
                <div
                    className="relative heroElem w-full pt-20 m-auto flex justify-center text-center flex-col items-center z-1">
                    <Image className="sqD" src="/sq.png" alt="icon" height="140px" width="160px" ></Image>
                    <p className="text-xl font-bold heroShinyBg">Umang Chauhan</p>
                    <h1 className="heroTitle inline-block max-w-2xl lg:max-w-4xl  w-auto relative text-1x0 md:text-2x0 lg:text-3xl tracking-tighter mb-10 font-bold heroShinyBg">
                        Creator. <span className="heroShiny1 text-fun-pink">Developer.</span> Strategy.
                    </h1>
                </div>
            </header>
            <LinkerItems />
            <footer className="text-center w-full max-w-4xl m-auto mt-10 grid grid-cols-3 justify-between items-start" >
            <a href="https://twitter.com/thisumang/" target="new" title="Twitter"> 
                <Image className="socialicon hover:w-60" src="/icons/twitter.svg" height="50" width="50" alt=""/>
            </a> 
            <a href="mailto:Theumang.yt@gmail.com"target="new" title="Mail"> 
                <Image className="socialicon" src="/icons/mail-f.svg" height="50" width="50" alt=""/> 
            </a> 
            <a href="https://instagram.com/thisumang/" target="new" title="Instagram"> 
                <Image className="socialicon" src="/icons/instagram.svg" height="50" width="50" alt=""/> 
            </a>
            </footer>
        </div>
    )

}

export default Linker
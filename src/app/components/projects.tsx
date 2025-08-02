import Image, { StaticImageData } from "next/image";
import linkimg from "@/app/public/Link.svg";
type project = {
    key: number,
    name: string,
    descryption? : string,
    pic?: StaticImageData,
    link: string,
}

const p_shopify:project = {
    key: 1,
    name: "Shopify Demo",
    descryption: "Just a simple shop app!",
    link: "https://shopify.pouriax.ir",
    
}
export default function Projects(){
    const Projects = [p_shopify]

    return(
        <div className="flex flex-col">
            <div className=""></div>
            {Projects.map((p:project)=>(
                <div key={p.key} 
                    className="flex flex-row items-center ">
                    <div className="relative group">
                    {/* <Image alt="pic" width={1080} height={720} className="object-cover rounded-xl w-[330px] h-[170px] hover:w-[990px] hover:h-[425px] hover:transition-all"></Image>
                     */}<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    </div>
                    
                    <div className="flex flex-col m-5">
                    <h1 className="text-3xl">{p.name}</h1>
                    <h3 className="text-xl text-[#a5a5a5]">{p.descryption}</h3>
                    </div>
                    
                    <a href={p.link}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 9.00001L21 3.00001M21 3.00001H15M21 3.00001L12 12M10 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
            ))}
        </div>
    )
}
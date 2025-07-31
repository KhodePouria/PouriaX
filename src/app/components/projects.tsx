import Image, { StaticImageData } from "next/image";

type project = {
    key: number,
    name: string,
    descryption? : string,
    pic?: StaticImageData,
}

const p_shopify:project = {
    key: 1,
    name: "Shopify",
    descryption: "Just a simple shop app!",
    
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
                    
                </div>
            ))}
        </div>
    )
}
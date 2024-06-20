import Delete from "./Delete";

import fallbackImg from '/meme.webp';

const List = ({posts, setPosts}) => {

    const addImageFallback = (event) => {
        event.currentTarget.src = fallbackImg;
      };

    return(<>
        <section className="container mx-auto">
            <div className="flex flex-col gap-y-2">
                {posts.map((p,i) => (
                    <div key={`title-${p.title}-${i}`} className="flex flex-col gap-y-3 bg-neutral-100 p-5">

                        <div className="flex items-center justify-center gap-x-5">
                            <div className="flex flex-col gap-y-2 items-center">
                                <h3 className="text-xl font-bold">{p.title}</h3>
                                <figure className="w-[400px]">
                                    <img src={p.image} alt={p.title} onError={addImageFallback}/>
                                </figure>
                                <p className="text-slate-500">{p.content}</p>
                                <div className="flex items-center gap-x-3">
                                    {p.tags.map(t => (<span key={`showPostTags-${i}`}>{t}</span>))} -
                                    <span className=" font-bold bg-neutral-300 p-3">{p.category}</span>
                                </div>
                                <p className={p.published? "text-green-500" : "text-red-600"}>{p.published? "published" : "not published yet"}</p>
                            </div>
                            <Delete index={i} handleDelete={setPosts}/>
                        </div>

                    </div>
                ))}
            </div>
        </section>
        
    </>)
}
export default List;
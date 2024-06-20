import Delete from "./Delete";
import fallbackImg from '/meme.webp';

const List = ({postsList}) => {

    const addImageFallback = (event) => {
        event.currentTarget.src = fallbackImg;
      };

    return(<>
        <section className=" bg-neutral-200 flex flex-col gap-y-5">
            {postsList.map((p,i) => (
                <div key={`title-${p.title}-${i}`} className="container mx-auto">
                    <div className="flex items-center justify-center gap-x-3">
                        <div className="flex flex-col gap-y-2 items-center">
                            <div className="flex  items-center gap-x-4">
                            <h3 className="text-xl font-bold">{p.title}</h3>
                            <p className={`${p.published? "published" : "not-published"} font-bold p-2 rounded-md`}>{p.published? "published" : "not published yet"}</p>
                            </div>
                            <figure className="w-[400px] overflow-hidden rounded-md">
                                <img src={p.image? p.image : ""} alt={p.title} onError={addImageFallback}/>
                            </figure>
                            <p>{p.content}</p>
                            {/* <div className="flex items-center gap-x-3">
                                {p.tags.map(t => (<span key={`showPostTags-${i}`}>{t}</span>))} -
                                <span className=" font-bold bg-neutral-300 p-3">{p.category}</span>
                            </div> */}
                        </div>
                        <Delete index={i} handleDelete={postsList}/>
                    </div>

                </div>
            ))}
        </section>
    </>)
}
export default List;
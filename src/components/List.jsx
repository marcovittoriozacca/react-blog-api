import Delete from "./Delete";
import Navigation from "./Navigation";
import fallbackImg from '/meme.webp';
import axios from "axios";

const List = ({postsList, pageInfo, setPageInfo}) => {

const addImageFallback = (event) => {
    event.currentTarget.src = fallbackImg;
};

const next = () => {
    setPageInfo(curr => ({...curr, currentPage: (curr.currentPage >= curr.totalPages? curr.totalPages : curr.currentPage + 1 )}))
}
const prev = () => {
    setPageInfo(curr => ({...curr, currentPage: (curr.currentPage <= 1?  1 : curr.currentPage - 1 )}))
}

const handleDelete = async (slug) => {
    const postsUrl = import.meta.env.VITE_SERVER_POSTS;

    const response = await axios.delete(`${postsUrl}/${slug}`);
    console.log(response);
}

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
                                <img src={p.image? `${import.meta.env.VITE_SERVER_BASE_URL}${p.image}` : ""} alt={p.title} onError={addImageFallback}/>
                            </figure>
                            <p>{p.content}</p>
                            <div className="flex items-center gap-x-3">
                                {p.tags?.length > 0 && p.tags.map(t => (<span key={`showPostTags-${t.id}`}>{t.name}</span>))}
                                {p.category?.name && <span className=" font-bold bg-neutral-300 p-3">{p.category?.name}</span>}
                            </div>
                        </div>
                        <Delete slug={p.slug} onDelete={(slug) => handleDelete(slug)}/>
                    </div>

                </div>
            ))}
        </section>
        <Navigation 
            onNext={next}
            onPrev={prev}
        >
            {pageInfo.currentPage}
        </Navigation>
    </>)
}
export default List;
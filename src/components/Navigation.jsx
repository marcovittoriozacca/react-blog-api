export default function Navigation({children, onNext, onPrev }){
    return(<>
        <section className="flex items-center gap-x-5">
            <button className="px-2 border border-black" onClick={onPrev}>-</button>
            <strong>{children}</strong>
            <button className="px-2 border border-black" onClick={onNext}>+</button>
        </section>
    </>)
}

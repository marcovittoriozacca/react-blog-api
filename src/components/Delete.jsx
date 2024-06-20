import { MdDelete as DeleteBtn } from "react-icons/md";

const Delete = ({index, handleDelete}) => {
    
    const del = () => {
        handleDelete((posts) => posts.filter((_,i) => index != i));
    }

    return(
        <button onClick={del} className="bg-white rounded-full p-5">
            <DeleteBtn className="text-3xl text-red-700"/>
        </button>
    )

}
export default Delete;
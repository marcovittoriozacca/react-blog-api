import { MdDelete as DeleteBtn } from "react-icons/md";

const Delete = ({slug, onDelete}) => {

    return(
        <button onClick={() => onDelete(slug)} className="bg-white rounded-full p-5">
            <DeleteBtn className="text-3xl text-red-700"/>
        </button>
    )

}
export default Delete;
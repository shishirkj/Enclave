import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Search() {

   let isSearchIconClicked = useSelector(state=>state.product.isSearchIconClicked)
    const history = useNavigate();
    const [key, setKey] = useState('');

    const searchSubmit = (e) => {
        e.preventDefault();
       
        const path = key.trim() ? `/products/${key}` : `/products`;
        history(path);
    }

    return (
        <div className={`absolute top-19 right-12 ${isSearchIconClicked ? 'visible' : 'invisible'}`}>
            <form onSubmit={searchSubmit} className="flex items-center">
                <input
                    type='text'
                    placeholder='Search a Product...'
                    onChange={(e) => { setKey(e.target.value) }}
                    className="border border-gray-400 rounded-md p-2"
                />
                <button type='submit' className="bg-gray-800 text-white px-4 py-2 ml-2 rounded-md">
                    Search
                </button>
            </form>
        </div>
    );
}


import "./App.css";
import { FiPaperclip, FiArrowUpCircle } from "react-icons/fi";
import { Button } from "./components/ui/button";

function App() {
    return (
        <>
            <div className="flex border border-gray-300 justify-start items-end gap-1 rounded-lg p-2 ">
                <FiPaperclip className="w-6 h-6" />
                <textarea
                    className="flex px-2 py-4 grow text-gray-400 object-cover whitespace-pre-line"
                    placeholder="Enter text here.."
                >
                    Laboris ea officia nulla pariatur ex cillum nostrud commodo
                    exercitation adipisicing in id deserunt quis. Officia
                    aliquip ad voluptate pariatur amet duis reprehenderit
                    proident cillum ea incididunt. Dolore dolore consectetur
                    Lorem commodo esse deserunt nisi aliqua incididunt esse
                    laborum nostrud. Qui velit enim ullamco do ipsum anim. Elit
                    sint ut veniam officia sit ex id ea excepteur sit esse et
                    sint. Ad commodo amet proident occaecat. Velit fugiat in
                    labore aliquip. Aliquip excepteur ea magna occaecat aliqua
                    tempor sint aute dolore tempor aliquip. Fugiat nulla sunt
                    enim sit irure in eiusmod aute. Sit velit aliquip qui do
                    consectetur esse consequat nostrud esse exercitation
                    reprehenderit. Reprehenderit officia deserunt officia fugiat
                    ipsum proident eiusmod. Magna duis ullamco elit nisi elit
                    nisi. Aute pariatur deserunt occaecat in eu fugiat nostrud
                    ad consequat laboris ad. Quis enim ex ad dolore ea veniam
                    sit.
                </textarea>
                <FiArrowUpCircle className="w-6 h-6" />
            </div>
            <Button>Hello World</Button>
        </>
    );
}

export default App;
